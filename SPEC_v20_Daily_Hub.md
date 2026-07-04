# v20.1追加

- スマホUIを見やすくするため、スマホ幅ではキャラクターを小型横カード化。
- 気分ボタンをスマホでは2列表示にし、チップと入力欄を押しやすく調整。
- TOPにパスワードロックを追加。初期パスワードは `1109`。
- 設定画面からパスワード変更可能。
- 注意：アプリ内パスワードは静的公開時の簡易ロックであり、強い認証はホスティング側で実装する。

# ∞Care v20 Daily Hub 改修仕様書

## 1. 改修の目的

現在の∞Careは、体調・気分・ご飯・運動・日記がそれぞれ別パネル、別ログとして存在している。記録できる内容は多いが、毎日の入力場所が分散しているため、毎日まめとあすけんを行き来する時と同じような面倒さが残る。

v20では、記録の中心を「今日の記録」1画面に統合する。

目的は、毎日まめの気軽さで、気分・感情・体調・食事・体重・体脂肪率・睡眠・歩数・運動・生理・嗜好品・セルフケア・一行日記・今日気に入ったものをまとめて残し、あとからカレンダーとグラフで見返せるようにすること。

完璧な栄養管理や医療管理を目指すのではなく、「今日の自分のログを一箇所に回収する」ことを優先する。

---

## 2. 基本方針

- 1日1レコード方式にする。
- 最低限は「気分だけ」でも保存できる。
- 全項目を毎日入力する前提にしない。
- 入力欄は開閉式にして、最初から全部を見せない。
- タップ・チェック中心で、文章入力は任意にする。
- 食事内容は朝・昼・晩・間食・夜食に分ける。
- あすけんのような食品データベースや自動栄養計算は初期実装では不要。
- 既存のキャラクター、背景、天気、予定、ToDo、XP、好感度、PWA構造はできるだけ残す。
- 既存の healthLogs / moodLogs / mealLogs / exerciseLogs / diaries は、dailyEntries に統合・移行する。

---

## 3. 画面構成

### 3.1 下部ナビ

現在：
- 体調
- 気分
- 予定/タスク
- 日記
- ログ
- 設定

変更後：
- 今日
- カレンダー
- グラフ
- 予定/タスク
- 設定

ログはカレンダー内またはグラフ内から見られるようにして、独立ナビからは外してよい。

### 3.2 今日画面

「今日の記録」カードを中心にする。

最初に見える項目：
- 日付
- 気分
- 感情
- 体調
- 一行日記
- 保存ボタン

折りたたみで表示する項目：
- 食事
- 体重・体脂肪率
- 睡眠・歩数
- 運動
- 外出
- セルフケア
- 嗜好品
- 天気
- お通じ
- 生理
- 今日気に入ったもの

### 3.3 カレンダー画面

月表示で、各日に以下を小さく表示する。

- 気分アイコン
- 生理マーク
- 食事記録ありマーク
- お通じ Yes/No マーク
- 体重入力ありマーク
- 体調タグありマーク

日付を押すと、その日の記録カードを表示する。

### 3.4 グラフ画面

初期実装で表示するもの：

- 体重グラフ
- 体脂肪率グラフ
- 体温グラフ
- 睡眠時間グラフ
- 歩数グラフ
- 気分推移
- 体調タグ頻度
- 感情タグ頻度

余裕があれば追加するもの：

- 生理周期カレンダー
- PMSタグと気分の関係
- 食事記録の有無と気分の関係
- 外出あり/なしと気分の関係
- 服薬記録と体調の関係

### 3.5 予定/タスク画面

既存の予定・ToDo機能を残す。  
ただし、毎日の記録とは分離してよい。

### 3.6 設定画面

追加する設定：

- よく使う食事テンプレ
- よく使うタグの並び替え
- 表示する入力セクションのON/OFF
- 平熱の基準値
- 体重・体脂肪率の表示ON/OFF
- データエクスポート
- データインポート

---

## 4. 記録項目

### 4.1 気分

単一選択。  
5段階または7段階。

推奨：5段階。

- 最悪
- しんどい
- ふつう
- まあいい
- 最高

内部値：

```js
moodLevel: 1 | 2 | 3 | 4 | 5
moodLabel: "最悪" | "しんどい" | "ふつう" | "まあいい" | "最高"
```

### 4.2 感情

複数選択。

初期タグ：

- 穏やか
- 楽しい
- 意欲的
- 淋しい
- 憂鬱
- 不安
- 悲しい
- 退屈
- イライラ
- 焦り
- 安心
- 満足
- 怖い
- 泣きそう
- 無

### 4.3 体調

複数選択。

初期タグ：

- 頭痛
- 腹痛
- だるい
- 寒い
- 暑い
- 吐き気
- 眠い
- 貧血っぽい
- めまい
- 動悸
- 食欲ない
- 食欲ある
- 生理痛
- 生理
- PMS
- 排卵日っぽい
- 気圧つらい

### 4.4 今日やったこと

複数選択。

初期タグ：

- 運動
- 読書
- YouTube
- 映画
- ゲーム
- 音楽
- 言語学習
- 作業
- 配信
- 家事
- その他

### 4.5 外出

複数選択。

初期タグ：

- 外出なし
- 外食
- ショッピング
- 旅行
- 映画
- 病院
- 散歩
- 通勤
- その他

「外出なし」と他の外出タグが同時選択された場合は、最後に押したものを優先するか、保存時に軽く警告する。

### 4.6 セルフケア

複数選択。

初期タグ：

- お風呂
- 歯磨き
- 洗顔
- 洗髪
- 水分補給
- 服薬
- 着替え
- スキンケア
- 休憩

### 4.7 嗜好品

複数選択＋任意メモ。

初期タグ：

- お酒
- タバコ
- カフェイン
- エナジードリンク

詳細メモ：

```js
stimulantMemo: "お酒少し / タバコ多め / モンスター1本" 
```

### 4.8 天気

自動取得を優先し、手入力でも上書きできる。

保存する項目：

```js
weather: {
  text: "雨",
  temperature: 28,
  rain: "60%",
  memo: "気圧つらい"
}
```

天気タグ候補：

- 晴れ
- 曇り
- 雨
- 雪
- 雷
- 暑い
- 寒い
- 湿気つらい
- 気圧つらい

### 4.9 体重・体脂肪率

数値入力。

```js
weightKg: 55.2
bodyFatPercent: 28.4
```

前回値との差分を表示する。

### 4.10 お通じ

Yes / No / 未入力。

```js
bowelMovement: "yes" | "no" | "unknown"
```

初期実装はYes/Noのみ。  
将来的に、量・硬さ・腹痛などを追加してもよい。

### 4.11 食事内容

朝・昼・晩・間食・夜食に分ける。

```js
meals: {
  breakfast: "緑茶",
  lunch: "おにぎり、春雨スープ",
  dinner: "蒙古タンメン",
  snack: "ヨーグルト",
  lateSnack: "なし"
}
```

各欄は自由入力。  
「なし」ボタンを付けると楽。

### 4.12 歩数

数値入力。

```js
steps: 1389
```

スマホ連携は初期実装では不要。手入力でよい。

### 4.13 運動

今日やったことの「運動」とは別に、詳細欄を持つ。

```js
exercise: [
  {
    type: "ウォーキング",
    minutes: 20,
    distanceKm: 1.05,
    intensity: "ゆるい",
    memo: "ファミマ往復"
  }
]
```

初期タグ：

- ウォーキング
- 筋トレ
- ストレッチ
- ヨガ
- ダンス
- リングフィット
- その他

### 4.14 睡眠時間

初期実装では合計睡眠時間だけでもよい。

```js
sleep: {
  start: "02:30",
  end: "09:00",
  hours: 6.5,
  tags: ["中途覚醒", "悪夢"]
}
```

睡眠タグ候補：

- よく寝た
- 寝不足
- 中途覚醒
- 悪夢
- 昼寝
- 眠れない

### 4.15 生理

周期管理用の専用項目として扱う。  
体調タグの「生理」「PMS」とは別に保存する。

```js
period: {
  status: "none" | "start" | "during" | "end" | "pms" | "ovulationLike",
  flow: "none" | "light" | "normal" | "heavy" | "unknown",
  painLevel: 0,
  memo: ""
}
```

表示ラベル：

- なし
- 開始日
- 生理中
- 終わりかけ
- PMS
- 排卵日っぽい

### 4.16 一行日記

自由入力。空欄OK。

```js
oneLineDiary: "今日は頭が重かったけど、記録はできた。"
```

### 4.17 今日気に入ったもの

自由入力。  
「今日のよかったこと」より軽く、“刺さったもの置き場”として扱う。

```js
favoriteToday: "夜に見た動画のBGMがよかった。"
```

---

## 5. IndexedDB データ設計

### 5.1 DB名

現在：

```js
const DB_NAME = "infinity-care-db-mood-log-v3";
```

変更案：

```js
const DB_NAME = "infinity-care-db-daily-hub-v4";
```

またはDB名を維持して、versionを3に上げる。

推奨：既存データ移行を考えるならDB名は維持し、versionを3に上げる。

### 5.2 新規ストア

```js
if(!d.objectStoreNames.contains("dailyEntries")) {
  d.createObjectStore("dailyEntries", { keyPath: "date" });
}
```

1日1レコードにするため、keyPathはdate。

### 5.3 dailyEntries データ構造

```js
{
  date: "2026-07-04",
  updatedAt: "2026-07-04T12:34:56.000Z",

  moodLevel: 2,
  moodLabel: "しんどい",
  emotions: ["不安", "退屈", "淋しい"],
  bodyTags: ["頭痛", "だるい", "寒い", "眠い", "PMS"],

  activities: ["YouTube", "ゲーム", "言語学習"],
  outings: ["外出なし"],
  selfCare: ["服薬", "お風呂", "水分補給"],
  stimulants: ["タバコ"],
  stimulantMemo: "普通くらい",

  weather: {
    text: "雨",
    temperature: 26,
    rain: "60%",
    memo: "気圧つらい"
  },

  weightKg: null,
  bodyFatPercent: null,
  bowelMovement: "yes",

  meals: {
    breakfast: "緑茶",
    lunch: "おにぎり、春雨スープ",
    dinner: "蒙古タンメン",
    snack: "ヨーグルト",
    lateSnack: "なし"
  },

  steps: 1389,

  exercise: [
    {
      type: "ウォーキング",
      minutes: 20,
      distanceKm: 1.05,
      intensity: "ゆるい",
      memo: "ファミマ往復"
    }
  ],

  sleep: {
    start: "02:30",
    end: "09:00",
    hours: 6.5,
    tags: ["中途覚醒"]
  },

  period: {
    status: "pms",
    flow: "none",
    painLevel: 0,
    memo: ""
  },

  oneLineDiary: "今日は頭が重かったけど、記録はできた。",
  favoriteToday: "夜に見た動画のBGMがよかった。",

  characterId: "haruka"
}
```

---

## 6. 既存データ移行

現在のストア：

- healthLogs
- moodLogs
- mealLogs
- exerciseLogs
- diaries

移行方針：

- 既存ストアは消さずに残す。
- 初回起動時に dailyEntries へ日付ごとにマージする。
- すでに dailyEntries にデータがある日は、空欄だけ補完する。

### 6.1 移行ルール

healthLogs → dailyEntries

- temperature → weatherではなく体温欄を追加する場合は bodyTemperature に保存
- sleepStart / sleepEnd / sleepHours → sleep
- medicine → selfCare に「服薬」を追加、または medicineStatus に保存
- period → period.status
- headache / stomachache / fatigue / symptoms → bodyTags に変換
- memo → bodyMemo または oneLineDiary が空なら入れる

moodLogs → dailyEntries

- moodLabel → moodLabel
- energy / anxiety → energy / anxiety を追加保存してもよい
- moodTags → emotions または bodyTags に振り分け
- memo → oneLineDiary が空なら入れる

mealLogs → dailyEntries

- mealTypeごとに meals へ追記
- mealTypeが「水分」の場合は selfCare に「水分補給」を追加してもよい

exerciseLogs → dailyEntries

- exercise配列に追加
- activities に「運動」を追加
- exerciseTypeが「外出」「通院」の場合は outings にも追加

 diaries → dailyEntries

- body → oneLineDiary が空なら入れる
- title → favoriteToday には入れない。必要なら diaryTitle として保存。

---

## 7. 保存処理

### 7.1 基本関数

```js
async function loadDailyEntry(date = todayISO()) {
  const entry = await idbGet("dailyEntries", date);
  return entry || createEmptyDailyEntry(date);
}

function createEmptyDailyEntry(date = todayISO()) {
  return {
    date,
    updatedAt: new Date().toISOString(),
    moodLevel: null,
    moodLabel: "",
    emotions: [],
    bodyTags: [],
    activities: [],
    outings: [],
    selfCare: [],
    stimulants: [],
    stimulantMemo: "",
    weather: { text: "", temperature: null, rain: "", memo: "" },
    bodyTemperature: null,
    weightKg: null,
    bodyFatPercent: null,
    bowelMovement: "unknown",
    meals: { breakfast: "", lunch: "", dinner: "", snack: "", lateSnack: "" },
    steps: null,
    exercise: [],
    sleep: { start: "", end: "", hours: null, tags: [] },
    period: { status: "none", flow: "unknown", painLevel: 0, memo: "" },
    oneLineDiary: "",
    favoriteToday: "",
    characterId: settings.characterId || "haruka"
  };
}

async function saveDailyEntry(entry) {
  entry.updatedAt = new Date().toISOString();
  await idbPut("dailyEntries", entry);
}
```

### 7.2 保存後の反応

保存後、現在選択中キャラのセリフを出す。

例：

```js
const dailySaveLines = {
  haruka: [
    "南帆、今日の記録できたね。全部埋まってなくても、これで十分だよ。",
    "うん、受け取った。今日の君を、ちゃんと残せたね。"
  ],
  akane: [
    "姫、保存できたなら勝ち。空欄あっても気にすんな。",
    "よしよし、今日のログ回収完了。えらいじゃん。"
  ],
  masumi: [
    "今日の君、空白じゃなくなったね。俺はこういう記録、好きだよ。",
    "保存できたね。小さな一行でも、君の場面だ。"
  ],
  hin: [
    "南帆小姐，今日有記録，已經好叻。",
    "記低咗啦。唔使完美，留低就夠。"
  ]
};
```

---

## 8. タグマスター

タグはコード内に定数として持つ。

```js
const tagMaster = {
  emotions: ["穏やか", "楽しい", "意欲的", "淋しい", "憂鬱", "不安", "悲しい", "退屈", "イライラ", "焦り", "安心", "満足", "怖い", "泣きそう", "無"],
  bodyTags: ["頭痛", "腹痛", "だるい", "寒い", "暑い", "吐き気", "眠い", "貧血っぽい", "めまい", "動悸", "食欲ない", "食欲ある", "生理痛", "生理", "PMS", "排卵日っぽい", "気圧つらい"],
  activities: ["運動", "読書", "YouTube", "映画", "ゲーム", "音楽", "言語学習", "作業", "配信", "家事", "その他"],
  outings: ["外出なし", "外食", "ショッピング", "旅行", "映画", "病院", "散歩", "通勤", "その他"],
  selfCare: ["お風呂", "歯磨き", "洗顔", "洗髪", "水分補給", "服薬", "着替え", "スキンケア", "休憩"],
  stimulants: ["お酒", "タバコ", "カフェイン", "エナジードリンク"],
  exerciseTypes: ["ウォーキング", "筋トレ", "ストレッチ", "ヨガ", "ダンス", "リングフィット", "その他"],
  sleepTags: ["よく寝た", "寝不足", "中途覚醒", "悪夢", "昼寝", "眠れない"],
  weatherTags: ["晴れ", "曇り", "雨", "雪", "雷", "暑い", "寒い", "湿気つらい", "気圧つらい"]
};
```

---

## 9. 今日画面UI案

### 9.1 HTML構成イメージ

```html
<section class="daily-card" id="dailyPanel">
  <header class="daily-header">
    <h2>今日の記録</h2>
    <input type="date" id="dailyDate" />
  </header>

  <section class="daily-section always-open">
    <h3>気分</h3>
    <div id="moodButtons" class="mood-buttons"></div>
  </section>

  <section class="daily-section always-open">
    <h3>感情</h3>
    <div id="emotionChips" class="chip-grid"></div>
  </section>

  <section class="daily-section always-open">
    <h3>体調</h3>
    <div id="bodyTagChips" class="chip-grid"></div>
  </section>

  <details class="daily-section">
    <summary>食事</summary>
    <label>朝<input name="breakfast" /></label>
    <label>昼<input name="lunch" /></label>
    <label>晩<input name="dinner" /></label>
    <label>間食<input name="snack" /></label>
    <label>夜食<input name="lateSnack" /></label>
  </details>

  <details class="daily-section">
    <summary>体重・体脂肪率</summary>
    <label>体重<input name="weightKg" type="number" step="0.1" /></label>
    <label>体脂肪率<input name="bodyFatPercent" type="number" step="0.1" /></label>
  </details>

  <details class="daily-section">
    <summary>睡眠・歩数</summary>
    <label>寝た時間<input name="sleepStart" type="time" /></label>
    <label>起きた時間<input name="sleepEnd" type="time" /></label>
    <label>睡眠時間<input name="sleepHours" type="number" step="0.1" /></label>
    <label>歩数<input name="steps" type="number" /></label>
  </details>

  <details class="daily-section">
    <summary>行動・外出・セルフケア</summary>
    <div id="activityChips" class="chip-grid"></div>
    <div id="outingChips" class="chip-grid"></div>
    <div id="selfCareChips" class="chip-grid"></div>
  </details>

  <details class="daily-section">
    <summary>嗜好品・お通じ・生理</summary>
    <div id="stimulantChips" class="chip-grid"></div>
    <select name="bowelMovement">
      <option value="unknown">未入力</option>
      <option value="yes">あり</option>
      <option value="no">なし</option>
    </select>
    <select name="periodStatus">
      <option value="none">なし</option>
      <option value="start">開始日</option>
      <option value="during">生理中</option>
      <option value="end">終わりかけ</option>
      <option value="pms">PMS</option>
      <option value="ovulationLike">排卵日っぽい</option>
    </select>
  </details>

  <section class="daily-section always-open">
    <h3>一行日記</h3>
    <textarea name="oneLineDiary" rows="2" placeholder="一言だけでも、空欄でもOK"></textarea>
  </section>

  <section class="daily-section">
    <h3>今日気に入ったもの</h3>
    <textarea name="favoriteToday" rows="2" placeholder="曲、動画、服、食べ物、景色など"></textarea>
  </section>

  <button class="primary" id="saveDailyEntry" type="button">今日を保存</button>
</section>
```

---

## 10. カレンダー表示仕様

### 10.1 日付セルに出すもの

- 日付
- 気分色または気分アイコン
- 生理マーク
- 食事マーク
- 体調マーク
- お通じマーク

例：

```html
<button class="calendar-day mood-2 has-period has-meal has-body-tags">
  <span>4</span>
  <i>😵</i>
  <small>🍚 🌙</small>
</button>
```

### 10.2 気分色

- 1 最悪：深い紫・グレー系
- 2 しんどい：青紫系
- 3 ふつう：グレーまたはラベンダー
- 4 まあいい：淡いピンク・水色
- 5 最高：金・明るいピンク

既存テーマに合わせ、派手すぎない色にする。

---

## 11. グラフ・集計仕様

初期実装は外部ライブラリなしでもよい。  
簡単なSVGまたはCSSバーで表示する。

### 11.1 集計する値

```js
const entries = await idbGetAll("dailyEntries");
```

- weightKg がある日だけ体重グラフ
- bodyFatPercent がある日だけ体脂肪率グラフ
- bodyTemperature がある日だけ体温グラフ
- sleep.hours がある日だけ睡眠グラフ
- steps がある日だけ歩数グラフ
- moodLevel がある日だけ気分グラフ

### 11.2 タグ頻度

```js
function countTags(entries, key) {
  const map = new Map();
  entries.forEach(entry => {
    (entry[key] || []).forEach(tag => map.set(tag, (map.get(tag) || 0) + 1));
  });
  return [...map.entries()].sort((a,b)=>b[1]-a[1]);
}
```

対象：

- emotions
- bodyTags
- activities
- selfCare
- stimulants

---

## 12. CSV / JSON エクスポート

設定画面からJSONエクスポートできるようにする。

```js
async function exportDailyEntries() {
  const entries = await idbGetAll("dailyEntries");
  const blob = new Blob([JSON.stringify(entries, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `infinity-care-daily-${todayISO()}.json`;
  a.click();
  URL.revokeObjectURL(url);
}
```

CSVは後回しでよい。

---

## 13. 実装フェーズ

### Phase 1：今日の記録統合

- dailyEntriesストア追加
- 今日画面追加
- 気分、感情、体調、食事、体重、体脂肪率、お通じ、睡眠、歩数、一行日記、今日気に入ったものを保存
- 既存の体調・気分・ご飯・運動フォームは非表示または詳細モードへ移動

### Phase 2：カレンダー統合

- dailyEntriesを月表示
- 日付クリックで詳細カード表示
- 既存diaryCalendarのUIを流用してよい

### Phase 3：グラフ・統計

- 体重、体脂肪率、睡眠、歩数、気分の簡易グラフ
- 体調タグ・感情タグ頻度

### Phase 4：移行・エクスポート

- 既存ストアからdailyEntriesへ移行
- JSONエクスポート
- JSONインポート

### Phase 5：便利機能

- 食事テンプレ
- よく使うタグの並び替え
- 入力セクションのON/OFF
- 前回値の表示
- 生理周期の見える化

---

## 14. 優先順位

最優先：

1. dailyEntriesの追加
2. 今日の記録画面
3. 保存・読み込み
4. カレンダー表示

次点：

5. 体重・体脂肪率・睡眠・歩数グラフ
6. タグ頻度
7. 既存データ移行

後回し：

8. カロリー計算
9. 栄養素計算
10. 食品データベース
11. 外部ヘルスケア連携

---

## 15. コンセプト文

∞Care v20 Daily Hub は、南帆が毎日を完璧に管理するためのアプリではなく、今日の自分のログを一箇所に回収するための場所。

気分だけの日があっていい。  
食事だけの日があっていい。  
体重だけの日があっていい。  
一行だけの日があっていい。  
空欄があっても保存できる。

毎日まめの気軽さで、あすけんに入れていた食事・体重・体脂肪率も一緒に残す。  
体調、感情、外出、セルフケア、生理、睡眠、歩数、嗜好品、今日気に入ったものまで、全部を「今日」という1枚のカードにまとめる。

記録は反省のためではなく、あとから自分を責めないための回収。
