import type { FaqItem, GuideSpot, HouseInfo, HouseSettings, IkadaData } from "@/lib/types";

const now = new Date().toISOString();

export const defaultSettings: HouseSettings = {
  listingId: "ikada-main-house",
  listingName: "IKADA",
  baseNightlyPrice: 18000,
  cleaningFee: 6000,
  extraGuestFee: 3000,
  extraGuestThreshold: 2,
  weeklyDiscountPercent: 10,
  maxGuests: 10,
  checkInTime: "15:00",
  checkOutTime: "10:00",
  minNights: 2,
  currency: "jpy",
  airbnbIcalUrl: "",
  bookingPolicy: {
    en: "Booking requests are reviewed by the host before payment. Dates are held after the host sends a payment request and confirmed after successful payment.",
    ja: "予約リクエストはホスト確認後にお支払い案内をお送りします。お支払い完了後に予約確定となります。",
  },
  cancellationPolicy: {
    en: "Cancellation rules are editable in admin. For now, please contact us as early as possible if plans change; refunds depend on timing, fees, and weather or transport disruptions.",
    ja: "キャンセルポリシーは管理画面で編集できます。予定変更の場合はできるだけ早くご連絡ください。返金は時期、手数料、天候・交通状況により異なります。",
  },
};

export const defaultGuideSpots: GuideSpot[] = [
  {
    id: "mangrove-park",
    category: "nature",
    name: {
      en: "Kuroshio no Mori Mangrove Park",
      ja: "黒潮の森マングローブパーク",
    },
    distance: {
      en: "About 10-20 min by car, depending on exact route",
      ja: "車で約10〜20分（ルートにより変動）",
    },
    description: {
      en: "A Sumiyo-area mangrove river area with canoe tours and an easy first stop for understanding Amami's subtropical landscape.",
      ja: "住用エリアのマングローブ原生林。カヌーツアーもあり、奄美の亜熱帯の自然を感じる最初の場所としておすすめです。",
    },
    recommendation: {
      en: "Go around the tide schedule if you want the river to feel alive. Check current hours and tour times before leaving.",
      ja: "潮の時間に合わせると川の表情が変わります。営業時間とツアー時間は出発前に確認してください。",
    },
    mapUrl: "https://www.google.com/maps/search/?api=1&query=Kuroshio%20no%20Mori%20Mangrove%20Park%20Amami",
    sourceUrl: "https://www.amami-tourism.org/magazine/10515/",
    isPublished: true,
    sortOrder: 10,
    updatedAt: now,
  },
  {
    id: "honohoshi-coast",
    category: "beach",
    name: {
      en: "Honohoshi Coast",
      ja: "ホノホシ海岸",
    },
    distance: {
      en: "About 50-70 min by car",
      ja: "車で約50〜70分",
    },
    description: {
      en: "A dramatic southern coast with rounded stones shaped by Pacific waves. It is for listening and looking, not swimming.",
      ja: "太平洋の波で丸くなった石が広がる南部の海岸。泳ぐ場所というより、波音と景色を楽しむ場所です。",
    },
    recommendation: {
      en: "Do not take stones home. The sound when the waves pull back is the point.",
      ja: "石は持ち帰らないでください。波が引くときの音がこの場所の魅力です。",
    },
    mapUrl: "https://www.google.com/maps/search/?api=1&query=Honohoshi%20Coast%20Amami%20Oshima",
    sourceUrl: "https://www.kagoshima-kankou.com/for/attractions/10244",
    isPublished: true,
    sortOrder: 20,
    updatedAt: now,
  },
  {
    id: "tomori-beach",
    category: "beach",
    name: {
      en: "Tomori Beach",
      ja: "土盛海岸",
    },
    distance: {
      en: "About 60-80 min by car, near the airport",
      ja: "車で約60〜80分、空港方面",
    },
    description: {
      en: "A bright northern beach often visited before or after airport time. Beautiful water, but check currents and conditions.",
      ja: "空港の前後に立ち寄りやすい北部の海岸。海の色がきれいですが、潮流や天候は必ず確認してください。",
    },
    recommendation: {
      en: "Works well as an arrival-day stop if your flight timing and weather are kind.",
      ja: "フライト時間と天気が合えば、到着日や出発日に寄りやすい場所です。",
    },
    mapUrl: "https://www.google.com/maps/search/?api=1&query=Tomori%20Beach%20Amami%20Oshima",
    sourceUrl: "https://www.amami-tourism.org/magazine/10018/",
    isPublished: true,
    sortOrder: 30,
    updatedAt: now,
  },
  {
    id: "tsumugi-an",
    category: "food",
    name: {
      en: "Tsumugi-an",
      ja: "紬庵",
    },
    distance: {
      en: "Sumiyo-area restaurant; check map and hours",
      ja: "住用エリアの食事処。地図と営業時間を確認してください。",
    },
    description: {
      en: "A local soba and udon place mentioned by Amami tourism resources. Hours can change, so use this as a starter note.",
      ja: "奄美の観光情報でも紹介されている、そば・うどん系の食事処。営業時間は変わることがあるので事前確認を。",
    },
    recommendation: {
      en: "Useful when you want a simple meal without driving all the way to Naze.",
      ja: "名瀬まで出ずに簡単な食事をしたい時の候補です。",
    },
    mapUrl: "https://www.google.com/maps/search/?api=1&query=Tsumugi-an%20Sumiyo%20Amami",
    sourceUrl: "https://www.amami-tourism.org/magazine/13861/",
    isPublished: true,
    sortOrder: 40,
    updatedAt: now,
  },
  {
    id: "katoku-beach",
    category: "beach",
    name: {
      en: "Katoku Beach",
      ja: "加計呂久海岸",
    },
    distance: {
      en: "About 15-25 min by car",
      ja: "車で約15〜25分",
    },
    description: {
      en: "A sandy Sumiyo-area beach known for surf-friendly waves and open Pacific views.",
      ja: "住用エリアの砂浜。サーフにも向く波と、開けた太平洋の景色が魅力です。",
    },
    recommendation: {
      en: "Check surf and tide conditions before you go. Mornings can feel especially calm.",
      ja: "波と潮の状態は出発前に確認を。朝は特に静かな時間帯です。",
    },
    mapUrl: "https://www.google.com/maps/search/?api=1&query=Katoku%20Beach%20Amami%20Oshima",
    sourceUrl: "",
    isPublished: true,
    sortOrder: 15,
    updatedAt: now,
  },
  {
    id: "kusuku-beach",
    category: "beach",
    name: {
      en: "Kusuku Beach",
      ja: "楠久海岸",
    },
    distance: {
      en: "About 20-30 min by car",
      ja: "車で約20〜30分",
    },
    description: {
      en: "A rocky southern coast with character — better for watching the sea and timing the tides than swimming.",
      ja: "岩場が続く南部の海岸。泳ぐより、潮のタイミングを見ながら海を楽しむ場所です。",
    },
    recommendation: {
      en: "Worth it when the tide and swell line up. Not a casual swim spot.",
      ja: "潮とうねりのタイミングが合えば行く価値あり。気軽に泳ぐ場所ではありません。",
    },
    mapUrl: "https://www.google.com/maps/search/?api=1&query=Kusuku%20Beach%20Amami%20Oshima",
    sourceUrl: "",
    isPublished: true,
    sortOrder: 25,
    updatedAt: now,
  },
  {
    id: "funangyo-falls",
    category: "nature",
    name: {
      en: "Funangyo Falls",
      ja: "フナンギョウの滝",
    },
    distance: {
      en: "About 30-45 min by car, plus a short hike",
      ja: "車で約30〜45分＋短いハイキング",
    },
    description: {
      en: "A short forest walk leads to a waterfall deep in Amami's green interior — a good half-day escape from the coast.",
      ja: "森の中を少し歩くと滝にたどり着く、奄美の緑の奥へ入る半日コースです。",
    },
    recommendation: {
      en: "Wear shoes you do not mind getting wet. Go early if you want the trail quieter.",
      ja: "濡れてもよい靴で。静かに楽しみたいなら早めの出発がおすすめです。",
    },
    mapUrl: "https://www.google.com/maps/search/?api=1&query=Funangyo%20Falls%20Amami%20Oshima",
    sourceUrl: "",
    isPublished: true,
    sortOrder: 35,
    updatedAt: now,
  },
  {
    id: "sumiyo-mangroves",
    category: "nature",
    name: {
      en: "Sumiyo Mangrove River",
      ja: "住用のマングローブ",
    },
    distance: {
      en: "Just down the road from IKADA",
      ja: "IKADAからすぐそば",
    },
    description: {
      en: "Mangrove channels close to the house — paddle out by car to the river centre, or launch a kayak or SUP from IKADA.",
      ja: "家のすぐ近くのマングローブ水路。車で川のセンターへ行くか、IKADAのカヤックやSUPで出かけられます。",
    },
    recommendation: {
      en: "Tide timing changes the mood completely. One of the easiest ways to feel Amami from your first morning.",
      ja: "潮の時間で表情が大きく変わります。初日の朝から奄美を感じやすい場所です。",
    },
    mapUrl: "https://www.google.com/maps/search/?api=1&query=Mangrove%20Sumiyo%20Amami",
    sourceUrl: "",
    isPublished: true,
    sortOrder: 5,
    updatedAt: now,
  },
  {
    id: "mangrove-restaurant",
    category: "food",
    name: {
      en: "Mangrove Restaurant",
      ja: "マングローブレストラン",
    },
    distance: {
      en: "Sumiyo area; check map and hours",
      ja: "住用エリア。地図と営業時間を確認してください。",
    },
    description: {
      en: "A local restaurant in the mangrove area — a natural dinner stop after a river afternoon.",
      ja: "マングローブエリアの食事処。川遊びのあとの夕食にちょうどよい場所です。",
    },
    recommendation: {
      en: "Pair it with a mangrove paddle day. Hours can change, so check before driving over.",
      ja: "マングローブの午後とセットで。営業時間は変わることがあるので事前確認を。",
    },
    mapUrl: "https://www.google.com/maps/search/?api=1&query=Mangrove%20Restaurant%20Sumiyo%20Amami",
    sourceUrl: "",
    isPublished: true,
    sortOrder: 45,
    updatedAt: now,
  },
  {
    id: "yottemitei",
    category: "food",
    name: {
      en: "Yottemitei",
      ja: "よってみ亭",
    },
    distance: {
      en: "Sumiyo area; check map and hours",
      ja: "住用エリア。地図と営業時間を確認してください。",
    },
    description: {
      en: "A neighbourhood restaurant worth knowing when you want a proper island meal without heading to Naze.",
      ja: "名瀬まで出ずに、しっかり島の食事をしたい時に覚えておきたい近所の食事処です。",
    },
    recommendation: {
      en: "Good for an unhurried dinner close to IKADA.",
      ja: "IKADAの近くで、ゆっくり夕食を楽しみたい時に。",
    },
    mapUrl: "https://www.google.com/maps/search/?api=1&query=Yottemitei%20Sumiyo%20Amami",
    sourceUrl: "",
    isPublished: true,
    sortOrder: 50,
    updatedAt: now,
  },
  {
    id: "okonomiyaki-okini",
    category: "food",
    name: {
      en: "Okonomiyaki Okini",
      ja: "お好み焼き おおきに",
    },
    distance: {
      en: "Sumiyo area; call ahead recommended",
      ja: "住用エリア。事前の電話予約をおすすめします。",
    },
    description: {
      en: "A local okonomiyaki spot — casual, filling, and very Amami in spirit.",
      ja: "地元のお好み焼き屋。気軽でボリュームがあり、奄美らしい雰囲気が楽しめます。",
    },
    recommendation: {
      en: "Call ahead before you go. Popular nights can fill up.",
      ja: "行く前に電話を。混む日は待ち時間が出ることもあります。",
    },
    mapUrl: "https://www.google.com/maps/search/?api=1&query=Okonomiyaki%20Okini%20Sumiyo%20Amami",
    sourceUrl: "",
    isPublished: true,
    sortOrder: 55,
    updatedAt: now,
  },
];

export const defaultFaqItems: FaqItem[] = [
  {
    id: "car",
    question: {
      en: "Do we need a rental car?",
      ja: "レンタカーは必要ですか？",
    },
    answer: {
      en: "Yes, strongly recommended. IKADA is meant for slow island travel, but the area is rural and public transport is limited.",
      ja: "強くおすすめします。IKADAはゆっくり滞在する場所ですが、周辺は車移動が前提のエリアです。",
    },
    isPublished: true,
    sortOrder: 10,
  },
  {
    id: "insects",
    question: {
      en: "Are there insects?",
      ja: "虫は出ますか？",
    },
    answer: {
      en: "Yes. This is a rural subtropical island house. We keep the house clean, but insects, geckos, and seasonal visitors are part of the setting.",
      ja: "出ます。亜熱帯の集落にある一軒家なので、清掃はしますが虫やヤモリなどは自然の一部として考えてください。",
    },
    isPublished: true,
    sortOrder: 20,
  },
];

export const defaultHouseInfo: HouseInfo = {
  headline: {
    en: "A simple island house for quiet time, shared meals, and small adventures.",
    ja: "静かな時間、みんなで食べるごはん、小さな冒険のための島の一軒家。",
  },
  description: {
    en: "IKADA is not trying to be a hotel. It is a modest base in Sumiyo for people who like nature, sauna evenings, paddle days on nearby mangrove rivers, and letting the island set the pace.",
    ja: "IKADAはホテルを目指していません。住用の自然の近くで、サウナの夜、すぐそばのマングローブをカヤックやSUPで楽しみ、島のペースで過ごすための素朴な拠点です。",
  },
  facilities: [
    {
      key: "guests",
      label: { en: "Guests", ja: "定員" },
      value: { en: "Up to 10 guests", ja: "最大10名" },
    },
    {
      key: "beds",
      label: { en: "Beds", ja: "寝具" },
      value: { en: "Flexible bedding for friends or small groups", ja: "友人同士や小グループ向けの寝具" },
    },
    {
      key: "kitchen",
      label: { en: "Kitchen", ja: "キッチン" },
      value: { en: "Simple kitchen for breakfast, snacks, and shared meals", ja: "朝食や軽食、みんなで作るごはん用の簡単なキッチン" },
    },
    {
      key: "wifi",
      label: { en: "Wi-Fi", ja: "Wi-Fi" },
      value: { en: "Available; island weather may affect stability", ja: "利用可。天候により不安定になる場合があります。" },
    },
    {
      key: "parking",
      label: { en: "Parking", ja: "駐車場" },
      value: { en: "On-site or nearby parking available", ja: "敷地内または近隣に駐車可能" },
    },
    {
      key: "sauna",
      label: { en: "Sauna", ja: "サウナ" },
      value: { en: "Wood-fired sauna with an outdoor cold plunge", ja: "薪サウナと、アウトドアの水風呂" },
    },
    {
      key: "rental",
      label: { en: "On-site rental", ja: "レンタル" },
      value: { en: "Kayak, stand-up paddle, and scooter", ja: "カヤック、SUP、スクーター" },
    },
    {
      key: "bbq",
      label: { en: "BBQ", ja: "BBQ" },
      value: {
        en: "Outdoor grill for shared meals under the stars",
        ja: "星空の下でみんなで食べるアウトドア用グリル",
      },
    },
    {
      key: "cinema",
      label: { en: "Home cinema", ja: "ホームシネマ" },
      value: {
        en: "Projector and screen for slow rainy-night movies",
        ja: "雨の夜にゆっくり映画を楽しめるプロジェクター",
      },
    },
  ],
  rules: [
    {
      key: "quiet",
      label: { en: "Respect the neighborhood", ja: "集落への配慮" },
      description: {
        en: "Keep noise low at night and greet the area like you are borrowing a little piece of everyday island life.",
        ja: "夜は静かに。観光地ではなく、日常の集落の一部を借りている感覚でお過ごしください。",
      },
    },
    {
      key: "garbage",
      label: { en: "Sort garbage carefully", ja: "ごみ分別" },
      description: {
        en: "Island waste rules matter. Confirmed guests receive detailed sorting and checkout instructions.",
        ja: "島のごみルールは大切です。予約確定後に分別とチェックアウト手順をお送りします。",
      },
    },
    {
      key: "nature",
      label: { en: "Rural island safety", ja: "自然環境への注意" },
      description: {
        en: "Use lights at night, avoid entering bushes, check weather, and do not swim alone or in rough conditions.",
        ja: "夜はライトを使い、草むらに入らず、天候を確認し、荒天時や一人での遊泳は避けてください。",
      },
    },
  ],
  accessGuide: {
    en: "Rental car is strongly recommended. IKADA is at 18 Yamma, Sumiyo-cho, Amami-shi, Kagoshima 894-1204. From Amami Airport, drive south toward Naze and Sumiyo. From Naze, continue toward Sumiyo on the main island road. Parking and check-in details are sent after confirmation.",
    ja: "レンタカーを強くおすすめします。IKADAは〒894-1204 鹿児島県奄美市住用町大字山間18にあります。奄美空港からは名瀬・住用方面へ南下、名瀬からは住用方面へ。駐車場所とチェックイン詳細は予約確定後にお送りします。",
  },
  emergencyInfo: {
    en: "For fire or ambulance in Japan, call 119. For police, call 110. Watch for habu snakes around bushes and dark roads, and follow weather warnings during typhoon or heavy rain.",
    ja: "火事・救急は119、警察は110。草むらや夜道ではハブに注意し、台風や大雨の際は気象警報・避難情報に従ってください。",
  },
};

export const defaultData: IkadaData = {
  settings: defaultSettings,
  bookings: [],
  blockedDates: [],
  guideSpots: defaultGuideSpots,
  faqItems: defaultFaqItems,
  houseInfo: defaultHouseInfo,
};
