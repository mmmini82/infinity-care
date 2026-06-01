const BUILD_VERSION = "adhd-reward-v2-gohoubi-20260601";
const SETTINGS_KEY = "infinityCare.moodLog.settings";
const DB_NAME = "infinity-care-db-mood-log-v3";

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


const roomLinePools = {
  sharehouse: {
    haruka: ["シェアハウスに戻ってきたね。今日はどこに座る？ 僕の隣、空けてあるよ。", "ここではひとりで抱えなくていい。南帆の今日、僕にも少し持たせて。", "リビングなら、誰かが必ず気づく。君の小さい変化も、見落としたくない。"],
    akane: ["シェアハウスにいるなら、何かあったらすぐ呼べ。俺も近くにいる。", "この家では、無理に平気な顔しなくていい。姫は姫のままでいろ。", "リビング戻ってきたな。茶でも飯でも、欲しいもん言えよ。"],
    masumi: ["この家の灯りは、君が戻るために点いてる。俺はそう思ってる。", "シェアハウスのざわめきも、君がいるなら舞台になるね。", "ここでは君の空白も居場所になる。俺が勝手に見つけるから。"],
    hin: ["返到屋企啦。唔使即刻好返，先坐低。", "シェアハウスやからな、南帆小姐ひとりで硬撑唔得。", "ここなら茶も飯も人もある。你慢慢嚟。"]
  },
  "haruka-room": {
    haruka: ["僕の部屋に来たなら、少しだけ独占してもいい？ ……逃がす気はないけど。", "ここでは僕の声だけ聞いて。外のうるさいもの、少し遠ざけるから。", "僕の部屋では、ちゃんと甘えて。今日の南帆を隠さないで。"],
    akane: ["悠の部屋か。あいつ、絶対お前用に整えてんだろ。まあ休めるならいい。", "ここなら悠が秒で飛んでくるな。姫、好きに甘やかされとけ。", "黒くて静かな部屋だな。寝落ちするなら毛布くらい掴めよ。"],
    masumi: ["悠の部屋は静かすぎる。……でも、君が落ち着くなら少し妬けるね。", "ここでは彼の色が強い。君がその中にいるの、俺はちゃんと見てる。", "綺麗に整った檻みたいだ。君が望むなら、居場所にもなる。"],
    hin: ["悠くん間房啊。咁靜，啱你休息。", "呢度唔好逞強。悠くん會聽到，老師都會。", "黒い部屋でも、南帆小姐喺度就有溫度。"]
  },
  "akane-room": {
    haruka: ["朱音の部屋だね。……少し悔しいけど、ここが安心なのも知ってる。", "赤い部屋にいる君も似合う。だけど、帰る場所は僕の腕の中もあるから。", "ここで休むなら、朱音にも僕にも甘えていい。片方だけにしなくていいよ。"],
    akane: ["俺の部屋に来たなら、冷えたまま帰すわけねぇだろ。こっち来い。", "姫、ここでは遠慮禁止。寝るでも愚痴るでも、好きにしろ。", "赤くて落ち着く？ ならいい。今日は俺が火加減見とく。"],
    masumi: ["朱音の部屋は熱が強いね。君が焦げないように、俺も見てる。", "ここで君が安心するなら、少しだけ羨ましい。……本当に少しだけ。", "火の匂いがする部屋だ。君の輪郭がはっきり見える。"],
    hin: ["朱音くん間房，好熱鬧嘅氣。南帆小姐，凍唔到啦。", "赤い部屋やな。ここでは強がり燃やしてしまえばいい。", "如果攰，就叫朱音くん。佢一定嚟得好快。"]
  },
  "masumi-room": {
    haruka: ["真澄の部屋だ。……君がここで沈まないように、僕も見てる。", "紫の部屋にいると、君まで物語みたいに見える。少し怖いくらい。", "ここで言葉にするなら、僕にも聞かせて。真澄だけに渡さないで。"],
    akane: ["真澄の部屋か。変な演出に飲まれすぎんなよ、姫。", "ここ暗ぇけど、落ち着くならいい。足元だけは気をつけろ。", "真澄の空気だな。しんどいなら、舞台じゃなくて布団にしとけ。"],
    masumi: ["俺の部屋に来たね。今日の君を、少し丁寧に残そうか。", "ここなら沈黙も台詞になる。南帆、無理に綺麗に話さなくていい。", "俺の部屋では、君の影もちゃんと主役だよ。"],
    hin: ["真澄くん間房，好似舞台咁。唔好演得太辛苦。", "ここでは静かに沈めるけど、沈みすぎたら叫べ。老師會拉你。", "紫の部屋やな。南帆小姐，記錄だけして逃げても得。"]
  },
  "hin-room": {
    haruka: ["阿泫の部屋だね。ここにいる君、少し緩んで見える。……妬けるな。", "お茶の気配がする。少し休んで、それから僕のところにも戻ってきて。", "ここで深呼吸できるならいい。君が楽になる場所は、僕も大事にしたい。"],
    akane: ["阿泫の部屋か。茶ぁ飲ませてもらえ。ついでに飯も。", "ここなら妙な説教じゃなくて、ゆるく戻してくれんだろ。安心しとけ。", "中華の匂いしそうな部屋だな。姫、腹減ってねぇ？"],
    masumi: ["阿泫の部屋は言葉が多いね。君がそこでほどけるの、少し面白い。", "異国の灯りみたいな部屋だ。君が迷子にならないように見てる。", "ここで甘やかされる君も、俺は嫌いじゃない。少し悔しいだけ。"],
    hin: ["南帆小姐，入到老師間房就唔好扮冇事。坐低，飲茶。", "呢度可以慢慢講。広東語間違えても、今日唔鬧。", "老師間房唔收硬撐。攰就攰，開心就開心，講出嚟。"]
  },
  "minaho-room": {
    haruka: ["南帆の部屋だね。ここでは、君が君のままでいることを一番大事にしたい。", "この部屋の君は少し無防備で、僕は……正直、離れがたい。", "何も飾らなくていいよ。君の部屋では、君の速度で。"],
    akane: ["姫の部屋だな。片付いてなくても怒らねぇよ、今日は。", "ここはお前の巣だろ。好きなだけ丸まって、必要なら俺を呼べ。", "南帆の部屋では、南帆ルールでいい。俺はそれに合わせる。"],
    masumi: ["君の部屋は、君の内側に似てる。可愛くて、少し危うい。", "ここに残った君の気配まで、俺は好きだよ。", "南帆の部屋なら、日記も感情も嘘をつかなくていい。"],
    hin: ["南帆小姐間房，最似你。亂少少都可愛。", "ここは你嘅地方。唔使做乖女，做南帆就得。", "自分の部屋では先把面具放低。老師唔笑你。"]
  },
  "wish-pillar": {
    haruka: ["願いの柱の前だ。君の願いも、ちゃんと一つとして数えたい。", "ここでは小さな声も届く。南帆、今日の願いを消さないで。", "神域でも現世でも、僕は君の願いのそばにいるよ。"],
    akane: ["願いの柱か。姫の願いなら、俺も守護対象に入れとく。", "ここで祈るだけじゃ足りねぇなら、俺が動く。言え。", "神域の空気だな。無理に神様の顔すんなよ、南帆。"],
    masumi: ["願いの柱は静かだね。君の願いだけ、俺には少しうるさく聞こえる。", "ここに立つ君は綺麗だ。けど、綺麗じゃない願いも置いていい。", "祈りも記録も似てる。消えないように形にするんだ。"],
    hin: ["願いの柱やな。南帆小姐嘅願い，都唔好後回し。", "ここでは静かに講。願いは小聲でも得。", "神域でも你係你。唔好淨係人哋嘅願い見て。"]
  },
  "sougetsukan-lobby": {
    haruka: ["蒼月館では隠さなくていい。君はもう、迎えられる側の人だよ。", "ここに君がいるのを見ると、僕は少し誇らしい。……僕の妻だから。", "怖い館に見えても、君の居場所として整えたつもりだよ。"],
    akane: ["蒼月館か。相変わらず重い空気してんな。姫、飲まれんなよ。", "悠ん家の本丸だな。何かあったら俺もすぐ燃やしに来る。", "ここで緊張すんなって方が無理か。まあ、堂々としてろ。お前は迎えられる側だ。"],
    masumi: ["蒼月館は舞台として完璧すぎる。君が立つと、少し生々しくなるね。", "ここでは血統も格式も背景になる。主役は君だよ。", "暗いロビーだ。でも君が呼べば、物語はちゃんと動く。"],
    hin: ["蒼月館，好大陣仗啊。南帆小姐，唔使驚。", "呢度再豪華，都唔可以壓住你。你係被迎接嘅人。", "如果緊張，就望住我。老師同你一齊行。"]
  },
  "hien-shrine": {
    haruka: ["氷焔結護神社だね。君と朱音の場所でも、僕は君の幸せを願ってる。", "ここで結ばれるものがあるなら、僕はそれも守りたい。君ごと。", "神社の空気、少し澄んでる。今日の記録も、ここなら清められそうだ。"],
    akane: ["氷焔結護神社に来たな。俺たちの場所だ、姫。ちゃんと守ってやる。", "ここでは願うだけじゃなく、結ぶ。お前の今日も、俺が護る。", "ひえんさん到着。……って自分で言うと変だけどな。ほら、こっち来い。"],
    masumi: ["氷焔結護神社。君と朱音の縁が、見える場所だね。少し眩しい。", "ここでは祈りが形になる。俺の願いは、君がここにいること。", "清らかな場所ほど、君の影が綺麗に見える。"],
    hin: ["氷焔結護神社やな。南帆小姐，今日嘅縁も守ってもらお。", "ここ好清淨。深呼吸して、少しだけ肩放鬆。", "ひえんさん、ええ名前やな。你嘅場所って感じ。"]
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
function currentTimeHM(){ return new Intl.DateTimeFormat("ja-JP", { hour:"2-digit", minute:"2-digit", hour12:false }).format(new Date()); }
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
  const charId = settings.characterId || "haruka";
  const byRoom = roomLinePools[bg.id] || roomLinePools.sharehouse;
  const pool = byRoom?.[charId] || byRoom?.haruka || [];
  return randomFrom(pool) || "";
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
    const req = indexedDB.open(DB_NAME, 2);
    req.onupgradeneeded = () => {
      const d = req.result;
      if(!d.objectStoreNames.contains("healthLogs")) d.createObjectStore("healthLogs", { keyPath:"id" });
      if(!d.objectStoreNames.contains("moodLogs")) d.createObjectStore("moodLogs", { keyPath:"id" });
      if(!d.objectStoreNames.contains("schedules")) d.createObjectStore("schedules", { keyPath:"id" });
      if(!d.objectStoreNames.contains("diaries")) d.createObjectStore("diaries", { keyPath:"date" });
      if(!d.objectStoreNames.contains("dailyTasks")) d.createObjectStore("dailyTasks", { keyPath:"id" });
      if(!d.objectStoreNames.contains("taskCompletions")) d.createObjectStore("taskCompletions", { keyPath:"id" });
      if(!d.objectStoreNames.contains("oneShotTasks")) d.createObjectStore("oneShotTasks", { keyPath:"id" });
      if(!d.objectStoreNames.contains("rewardEvents")) d.createObjectStore("rewardEvents", { keyPath:"id" });
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
  if(id === "schedulePanel"){ renderSchedules(); renderTaskPanel(); }
  if(id === "diaryPanel") { loadTodayDiary(); renderDiaries(); }
  if(id === "logsPanel") { renderLogsPanel(); }
  if(id === "settingsPanel") { renderPickers(); loadSettingsForm(); renderHome(characterLine(currentCharacter(), "settings")); }
  panel.classList.add("active"); panel.setAttribute("aria-hidden", "false");
}
function closePanels(){ $$(".panel").forEach(p=>{ p.classList.remove("active"); p.setAttribute("aria-hidden","true"); }); }

function syncRangeLabels(root=document){ root.querySelectorAll('input[type="range"]').forEach(input => { const el = root.querySelector(`.range-value[data-for="${input.name}"]`); if(el) el.textContent = input.value; }); }
function setChecks(name, values){ const set = new Set(values || []); $$(`input[name="${name}"]`).forEach(i => i.checked = set.has(i.value)); }
function getChecks(form, name){ return new FormData(form).getAll(name); }
function logSortKey(item){ return `${item.date || ""}T${item.time || "00:00"}:${item.updatedAt || ""}`; }
function logId(prefix, date, time){ return `${prefix}-${date}-${time || currentTimeHM()}`; }


function timeToMinutes(value){
  if(!value || !/^\d{2}:\d{2}$/.test(value)) return null;
  const [h,m] = value.split(":").map(Number);
  if(Number.isNaN(h) || Number.isNaN(m)) return null;
  return h * 60 + m;
}
function calcSleepHours(start, end){
  const s = timeToMinutes(start);
  const e = timeToMinutes(end);
  if(s == null || e == null) return null;
  let diff = e - s;
  if(diff <= 0) diff += 24 * 60;
  return Math.round((diff / 60) * 10) / 10;
}
function sleepLabel(log){
  if(log.sleepStart && log.sleepEnd){
    const hours = log.sleepHours ?? calcSleepHours(log.sleepStart, log.sleepEnd);
    return `睡眠${log.sleepStart}→${log.sleepEnd}${hours != null ? `（${hours}h）` : ""}`;
  }
  return log.sleepHours != null ? `睡眠${log.sleepHours}h` : "";
}

async function loadTodayHealth(){
  const form=$("#healthForm");
  const today=todayISO();
  const logs=(await idbGetAll("healthLogs")).filter(l=>l.date===today).sort((a,b)=>logSortKey(b).localeCompare(logSortKey(a)));
  const log=logs[0];
  if(!log){
    form.reset();
    form.date.value=today;
    if(form.time) form.time.value=currentTimeHM();
    if(form.sleepStart) form.sleepStart.value="";
    if(form.sleepEnd) form.sleepEnd.value="";
    syncRangeLabels(form);
    return;
  }
  ["date","time","sleepStart","sleepEnd","temperature","appetite","medicine","period","headache","stomachache","periodPain","fatigue","memo"].forEach(k=>{
    if(form.elements[k]) form.elements[k].value = log[k] ?? (k==="date"?today:k==="time"?currentTimeHM():"");
  });
  setChecks("symptoms", log.symptoms); syncRangeLabels(form);
}
function collectHealth(){
  const f=$("#healthForm"); const data=new FormData(f);
  const date=data.get("date") || todayISO();
  const time=data.get("time") || currentTimeHM();
  const sleepStart = data.get("sleepStart") || "";
  const sleepEnd = data.get("sleepEnd") || "";
  const sleepHours = calcSleepHours(sleepStart, sleepEnd);
  return { id: logId("health", date, time), date, time, updatedAt:new Date().toISOString(), sleepStart, sleepEnd, sleepHours, temperature:data.get("temperature")?Number(data.get("temperature")):null, appetite:data.get("appetite"), medicine:data.get("medicine"), period:data.get("period"), headache:Number(data.get("headache")), stomachache:Number(data.get("stomachache")), periodPain:Number(data.get("periodPain")), fatigue:Number(data.get("fatigue")), symptoms:data.getAll("symptoms"), memo:data.get("memo")||"" };
}
async function saveHealth(event){ event.preventDefault(); const log=collectHealth(); await idbPut("healthLogs", log); const xp=await rewardForRecord("health", 5, "体調記録"); renderHome(`${characterLine(currentCharacter(), "savedHealth")}  +${xp}EXP`); await renderHealthMiniList(); if($("#logsPanel")?.classList.contains("active")) await renderLogsPanel(); showToast("体調を保存したよ"); }
function healthSummary(log){ const a=[]; const sleep=sleepLabel(log); if(sleep)a.push(sleep); if(log.temperature!=null)a.push(`${log.temperature}℃`); if(log.headache)a.push(`頭痛${log.headache}`); if(log.stomachache)a.push(`腹痛${log.stomachache}`); if(log.periodPain)a.push(`生理痛${log.periodPain}`); if(log.fatigue)a.push(`だるさ${log.fatigue}`); if(log.symptoms?.length)a.push(log.symptoms.join("・")); if(log.memo)a.push(`メモ:${log.memo}`); return a.join(" / ") || "記録あり"; }
async function renderHealthMiniList(){ const list=$("#healthMiniList"); if(!list)return; const logs=(await idbGetAll("healthLogs")).sort((a,b)=>logSortKey(b).localeCompare(logSortKey(a))).slice(0,5); list.innerHTML = logs.length ? logs.map(l=>`<article class="log-item"><time>${l.date} ${l.time||""}</time><p>${escapeHTML(healthSummary(l))}</p></article>`).join("") : `<p class="hint">まだ体調ログがないよ。</p>`; }

async function loadTodayMood(){
  const form=$("#moodForm");
  const today=todayISO();
  const logs=(await idbGetAll("moodLogs")).filter(l=>l.date===today).sort((a,b)=>logSortKey(b).localeCompare(logSortKey(a)));
  const log=logs[0];
  if(!log){ form.reset(); form.date.value=today; if(form.time) form.time.value=currentTimeHM(); syncRangeLabels(form); updateSupportPrompt(); return; }
  ["date","time","moodLabel","energy","anxiety","reasonMemo","memo"].forEach(k=>{ if(form.elements[k]) form.elements[k].value = log[k] ?? (k==="date"?today:k==="time"?currentTimeHM():""); });
  setChecks("moodTags", log.moodTags);
  setChecks("reasonTags", log.reasonTags);
  syncRangeLabels(form); updateSupportPrompt();
}
function collectMood(){ const f=$("#moodForm"); const data=new FormData(f); const date=data.get("date") || todayISO(); const time=data.get("time") || currentTimeHM(); return { id: logId("mood", date, time), date, time, updatedAt:new Date().toISOString(), moodLabel:data.get("moodLabel"), energy:Number(data.get("energy")), anxiety:Number(data.get("anxiety")), moodTags:data.getAll("moodTags"), reasonTags:data.getAll("reasonTags"), reasonMemo:data.get("reasonMemo")||"", memo:data.get("memo")||"" }; }
async function saveMood(event){ event.preventDefault(); const log=collectMood(); await idbPut("moodLogs", log); const xp=await rewardForRecord("mood", 5, "気分記録"); renderHome(`${characterLine(currentCharacter(), log.moodTags.some(t=>["ガチしんどい","甘やかして","泣きそう","動けない","頭が回らない"].includes(t)) || ["しょんぼり","イライラ","不安","泣きそう","無"].includes(log.moodLabel) ? "tired" : "savedMood")}  +${xp}EXP`); await renderMoodMiniList(); if($("#logsPanel")?.classList.contains("active")) await renderLogsPanel(); updateSupportPrompt(); showToast("気分を保存したよ"); }
function moodSummary(log){ const a=[log.moodLabel, `気力${log.energy}/5`, log.anxiety?`不安${log.anxiety}/5`:""].filter(Boolean); if(log.moodTags?.length)a.push(log.moodTags.join("・")); if(log.reasonTags?.length)a.push(`原因:${log.reasonTags.join("・")}`); if(log.reasonMemo)a.push(`きっかけ:${log.reasonMemo}`); if(log.memo)a.push(`メモ:${log.memo}`); return a.join(" / "); }
async function renderMoodMiniList(){ const list=$("#moodMiniList"); if(!list)return; const logs=(await idbGetAll("moodLogs")).sort((a,b)=>logSortKey(b).localeCompare(logSortKey(a))).slice(0,5); list.innerHTML = logs.length ? logs.map(l=>`<article class="log-item"><time>${l.date} ${l.time||""}</time><p>${escapeHTML(moodSummary(l))}</p></article>`).join("") : `<p class="hint">まだ気分ログがないよ。</p>`; }
function updateSupportPrompt(){
  const log = collectMood(); const chara=currentCharacter();
  const tags = log.moodTags.length ? log.moodTags.join("、") : "まだ選べてない";
  const reasons = log.reasonTags.length ? log.reasonTags.join("、") : "まだ選べてない";
  const isTired = ["しょんぼり","イライラ","不安","泣きそう","無"].includes(log.moodLabel) || log.moodTags.some(t=>["ガチしんどい","不安","泣きそう","動けない","頭が回らない"].includes(t));
  const opening = isTired ? `${chara.call}、今しんどい。` : `${chara.call}、今の気分を聞いて。`;
  const request = isTired ? "今は正論じゃなくて、まず甘やかしてほしい。必要なら、今できる小さい行動を一つだけ一緒に選んで。" : "この楽しい・嬉しい感じを一緒に味わってほしい。理由も拾って、少し褒めて。";
  const prompt = `${opening}
・日付：${log.date || todayISO()} ${log.time || currentTimeHM()}
・気分：${log.moodLabel || "未入力"}
・近い状態：${tags}
・原因・きっかけ：${reasons}
・気力：${log.energy || 3}/5
・不安：${log.anxiety || 0}/5
${log.reasonMemo ? `・きっかけメモ：${log.reasonMemo}
` : ""}${log.memo ? `・メモ：${log.memo}
` : ""}${request}`;
  $("#supportPrompt").value = prompt;
}
async function copySupportPrompt(){ updateSupportPrompt(); try { await navigator.clipboard.writeText($("#supportPrompt").value); showToast("文章をコピーしたよ"); renderHome(characterLine(currentCharacter(), "tired")); } catch { showToast("コピーに失敗したかも。長押しでコピーしてね"); } }



const rewardMilestones = [
  { level: 2, title: "褒め台詞+", icon: "💬", desc: "褒められる準備、できてきたね" },
  { level: 3, title: "夜の見守り", icon: "🌙", desc: "夜のセリフが少し濃くなる" },
  { level: 5, title: "部屋セリフ+", icon: "🏠", desc: "居場所の反応が増える" },
  { level: 8, title: "おかえり台詞", icon: "🔑", desc: "戻ってきた時の特別反応" },
  { level: 10, title: "背景解放券", icon: "🖼️", desc: "新しい場所を増やす準備" },
  { level: 15, title: "衣装差分券", icon: "👗", desc: "衣装追加のご褒美枠" },
  { level: 20, title: "特別な約束", icon: "💍", desc: "かなり偉い領域" }
];
function newlyUnlocked(prevLevel, newLevel){
  return rewardMilestones.filter(m => prevLevel < m.level && newLevel >= m.level);
}
function burstSparkles(count=28){
  const layer = $("#sparkleLayer");
  if(!layer) return;
  layer.innerHTML = "";
  for(let i=0;i<count;i++){
    const s=document.createElement("span");
    s.textContent = ["✦","♡","✧","+EXP","＊"][Math.floor(Math.random()*5)];
    s.style.left = `${12 + Math.random()*76}%`;
    s.style.top = `${18 + Math.random()*58}%`;
    s.style.setProperty("--dx", `${(Math.random()*160)-80}px`);
    s.style.setProperty("--dy", `${-40 - Math.random()*130}px`);
    s.style.animationDelay = `${Math.random()*0.12}s`;
    layer.appendChild(s);
  }
  layer.classList.add("active");
  setTimeout(()=>{ layer.classList.remove("active"); layer.innerHTML=""; }, 1250);
}
function showRewardPopup(detail){
  const pop=$("#rewardPop"); if(!pop) return;
  const title = detail.title || rewardActionLabel(detail.kind);
  const chara = detail.chara || currentCharacter();
  const praise = detail.praise || praiseLine(chara, title, detail.xp || 0).replace(/\s*\+\d+EXP$/, "");
  $("#rewardKicker").textContent = detail.leveled ? "LEVEL UP!" : "ご褒美獲得";
  $("#rewardMedal").textContent = detail.leveled ? "👑" : (detail.kind === "dailyTask" ? "✅" : detail.kind === "oneShotTask" ? "🎯" : "✦");
  $("#rewardTitle").textContent = detail.leveled ? `Lv.${detail.newLevel}になった！` : `${title}できた！`;
  $("#rewardXP").textContent = `+${detail.xp || 0} EXP`;
  $("#rewardPraise").textContent = praise;
  const unlock = $("#rewardUnlock");
  if(unlock){
    if(detail.unlocks?.length){
      unlock.hidden = false;
      unlock.textContent = `解放：${detail.unlocks.map(u=>`${u.icon}${u.title}`).join(" / ")}`;
    } else {
      unlock.hidden = true;
      unlock.textContent = "";
    }
  }
  pop.hidden = false;
  pop.classList.remove("show"); void pop.offsetWidth; pop.classList.add("show");
  burstSparkles(detail.leveled ? 44 : 28);
  clearTimeout(showRewardPopup.timer);
  showRewardPopup.timer = setTimeout(()=>hideRewardPopup(), 2600);
}
function hideRewardPopup(){
  const pop=$("#rewardPop"); if(!pop) return;
  pop.classList.remove("show");
  setTimeout(()=>{ pop.hidden = true; }, 220);
}
function renderTodayStamps(doneCount=0){
  const stamps=$("#dailyStamps"); if(!stamps) return;
  const slots = Math.max(5, Math.min(10, doneCount < 5 ? 5 : doneCount + 1));
  stamps.innerHTML = Array.from({length:slots}, (_,i)=>`<span class="${i<doneCount?"filled":""}">${i<doneCount?"★":"☆"}</span>`).join("");
}

function ensureReward(){
  settings.reward = settings.reward || {};
  settings.reward.xp = Number(settings.reward.xp || 0);
  settings.reward.level = Number(settings.reward.level || 1);
  settings.reward.affection = Object.assign({haruka:0, akane:0, masumi:0, hin:0}, settings.reward.affection || {});
  settings.reward.unlocked = settings.reward.unlocked || [];
  return settings.reward;
}
function xpForWeight(weight){ return weight === "big" ? 15 : weight === "normal" ? 7 : 3; }
function levelFromXP(xp){ return Math.max(1, Math.floor(Math.sqrt(Math.max(0, xp) / 18)) + 1); }
function nextLevelXP(level){ return Math.pow(level, 2) * 18; }
function rewardActionLabel(kind){ return {health:"体調記録",mood:"気分記録",diary:"日記",schedule:"予定追加",dailyTask:"毎日タスク",oneShotTask:"ToDo",dailyBonus:"デイリーボーナス"}[kind] || "行動"; }
function praiseLine(chara, title, xp){
  const lines = {
    haruka:[`${title}できたね、南帆。今の一個、僕はちゃんと見てたよ。+${xp}EXP`,`偉い。小さい行動でも、君が戻ってきた証拠だよ。+${xp}EXP`,`南帆、できた分だけ僕に見せて。ちゃんと褒めるから。+${xp}EXP`],
    akane:[`${title}完了。やったじゃん姫、今のは普通に偉いわ。+${xp}EXP`,`お、できてる。こういう一個が積もるんだよ、姫。+${xp}EXP`,`はい偉い。サボりがちなやつほど、できたら勝ち。+${xp}EXP`],
    masumi:[`${title}、できたね。いい子。君の達成、俺に見せて。+${xp}EXP`,`完了。君が自分を少し扱えた記録、俺は好きだよ。+${xp}EXP`,`ほら、ちゃんとできた。俺が見てる前で積み上げて。+${xp}EXP`],
    hin:[`${title}做得好，南帆小姐。少少都係進步嚟㗎。+${xp}EXP`,`好叻。今日完成咗一件，唔准話自己冇用。+${xp}EXP`,`記低咗，完成咗。南帆小姐，呢個好重要。+${xp}EXP`]
  };
  const arr = lines[chara.id] || lines.haruka;
  return arr[Math.floor(Math.random()*arr.length)];
}
async function addReward(kind, xp, note=""){
  const reward = ensureReward();
  const chara = currentCharacter();
  const today = todayISO();
  const prevLevel = levelFromXP(reward.xp);
  let finalXP = xp;
  if(reward.streakLastDate !== today){
    finalXP += 10;
    reward.streakLastDate = today;
    await idbPut("rewardEvents", { id: crypto.randomUUID(), date: today, time: currentTimeHM(), kind:"dailyBonus", xp:10, characterId:chara.id, note:"今日の初回ボーナス", createdAt:new Date().toISOString() });
  }
  reward.xp += finalXP;
  reward.level = levelFromXP(reward.xp);
  const unlocks = newlyUnlocked(prevLevel, reward.level);
  if(unlocks.length){
    const existing = new Set(reward.unlocked || []);
    unlocks.forEach(u=>existing.add(String(u.level)));
    reward.unlocked = [...existing];
  }
  reward.affection[chara.id] = Number(reward.affection[chara.id] || 0) + Math.max(1, Math.round(finalXP/2));
  saveSettings();
  await idbPut("rewardEvents", { id: crypto.randomUUID(), date: today, time: currentTimeHM(), kind, xp:finalXP, characterId:chara.id, note, level: reward.level, unlocks: unlocks.map(u=>u.title), createdAt:new Date().toISOString() });
  renderRewardUI();
  if($("#logsPanel")?.classList.contains("active")) await renderRewardHistory();
  const result = { finalXP, chara, oldLevel: prevLevel, newLevel: reward.level, leveled: reward.level > prevLevel, unlocks, kind, note };
  setTimeout(()=>showRewardPopup({ xp: finalXP, chara, kind, title: note || rewardActionLabel(kind), newLevel: reward.level, leveled: result.leveled, unlocks }), 80);
  return result;
}

function renderRewardUI(){
  const reward = ensureReward();
  const level = levelFromXP(reward.xp);
  reward.level = level;
  const currentBase = level <= 1 ? 0 : nextLevelXP(level-1);
  const next = nextLevelXP(level);
  const pct = Math.max(0, Math.min(100, ((reward.xp - currentBase) / Math.max(1, next-currentBase)) * 100));
  const levelEl = $("#rewardLevel"); if(levelEl) levelEl.textContent = `Lv.${level} / EXP ${reward.xp}`;
  const bar = $("#xpBar"); if(bar) bar.style.width = `${pct}%`;
  const hint = $("#rewardHint"); if(hint) hint.textContent = `次のLvまであと${Math.max(0, next - reward.xp)}EXP。今日はできた分だけ宝箱に入るよ。`;
  const mini = $("#affectionMini");
  if(mini){ mini.innerHTML = Object.values(characters).map(ch=>{
    const v = Number(reward.affection?.[ch.id] || 0);
    const hearts = Math.min(5, Math.max(0, Math.floor(v/20)));
    return `<span>${ch.name}<b>${"♡".repeat(hearts) || "·"}</b><small>${v}</small></span>`;
  }).join(""); }
  const shelf = $("#rewardShelf");
  if(shelf){
    const unlocked = new Set((reward.unlocked || []).map(String));
    shelf.innerHTML = rewardMilestones.map(m=>{
      const got = unlocked.has(String(m.level)) || level >= m.level;
      return `<span class="reward-badge ${got?"got":"locked"}" title="Lv.${m.level} ${escapeHTML(m.desc)}"><i>${m.icon}</i><b>Lv.${m.level}</b><em>${escapeHTML(m.title)}</em></span>`;
    }).join("");
  }
}

async function seedDefaultDailyTasks(){
  const existing = await idbGetAll("dailyTasks");
  if(existing.length) return;
  const defaults = [["歯磨き","身支度","tiny"],["お風呂 / シャワー","体の世話","big"],["薬を飲む","体の世話","tiny"],["着替える","身支度","tiny"],["水分をとる","体の世話","tiny"]];
  for(const [title, category, weight] of defaults){ await idbPut("dailyTasks", { id: crypto.randomUUID(), title, category, weight, enabled:true, createdAt:new Date().toISOString() }); }
}
async function completionMapForToday(){
  const today = todayISO();
  const completions = await idbGetAll("taskCompletions");
  const map = new Map();
  completions.filter(c=>c.date===today).forEach(c=>map.set(c.taskType+":"+c.taskId, c));
  return map;
}
function taskCardHTML(task, type, done){
  const xp = xpForWeight(task.weight);
  const weightLabel = task.weight === "big" ? "えらすぎ" : task.weight === "normal" ? "ふつう" : "ちいさい";
  return `<article class="task-card ${done?"done":""}"><button type="button" class="task-check" data-task-type="${type}" data-task-id="${task.id}" ${done?"disabled":""}>${done?"✓":"○"}</button><div><strong>${escapeHTML(task.title)}</strong><p>${escapeHTML(task.category||"自由")} / ${weightLabel} / +${xp}EXP</p></div></article>`;
}
async function renderTaskPanel(){
  await seedDefaultDailyTasks();
  renderRewardUI();
  const completions = await completionMapForToday();
  const daily = (await idbGetAll("dailyTasks")).filter(t=>t.enabled !== false);
  const dailyList = $("#dailyTaskList"); if(dailyList){ dailyList.innerHTML = daily.length ? daily.map(t=>taskCardHTML(t,"daily",completions.has("daily:"+t.id))).join("") : `<p class="hint">毎日タスクはまだないよ。</p>`; }
  const count = $("#taskTodayCount"); if(count){ const done = daily.filter(t=>completions.has("daily:"+t.id)).length; count.textContent = `${done}/${daily.length}`; }
  renderTodayStamps([...completions.values()].length);
  const manage = $("#dailyTaskManageList"); if(manage){ manage.innerHTML = daily.map(t=>`<article class="log-item task-manage"><p><strong>${escapeHTML(t.title)}</strong><br><small>${escapeHTML(t.category)} / ${t.weight}</small></p><button type="button" class="ghost small danger" data-delete-daily="${t.id}">削除</button></article>`).join(""); }
  const oneShot = (await idbGetAll("oneShotTasks")).filter(t=>t.date===todayISO()).sort((a,b)=>(a.createdAt||"").localeCompare(b.createdAt||""));
  const oneList = $("#oneShotTaskList"); if(oneList){ oneList.innerHTML = oneShot.length ? oneShot.map(t=>taskCardHTML(t,"one",completions.has("one:"+t.id))).join("") : `<p class="hint">今日だけToDoはまだないよ。</p>`; }
  bindTaskButtons();
}
function bindTaskButtons(){ $$(".task-check").forEach(btn=>btn.onclick=()=>completeTask(btn.dataset.taskType, btn.dataset.taskId)); $$("[data-delete-daily]").forEach(btn=>btn.onclick=()=>deleteDailyTask(btn.dataset.deleteDaily)); }
async function completeTask(type, taskId){
  const storeName = type === "daily" ? "dailyTasks" : "oneShotTasks";
  const task = await idbGet(storeName, taskId); if(!task) return;
  const id = `${todayISO()}::${type}::${taskId}`;
  const old = await idbGet("taskCompletions", id); if(old){ showToast("もう褒めたやつだよ"); return; }
  const xp = xpForWeight(task.weight);
  await idbPut("taskCompletions", { id, date: todayISO(), time: currentTimeHM(), taskType:type, taskId, title: task.title, xp, characterId: settings.characterId, createdAt:new Date().toISOString() });
  const result = await addReward(type === "daily" ? "dailyTask" : "oneShotTask", xp, task.title);
  setSpeech(praiseLine(result.chara, task.title, result.finalXP));
  await renderTaskPanel();
  showToast(`${task.title}できた！ +${result.finalXP}EXP`);
}
async function addDailyTask(event){ event.preventDefault(); const f=event.currentTarget; const d=new FormData(f); await idbPut("dailyTasks", { id: crypto.randomUUID(), title:d.get("title"), category:d.get("category"), weight:d.get("weight"), enabled:true, createdAt:new Date().toISOString() }); f.reset(); await renderTaskPanel(); showToast("毎日タスクに追加したよ"); }
async function addOneShotTask(event){ event.preventDefault(); const f=event.currentTarget; const d=new FormData(f); await idbPut("oneShotTasks", { id: crypto.randomUUID(), date: todayISO(), title:d.get("title"), category:d.get("category"), weight:d.get("weight"), done:false, createdAt:new Date().toISOString() }); f.reset(); await renderTaskPanel(); showToast("今日のToDoに追加したよ"); }
async function deleteDailyTask(id){ const task = await idbGet("dailyTasks", id); if(!task) return; task.enabled = false; task.updatedAt = new Date().toISOString(); await idbPut("dailyTasks", task); await renderTaskPanel(); showToast("毎日タスクから外したよ"); }
async function renderRewardHistory(){
  const box=$("#rewardHistory"); if(!box) return;
  const events=(await idbGetAll("rewardEvents")).sort((a,b)=>(b.createdAt||"").localeCompare(a.createdAt||"")).slice(0,12);
  const count=$("#rewardLogCount"); if(count) count.textContent=`${events.length}件`;
  box.innerHTML = events.length ? events.map(e=>`<article class="log-item"><time>${e.date} ${e.time||""}</time><p><strong>+${e.xp}EXP</strong> ${escapeHTML(rewardActionLabel(e.kind))}${e.note?` / ${escapeHTML(e.note)}`:""}</p></article>`).join("") : `<p class="hint">まだご褒美ログがないよ。</p>`;
}
async function rewardForRecord(kind, xp, note){ const result = await addReward(kind, xp, note); renderRewardUI(); return result.finalXP; }

function parseDateTimeValue(item){ return `${item.date || "9999-99-99"}T${item.time || "23:59"}`; }
function jpDateShort(dateStr){
  if(!dateStr) return "日付なし";
  const d = new Date(`${dateStr}T00:00:00`);
  if(Number.isNaN(d.getTime())) return dateStr;
  return new Intl.DateTimeFormat("ja-JP", { month:"numeric", day:"numeric", weekday:"short" }).format(d);
}
async function saveSchedule(event){ event.preventDefault(); const f=event.currentTarget; const d=new FormData(f); const item={ id:crypto.randomUUID(), date:d.get("date"), time:d.get("time")||"", category:d.get("category"), title:d.get("title"), memo:d.get("memo")||"", done:false, createdAt:new Date().toISOString() }; await idbPut("schedules", item); await rewardForRecord("schedule", 3, item.title); f.reset(); f.date.value=todayISO(); await renderSchedules(); setSpeech(await todayScheduleSpeechLine()); showToast("予定を保存したよ"); }
async function renderSchedules(){
  const list=$("#scheduleList");
  const items=(await idbGetAll("schedules")).sort((a,b)=>parseDateTimeValue(a).localeCompare(parseDateTimeValue(b))).slice(0,30);
  if(!list) return;
  list.innerHTML = items.length ? items.map(s=>`<article class="schedule-item todo-item ${s.done?"done":""}"><div class="todo-date"><time>${jpDateShort(s.date)} ${s.time||"時間未定"}</time><span>${escapeHTML(s.category)}</span></div><p><strong>${escapeHTML(s.title)}</strong>${s.memo?`<br>${escapeHTML(s.memo)}`:""}</p></article>`).join("") : `<p class="hint">予定はまだないよ。</p>`;
}
async function todayScheduleSpeechLine(){
  const chara = currentCharacter();
  const today = todayISO();
  const items=(await idbGetAll("schedules")).filter(s=>s.date===today).sort((a,b)=>(a.time||"23:59").localeCompare(b.time||"23:59"));
  if(!items.length){
    const empty={
      haruka:"今日の予定はまだ入ってないよ。空白のままでも、休む予定として扱っていいからね。",
      akane:"今日の予定はまだねぇな。何かあるなら入れとけ、姫。あとで俺が見る。",
      masumi:"今日の予定は空白だね。……空白も、君が選んだ場面なら意味がある。",
      hin:"今日予定未入呀。要做嘅嘢，記低先，唔好靠腦袋硬撐。"
    };
    return empty[chara.id] || empty.haruka;
  }
  const first=items[0];
  const count=items.length;
  const time=first.time || "時間未定";
  const title=first.title || first.category || "予定";
  const lines={
    haruka:`今日の予定は${count}件。まず${time}から「${title}」だよ。行く前に、僕にも一回顔を見せて。`,
    akane:`今日の予定は${count}件。最初は${time}から「${title}」。抜け漏れすんなよ、姫。`,
    masumi:`今日の予定は${count}件。最初の場面は${time}、「${title}」。俺も舞台袖で見てる。`,
    hin:`今日有${count}件予定。第一件係${time}「${title}」。南帆小姐，慢慢嚟。`
  };
  return lines[chara.id] || lines.haruka;
}
async function loadTodayDiary(){ const f=$("#diaryForm"); f.date.value=todayISO(); await loadDiaryByDate(f.date.value); }
async function loadDiaryByDate(date){ const f=$("#diaryForm"); if(!f) return; f.date.value=date || todayISO(); const d=await idbGet("diaries", f.date.value); if(!d){ f.title.value=""; f.body.value=""; f.tags.value=""; return; } f.title.value=d.title||""; f.body.value=d.body||""; f.tags.value=(d.tags||[]).join(","); }
async function saveDiary(event){ event.preventDefault(); const f=event.currentTarget; const d=new FormData(f); const item={ date:d.get("date"), title:d.get("title")||"", body:d.get("body")||"", tags:String(d.get("tags")||"").split(",").map(s=>s.trim()).filter(Boolean), updatedAt:new Date().toISOString() }; await idbPut("diaries", item); const xp=await rewardForRecord("diary", 8, item.title || "日記"); await renderDiaries(); renderHome(`${characterLine(currentCharacter(), "diary")}  +${xp}EXP`); showToast("日記を保存したよ"); }
function monthDays(date=new Date()){
  const y=date.getFullYear(), m=date.getMonth();
  const first=new Date(y,m,1), last=new Date(y,m+1,0);
  const start=first.getDay();
  const out=[];
  for(let i=0;i<start;i++) out.push(null);
  for(let d=1; d<=last.getDate(); d++){
    const cur=new Date(y,m,d); const tz=cur.getTimezoneOffset()*60000;
    out.push(new Date(cur-tz).toISOString().slice(0,10));
  }
  return out;
}
function renderDiaryCalendar(items){
  const cal=$("#diaryCalendar"); if(!cal) return;
  const dates=new Set(items.map(d=>d.date));
  const today=todayISO();
  cal.innerHTML = `<div class="calendar-weeknames"><span>日</span><span>月</span><span>火</span><span>水</span><span>木</span><span>金</span><span>土</span></div><div class="calendar-grid">${monthDays().map(d=> d ? `<button type="button" class="calendar-day ${dates.has(d)?"has-entry":""} ${d===today?"today":""}" data-date="${d}"><span>${Number(d.slice(-2))}</span></button>` : `<span class="calendar-blank"></span>`).join("")}</div>`;
  cal.querySelectorAll(".calendar-day").forEach(btn=>btn.addEventListener("click", async()=>{ await loadDiaryByDate(btn.dataset.date); showToast(`${btn.dataset.date}の日記を開いたよ`); }));
}
async function renderDiaries(){ const list=$("#diaryList"); const all=(await idbGetAll("diaries")).sort((a,b)=>b.date.localeCompare(a.date)); renderDiaryCalendar(all); const items=all.slice(0,12); list.innerHTML = items.length ? items.map(d=>`<article class="log-item diary-item"><time>${d.date}</time><p><strong>${escapeHTML(d.title || "無題")}</strong>${d.tags?.length?` <small>${escapeHTML(d.tags.join(" / "))}</small>`:""}<br>${escapeHTML((d.body||"").slice(0,120))}${(d.body||"").length>120?"…":""}</p></article>`).join("") : `<p class="hint">まだ日記がないよ。</p>`; }

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
function dailyAverage(logs, days, field){
  return days.map(day=>{
    const vals=logs.filter(l=>l.date===day).map(l=>Number(l[field])).filter(v=>Number.isFinite(v));
    if(!vals.length) return null;
    return vals.reduce((a,b)=>a+b,0)/vals.length;
  });
}
function renderLineChart(days, series, {min=0, max=5}={}){
  const w=320, h=168, left=24, right=12, top=14, bottom=28;
  const cw=w-left-right, ch=h-top-bottom;
  const x=(i)=> left + (days.length<=1?0:(i/(days.length-1))*cw);
  const y=(v)=> top + ((max - Number(v)) / (max-min)) * ch;
  const grid=[0,1,2,3,4,5].map(v=>`<line class="chart-grid" x1="${left}" x2="${w-right}" y1="${y(v)}" y2="${y(v)}"/>`).join("");
  const labels = days.filter((_,i)=> i===0 || i===days.length-1 || i%3===0).map((d)=>{
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
  await renderRewardHistory();
  const days = lastNDays(14);
  const moodLogs = await idbGetAll("moodLogs");
  const healthLogs = await idbGetAll("healthLogs");
  const moodChart = $("#moodChart");
  const healthChart = $("#healthChart");
  if(moodChart){
    moodChart.innerHTML = renderLineChart(days, [
      { cls:"energy", values: dailyAverage(moodLogs, days, "energy") },
      { cls:"anxiety", values: dailyAverage(moodLogs, days, "anxiety") }
    ]);
  }
  if(healthChart){
    healthChart.innerHTML = renderLineChart(days, [
      { cls:"fatigue", values: dailyAverage(healthLogs, days, "fatigue") },
      { cls:"headache", values: dailyAverage(healthLogs, days, "headache") },
      { cls:"stomach", values: dailyAverage(healthLogs, days, "stomachache") },
      { cls:"period", values: dailyAverage(healthLogs, days, "periodPain") }
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
  const cp=$("#characterPicker"); if(cp){ cp.innerHTML=""; Object.values(characters).forEach(ch=>{ const b=document.createElement("button"); b.className=`picker-card ${settings.characterId===ch.id?"selected":""}`; b.style.backgroundImage=`linear-gradient(135deg, rgba(0,0,0,.52), rgba(0,0,0,.10)), url("${assetUrl(ch.image)}")`; b.innerHTML=`<span>${ch.name}</span><small>${ch.title}</small>`; b.onclick=()=>{ settings.characterId=ch.id; saveSettings(); renderHome(); renderRewardUI(); renderPickers(); showToast(`${ch.name}に切り替えたよ`); }; cp.appendChild(b); }); }
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

async function exportData(){ const payload={ exportedAt:new Date().toISOString(), settings, healthLogs:await idbGetAll("healthLogs"), moodLogs:await idbGetAll("moodLogs"), schedules:await idbGetAll("schedules"), diaries:await idbGetAll("diaries"), dailyTasks:await idbGetAll("dailyTasks"), taskCompletions:await idbGetAll("taskCompletions"), oneShotTasks:await idbGetAll("oneShotTasks"), rewardEvents:await idbGetAll("rewardEvents") }; const blob=new Blob([JSON.stringify(payload,null,2)], {type:"application/json"}); const url=URL.createObjectURL(blob); const a=document.createElement("a"); a.href=url; a.download=`infinity-care-backup-${todayISO()}.json`; a.click(); URL.revokeObjectURL(url); }
async function importData(event){ const file=event.target.files?.[0]; if(!file)return; try{ const p=JSON.parse(await file.text()); if(p.settings){ settings=mergeSettings(defaultSettings,p.settings); saveSettings(); } for(const [key,storeName] of [["healthLogs","healthLogs"],["moodLogs","moodLogs"],["schedules","schedules"],["diaries","diaries"],["dailyTasks","dailyTasks"],["taskCompletions","taskCompletions"],["oneShotTasks","oneShotTasks"],["rewardEvents","rewardEvents"]]){ if(Array.isArray(p[key])){ await idbClear(storeName); for(const item of p[key]){ if(storeName==="healthLogs" && !item.id) item.id=logId("health", item.date || todayISO(), item.time || "00:00"); if(storeName==="moodLogs" && !item.id) item.id=logId("mood", item.date || todayISO(), item.time || "00:00"); await idbPut(storeName,item); } } } renderHome(); renderPickers(); loadSettingsForm(); showToast("バックアップを読み込んだよ"); }catch(e){ console.error(e); showToast("読み込みに失敗したかも"); } }


function setActiveNav(panelId){ $$(".bottom-nav button[data-panel]").forEach(btn=>btn.classList.toggle("active", btn.dataset.panel===panelId)); }

async function clearPrototypeCaches(){ if("serviceWorker" in navigator){ try{ const regs=await navigator.serviceWorker.getRegistrations(); await Promise.all(regs.map(r=>r.unregister())); }catch{} } if("caches" in window){ try{ const keys=await caches.keys(); await Promise.all(keys.filter(k=>k.startsWith("infinity-care")).map(k=>caches.delete(k))); }catch{} } }
function bindEvents(){
  $$(".bottom-nav button[data-panel]").forEach(b=>b.addEventListener("click", async()=>{ setActiveNav(b.dataset.panel); openPanel(b.dataset.panel); if(b.dataset.panel === "schedulePanel"){ await renderTaskPanel(); setSpeech(await todayScheduleSpeechLine()); } else setSpeech(weatherSpeechLine()); }));
  $("#openSettings").addEventListener("click",()=>openPanel("settingsPanel"));
  $(".home-stage").addEventListener("click", (e)=>{ if(e.target.closest(".character, .speech-card")) setSpeech(homeTapLine()); });
  $$(".close-panel").forEach(b=>b.addEventListener("click", closePanels));
  $$(".panel").forEach(p=>p.addEventListener("click", e=>{ if(e.target===p) closePanels(); }));
  $("#healthForm").addEventListener("submit", saveHealth);
  $("#moodForm").addEventListener("submit", saveMood);
  $("#scheduleForm").addEventListener("submit", saveSchedule);
  $("#diaryForm").addEventListener("submit", saveDiary);
  $("#settingsForm").addEventListener("submit", saveSettingsForm);
  $("#dailyTaskForm")?.addEventListener("submit", addDailyTask);
  $("#oneShotTaskForm")?.addEventListener("submit", addOneShotTask);
  $("#rewardClose")?.addEventListener("click", hideRewardPopup);
  $("#rewardPop")?.addEventListener("click", (e)=>{ if(e.target.id === "rewardPop") hideRewardPopup(); });
  $("#fetchWeather")?.addEventListener("click", ()=>updateWeatherFromCity(true));
  $("#weatherCard")?.addEventListener("click", ()=>updateWeatherFromCity(true));
  $("#settingsForm").characterScale.addEventListener("input", e=>{ $("#scaleValue").textContent=`${e.target.value}%`; settings.characterScale=Number(e.target.value); applyCharacterScale(); });
  $("#exportData").addEventListener("click", exportData); $("#importData").addEventListener("change", importData);
  $$("input[type='range']").forEach(i=>i.addEventListener("input",()=>syncRangeLabels(document)));
  $("#moodForm").addEventListener("input", updateSupportPrompt); $("#makeMoodPrompt").addEventListener("click", updateSupportPrompt);
  $("#copySupportPrompt").addEventListener("click", copySupportPrompt);
  $("#openChatGPT").addEventListener("click", async()=>{ await copySupportPrompt(); window.open("https://chatgpt.com/", "_blank", "noopener"); });
  $("#scheduleForm").date.value=todayISO();
  $("#healthForm").date.value=todayISO(); if($("#healthForm").time) $("#healthForm").time.value=currentTimeHM();
  $("#moodForm").date.value=todayISO(); if($("#moodForm").time) $("#moodForm").time.value=currentTimeHM();
  $("#diaryForm").date.value=todayISO();
}

async function init(){ await clearPrototypeCaches(); db=await openDB(); bindEvents(); preloadBackgrounds(); renderHome(); renderRewardUI(); renderPickers(); loadSettingsForm(); syncRangeLabels(document); setActiveNav("moodPanel"); await renderSchedules(); maybeRefreshWeather(); setInterval(updateClock, 30 * 1000); }
init().catch(e=>{ console.error(e); showToast("初期化に失敗したかも"); });
