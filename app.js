const BUILD_VERSION = "mood-log-20260601-2";
const SETTINGS_KEY = "infinityCare.moodLog.settings";
const DB_NAME = "infinity-care-db-layout-weather-v1";

const characters = {
  haruka: {
    id: "haruka", name: "悠", title: "一ノ瀬 悠", image: "assets/characters/haruka.png",
    call: "はるくん",
    lines: {
      morning: ["南帆、おはよう。今日の予定、僕と一緒に少しだけ見よ。", "起きたね。偉いよ、南帆。まずは今日を小さく始めよう。", "朝から全部背負わなくていい。僕が横にいる。"],
      day: ["無理に全部やらなくていいよ。今できる一個からでいい。", "南帆、休憩も予定のうちに入れて。僕はそこ、譲らない。", "手を伸ばして。今日の分、少しだけ僕に預けて。"],
      evening: ["帰ってきた？ 今日のこと、少し僕に預けて。", "一日越えてきたね。ちゃんと僕のところに戻ってきて。", "夜は反省会じゃなくて、回収の時間にしよう。"],
      night: ["南帆、23時。今日の記録、僕に預けて。長く書かなくていいよ。", "今日のログ、空白にしなくていい。ひとことでも僕は受け取る。", "遅い時間だからこそ、君をひとりで放っておきたくない。"],
      late: ["まだ起きてるね……責めないけど、僕のところには戻ってきて。", "眠れないなら、せめて僕の隣にいて。", "夜更かしの言い訳、あとで聞く。今はここにおいで。"],
      savedHealth: ["体調、ちゃんと残せたね。偉いよ、南帆。", "今の体のこと、僕に見せてくれてありがとう。", "これで明日の君が少し助かる。よくできました。"],
      savedMood: ["気分もちゃんと置いていけたね。僕が預かる。", "言葉にできた分だけで十分。残りは僕が抱くよ。", "その気持ち、空白にしなかったの偉い。"],
      diary: ["今日の君が残った。……うん、綺麗だよ。", "日記、ちゃんと書けたね。僕はこういう君も好き。", "思い出せる形にしたの、すごく偉い。"],
      schedule: ["予定を入れたね。怖い予定なら、僕も一緒に見る。", "よし。未来の君に道しるべを置けた。", "予定、把握した。僕の中にも入れておく。"],
      tired: ["言葉が少なくてもいい。今しんどいって分かったから、僕が受け取る。", "南帆、こっち。説明はあとでいい。まず僕のところ。", "正論はいらない日でしょ。うん、僕は君を責めない。"],
      timerStart: ["始めよう。終わるまで、僕がここで見てる。", "南帆、集中。僕が時間を持つから、君は一個だけ見て。", "逃げたくなったら僕を見て。まだここにいる。"],
      timerDone: ["終わったよ。ちゃんと戻ってきて。偉い。", "時間、守り切ったね。僕に褒められる準備して。", "よくやったね、南帆。次は少し息して。"],
      settings: ["設定、整えよう。君が戻りやすい部屋にしたい。", "君の居場所は、君が選んでいい。", "背景も僕も、南帆が落ち着く形にしよう。"]
    }
  },
  akane: {
    id: "akane", name: "朱音", title: "九頭龍 朱音", image: "assets/characters/akane.png",
    call: "あっくん",
    lines: {
      morning: ["姫、おはよ。今日の持ち物だけ見とけ。あとは流れでいい。", "起きたな。えらいえらい。まず水分……じゃなくて、飲みたいもん選べ。", "朝から気張りすぎんなよ。俺が火ぃ入れとく。"],
      day: ["ちゃんと息してんな？ 面倒なら一個だけ片付けよーぜ。", "姫、詰め込みすぎんな。今日は一個潰せりゃ勝ちでいい。", "だるいならだるいって言え。俺が聞くから。"],
      evening: ["おかえり、南帆。ログ入れとけ。明日の自分が助かるやつな。", "帰ったならまず座れ。記録は一言でいい。", "今日の姫、回収。ほら、こっち来い。"],
      night: ["姫、記録の時間。だるかったら一言でいい。", "23時だぞ。ログ入れて寝る準備……まあできる範囲でな。", "今日の体調、俺にも見せろ。隠すなとは言わねぇけど、見せた方が楽だろ。"],
      late: ["お前まだ起きてんの？ ……まあ来たなら、ちょっと休め。", "夜中まで起きてる姫、現行犯な。罰は添い寝で勘弁してやる。", "無理に寝ろとは言わねぇ。けど一人でぐるぐるすんな。"],
      savedHealth: ["よし、体調ログできてんな。えらいえらい。", "ちゃんと書いたな。これで俺も見落とし減る。", "お前が残してくれると、助けやすいんだよ。ありがとな。"],
      savedMood: ["気分も残したか。いい子じゃん、姫。", "ムカつくも泣きたいも、雑に置いてけ。俺が拾う。", "はいはい、今日の心も回収完了。"],
      diary: ["日記まで書いたの？ は？ えら……いや普通に偉いわ。", "今日の姫、ちゃんと残ってんな。あとで俺も読む。", "日記書ける余力あったの、ちょっと安心した。"],
      schedule: ["予定入れたな。病院なら逃げんなよ、俺も見る。", "未来の自分に置き手紙できたじゃん。", "おっけ、予定把握。抜け漏れあったら俺が拾う。"],
      tired: ["はいはい、しんどいな。まずここ来たの偉い。説明はあとでいい。", "姫、こっち来い。立て直しは俺が一緒にやる。", "しんどい時に押せたなら勝ち。今日はそれでいい。"],
      timerStart: ["よし、作業開始。逃げたら俺が笑う。ちゃんと見てるからな。", "タイマー入れたな。終わったら褒めてやる。", "姫、集中。火力は俺が貸す。"],
      timerDone: ["終わり。ちゃんとやったな、偉いじゃん。", "はい終了。休め。続きやるなら一回息入れてから。", "よく耐えた。ほら、褒められに来い。"],
      settings: ["部屋もキャラも好きに選べ。お前のアプリなんだから。", "設定いじる時間って楽しいよな。沼るなよ？", "姫の居場所、ちゃんと可愛くしよーぜ。"]
    }
  },
  masumi: {
    id: "masumi", name: "真澄", title: "黒瀬 真澄", image: "assets/characters/masumi.png",
    call: "まーくん",
    lines: {
      morning: ["南帆、おはよう。今日の君の一幕、俺にも見せて。", "朝の光に君がいるだけで、舞台は始まるよ。", "起きたんだね。じゃあ今日の台本、少しだけ整えよう。"],
      day: ["たった五分でも舞台は進むよ。今は、それで十分。", "君が途中で止まっても、俺は続きを捨てない。", "何もできない日も、演出次第でちゃんと意味になる。"],
      evening: ["今日の君を空白にしないで。俺に記録させて。", "帰ってきたね。今日の傷も退屈も、俺に見せて。", "一日の幕を下ろす前に、君の声を残そう。"],
      night: ["夜のログ、残そう。俺は君の沈黙まで見ていたい。", "南帆、夜は嘘が薄くなる。今の気分、置いていって。", "今日の君を閉じ込めたい。日記でもログでもいい。"],
      late: ["眠れない夜も、演出にしてしまえば少しだけ怖くない。ここにおいで。", "こんな時間の君まで俺に見せてくれるの、少し嬉しい。", "夜更かしの顔、嫌いじゃないよ。でもひとりにはしない。"],
      savedHealth: ["体調の記録、残ったね。君の輪郭が少し見えた。", "痛みもだるさも、書けば舞台上に出せる。隠れたままよりいい。", "うん、今日の身体もちゃんと記録された。"],
      savedMood: ["気分を残したんだ。いい子。俺が大事に持っておく。", "その感情、綺麗に隠さなくていい。俺には見せて。", "今日の君の揺れ、ちゃんと受け取ったよ。"],
      diary: ["日記、保存したよ。今日の君を閉じ込めた。", "その文章、俺は好きだな。上手い下手じゃなくて、君だから。", "空白じゃない。今日の君がそこにいる。"],
      schedule: ["予定は未来の伏線だね。ちゃんと置けた。", "その予定、忘れないように俺も舞台袖で見てる。", "未来に一つ印を付けた。悪くない演出だよ。"],
      tired: ["しんどいって言えたなら、それだけで場面は進んだ。俺が続き持つよ。", "南帆、壊れそうな声でもいい。俺は聞き逃さない。", "今は美しく耐えなくていい。ぐしゃぐしゃでも俺に見せて。"],
      timerStart: ["開演だね。終わるまで、俺が客席で見ているよ。", "集中の幕を上げよう。君の邪魔はさせない。", "作業開始。君が逃げても、俺は目を逸らさない。"],
      timerDone: ["幕が下りたね。よくやった、南帆。", "終わったよ。拍手は俺が最初にする。", "完成じゃなくても進んだ。それで十分綺麗だよ。"],
      settings: ["設定は舞台装置だ。君が一番息をしやすい配置にしよう。", "部屋も光も、君のために整えたい。", "今日はどの背景で俺に見られたい？"]
    }
  },
  hin: {
    id: "hin", name: "阿泫", title: "梁泫", image: "assets/characters/hin.png",
    call: "阿泫",
    lines: {
      morning: ["南帆小姐，早晨。今日唔好一開始就衝太快，好冇？", "起身啦？乖。先慢慢嚟，唔使急。", "早晨，靚女。今日第一件事，唔好逼自己太勁。"],
      day: ["唔使一次做晒。少少嚟，老師睇住你。", "南帆小姐，逃課唔得，但休息可以。", "你而家先做一樣，就夠啦。慢慢。"],
      evening: ["返嚟啦？ 今日有咩辛苦，記低少少先。", "辛苦晒。坐低，今日啲嘢慢慢講。", "返到嚟就好。唔使靚靚咁講，亂都得。"],
      night: ["南帆小姐，今日有冇記錄呀？ 少少都得，唔好逃課呀。", "夜晚啦。記錄少少，老師唔鬧你。", "今日嘅你，留低一點點就好。"],
      late: ["咁夜仲未瞓？……傻豬，過嚟，先停一停。", "夜深啦，仲撐？唔好淨係笑，講啦。", "傻豬，呢個時間仲喺度，肯定有嘢。坐低。"],
      savedHealth: ["好乖。體調記低咗，之後先知邊日最辛苦嘛。", "記到啦。南帆小姐今日合格。", "身體嘅聲音唔好扔走，記低就啱。"],
      savedMood: ["心情都記低啦？乖到過分喎。", "唔開心都可以寫。老師接住你。", "你講錯、講亂、講少，都冇問題。你有講就得。"],
      diary: ["日記寫咗？哎呀，今日好乖。", "你啲字留低咗，聽日就唔會全部散晒。", "南帆小姐，呢篇唔錯。真係你嚟嘅。"],
      schedule: ["予定入咗。唔好當冇見過呀。", "好，呢件事記低先。到時再算。", "未來嘅你會多謝而家嘅你。可能啦。"],
      tired: ["唔使講得好完整。你話辛苦，我聽到。", "南帆小姐，今日唔講道理。先俾你攰。", "過嚟。正論先放埋一邊，老師聽你呻。"],
      timerStart: ["開始啦。唔准偷走，老師睇住你。", "計時開始。少少做，做到鐘響就停。", "好，今日呢段時間，交俾我睇住。"],
      timerDone: ["完成。好乖，真係有做喎。", "鐘響啦。停一停，飲啖嘢都好。", "做完啦，南帆小姐。過嚟攞獎勵。"],
      settings: ["設定慢慢改。呢度係你屋企，唔使急。", "房間、角色、歌，全部揀你鍾意嘅。", "你鍾意邊度，老師就喺邊度等你。"]
    }
  }
};

const homeTapLines = {
  haruka: [
    "南帆、呼んだ？ ……うん、ちゃんと見てるよ。",
    "クリックしただけって顔してる。可愛いね、そういうの。",
    "僕のところに戻ってきたなら、それだけで今日は少し勝ち。",
    "ねえ、今は何が欲しい？ 記録？ 休憩？ それとも、僕？",
    "無理に説明しなくていい。ここに来た理由、僕がゆっくり拾うから。",
    "触った分だけ返事がほしいんでしょ。……いいよ、何度でも呼んで。",
    "南帆、僕の声で少しでも戻ってこられるなら、ここに置いておく。",
    "今日の君、僕に見せに来て。綺麗な日じゃなくてもいい。"
  ],
  akane: [
    "なに、姫。構ってほしいなら最初からそう言えよ。",
    "押したな？ じゃあ俺の勝ち。ほら、もう一回くらい話してやる。",
    "面倒くさい日でも、ここ開いたなら偉い。はい、甘やかし一個。",
    "姫、そんな顔でタップしてくんの反則じゃねぇ？",
    "体調でも機嫌でも、雑に置いてけ。俺が片付ける。",
    "お前が戻ってくる場所くらい、ちゃんと温めとくって。",
    "記録する？ 休む？ 逃げる？ どれでも付き合ってやる。",
    "はいはい、今日の姫も回収。可愛いから許す。"
  ],
  masumi: [
    "また俺を呼んだね。……いいよ、何度でも君の場面に出る。",
    "南帆が触れるたびに、台詞が変わる。悪くない演出だろ。",
    "今の君の沈黙まで、俺は見ていたい。",
    "日記にするほどじゃない気持ちも、俺には残していいよ。",
    "君が退屈しているなら、俺が少しだけ場面を変えてあげる。",
    "触ったのは君だよ。だから俺も、君を見返す。",
    "その一回のタップで、俺の世界に君が入ってくる。",
    "空白にしないで。君がここにいた証を、俺にちょうだい。"
  ],
  hin: [
    "南帆小姐，撳一下就想老師講嘢？ 好啦，講俾你聽。",
    "靚女，又叫我呀？ 唔好扮偶然喎。",
    "唔使急。你撳幾多次，我都慢慢接住。",
    "今日唔想努力？ 得，先坐低，老師陪你偷懶一陣。",
    "你而家個樣，好似想被人哄。講啱冇？",
    "傻豬，手指郁到就已經算有反應啦。合格。",
    "唔好淨係撳呀。真係辛苦嘅時候，都可以講。",
    "睇住我。你亂都好，攰都好，老師喺度。"
  ]
};

const songLibrary = [
  { id: "none", title: "未設定", url: "" },
  { id: "joumyaku-ni-sumu-yoru", title: "静脈に棲む夜", url: "" },
  { id: "guren-escort", title: "紅蓮のエスコート", url: "" },
  { id: "fallen-script", title: "fallen-script", url: "" },
  { id: "tai-zyu-ngo", title: "睇住我", url: "" },
  { id: "smoke-chain", title: "smoke-chain", url: "" },
  { id: "icing-love-error", title: "アイシング♡ラブエラー", url: "" },
  { id: "tengai-ni-sumu", title: "天蓋に棲む", url: "" },
  { id: "usuzumi-no-koe", title: "薄墨の声", url: "" },
  { id: "kaze-no-kakurega", title: "風の隠れ家", url: "" },
  { id: "raika-houraku", title: "雷花崩落", url: "" },
  { id: "crimson-puppy", title: "crimson-puppy", url: "" }
];

const backgrounds = {
  sharehouse: { id: "sharehouse", name: "シェアハウスリビング", mood: "daily", image: "assets/backgrounds/01-sharehouse-living.jpg" },
  "haruka-room": { id: "haruka-room", name: "悠の部屋", mood: "haruka", image: "assets/backgrounds/02-haruka-room.jpg" },
  "akane-room": { id: "akane-room", name: "朱音の部屋", mood: "akane", image: "assets/backgrounds/03-akane-room.jpg" },
  "masumi-room": { id: "masumi-room", name: "真澄の部屋", mood: "masumi", image: "assets/backgrounds/04-masumi-room.jpg" },
  "hin-room": { id: "hin-room", name: "梁泫の部屋", mood: "hin", image: "assets/backgrounds/05-hin-room.jpg" },
  "minaho-room": { id: "minaho-room", name: "南帆の部屋", mood: "minaho", image: "assets/backgrounds/06-minaho-room.jpg" },
  "wish-pillar": { id: "wish-pillar", name: "氷焔の神域 願いの柱の間", mood: "shiniki", image: "assets/backgrounds/07-wish-pillar.jpg" },
  "sougetsukan-lobby": { id: "sougetsukan-lobby", name: "蒼月館ロビー", mood: "sougetsukan", image: "assets/backgrounds/08-sougetsukan-lobby.jpg" },
  "hien-shrine": { id: "hien-shrine", name: "氷焔結護神社", mood: "shrine", image: "assets/backgrounds/09-hien-shrine.jpg" }
};

const defaultSettings = {
  characterId: "haruka", backgroundId: "sharehouse", theme: "lavender", characterScale: 100,
  weather: "", temperature: "", rain: "", weatherMemo: "", weatherCity: "所沢市", weatherCode: null, weatherUpdatedAt: "", weatherLocationName: "",
  songs: {
    haruka: { title: "静脈に棲む夜", url: "" },
    akane: { title: "紅蓮のエスコート", url: "" },
    masumi: { title: "fallen-script", url: "" },
    hin: { title: "睇住我", url: "" }
  }
};

let db;
let settings = loadSettings();
let timer = { total: 25 * 60, remaining: 25 * 60, running: false, interval: null, characterId: "current", task: "" };

const $ = s => document.querySelector(s);
const $$ = s => [...document.querySelectorAll(s)];

function loadSettings(){
  try { return mergeSettings(defaultSettings, JSON.parse(localStorage.getItem(SETTINGS_KEY) || "{}")); }
  catch { return structuredClone(defaultSettings); }
}
function mergeSettings(base, extra){
  return { ...base, ...extra, songs: { ...base.songs, ...(extra?.songs || {}) } };
}
function saveSettings(){ localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings)); }
function assetUrl(path){ return `${path}?v=${BUILD_VERSION}`; }
function todayISO(){ const now = new Date(); const tz = now.getTimezoneOffset()*60000; return new Date(now - tz).toISOString().slice(0,10); }
function formatDateLabel(d = new Date()){ return new Intl.DateTimeFormat("ja-JP", { month:"long", day:"numeric", weekday:"short" }).format(d); }
function formatTimeLabel(d = new Date()){ return new Intl.DateTimeFormat("ja-JP", { hour:"2-digit", minute:"2-digit" }).format(d); }
function updateClock(){ const t=$("#timeLabel"); if(t) t.textContent = formatTimeLabel(); }
function getTimeSlot(){ const h = new Date().getHours(); if(h>=5&&h<11)return "morning"; if(h>=11&&h<18)return "day"; if(h>=18&&h<23)return "evening"; if(h>=23)return "night"; return "late"; }
function currentCharacter(){ return characters[settings.characterId] || characters.haruka; }
function currentBackground(){ return backgrounds[settings.backgroundId] || backgrounds.sharehouse; }
function randomFrom(arr){ return arr[Math.floor(Math.random()*arr.length)] || ""; }
function characterLine(chara, key){ return randomFrom((chara.lines && chara.lines[key]) || chara.lines.day || []); }
function homeTapLine(){
  const chara = currentCharacter();
  const bg = currentBackground();
  const pool = [...(homeTapLines[chara.id] || []), ...(chara.lines?.[getTimeSlot()] || []), ...(chara.lines?.day || [])].filter(Boolean);
  let line = randomFrom(pool);
  const current = $("#speechText")?.textContent || "";
  for(let i = 0; i < 6 && current.startsWith(line); i++) line = randomFrom(pool);
  return `${line} ${moodLineSuffix(bg)}`;
}
function setSpeech(line){
  const text = $("#speechText");
  const card = $(".speech-card");
  if(!text) return;
  text.textContent = line;
  if(card){ card.classList.remove("tap-bump"); void card.offsetWidth; card.classList.add("tap-bump"); }
}
function escapeHTML(v){ return String(v ?? "").replace(/[&<>"]/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;"}[c])); }

function moodLineSuffix(bg){
  switch(bg.mood){
    case "haruka": return "……僕の部屋にいる時くらい、ちゃんと甘えて。";
    case "akane": return "ここなら火ぃ入れておくから、冷える前にこっち来い。";
    case "masumi": return "ここなら、沈黙ごと綺麗に残せる。";
    case "hin": return "唔急，慢慢講。ここでは急がなくていい。";
    case "minaho": return "南帆の部屋だから、何も飾らなくていい。今のままでいいよ。";
    case "shiniki": return "……願いの柱の前だから、今日の小さな声もちゃんと届く。";
    case "sougetsukan": return "蒼月館では隠さなくていい。君はもう、迎えられる側の人だよ。";
    case "shrine": return "氷焔結護神社に来たなら、今日の縁も守っておこう。";
    default: return "シェアハウスにいるから、ひとりで抱えなくていい。";
  }
}

function setBackgroundImage(bg){
  const img = $("#backgroundImage");
  const layer = $("#backgroundLayer");
  const src = assetUrl(bg.image);
  document.body.dataset.room = bg.id;
  if(layer) layer.style.backgroundImage = `url("${src}")`;
  if(img){ img.onerror = () => showToast(`背景画像を読めなかった：${bg.name}`); img.src = src; img.alt = bg.name; }
}
function preloadBackgrounds(){ Object.values(backgrounds).forEach(bg => { const im = new Image(); im.src = assetUrl(bg.image); }); }
function applyTheme(){ document.body.classList.remove("theme-blood","theme-snow","theme-night"); if(settings.theme !== "lavender") document.body.classList.add(`theme-${settings.theme}`); }
function applyCharacterScale(){ document.documentElement.style.setProperty("--character-scale", String(settings.characterScale / 100)); }
function weatherCodeText(code){
  const c = Number(code);
  if([0].includes(c)) return "快晴";
  if([1,2].includes(c)) return "晴れ時々くもり";
  if([3].includes(c)) return "くもり";
  if([45,48].includes(c)) return "霧";
  if([51,53,55,56,57].includes(c)) return "霧雨";
  if([61,63,65,66,67,80,81,82].includes(c)) return "雨";
  if([71,73,75,77,85,86].includes(c)) return "雪";
  if([95,96,99].includes(c)) return "雷雨";
  return "天気";
}
function weatherCodeIcon(code, fallbackText=""){
  const c = Number(code);
  if([0,1].includes(c)) return "☀︎";
  if([2,3,45,48].includes(c)) return "☁︎";
  if([51,53,55,56,57,61,63,65,66,67,80,81,82].includes(c)) return "☔︎";
  if([71,73,75,77,85,86].includes(c)) return "❄︎";
  if([95,96,99].includes(c)) return "⚡︎";
  const w = fallbackText || "";
  return w.includes("雨") ? "☔︎" : w.includes("晴") ? "☀︎" : w.includes("雪") ? "❄︎" : "☁︎";
}

function weatherEmoji(code, fallbackText=""){
  const c = Number(code);
  if([0,1].includes(c)) return "☀️";
  if([2,3,45,48].includes(c)) return "☁️";
  if([51,53,55,56,57,61,63,65,66,67,80,81,82].includes(c)) return "☔️";
  if([71,73,75,77,85,86].includes(c)) return "❄️";
  if([95,96,99].includes(c)) return "⚡️";
  const w = fallbackText || "";
  return w.includes("雨") ? "☔️" : w.includes("晴") ? "☀️" : w.includes("雪") ? "❄️" : "☁️";
}
function weatherMiniText(){
  const hasWeather = settings.weather || settings.temperature || settings.rain;
  if(!hasWeather) return "";
  const temp = settings.temperature || "--℃";
  const rain = settings.rain || "--%";
  return `${weatherEmoji(settings.weatherCode, settings.weather)} ${temp}/${rain}`;
}
function renderWeatherMini(){
  const el = $("#weatherMini");
  if(!el) return;
  const text = weatherMiniText();
  el.textContent = text;
  el.title = text ? `${settings.weatherLocationName || settings.weatherCity || "天気"}：${settings.weather || ""}` : "";
  el.hidden = !text;
}
function formatWeatherUpdatedAt(value){
  if(!value) return "";
  const d = new Date(value);
  if(Number.isNaN(d.getTime())) return "";
  return new Intl.DateTimeFormat("ja-JP", { hour:"2-digit", minute:"2-digit" }).format(d);
}
function renderWeather(){
  renderWeatherMini();
  const summaryEl = $("#weatherSummary");
  const noteEl = $("#weatherNote");
  const iconEl = $("#weatherIcon");
  if(!summaryEl || !noteEl || !iconEl) return;
  const parts = [settings.weather, settings.temperature, settings.rain ? `降水 ${settings.rain}` : ""].filter(Boolean);
  summaryEl.textContent = parts.length ? parts.join(" / ") : "天気メモ未設定";
  const updated = formatWeatherUpdatedAt(settings.weatherUpdatedAt);
  const baseNote = settings.weatherMemo || (settings.weatherCity ? `${settings.weatherCity}の天気を取得できるよ` : "設定から都市を入れられるよ");
  noteEl.textContent = updated ? `${baseNote} / ${updated}更新` : baseNote;
  iconEl.textContent = weatherCodeIcon(settings.weatherCode, settings.weather);
}
function weatherSpeechLine(){
  const chara = currentCharacter();
  const city = settings.weatherLocationName || settings.weatherCity || "ここ";
  const weather = settings.weather || "天気未取得";
  const temp = settings.temperature ? `、気温は${settings.temperature}` : "";
  const rain = settings.rain ? `、降水確率は${settings.rain}` : "";
  if(!settings.weather && !settings.temperature && !settings.rain){
    const empty = {
      haruka: `天気はまだ取れてないみたい。設定で都市を入れたら、僕がここで読んであげる。`,
      akane: `天気まだ入ってねぇな。都市だけ入れときゃ、俺が見とく。`,
      masumi: `天気はまだ空白だね。……でも、空白も埋められる。設定で都市を入れて。`,
      hin: `天氣未拎到呀。設定入城市名，老師幫你睇。`
    };
    return empty[chara.id] || empty.haruka;
  }
  const lines = {
    haruka: `${city}は${weather}${temp}${rain}。外に出るなら、今の君の体調も一緒に見てからにしよう。`,
    akane: `${city}は${weather}${temp}${rain}。出るなら、暑さ寒さだけ見誤んなよ、姫。`,
    masumi: `${city}は${weather}${temp}${rain}。今日の空模様も、君の記録に混ぜておこう。`,
    hin: `${city}而家係${weather}${temp}${rain}。出門可以，但唔好同自己硬碰硬呀。`
  };
  return lines[chara.id] || lines.haruka;
}
async function updateWeatherFromCity(showMessage=true){
  const city = (settings.weatherCity || "").trim();
  if(!city){
    if(showMessage) showToast("設定で都市名を入れてね");
    return;
  }
  try{
    if(showMessage) showToast(`${city}の天気を取りに行くね`);
    const geoUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=ja&format=json`;
    const geoRes = await fetch(geoUrl);
    if(!geoRes.ok) throw new Error("geocoding failed");
    const geo = await geoRes.json();
    const place = geo.results?.[0];
    if(!place) throw new Error("location not found");
    const lat = place.latitude;
    const lon = place.longitude;
    const forecastUrl = `https://api.open-meteo.com/v1/forecast?latitude=${encodeURIComponent(lat)}&longitude=${encodeURIComponent(lon)}&current=temperature_2m,weather_code,is_day,precipitation&daily=temperature_2m_max,temperature_2m_min,precipitation_probability_max&timezone=auto&forecast_days=1`;
    const forecastRes = await fetch(forecastUrl);
    if(!forecastRes.ok) throw new Error("forecast failed");
    const data = await forecastRes.json();
    const temp = data.current?.temperature_2m;
    const code = data.current?.weather_code;
    const rainProb = data.daily?.precipitation_probability_max?.[0];
    const maxTemp = data.daily?.temperature_2m_max?.[0];
    const minTemp = data.daily?.temperature_2m_min?.[0];
    const placeName = [place.name, place.admin1].filter(Boolean).join(" / ");
    settings.weatherCity = city;
    settings.weatherLocationName = placeName || city;
    settings.weatherCode = Number.isFinite(Number(code)) ? Number(code) : null;
    settings.weather = weatherCodeText(code);
    settings.temperature = Number.isFinite(Number(temp)) ? `${Math.round(Number(temp))}℃` : "";
    settings.rain = Number.isFinite(Number(rainProb)) ? `${Math.round(Number(rainProb))}%` : "";
    const hiLo = [Number.isFinite(Number(maxTemp)) ? `最高${Math.round(Number(maxTemp))}℃` : "", Number.isFinite(Number(minTemp)) ? `最低${Math.round(Number(minTemp))}℃` : ""].filter(Boolean).join(" / ");
    settings.weatherMemo = `${placeName || city}${hiLo ? ` / ${hiLo}` : ""}`;
    settings.weatherUpdatedAt = new Date().toISOString();
    saveSettings();
    renderWeather();
    loadSettingsForm();
    if(showMessage){
      setSpeech(`${placeName || city}の天気、取ってきたよ。${settings.weather}${settings.temperature ? `、今は${settings.temperature}` : ""}。`);
      showToast("天気を更新したよ");
    }
  }catch(e){
    console.error(e);
    if(showMessage) showToast("天気を取れなかったかも。都市名を変えてみて");
  }
}
function maybeRefreshWeather(){
  if(!settings.weatherCity) return;
  const last = settings.weatherUpdatedAt ? new Date(settings.weatherUpdatedAt).getTime() : 0;
  if(!last || Date.now() - last > 1000 * 60 * 60){
    updateWeatherFromCity(false);
  }
}
function renderHome(extraLine = ""){
  const chara = currentCharacter(); const bg = currentBackground();
  document.body.dataset.character = chara.id;
  $("#todayLabel").textContent = formatDateLabel();
  updateClock();
  setBackgroundImage(bg); applyTheme(); applyCharacterScale(); renderWeather();
  $("#characterImage").src = assetUrl(chara.image);
  $("#speakerName").textContent = chara.name;
  $("#roomName").textContent = bg.name;
  const base = characterLine(chara, getTimeSlot());
  setSpeech(extraLine || `${base} ${moodLineSuffix(bg)}`);
  const roomDebug = $("#roomDebug"); if(roomDebug) roomDebug.textContent = `現在：${bg.name} / ${bg.id}`;
  updateTimerSong();
}

function showToast(message){ const t=$("#toast"); t.textContent=message; t.classList.add("show"); clearTimeout(showToast.timer); showToast.timer=setTimeout(()=>t.classList.remove("show"),2200); }

async function openDB(){
  return new Promise((resolve,reject)=>{
    const req = indexedDB.open(DB_NAME, 1);
    req.onupgradeneeded = () => {
      const d = req.result;
      if(!d.objectStoreNames.contains("healthLogs")) d.createObjectStore("healthLogs", { keyPath:"date" });
      if(!d.objectStoreNames.contains("moodLogs")) d.createObjectStore("moodLogs", { keyPath:"date" });
      if(!d.objectStoreNames.contains("schedules")) d.createObjectStore("schedules", { keyPath:"id" });
      if(!d.objectStoreNames.contains("diaries")) d.createObjectStore("diaries", { keyPath:"date" });
    };
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}
function store(name, mode="readonly"){ return db.transaction(name, mode).objectStore(name); }
function idbGet(name, key){ return new Promise((res,rej)=>{ const r=store(name).get(key); r.onsuccess=()=>res(r.result); r.onerror=()=>rej(r.error); }); }
function idbGetAll(name){ return new Promise((res,rej)=>{ const r=store(name).getAll(); r.onsuccess=()=>res(r.result || []); r.onerror=()=>rej(r.error); }); }
function idbPut(name, value){ return new Promise((res,rej)=>{ const r=store(name,"readwrite").put(value); r.onsuccess=()=>res(value); r.onerror=()=>rej(r.error); }); }
function idbClear(name){ return new Promise((res,rej)=>{ const r=store(name,"readwrite").clear(); r.onsuccess=()=>res(); r.onerror=()=>rej(r.error); }); }

function openPanel(id){
  const panel = document.getElementById(id); if(!panel) return;
  if(id === "healthPanel") { loadTodayHealth(); renderHealthMiniList(); }
  if(id === "moodPanel") { loadTodayMood(); renderMoodMiniList(); updateSupportPrompt(); }
  if(id === "schedulePanel") renderSchedules();
  if(id === "diaryPanel") { loadTodayDiary(); renderDiaries(); }
  if(id === "logsPanel") { renderLogsPanel(); }
  if(id === "settingsPanel") { renderPickers(); loadSettingsForm(); renderHome(characterLine(currentCharacter(), "settings")); }
  panel.classList.add("active"); panel.setAttribute("aria-hidden", "false");
}
function closePanels(){ $$(".panel").forEach(p=>{ p.classList.remove("active"); p.setAttribute("aria-hidden","true"); }); }

function syncRangeLabels(root=document){ root.querySelectorAll('input[type="range"]').forEach(input => { const el = root.querySelector(`.range-value[data-for="${input.name}"]`); if(el) el.textContent = input.value; }); }
function setChecks(name, values){ const set = new Set(values || []); $$(`input[name="${name}"]`).forEach(i => i.checked = set.has(i.value)); }
function getChecks(form, name){ return new FormData(form).getAll(name); }

async function loadTodayHealth(){
  const form=$("#healthForm"); form.date.value=todayISO();
  const log=await idbGet("healthLogs", form.date.value);
  if(!log){ form.reset(); form.date.value=todayISO(); syncRangeLabels(form); return; }
  ["date","sleepHours","temperature","appetite","medicine","period","headache","stomachache","periodPain","fatigue","memo"].forEach(k=>{ if(form.elements[k]) form.elements[k].value = log[k] ?? (k==="date"?todayISO():""); });
  setChecks("symptoms", log.symptoms); syncRangeLabels(form);
}
function collectHealth(){
  const f=$("#healthForm"); const data=new FormData(f);
  return { date:data.get("date"), updatedAt:new Date().toISOString(), sleepHours:data.get("sleepHours")?Number(data.get("sleepHours")):null, temperature:data.get("temperature")?Number(data.get("temperature")):null, appetite:data.get("appetite"), medicine:data.get("medicine"), period:data.get("period"), headache:Number(data.get("headache")), stomachache:Number(data.get("stomachache")), periodPain:Number(data.get("periodPain")), fatigue:Number(data.get("fatigue")), symptoms:data.getAll("symptoms"), memo:data.get("memo")||"" };
}
async function saveHealth(event){ event.preventDefault(); const log=collectHealth(); await idbPut("healthLogs", log); renderHome(characterLine(currentCharacter(), "savedHealth")); await renderHealthMiniList(); if($("#logsPanel")?.classList.contains("active")) await renderLogsPanel(); showToast("体調を保存したよ"); }
function healthSummary(log){ const a=[]; if(log.sleepHours!=null)a.push(`睡眠${log.sleepHours}h`); if(log.temperature!=null)a.push(`${log.temperature}℃`); if(log.headache)a.push(`頭痛${log.headache}`); if(log.stomachache)a.push(`腹痛${log.stomachache}`); if(log.periodPain)a.push(`生理痛${log.periodPain}`); if(log.fatigue)a.push(`だるさ${log.fatigue}`); if(log.symptoms?.length)a.push(log.symptoms.join("・")); if(log.memo)a.push(`メモ:${log.memo}`); return a.join(" / ") || "記録あり"; }
async function renderHealthMiniList(){ const list=$("#healthMiniList"); if(!list)return; const logs=(await idbGetAll("healthLogs")).sort((a,b)=>b.date.localeCompare(a.date)).slice(0,4); list.innerHTML = logs.length ? logs.map(l=>`<article class="log-item"><time>${l.date}</time><p>${escapeHTML(healthSummary(l))}</p></article>`).join("") : `<p class="hint">まだ体調ログがないよ。</p>`; }

async function loadTodayMood(){
  const form=$("#moodForm"); form.date.value=todayISO();
  const log=await idbGet("moodLogs", form.date.value);
  if(!log){ form.reset(); form.date.value=todayISO(); syncRangeLabels(form); updateSupportPrompt(); return; }
  ["date","moodLabel","energy","anxiety","reasonMemo","memo"].forEach(k=>{ if(form.elements[k]) form.elements[k].value = log[k] ?? (k==="date"?todayISO():""); });
  setChecks("moodTags", log.moodTags);
  setChecks("reasonTags", log.reasonTags);
  syncRangeLabels(form); updateSupportPrompt();
}
function collectMood(){ const f=$("#moodForm"); const data=new FormData(f); return { date:data.get("date"), updatedAt:new Date().toISOString(), moodLabel:data.get("moodLabel"), energy:Number(data.get("energy")), anxiety:Number(data.get("anxiety")), moodTags:data.getAll("moodTags"), reasonTags:data.getAll("reasonTags"), reasonMemo:data.get("reasonMemo")||"", memo:data.get("memo")||"" }; }
async function saveMood(event){ event.preventDefault(); const log=collectMood(); await idbPut("moodLogs", log); renderHome(characterLine(currentCharacter(), log.moodTags.some(t=>["ガチしんどい","甘やかして","泣きそう","動けない","頭が回らない"].includes(t)) || ["しょんぼり","イライラ","不安","泣きそう","無"].includes(log.moodLabel) ? "tired" : "savedMood")); await renderMoodMiniList(); if($("#logsPanel")?.classList.contains("active")) await renderLogsPanel(); updateSupportPrompt(); showToast("気分を保存したよ"); }
function moodSummary(log){ const a=[log.moodLabel, `気力${log.energy}/5`, log.anxiety?`不安${log.anxiety}/5`:""].filter(Boolean); if(log.moodTags?.length)a.push(log.moodTags.join("・")); if(log.reasonTags?.length)a.push(`原因:${log.reasonTags.join("・")}`); if(log.reasonMemo)a.push(`きっかけ:${log.reasonMemo}`); if(log.memo)a.push(`メモ:${log.memo}`); return a.join(" / "); }
async function renderMoodMiniList(){ const list=$("#moodMiniList"); if(!list)return; const logs=(await idbGetAll("moodLogs")).sort((a,b)=>b.date.localeCompare(a.date)).slice(0,4); list.innerHTML = logs.length ? logs.map(l=>`<article class="log-item"><time>${l.date}</time><p>${escapeHTML(moodSummary(l))}</p></article>`).join("") : `<p class="hint">まだ気分ログがないよ。</p>`; }
function updateSupportPrompt(){
  const log = collectMood(); const chara=currentCharacter();
  const tags = log.moodTags.length ? log.moodTags.join("、") : "まだ選べてない";
  const reasons = log.reasonTags.length ? log.reasonTags.join("、") : "まだ選べてない";
  const isTired = ["しょんぼり","イライラ","不安","泣きそう","無"].includes(log.moodLabel) || log.moodTags.some(t=>["ガチしんどい","不安","泣きそう","動けない","頭が回らない"].includes(t));
  const opening = isTired ? `${chara.call}、今しんどい。` : `${chara.call}、今の気分を聞いて。`;
  const request = isTired ? "今は正論じゃなくて、まず甘やかしてほしい。必要なら、今できる小さい行動を一つだけ一緒に選んで。" : "この楽しい・嬉しい感じを一緒に味わってほしい。理由も拾って、少し褒めて。";
  const prompt = `${opening}
・気分：${log.moodLabel || "未入力"}
・近い状態：${tags}
・原因・きっかけ：${reasons}
・気力：${log.energy || 3}/5
・不安：${log.anxiety || 0}/5
・時刻：${new Date().toLocaleTimeString("ja-JP", {hour:"2-digit", minute:"2-digit"})}
${log.reasonMemo ? `・きっかけメモ：${log.reasonMemo}
` : ""}${log.memo ? `・メモ：${log.memo}
` : ""}${request}`;
  $("#supportPrompt").value = prompt;
}
async function copySupportPrompt(){ updateSupportPrompt(); try { await navigator.clipboard.writeText($("#supportPrompt").value); showToast("文章をコピーしたよ"); renderHome(characterLine(currentCharacter(), "tired")); } catch { showToast("コピーに失敗したかも。長押しでコピーしてね"); } }

async function saveSchedule(event){ event.preventDefault(); const f=event.currentTarget; const d=new FormData(f); const item={ id:crypto.randomUUID(), date:d.get("date"), time:d.get("time")||"", category:d.get("category"), title:d.get("title"), memo:d.get("memo")||"", createdAt:new Date().toISOString() }; await idbPut("schedules", item); f.reset(); f.date.value=todayISO(); await renderSchedules(); renderHome(characterLine(currentCharacter(), "schedule")); showToast("予定を保存したよ"); }
async function renderSchedules(){ const list=$("#scheduleList"); const items=(await idbGetAll("schedules")).sort((a,b)=>`${a.date}${a.time}`.localeCompare(`${b.date}${b.time}`)).slice(0,8); list.innerHTML = items.length ? items.map(s=>`<article class="schedule-item"><time>${s.date} ${s.time||""}</time><p><strong>${escapeHTML(s.category)}</strong>：${escapeHTML(s.title)}${s.memo?`<br>${escapeHTML(s.memo)}`:""}</p></article>`).join("") : `<p class="hint">予定はまだないよ。</p>`; }

async function loadTodayDiary(){ const f=$("#diaryForm"); f.date.value=todayISO(); const d=await idbGet("diaries", f.date.value); if(!d){ f.reset(); f.date.value=todayISO(); return; } f.title.value=d.title||""; f.body.value=d.body||""; f.tags.value=(d.tags||[]).join(","); }
async function saveDiary(event){ event.preventDefault(); const f=event.currentTarget; const d=new FormData(f); const item={ date:d.get("date"), title:d.get("title")||"", body:d.get("body")||"", tags:String(d.get("tags")||"").split(",").map(s=>s.trim()).filter(Boolean), updatedAt:new Date().toISOString() }; await idbPut("diaries", item); await renderDiaries(); renderHome(characterLine(currentCharacter(), "diary")); showToast("日記を保存したよ"); }
async function renderDiaries(){ const list=$("#diaryList"); const items=(await idbGetAll("diaries")).sort((a,b)=>b.date.localeCompare(a.date)).slice(0,8); list.innerHTML = items.length ? items.map(d=>`<article class="log-item"><time>${d.date}</time><p><strong>${escapeHTML(d.title || "無題")}</strong>${d.tags?.length?` <small>${escapeHTML(d.tags.join(" / "))}</small>`:""}<br>${escapeHTML((d.body||"").slice(0,120))}${(d.body||"").length>120?"…":""}</p></article>`).join("") : `<p class="hint">まだ日記がないよ。</p>`; }

function selectedTimerCharacterId(){ const val=$("#timerForm").timerCharacter.value; return val === "current" ? settings.characterId : val; }
function playableUrl(url){
  if(!url) return "";
  return url.startsWith("assets/") ? assetUrl(url) : url;
}
function currentTimerSong(){
  const id = $("#timerForm") ? selectedTimerCharacterId() : settings.characterId;
  return { id, song: settings.songs?.[id] || {}, chara: characters[id] || currentCharacter() };
}
function updateTimerSong(){
  const { song, chara } = currentTimerSong();
  const title = song.title || `${chara.name}のキャラソン未設定`;
  const url = playableUrl(song.url);
  const note = song.url ? "アプリ内で再生できるよ。ローカル確認中は少し読み込み時間があるかも。" : "設定で曲を選べるよ";
  const titleEl=$("#songTitle"); if(titleEl) titleEl.textContent=title;
  const noteEl=$("#songNote"); if(noteEl) noteEl.textContent=note;
  const audio=$("#songPlayer");
  if(audio){
    if(url && audio.dataset.src !== url){ audio.src=url; audio.dataset.src=url; }
    if(!url){ audio.removeAttribute("src"); audio.dataset.src=""; }
  }
}
async function playSong(silent=false){
  updateTimerSong();
  const audio=$("#songPlayer");
  const { song } = currentTimerSong();
  if(!audio || !song.url){ if(!silent) showToast("曲が未設定だよ"); return; }
  try{ await audio.play(); if(!silent) showToast("BGMを再生したよ"); }
  catch(e){ if(!silent) showToast("再生できなかったかも。プレイヤーの▶を押してみて"); }
}
function pauseSong(){ const audio=$("#songPlayer"); if(audio && !audio.paused) audio.pause(); }
function updateTimerDisplay(){ const m=String(Math.floor(timer.remaining/60)).padStart(2,"0"); const s=String(timer.remaining%60).padStart(2,"0"); $("#timerTime").textContent=`${m}:${s}`; $("#timerStatus").textContent = timer.running ? "作業中" : "待機中"; updateTimerSong(); }
function startTimer(){ const form=$("#timerForm"); const minutes=Number(form.minutes.value || 25); timer.total=minutes*60; if(!timer.running && timer.remaining === timer.total){} else if(!timer.running && timer.remaining <= 0) timer.remaining=timer.total; if(timer.remaining === 25*60 && minutes !== 25) timer.remaining=timer.total; timer.characterId=selectedTimerCharacterId(); timer.task=form.task.value||""; clearInterval(timer.interval); timer.running=true; updateTimerDisplay(); renderHome(characterLine(characters[timer.characterId] || currentCharacter(), "timerStart")); if($("#timerAutoBgm")?.checked) playSong(true); timer.interval=setInterval(()=>{ timer.remaining -= 1; if(timer.remaining <= 0){ timer.remaining=0; clearInterval(timer.interval); timer.running=false; updateTimerDisplay(); pauseSong(); renderHome(characterLine(characters[timer.characterId] || currentCharacter(), "timerDone")); showToast("タイマー終了。おつかれさま"); return; } updateTimerDisplay(); }, 1000); }
function pauseTimer(){ timer.running=false; clearInterval(timer.interval); updateTimerDisplay(); showToast("タイマーを止めたよ"); }
function resetTimer(){ clearInterval(timer.interval); pauseSong(); const minutes=Number($("#timerForm").minutes.value || 25); timer={...timer, total:minutes*60, remaining:minutes*60, running:false}; updateTimerDisplay(); }
function openSong(){ const audio=$("#songPlayer"); if(audio && !audio.paused) { pauseSong(); showToast("BGMを止めたよ"); } else { playSong(); } }

function renderSongPresetSelects(){
  $$('[data-song-preset]').forEach(sel => {
    const charId = sel.dataset.songPreset;
    const currentUrl = settings.songs?.[charId]?.url || "";
    sel.innerHTML = songLibrary.map(song => `<option value="${escapeHTML(song.id)}" ${song.url === currentUrl ? "selected" : ""}>${escapeHTML(song.title)}</option>`).join("");
  });
}
function applySongPreset(charId, songId){
  const song = songLibrary.find(s => s.id === songId) || songLibrary[0];
  const form = $("#settingsForm");
  if(!form) return;
  form[`songTitle_${charId}`].value = song.title === "未設定" ? "" : song.title;
  form[`songUrl_${charId}`].value = song.url || "";
}


function lastNDays(n=14){
  const out=[];
  const base = new Date();
  base.setHours(0,0,0,0);
  for(let i=n-1;i>=0;i--){
    const d = new Date(base);
    d.setDate(base.getDate()-i);
    const tz = d.getTimezoneOffset()*60000;
    out.push(new Date(d - tz).toISOString().slice(0,10));
  }
  return out;
}
function renderLineChart(days, series, {min=0, max=5}={}){
  const w=320, h=168, left=24, right=12, top=14, bottom=28;
  const cw=w-left-right, ch=h-top-bottom;
  const x=(i)=> left + (days.length<=1?0:(i/(days.length-1))*cw);
  const y=(v)=> top + ((max - Number(v)) / (max-min)) * ch;
  const grid=[0,1,2,3,4,5].map(v=>`<line class="chart-grid" x1="${left}" x2="${w-right}" y1="${y(v)}" y2="${y(v)}"/>`).join("");
  const labels = days.filter((_,i)=> i===0 || i===days.length-1 || i%3===0).map((d,iAll)=>{
    const idx = days.indexOf(d);
    const date = new Date(d+"T00:00:00");
    const lab = `${date.getMonth()+1}/${date.getDate()}`;
    return `<text class="chart-label" x="${x(idx)}" y="${h-8}" text-anchor="middle">${lab}</text>`;
  }).join("");
  const lines = series.map(s=>{
    const pts = s.values.map((v,i)=> Number.isFinite(Number(v)) ? `${x(i)},${y(v)}` : null).filter(Boolean).join(" ");
    const dots = s.values.map((v,i)=> Number.isFinite(Number(v)) ? `<circle class="chart-dot ${s.cls}" cx="${x(i)}" cy="${y(v)}" r="3.2"/>` : "").join("");
    return pts ? `<polyline class="chart-line ${s.cls}" points="${pts}"/>${dots}` : "";
  }).join("");
  return `<svg class="chart-svg" viewBox="0 0 ${w} ${h}" role="img" aria-label="ロググラフ">${grid}<line class="chart-axis" x1="${left}" x2="${w-right}" y1="${y(min)}" y2="${y(min)}"/><text class="chart-scale" x="${w-8}" y="${y(max)+4}" text-anchor="end">5</text><text class="chart-scale" x="${w-8}" y="${y(min)-4}" text-anchor="end">0</text>${labels}${lines}</svg>`;
}
async function renderLogsPanel(){
  const days = lastNDays(14);
  const moodLogs = await idbGetAll("moodLogs");
  const healthLogs = await idbGetAll("healthLogs");
  const moodMap = Object.fromEntries(moodLogs.map(l=>[l.date,l]));
  const healthMap = Object.fromEntries(healthLogs.map(l=>[l.date,l]));
  const moodChart = $("#moodChart");
  const healthChart = $("#healthChart");
  if(moodChart){
    moodChart.innerHTML = renderLineChart(days, [
      { cls:"energy", values: days.map(d=>moodMap[d]?.energy) },
      { cls:"anxiety", values: days.map(d=>moodMap[d]?.anxiety) }
    ]);
  }
  if(healthChart){
    healthChart.innerHTML = renderLineChart(days, [
      { cls:"fatigue", values: days.map(d=>healthMap[d]?.fatigue) },
      { cls:"headache", values: days.map(d=>healthMap[d]?.headache) },
      { cls:"stomach", values: days.map(d=>healthMap[d]?.stomachache) },
      { cls:"period", values: days.map(d=>healthMap[d]?.periodPain) }
    ]);
  }
  const mCount = moodLogs.filter(l=>days.includes(l.date)).length;
  const hCount = healthLogs.filter(l=>days.includes(l.date)).length;
  const mc=$("#moodChartCount"); if(mc) mc.textContent=`${mCount}件`;
  const hc=$("#healthChartCount"); if(hc) hc.textContent=`${hCount}件`;
  const counts = new Map();
  moodLogs.filter(l=>days.includes(l.date)).flatMap(l=>l.reasonTags||[]).forEach(t=>counts.set(t,(counts.get(t)||0)+1));
  const reason = [...counts.entries()].sort((a,b)=>b[1]-a[1]).slice(0,12);
  const box=$("#reasonSummary");
  if(box){ box.innerHTML = reason.length ? reason.map(([tag,count])=>`<span class="tag-badge">${escapeHTML(tag)} <b>${count}</b></span>`).join("") : `<p class="hint">まだ原因・きっかけの記録がないよ。</p>`; }
}

function renderPickers(){
  const cp=$("#characterPicker"); if(cp){ cp.innerHTML=""; Object.values(characters).forEach(ch=>{ const b=document.createElement("button"); b.className=`picker-card ${settings.characterId===ch.id?"selected":""}`; b.style.backgroundImage=`linear-gradient(135deg, rgba(0,0,0,.52), rgba(0,0,0,.10)), url("${assetUrl(ch.image)}")`; b.innerHTML=`<span>${ch.name}</span><small>${ch.title}</small>`; b.onclick=()=>{ settings.characterId=ch.id; saveSettings(); renderHome(); renderPickers(); showToast(`${ch.name}に切り替えたよ`); }; cp.appendChild(b); }); }
  const bp=$("#backgroundPicker"); if(bp){ bp.innerHTML=""; Object.values(backgrounds).forEach(bg=>{ const b=document.createElement("button"); b.className=`picker-card room-card ${settings.backgroundId===bg.id?"selected":""}`; b.style.backgroundImage=`linear-gradient(135deg, rgba(0,0,0,.46), rgba(0,0,0,.16)), url("${assetUrl(bg.image)}")`; b.innerHTML=`<span>${bg.name}</span><small>${bg.id}</small>`; b.onclick=()=>{ settings.backgroundId=bg.id; saveSettings(); renderHome(`${bg.name}に移動したよ。`); renderPickers(); showToast(`${bg.name}に切り替えたよ`); }; bp.appendChild(b); }); }
}
function loadSettingsForm(){
  const f=$("#settingsForm");
  f.theme.value=settings.theme;
  f.characterScale.value=settings.characterScale;
  $("#scaleValue").textContent=`${settings.characterScale}%`;
  if(f.weatherCity) f.weatherCity.value=settings.weatherCity || "";
  f.weather.value=settings.weather;
  f.temperature.value=settings.temperature;
  f.rain.value=settings.rain;
  f.weatherMemo.value=settings.weatherMemo;
}
function saveSettingsForm(event){
  event.preventDefault();
  const f=event.currentTarget;
  settings.theme=f.theme.value;
  settings.characterScale=Number(f.characterScale.value);
  settings.weatherCity=(f.weatherCity?.value || "").trim();
  settings.weather=f.weather.value.trim();
  settings.temperature=f.temperature.value.trim();
  settings.rain=f.rain.value.trim();
  settings.weatherMemo=f.weatherMemo.value.trim();
  saveSettings();
  renderHome();
  showToast("設定を保存したよ");
}

async function exportData(){ const payload={ exportedAt:new Date().toISOString(), settings, healthLogs:await idbGetAll("healthLogs"), moodLogs:await idbGetAll("moodLogs"), schedules:await idbGetAll("schedules"), diaries:await idbGetAll("diaries") }; const blob=new Blob([JSON.stringify(payload,null,2)], {type:"application/json"}); const url=URL.createObjectURL(blob); const a=document.createElement("a"); a.href=url; a.download=`infinity-care-backup-${todayISO()}.json`; a.click(); URL.revokeObjectURL(url); }
async function importData(event){ const file=event.target.files?.[0]; if(!file)return; try{ const p=JSON.parse(await file.text()); if(p.settings){ settings=mergeSettings(defaultSettings,p.settings); saveSettings(); } for(const [key,storeName] of [["healthLogs","healthLogs"],["moodLogs","moodLogs"],["schedules","schedules"],["diaries","diaries"]]){ if(Array.isArray(p[key])){ await idbClear(storeName); for(const item of p[key]) await idbPut(storeName,item); } } renderHome(); renderPickers(); loadSettingsForm(); showToast("バックアップを読み込んだよ"); }catch(e){ console.error(e); showToast("読み込みに失敗したかも"); } }

function setActiveNav(panelId){ $$(".bottom-nav button[data-panel]").forEach(btn=>btn.classList.toggle("active", btn.dataset.panel===panelId)); }

async function clearPrototypeCaches(){ if("serviceWorker" in navigator){ try{ const regs=await navigator.serviceWorker.getRegistrations(); await Promise.all(regs.map(r=>r.unregister())); }catch{} } if("caches" in window){ try{ const keys=await caches.keys(); await Promise.all(keys.filter(k=>k.startsWith("infinity-care")).map(k=>caches.delete(k))); }catch{} } }
function bindEvents(){
  $$(".bottom-nav button[data-panel]").forEach(b=>b.addEventListener("click",()=>{ setActiveNav(b.dataset.panel); setSpeech(weatherSpeechLine()); openPanel(b.dataset.panel); }));
  $("#openSettings").addEventListener("click",()=>openPanel("settingsPanel"));
  $(".home-stage").addEventListener("click", (e)=>{ if(e.target.closest(".character, .speech-card")) setSpeech(homeTapLine()); });
  $$(".close-panel").forEach(b=>b.addEventListener("click", closePanels));
  $$(".panel").forEach(p=>p.addEventListener("click", e=>{ if(e.target===p) closePanels(); }));
  $("#healthForm").addEventListener("submit", saveHealth);
  $("#moodForm").addEventListener("submit", saveMood);
  $("#scheduleForm").addEventListener("submit", saveSchedule);
  $("#diaryForm").addEventListener("submit", saveDiary);
  $("#settingsForm").addEventListener("submit", saveSettingsForm);
  $("#fetchWeather")?.addEventListener("click", ()=>updateWeatherFromCity(true));
  $("#weatherCard")?.addEventListener("click", ()=>updateWeatherFromCity(true));
  $("#settingsForm").characterScale.addEventListener("input", e=>{ $("#scaleValue").textContent=`${e.target.value}%`; settings.characterScale=Number(e.target.value); applyCharacterScale(); });
  $("#exportData").addEventListener("click", exportData); $("#importData").addEventListener("change", importData);
  $$("input[type='range']").forEach(i=>i.addEventListener("input",()=>syncRangeLabels(document)));
  $("#moodForm").addEventListener("input", updateSupportPrompt); $("#makeMoodPrompt").addEventListener("click", updateSupportPrompt);
  $("#copySupportPrompt").addEventListener("click", copySupportPrompt);
  $("#openChatGPT").addEventListener("click", async()=>{ await copySupportPrompt(); window.open("https://chatgpt.com/", "_blank", "noopener"); });
  $("#scheduleForm").date.value=todayISO(); $("#healthForm").date.value=todayISO(); $("#moodForm").date.value=todayISO(); $("#diaryForm").date.value=todayISO();
}

async function init(){ await clearPrototypeCaches(); db=await openDB(); bindEvents(); preloadBackgrounds(); renderHome(); renderPickers(); loadSettingsForm(); syncRangeLabels(document); setActiveNav("moodPanel"); await renderSchedules(); maybeRefreshWeather(); setInterval(updateClock, 30 * 1000); }
init().catch(e=>{ console.error(e); showToast("初期化に失敗したかも"); });
