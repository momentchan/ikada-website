create extension if not exists pgcrypto;
create extension if not exists btree_gist;

create type booking_status as enum (
  'pending',
  'awaiting_payment',
  'confirmed',
  'cancelled',
  'refunded',
  'blocked'
);

create type payment_status as enum (
  'unpaid',
  'paid',
  'refunded',
  'failed'
);

create type guide_category as enum (
  'food',
  'cafe',
  'beach',
  'nature',
  'viewpoint',
  'rainy_day',
  'shop',
  'useful'
);

create table listings (
  id text primary key default 'ikada-main-house',
  name text not null,
  location text not null,
  max_guests integer not null default 5,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table guests (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  phone text,
  country text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (email)
);

create table bookings (
  id uuid primary key default gen_random_uuid(),
  listing_id text not null references listings(id),
  guest_id uuid references guests(id),
  guest_name text not null,
  guest_email text not null,
  guest_phone text,
  country text,
  check_in date not null,
  check_out date not null,
  guests integer not null check (guests > 0),
  message text,
  status booking_status not null default 'pending',
  payment_status payment_status not null default 'unpaid',
  quote jsonb not null,
  stripe_checkout_session_id text,
  stripe_payment_intent_id text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check (check_out > check_in),
  exclude using gist (
    listing_id with =,
    daterange(check_in, check_out, '[)') with &&
  )
  where (status in ('pending', 'awaiting_payment', 'confirmed'))
);

create table blocked_dates (
  id uuid primary key default gen_random_uuid(),
  listing_id text not null references listings(id),
  start_date date not null,
  end_date date not null,
  reason text not null,
  created_at timestamptz not null default now(),
  check (end_date > start_date),
  exclude using gist (
    listing_id with =,
    daterange(start_date, end_date, '[)') with &&
  )
);

create table payments (
  id uuid primary key default gen_random_uuid(),
  booking_id uuid not null references bookings(id) on delete cascade,
  provider text not null default 'stripe',
  provider_payment_id text,
  provider_checkout_session_id text,
  status payment_status not null default 'unpaid',
  amount integer not null,
  currency text not null default 'jpy',
  raw_event jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table guide_spots (
  id text primary key,
  category guide_category not null,
  name jsonb not null,
  distance jsonb not null,
  description jsonb not null,
  recommendation jsonb not null,
  map_url text not null,
  source_url text,
  is_published boolean not null default true,
  sort_order integer not null default 100,
  updated_at timestamptz not null default now()
);

create table house_info (
  key text primary key,
  value jsonb not null,
  updated_at timestamptz not null default now()
);

create table faq_items (
  id text primary key,
  question jsonb not null,
  answer jsonb not null,
  is_published boolean not null default true,
  sort_order integer not null default 100,
  updated_at timestamptz not null default now()
);

create table admin_users (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  password_hash text,
  role text not null default 'admin',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table settings (
  key text primary key,
  value jsonb not null,
  updated_at timestamptz not null default now()
);

create or replace function prevent_booking_block_conflict()
returns trigger as $$
begin
  if new.status in ('pending', 'awaiting_payment', 'confirmed') and exists (
    select 1
    from blocked_dates b
    where b.listing_id = new.listing_id
      and daterange(b.start_date, b.end_date, '[)') && daterange(new.check_in, new.check_out, '[)')
  ) then
    raise exception 'booking conflicts with blocked dates';
  end if;
  return new;
end;
$$ language plpgsql;

create trigger bookings_prevent_block_conflict
before insert or update on bookings
for each row execute function prevent_booking_block_conflict();

create or replace function prevent_block_booking_conflict()
returns trigger as $$
begin
  if exists (
    select 1
    from bookings bk
    where bk.listing_id = new.listing_id
      and bk.status in ('pending', 'awaiting_payment', 'confirmed')
      and daterange(bk.check_in, bk.check_out, '[)') && daterange(new.start_date, new.end_date, '[)')
  ) then
    raise exception 'blocked date conflicts with active booking';
  end if;
  return new;
end;
$$ language plpgsql;

create trigger blocked_dates_prevent_booking_conflict
before insert or update on blocked_dates
for each row execute function prevent_block_booking_conflict();

insert into listings (id, name, location, max_guests)
values ('ikada-main-house', 'IKADA', 'Sumiyo, Amami Oshima, Kagoshima, Japan', 5)
on conflict (id) do nothing;
