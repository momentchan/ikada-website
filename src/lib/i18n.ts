import type { Locale } from "@/lib/types";

export const navItems = [
  { href: "/story", label: { en: "Story", ja: "ストーリー" } },
  { href: "/stay", label: { en: "Stay", ja: "宿について" } },
  { href: "/access", label: { en: "Access", ja: "アクセス" } },
  { href: "/guide", label: { en: "Guide", ja: "周辺" } },
] as const;

export const dictionary = {
  en: {
    language: "English",
    cta: {
      story: "Read Our Story",
      area: "Explore the Area",
      booking: "Request a Stay",
      maps: "Open in Google Maps",
      admin: "Admin",
    },
    home: {
      eyebrow: "Sumiyo, Amami Oshima",
      heroTitle: "From raft to house.",
      headline: "A small island guest house in Amami, named for a raft.",
      intro:
        "IKADA means raft. It began with bamboo, scrap wood, blue tarps, rope, and a few friends on the water. The guest house carries that spirit — a quiet base for slow days on the island.",
      points: [
        {
          title: "Simple island house",
          body: "A practical base for cooking, sleeping, and heading out when the sky looks good.",
        },
        {
          title: "Nature and quiet",
          body: "Close to mangroves, rain, insects, dark roads, birds, and the slower clock of Sumiyo.",
        },
        {
          title: "Personal local guide",
          body: "Owner notes for food, beaches, rainy days, and the small logistics that make Amami easier.",
        },
      ],
    },
    story: {
      title: "The Raft Before The House",
      intro:
        "The idea was not polished. It was tied together, adjusted, argued over, and launched with the kind of optimism that usually requires rope.",
      sections: [
        {
          title: "How it started",
          body: "We came to Amami looking for a slower way to travel: less itinerary, more tide table; fewer perfect plans, more friends standing around a pile of materials saying, surely this floats.",
        },
        {
          title: "How we built the raft",
          body: "The raft was bamboo, scrap wood, blue tarps, rope, and random useful things that had not yet been told they were useless. It was not elegant. It was ours.",
        },
        {
          title: "How Amami shaped it",
          body: "Amami has a way of making large ideas feel smaller and better. Rain changes the plan. Roads bend around mountains. The sea does not care about your schedule. We liked that.",
        },
        {
          title: "Why IKADA",
          body: "IKADA means raft. The guest house is named for that first object: not a performance of luxury, but a place to arrive, dry off, cook something simple, and decide what tomorrow might be.",
        },
      ],
      press: {
        eyebrow: "IN THE NEWS",
        title: "The raft crossed the strait — and made the local paper.",
        body: "Four friends built a raft from scrap wood, plastic floats, blue tarps, and rope, then set out from Setouchi to cross the Oshima Strait. Wind and currents changed the plan more than once. When a local newspaper ran the story, it was still just an adventure among friends — not a guest house brand. But that clipping is part of how the name IKADA stayed alive.",
        caption: "Newspaper coverage of the waste-material raft crossing the Oshima Strait near Setouchi, Amami Oshima.",
      },
    },
    stay: {
      title: "Stay At IKADA",
      goodFor: "This place is good for...",
      notFor: "This place may not be for you if...",
      goodItems: [
        "People who like nature and rural island life",
        "Slow travel, writing, cooking, and quiet mornings",
        "Sauna evenings and a cold plunge under the stars",
        "Surf, paddle, and small adventures from a quiet neighborhood base",
        "Small groups, couples, families, or friends",
        "Guests who want something more personal than a hotel",
      ],
      notItems: [
        "You expect luxury hotel service",
        "You dislike insects, geckos, humidity, or rural quiet",
        "You need city convenience within walking distance",
        "You are uncomfortable driving in rural areas",
      ],
    },
    access: {
      title: "Access",
      intro:
        "IKADA is in the Sumiyo area on the south side of Amami Oshima. Expect island roads and changing weather — a rental car is strongly recommended.",
      sections: [
        {
          title: "From Amami Airport",
          body: "Drive south toward Naze and Sumiyo. Expect island roads, changing weather, and slower travel than the map sometimes promises.",
        },
        {
          title: "From Naze",
          body: "Continue toward Sumiyo on the main island road. Naze is the best place to stock up before settling into the quieter side of the island.",
        },
        {
          title: "Parking",
          body: "The address is 18 Yamma, Sumiyo-cho, Amami-shi, Kagoshima 894-1204. Parking details are sent after booking confirmation.",
        },
        {
          title: "Stock up in Naze",
          body: "Supermarkets, ATMs, and last-minute supplies are easier in Naze before the quieter Sumiyo stretch. For beaches, food, and day-trip ideas once you arrive, see the Local Guide.",
        },
      ],
    },
    guide: {
      title: "Local Guide",
      intro:
        "Owner picks for food, beaches, nature, rainy days, and useful stops around IKADA. Check hours and weather before you go.",
      categories: {
        food: "Food",
        cafe: "Cafes",
        beach: "Beaches",
        nature: "Nature",
        viewpoint: "Viewpoints",
        rainy_day: "Rainy Day",
        shop: "Shops",
        useful: "Useful",
      },
    },
    guestGuide: {
      title: "Guest Guide",
      publicNote:
        "Public guest information is below. Sensitive entry details are sent by email after confirmation.",
    },
    booking: {
      title: "Request A Stay",
      intro:
        "Send your dates and a short note. We check availability, then send a payment link if the stay works.",
      pending:
        "Thanks. Your request has been received. We will check the dates and reply with the next step.",
    },
    admin: {
      title: "Admin",
      login: "Admin Login",
    },
  },
  ja: {
    language: "日本語",
    cta: {
      story: "ストーリーを読む",
      area: "周辺を見る",
      booking: "宿泊リクエスト",
      maps: "Googleマップで開く",
      admin: "管理",
    },
    home: {
      eyebrow: "奄美大島・住用",
      heroTitle: "筏から、家へ。",
      headline: "筏の名を持つ、奄美の小さなゲストハウス。",
      intro:
        "IKADAは「筏」。竹、廃材、ブルーシート、ロープ、友人たちと海に出た話から始まりました。この宿は、その精神を受け継ぐ、島でゆっくり過ごすための拠点です。",
      points: [
        {
          title: "素朴な島の一軒家",
          body: "寝る、作る、食べる、天気を見て出かける。そのための実用的な拠点です。",
        },
        {
          title: "自然と静けさ",
          body: "マングローブ、雨、虫、暗い道、鳥の声。住用のゆっくりした時間に近い場所。",
        },
        {
          title: "個人的なローカルガイド",
          body: "食事、海、雨の日、島で困りやすい小さな情報を、あとから管理画面で育てられます。",
        },
      ],
    },
    story: {
      title: "家の前に、筏があった",
      intro:
        "最初からきれいな計画だったわけではありません。結び、直し、言い合い、最後はロープへの信頼で海に出したような話です。",
      sections: [
        {
          title: "始まり",
          body: "奄美に来たのは、もっと遅い旅をしたかったから。予定表より潮、完璧な計画より「これ、たぶん浮くよね」と材料の前で話す時間。",
        },
        {
          title: "筏を作った",
          body: "筏は竹、廃材、ブルーシート、ロープ、そしてまだ役に立つと言い張れるものたちでできていました。美しくはない。でも自分たちのものでした。",
        },
        {
          title: "奄美に変えられたこと",
          body: "奄美では、大きな考えが少し小さく、でも良くなります。雨で予定が変わる。道は山を避けて曲がる。海は人間の都合を待たない。その感じがよかった。",
        },
        {
          title: "なぜIKADAなのか",
          body: "IKADAは筏。この宿は、あの最初の物体の名を受け継いでいます。豪華さを演じる場所ではなく、帰ってきて、乾いて、簡単なごはんを作り、明日を決めるための拠点です。",
        },
      ],
      press: {
        eyebrow: "新聞に載った日",
        title: "廃材いかだで、大島海峡を横断した話。",
        body: "瀬戸内の海岸で集めた廃材、ブルーシート、ロープ。多国籍の友人たちと作った筏で、大島海峡への冒険に出ました。風や流れで予定は何度も変わりました。地元紙に載ったときも、まだゲストハウスの計画ではありませんでした。でもその記事は、IKADAという名前が残っていく理由のひとつです。",
        caption: "瀬戸内町付近から大島海峡を横断した廃材いかだについての新聞記事。",
      },
    },
    stay: {
      title: "IKADAに泊まる",
      goodFor: "こんな人に向いています",
      notFor: "こんな人には向かないかもしれません",
      goodItems: [
        "自然や集落のある島暮らしが好きな人",
        "ゆっくり旅、書くこと、料理、静かな朝",
        "サウナのあと、星空の下で水風呂を楽しみたい人",
        "静かな集落を拠点に、サーフやパドル、小さな冒険をしたい人",
        "少人数の友人、カップル、家族",
        "ホテルより個人的な滞在を求める人",
      ],
      notItems: [
        "高級ホテルのようなサービスを期待する人",
        "虫、ヤモリ、湿気、田舎の静けさが苦手な人",
        "徒歩圏内に街の便利さが必要な人",
        "田舎道の運転に不安が強い人",
      ],
    },
    access: {
      title: "アクセス",
      intro:
        "IKADAは奄美大島南部の住用エリアにあります。島の道と天候を考えると、レンタカーを強くおすすめします。",
      sections: [
        {
          title: "奄美空港から",
          body: "名瀬・住用方面へ南下します。島の道、天候、カーブを考えると、地図の時間よりゆっくり見ておくと安心です。",
        },
        {
          title: "名瀬から",
          body: "主要道路を住用方面へ。到着前の買い出しは名瀬周辺が便利です。",
        },
        {
          title: "駐車場",
          body: "住所は〒894-1204 鹿児島県奄美市住用町大字山間18です。駐車場所の詳細は予約確定後にご案内します。",
        },
        {
          title: "名瀬で買い出し",
          body: "スーパー、ATM、必要なものは静かな住用に入る前の名瀬周辺が便利です。到着後の海、食事、日帰りの行き先は周辺ガイドをご覧ください。",
        },
      ],
    },
    guide: {
      title: "周辺ガイド",
      intro:
        "IKADAを起点に動く日のための、オーナーのおすすめメモです。食事、海、自然、雨の日、便利な場所。営業時間と天候は出発前に確認してください。",
      categories: {
        food: "食事",
        cafe: "カフェ",
        beach: "海",
        nature: "自然",
        viewpoint: "展望",
        rainy_day: "雨の日",
        shop: "買い物",
        useful: "便利",
      },
    },
    guestGuide: {
      title: "ゲストガイド",
      publicNote:
        "公開できるゲスト情報を掲載しています。入室方法などの詳細は予約確定後にメールでお送りします。",
    },
    booking: {
      title: "宿泊リクエスト",
      intro:
        "日程と簡単なメッセージを送ってください。空き状況を確認し、宿泊可能な場合は支払いリンクをお送りします。",
      pending:
        "リクエストを受け付けました。日程を確認して、次のステップをご連絡します。",
    },
    admin: {
      title: "管理",
      login: "管理者ログイン",
    },
  },
} satisfies Record<Locale, Record<string, unknown>>;

export function isLocale(value: string): value is Locale {
  return value === "en" || value === "ja";
}

export function t(locale: Locale) {
  return dictionary[locale];
}
