import type { Locale } from "@/lib/types";

export const navItems = [
  { href: "/story", label: { en: "Story", ja: "ストーリー" } },
  { href: "/stay", label: { en: "Stay", ja: "宿について" } },
  { href: "/access", label: { en: "Access", ja: "アクセス" } },
  { href: "/guide", label: { en: "Local Guide", ja: "周辺ガイド" } },
  { href: "/booking", label: { en: "Booking", ja: "予約" } },
] as const;

export const dictionary = {
  en: {
    language: "English",
    cta: {
      availability: "Check Availability",
      story: "Read Our Story",
      area: "Explore the Area",
      booking: "Request a Stay",
      maps: "Open in Google Maps",
      admin: "Admin",
    },
    home: {
      eyebrow: "Sumiyo, Amami Oshima",
      headline: "A small island house in Amami, built from the spirit of drifting.",
      intro:
        "IKADA means raft. It began with bamboo, scrap wood, blue tarps, rope, a few friends, and the mildly unreasonable belief that drifting slowly could become a way of staying.",
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
          title: "How we built it",
          body: "The raft was bamboo, scrap wood, blue tarps, rope, and random useful things that had not yet been told they were useless. It was not elegant. It was ours.",
        },
        {
          title: "How Amami shaped it",
          body: "Amami has a way of making large ideas feel smaller and better. Rain changes the plan. Roads bend around mountains. The sea does not care about your schedule. We liked that.",
        },
        {
          title: "Why IKADA",
          body: "IKADA means raft. The house is an extension of that first object: a handmade base, not a performance of luxury. A place to arrive, dry off, cook something simple, and decide what tomorrow might be.",
        },
      ],
    },
    stay: {
      title: "Stay At IKADA",
      goodFor: "This place is good for...",
      notFor: "This place may not be for you if...",
      goodItems: [
        "People who like nature and rural island life",
        "Slow travel, writing, cooking, and quiet mornings",
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
        "IKADA is in the Sumiyo area of Amami Oshima. A rental car is strongly recommended; it gives you the freedom this stay is built around.",
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
          body: "Parking details and the exact address are sent after booking confirmation.",
        },
        {
          title: "Food and supplies",
          body: "Buy groceries before arriving if you want an easy first night. Convenience stores and supermarkets are easier around Naze than deep in the rural areas.",
        },
      ],
    },
    guide: {
      title: "Local Guide",
      intro:
        "A starter map for nearby food, beaches, mangroves, rainy-day plans, and useful places. Please check hours and conditions before leaving.",
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
      availability: "空室を確認",
      story: "ストーリーを読む",
      area: "周辺を見る",
      booking: "宿泊リクエスト",
      maps: "Googleマップで開く",
      admin: "管理",
    },
    home: {
      eyebrow: "奄美大島・住用",
      headline: "漂うことから生まれた、奄美の小さな島の家。",
      intro:
        "IKADAは「筏」。竹、廃材、ブルーシート、ロープ、友人たち、そして少し無茶な楽観から始まった小さな旅の続きです。",
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
          title: "作ったもの",
          body: "筏は竹、廃材、ブルーシート、ロープ、そしてまだ役に立つと言い張れるものたちでできていました。美しくはない。でも自分たちのものでした。",
        },
        {
          title: "奄美に変えられたこと",
          body: "奄美では、大きな考えが少し小さく、でも良くなります。雨で予定が変わる。道は山を避けて曲がる。海は人間の都合を待たない。その感じがよかった。",
        },
        {
          title: "なぜIKADAなのか",
          body: "IKADAは筏。この家は、あの最初の物体の続きです。豪華さを演じる場所ではなく、帰ってきて、乾いて、簡単なごはんを作り、明日を決めるための手作りの拠点です。",
        },
      ],
    },
    stay: {
      title: "IKADAに泊まる",
      goodFor: "こんな人に向いています",
      notFor: "こんな人には向かないかもしれません",
      goodItems: [
        "自然や集落のある島暮らしが好きな人",
        "ゆっくり旅、書くこと、料理、静かな朝",
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
        "IKADAは奄美大島の住用エリアにあります。この滞在を楽しむには、レンタカーを強くおすすめします。",
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
          body: "詳しい住所と駐車場所は予約確定後にご案内します。",
        },
        {
          title: "食料・日用品",
          body: "初日の夜を楽にしたい場合は、到着前に買い出しをしておくのがおすすめです。",
        },
      ],
    },
    guide: {
      title: "周辺ガイド",
      intro:
        "食事、海、マングローブ、雨の日、便利な場所のスターターガイドです。営業時間や天候は出発前に確認してください。",
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
