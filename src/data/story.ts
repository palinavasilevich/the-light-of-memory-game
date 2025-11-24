import type { SceneType } from "../types/game";

import { images } from "../data/images";
import { sounds } from "./sounds";

export const story: SceneType[] = [
  // ===== CHAPTER 1 =====
  {
    groupId: "chapter1",
    id: "chapter1_1",
    backgroundImg: images.firstChapter.estate,
    text: "Ты просыпаешься на холодном полу...",
    sound: sounds.firstChapter.thunder,
    storyteller: { name: "Storyteller" },
  },
  {
    groupId: "chapter1",
    id: "chapter1_2",
    backgroundImg: images.firstChapter.estate,
    // text: "Голова гудит. В висках — тяжесть, будто после слишком долгого сна.",
    text: "Голова гудит. В висках пульсирует тупая боль, будто после слишком долгого сна.",
    sound: sounds.firstChapter.thunder,
    storyteller: { name: "Storyteller" },
  },
  {
    groupId: "chapter1",
    id: "chapter1_3",
    backgroundImg: images.firstChapter.estate,
    text: "Или, может, просто сказывается возраст — тебе ведь уже за тридцать...",
    sound: sounds.firstChapter.thunder,
    storyteller: { name: "Storyteller" },
    actions: [
      {
        id: "act-0",
        text: "Подняться на ноги и осмотреться вокруг",
      },
    ],
  },
  {
    groupId: "chapter1",
    id: "chapter1_4",
    backgroundImg: images.firstChapter.corridor,
    text: "Вокруг — разбросанные страницы книг, осколки стекла и обломки мебели.",
    sound: sounds.firstChapter.thunder,
    storyteller: { name: "Storyteller" },
  },
  {
    groupId: "chapter1",
    id: "chapter1_5",
    backgroundImg: images.firstChapter.corridor,
    text: "В воздухе висит терпкий запах пыли и старого дерева.",
    sound: sounds.firstChapter.thunder,
    storyteller: { name: "Storyteller" },
  },
  {
    groupId: "chapter1",
    id: "chapter1_6",
    backgroundImg: images.firstChapter.corridor,
    text: "Тусклые, мерцающие светильники выхватывают из темноты разрушенный коридор.",
    // text: "Тусклый свет луны из окна выхватывают из темноты разрушенный коридор.",
    sound: sounds.firstChapter.thunder,
    storyteller: { name: "Storyteller" },
  },
  {
    groupId: "chapter1",
    id: "chapter1_7",
    backgroundImg: images.firstChapter.doorAndMirror,
    // text: "В нескольких шагах — перекошенная дверь. У ног блестят осколоки зеркала.",
    text: "В нескольких шагах от тебя - перекошенная дверь. На стене рядом ты видишь разбитое зеркало.",
    sound: sounds.firstChapter.thunder,
    storyteller: { name: "Storyteller" },
    actions: [
      {
        id: "chapter1_act_1",
        text: "Осмотреть дверь",
        nextSceneId: "chapter1_8",
      },
      {
        id: "chapter1_act_2",
        text: "Осмотреть зеркало",
        nextSceneId: "chapter1_11",
      },
    ],
  },
  {
    groupId: "chapter1",
    id: "chapter1_8",
    backgroundImg: images.firstChapter.door,
    text: "Ты подходишь ближе. Дерево рассохлось, краска облупилась, трещины потемнели от времени.",
    sound: sounds.firstChapter.thunder,
    storyteller: { name: "Storyteller" },
    actions: [
      {
        id: "chapter1_act_3",
        // text: "Прислониться ухом к двери, ловя каждый звук",
        text: "Прислониться ухом к двери и прислушаться",
        nextSceneId: "chapter1_9",
      },
    ],
  },
  {
    groupId: "chapter1",
    id: "chapter1_9",
    backgroundImg: images.firstChapter.door,
    text: "За дверью — едва различимый шелест, будто кто-то неторопливо листает страницы.",
    sound: sounds.firstChapter.paperFlutter,
    storyteller: { name: "Storyteller" },
  },
  {
    groupId: "chapter1",
    id: "chapter1_10",
    backgroundImg: images.firstChapter.door,
    text: `"Шелест страниц... Может, за дверью библиотека?"`,
    sound: sounds.firstChapter.paperFlutter,
    storyteller: { name: "Player" },
    showAvailableActions: true,
    nextSceneId: "chapter1_19_1",
  },
  ///mirror
  {
    groupId: "chapter1",
    id: "chapter1_11",
    backgroundImg: images.firstChapter.vision,
    text: "В осколках зеркала мелькает силуэт молодого мужчины. Он стоит за письменным столом, в руке — книга.",
    sound: sounds.firstChapter.memory,
    storyteller: { name: "Storyteller" },
  },
  {
    groupId: "chapter1",
    id: "chapter1_12",
    backgroundImg: images.firstChapter.vision,
    text: "Мужчина берёт со стола письмо, разворачивает его и начинает читать. На его лице появляется тёплая улыбка - будто строки возвращают его в счастливые моменты.",
    sound: sounds.firstChapter.memory,
    storyteller: { name: "Storyteller" },
  },
  {
    groupId: "chapter1",
    id: "chapter1_13",
    backgroundImg: images.firstChapter.vision,
    // text: `На его перчатке виднеется гравировка: "AD MEMORIAM".`,
    text: "Твои глаза невольно задерживаются на его перчатках.",
    sound: sounds.firstChapter.memory,
    storyteller: { name: "Storyteller" },
  },
  {
    groupId: "chapter1",
    id: "chapter1_14",
    backgroundImg: images.firstChapter.gloves,
    // text: `На его перчатке виднеется гравировка: "AD MEMORIAM".`,
    text: "Они покрыты странными узорами и излучают лёгкое мерцание, как магические предметы, которые редко встретишь в реальном мире.",
    sound: sounds.firstChapter.memory,
    storyteller: { name: "Storyteller" },
  },
  {
    groupId: "chapter1",
    id: "chapter1_15",
    backgroundImg: images.firstChapter.gloves,
    text: `Приглядевшись внимательнее, ты замечаешь на перчатке выгравированную надпись: <i>"ZUM SPEICHER"</i>.`,
    sound: sounds.firstChapter.memory,
    storyteller: { name: "Storyteller" },
  },
  {
    groupId: "chapter1",
    id: "chapter1_16",
    backgroundImg: images.firstChapter.gloves,
    text: `"Эта надпись... Почему она кажется мне знакомой?"`,
    sound: sounds.firstChapter.memory,
    storyteller: { name: "Player" },
    actions: [
      {
        id: "chapter1_act_4",
        text: "Попробовать вспомнить значение фразы",
        nextSceneId: "chapter1_17",
      },
    ],
  },
  {
    groupId: "chapter1",
    id: "chapter1_17",
    backgroundImg: images.firstChapter.gloves,
    text: "Ты напрягаешь память, стараясь вытащить из глубин сознания смысл этих слов.",
    sound: sounds.firstChapter.memory,
    storyteller: { name: "Storyteller" },
  },
  {
    groupId: "chapter1",
    id: "chapter1_18",
    backgroundImg: images.firstChapter.doorAndMirror,
    text: "Зеркало вдруг трескается. Яркая вспышка света — и ты снова оказываешься в разрушенном коридоре.",
    sound: sounds.firstChapter.thunder,
    notSoundLoop: true,
    storyteller: { name: "Storyteller" },
    showAvailableActions: true,
    nextSceneId: "chapter1_19_1",
  },

  {
    groupId: "chapter1",
    id: "chapter1_19_1",
    backgroundImg: images.firstChapter.door,
    text: "Ты стоишь возле двери. В памяти ещё живо зеркальное видение: мужчина, письмо, необычные перчатки.",
    sound: sounds.firstChapter.thunder,
    storyteller: { name: "Storyteller" },
    nextSceneId: "chapter1_19_2",
  },

  {
    groupId: "chapter1",
    id: "chapter1_19_2",
    backgroundImg: images.firstChapter.door,
    text: `Слова <i>"ZUM SPEICHER"</i> отзываются эхом в твоей голове...`,
    sound: sounds.firstChapter.thunder,
    storyteller: { name: "Storyteller" },
    nextSceneId: "chapter1_19_3",
  },

  {
    groupId: "chapter1",
    id: "chapter1_19_3",
    backgroundImg: images.firstChapter.door,
    text: "Перед тобой старая дверь, за которой, похоже, скрыты ответы на твои вопросы.",
    sound: sounds.firstChapter.thunder,
    storyteller: { name: "Storyteller" },
    nextSceneId: "chapter1_19_4",
  },

  {
    groupId: "chapter1",
    id: "chapter1_19_4",
    backgroundImg: images.firstChapter.door,
    text: `Ты делаешь глубокий вдох и решаешься войти внутрь.`,
    sound: sounds.firstChapter.thunder,
    storyteller: { name: "Storyteller" },
    actions: [{ id: "chapter1_act_5", text: "Открыть дверь" }],
  },
  // ===== CHAPTER 2 =====
  {
    groupId: "chapter2",
    id: "chapter2_1",
    backgroundImg: images.secondChapter.library,
    text: "Ты медленно входишь в комнату. Внутри всё кажется неподвижным, будто время здесь остановилось.",
    sound: sounds.secondChapter.library,
    storyteller: { name: "Storyteller" },
  },
  {
    groupId: "chapter2",
    id: "chapter2_2",
    backgroundImg: images.secondChapter.library,
    text: "В воздухе витает запах старой бумаги и пыли.",
    sound: sounds.secondChapter.library,
    storyteller: { name: "Storyteller" },
    actions: [
      {
        id: "chapter2_act_0",
        text: "Осмотреться вокруг",
      },
    ],
  },
  {
    groupId: "chapter2",
    id: "chapter2_3",
    backgroundImg: images.secondChapter.bookShelves,
    text: "Вдоль стен тянутся высокие стеллажи с тысячами книг, потемневших от времени и покрытых (thin or thick) слоем пыли.",
    sound: sounds.secondChapter.library,
    storyteller: { name: "Storyteller" },
  },
  {
    groupId: "chapter2",
    id: "chapter2_5",
    backgroundImg: images.secondChapter.shelfRows,
    text: "Когда ты проходишь мимо книжных полок, некоторые будто слегка сдвигаются, их страницы шелестят — словно приветствуя старого знакомого.",
    sound: sounds.secondChapter.library,
    storyteller: { name: "Storyteller" },
    actions: [
      {
        id: "chapter2_act_1",
        text: "Осмотреть книжные полки",
      },
    ],
  },
  // --- ПОЛКИ ---
  {
    groupId: "chapter2",
    id: "chapter2_6",
    backgroundImg: images.secondChapter.shelfClose,
    text: "Ты проводишь пальцами по пыльным корешкам книг. Одна из книг поддаётся — и из-за неё выпадает свернутый пополам лист бумаги.",
    sound: sounds.secondChapter.library,
    storyteller: { name: "Storyteller" },
    actions: [
      {
        id: "chapter2_act_2",
        text: "Развернуть лист",
      },
    ],
  },
  {
    groupId: "chapter2",
    id: "chapter2_7",
    backgroundImg: images.secondChapter.scorpion,
    text: "На бумаге ты видишь аккуратный чертёж какого-то механического устройства. Тонкие линии складываясь в очертание существа... напоминающего тебе скорпиона.",
    // text: "На бумаге ты видишь аккуратный чертёж каково-то механического устройства. На нём тонкие линии переплетаются с непонятными тебе символами.",
    // Стрелки, подписи, линии — всё выверено, как будто создано рукой мага-инженера.",
    sound: sounds.secondChapter.library,
    storyteller: { name: "Storyteller" },
    actions: [
      {
        id: "chapter2_act_3",
        text: "Забрать чертёж",
      },
    ],
  },
  {
    groupId: "chapter2",
    id: "chapter2_8",
    backgroundImg: images.secondChapter.scorpion,
    text: "Ты аккуратно складываешь чертёж и убираешь его в карман. Почему-то тебе кажется, что он ещё пригодится.",
    sound: sounds.secondChapter.library,
    storyteller: { name: "Storyteller" },
  },
  {
    groupId: "chapter2",
    id: "chapter2_9",
    backgroundImg: images.secondChapter.topShelf,
    text: "На верхней полке что-то слегка блестит между книгами.",
    sound: sounds.secondChapter.library,
    storyteller: { name: "Storyteller" },
    actions: [
      {
        id: "chapter2_act_4",
        text: "Подойти ближе и рассмотреть",
      },
    ],
  },
  {
    groupId: "chapter2",
    id: "chapter2_10",
    backgroundImg: images.secondChapter.mouse,
    // text: "Между книг ты замечаешь крошечную фигурку мыши 🐭 из тёмного металла. В её глазах тускло мерцают крошечные рубины.",
    text: "Между книг ты замечаешь крошечную фигурку мыши 🐭. Фигурка холодна на ощупь и сделана из потемневшего металла.",
    sound: sounds.secondChapter.library,
    storyteller: { name: "Storyteller" },

    actions: [
      {
        id: "chapter2_act_11",
        text: "Забрать фигурку",
      },
    ],
  },

  {
    groupId: "chapter2",
    id: "chapter2_11",
    backgroundImg: images.secondChapter.table,
    // text: "В дальнем конце комнаты стоит стол, на котором разбросаны старые бумаги.",
    text: "Перед тобой дубовый стол, на котором лежат несколько старых книг и груда пожелтевших от времени бумаг.",
    sound: sounds.secondChapter.library,
    storyteller: { name: "Storyteller" },
    actions: [
      {
        id: "chapter2_act_5",
        text: "Осмотреть стол",
      },
    ],
  },
  // --- СТОЛИК И ПИСЬМО ---

  {
    groupId: "chapter2",
    id: "chapter2_12",
    backgroundImg: images.secondChapter.letter,
    text: "Среди бумаг ты замечаешь письмо с выцветшими чернилами. Некоторые строки всё ещё можно разобрать, хотя большая часть текста давно стерлась временем.",
    sound: sounds.secondChapter.library,
    storyteller: { name: "Storyteller" },
    actions: [
      {
        id: "chapter2_act_6",
        text: "Прочесть письмо",
        extraContent: {
          image: images.secondChapter.letterText,
        },
        nextSceneId: "chapter2_14",
      },
    ],
  },

  {
    groupId: "chapter2",
    id: "chapter2_14",
    backgroundImg: images.secondChapter.memory,
    sound: sounds.secondChapter.library,
    text: "Мир вокруг меркнет. В голове вспыхивают образы — короткие, обрывочные: смех, солнечный свет на ладонях, чьё-то знакомое лицо.",
    storyteller: { name: "Storyteller" },
  },
  {
    groupId: "chapter2",
    id: "chapter2_15",
    backgroundImg: images.secondChapter.memory,
    sound: sounds.secondChapter.library,
    text: "Ты пытаешься удержать их, но они тают, как дым...",
    storyteller: { name: "Storyteller" },
  },
  {
    groupId: "chapter2",
    id: "chapter2_16",
    backgroundImg: images.secondChapter.book,
    sound: sounds.secondChapter.book,
    text: "Ты возвращаешься в реальность. Мягкий свет падает на книгу в тёмно-зелёном переплёте на столе.",
    storyteller: { name: "Storyteller" },
  },
  {
    groupId: "chapter2",
    id: "chapter2_17",
    backgroundImg: images.secondChapter.book,
    text: "Внутри что-то будто подсказывает — здесь спрятана тайна, которую нужно разгадать.",
    sound: sounds.secondChapter.book,
    storyteller: { name: "Storyteller" },
    actions: [
      {
        id: "chapter2_act_7",
        text: "Осмотреть книгу",
      },
    ],
  },
  {
    groupId: "chapter2",
    id: "chapter2_18",
    backgroundImg: images.secondChapter.book,
    text: "Переплёт покрыт странными символами — смесью рун и знаков древнего языка, напоминающего тебе эльфийский.",
    sound: sounds.secondChapter.book,
    storyteller: { name: "Storyteller" },
  },
  {
    groupId: "chapter2",
    id: "chapter2_19",
    backgroundImg: images.secondChapter.book,
    text: "Ты проводишь пальцами по обложке и она едва заметно дрожит, словно отзываясь на прикосновение.",
    sound: sounds.secondChapter.book,
    storyteller: { name: "Storyteller" },
  },

  {
    groupId: "chapter2",
    id: "chapter2_19",
    backgroundImg: images.secondChapter.bookOpen,
    text: "Внезапно книга раскрывается. Буквы на страницах оживают и начинают складываться в строки на смутно знакомом тебе языке.",
    sound: sounds.secondChapter.book,
    storyteller: { name: "Storyteller" },
  },

  {
    groupId: "chapter2",
    id: "chapter2_21",
    backgroundImg: images.secondChapter.bookOpen,
    text: "Это не эльфийский, как показалось сначала... Это древний земнийский.",
    sound: sounds.secondChapter.book,
    storyteller: { name: "Storyteller" },
  },
  {
    groupId: "chapter2",
    id: "chapter2_22",
    backgroundImg: images.secondChapter.bookOpen,
    text: `"Древний земнийский?.. Откуда я его вообще знаю?.."`,
    sound: sounds.secondChapter.book,
    storyteller: { name: "Player" },
  },
  {
    groupId: "chapter2",
    id: "chapter2_23",
    backgroundImg: images.secondChapter.bookOpen,
    text: `Голос из темноты прерывает твои мысли: <br/>
            <i class="text-2xl">"BEOBACHTEN... LERNEN... WACHSEN..."</i>`,
    puzzle: {
      id: "chapter2_puzzle_0",
      type: "sentence",
      nextSceneId: "chapter2_24",
    },
    sound: sounds.secondChapter.book,
    storyteller: { name: "Storyteller" },
    actions: [
      {
        id: "chapter2_act_7",
        text: "Попытаться прочитать текст",
      },
    ],
  },

  {
    groupId: "chapter2",
    id: "chapter2_24",
    backgroundImg: images.secondChapter.bookLetters,
    text: `Слова вспыхивают мягким золотым светом и складываются в новую фразу: <br/> <i>"FOLGE DER GOLDENEN MAUS."</i>`,
    sound: sounds.secondChapter.openBook,
    storyteller: { name: "Storyteller" },
    // duration: 3000,
  },
  {
    groupId: "chapter2",
    id: "chapter2_25",
    backgroundImg: images.secondChapter.bookLetters,
    text: "Ты чувствуешь лёгкое движение в кармане...",
    sound: sounds.secondChapter.openBook,
    storyteller: { name: "Storyteller" },
    actions: [
      {
        id: "chapter2_act_8",
        text: "Проверить карман",
      },
    ],
  },
  {
    groupId: "chapter2",
    id: "chapter2_26",
    backgroundImg: images.secondChapter.libraryWall,
    text: "Доставая фигурку, ты видишь, как она оживает на твоей ладоне. Мышь спрыгивает на пол и бежит в дальнюю часть комнаты.",
    sound: sounds.secondChapter.openBook,
    storyteller: { name: "Storyteller" },
    actions: [
      {
        id: "chapter2_act_9",
        text: "Следовать за ней",
      },
    ],
  },

  {
    groupId: "chapter2",
    id: "chapter2_28",
    backgroundImg: images.secondChapter.libraryWall,
    // text: "Ты идёшь следом и видишь, как каменная плита в стене медленно сдвигается, открывая узкий проход вниз.",
    text: "Ты идёшь следом и видишь, как каменная плита в стене медленно сдвигается, открывая узкий проход.",
    sound: sounds.secondChapter.openBook,
    storyteller: { name: "Storyteller" },
    actions: [
      {
        id: "chapter2_act_10",
        text: "Спуститься вниз",
      },
    ],
  },
  // ===== CHAPTER 3 =====
  {
    groupId: "chapter_3",
    id: "chapter3_1",
    backgroundImg: images.thirdChapter.staircase,
    sound: sounds.thirdChapter.water,
    text: "Ты спускаешься всё ниже по каменной лестнице. Воздух становится холоднее, а стены покрываются влагой.",
    storyteller: { name: "Storyteller" },
  },
  {
    groupId: "chapter_3",
    id: "chapter3_2",
    backgroundImg: images.thirdChapter.corridor,
    sound: sounds.thirdChapter.echo,
    text: "Каждый шаг отдаётся эхом в тёмном коридоре.",
    storyteller: { name: "Storyteller" },
  },
  {
    groupId: "chapter_3",
    id: "chapter3_3",
    backgroundImg: images.thirdChapter.corridor,
    sound: sounds.thirdChapter.echo,
    // text: "Тьма сгущается, и только редкие проблески света освещают тебе путь, словно направляя тебя к чему-то.",
    text: "Тьма сгущается, лишь редкие проблески света скользят по стенам, будто направляя тебя вперёд.",
    storyteller: { name: "Storyteller" },
  },
  // --- зал ---
  {
    groupId: "chapter_3",
    id: "chapter3_4",
    backgroundImg: images.thirdChapter.room,
    sound: sounds.thirdChapter.roomAmbience,
    text: "Наконец, ты оказываешься в просторном помещении. Высокие арки теряются во мраке, воздух пропитан гарью.",
    storyteller: { name: "Storyteller" },
  },

  {
    groupId: "chapter_3",
    id: "chapter3_6",
    backgroundImg: images.thirdChapter.room,
    sound: sounds.thirdChapter.roomAmbience,
    text: "Вокруг хаос: разбитые колбы, обугленные листы бумаги, разбросанные шестерёнки и фрагменты механизмов.",
    storyteller: { name: "Storyteller" },
  },
  {
    groupId: "chapter_3",
    id: "chapter3_7",
    backgroundImg: images.thirdChapter.table,
    sound: sounds.thirdChapter.roomAmbience,
    text: "У дальней стены стоит массивный стол, заваленный бумагами и металлическими деталями.",
    storyteller: { name: "Storyteller" },
    actions: [
      {
        id: "chapter3_act_0",
        text: "Осмотреть стол",
      },
    ],
  },
  // --- тетрадь ---
  {
    groupId: "chapter_3",
    id: "chapter3_8",
    backgroundImg: images.thirdChapter.notebook,
    sound: sounds.thirdChapter.roomAmbience,
    text: "Ты осторожно разгребаешь завалы на столе. Под слоем пепла ты находишь обгоревшую тетрадь в растрескавшейся кожаной обложке.",
    storyteller: { name: "Storyteller" },
    actions: [
      {
        id: "chapter3_act_1",
        text: "Открыть тетрадь",
      },
    ],
  },
  {
    groupId: "chapter_3",
    id: "chapter3_9",
    backgroundImg: images.thirdChapter.notebookOpen,
    sound: sounds.thirdChapter.roomAmbience,
    // text: "Это дневник. Большинство страниц уничтожено огнём, но кое-где ты можешь разобрать обрывки строк и символов.",
    text: "Это дневник. Большинство страниц уничтожено огнём, но кое-где видны обрывки строк и чертежи непонятных конструкций.",
    storyteller: { name: "Storyteller" },
  },
  {
    groupId: "chapter_3",
    id: "chapter3_10",
    backgroundImg: images.thirdChapter.notebookOpen,
    sound: sounds.thirdChapter.roomAmbience,
    // text: "Ты читаешь записи о жизни и экспериментах в этом месте, о попытках подчинить древнюю магию.",
    text: "Ты читаешь о попытках подчинить древнюю магию… и о страхе, что сила вот-вот выйдет из-под контроля.",
    storyteller: { name: "Storyteller" },
  },
  {
    groupId: "chapter_3",
    id: "chapter3_11",
    backgroundImg: images.thirdChapter.notebookOpenMessage,
    sound: sounds.thirdChapter.roomAmbience,
    text: "Последняя уцелевшая строка написана дрожащей рукой, буквы едва различимы.",
    storyteller: { name: "Storyteller" },
  },
  {
    groupId: "chapter_3",
    id: "chapter3_12",
    backgroundImg: images.thirdChapter.notebookOpenMessage,
    sound: sounds.thirdChapter.roomAmbience,
    // text: "Сила вырывается из-под контроля... Он готов переступить черту, чтобы закончить начатое...",
    text: '"<i>...Он готов переступить черту, чтобы закончить начатое... Я должен найти способ останов...</i>"',
    storyteller: { name: "Storyteller" },
  },
  {
    groupId: "chapter_3",
    id: "chapter3_13",
    backgroundImg: images.thirdChapter.notebookOpenMessage,
    sound: sounds.thirdChapter.roomAmbience,
    text: "Ты перечитываешь строки снова и снова. Где-то глубоко внутри рождается ощущение... будто ты знаешь, кто это написал и почему.",
    storyteller: { name: "Storyteller" },
  },
  {
    groupId: "chapter_3",
    id: "chapter3_14",
    backgroundImg: images.thirdChapter.table,
    sound: sounds.thirdChapter.roomAmbience,
    text: "Мысль вспыхивает и медленно гаснет, оставляя после себя странное чувство вины и утраты.",
    storyteller: { name: "Storyteller" },
  },
  {
    groupId: "chapter_3",
    id: "chapter3_15",
    backgroundImg: images.thirdChapter.table,
    sound: sounds.thirdChapter.roomAmbience,
    text: "Тонкий писк мышки, твоего нового друга, возвращает тебя в реальность.",
    storyteller: { name: "Storyteller" },
  },
  // --- механизм ---
  {
    groupId: "chapter_3",
    id: "chapter3_16",
    backgroundImg: images.thirdChapter.scorpion,
    sound: sounds.thirdChapter.roomAmbience,
    text: "Ты поднимаешь взгляд и замечаешь на столе странное устройство, покрытое копотью.",
    storyteller: { name: "Storyteller" },
    actions: [
      {
        id: "chapter3_act_2",
        text: "Осмотреть устройство",
      },
    ],
  },
  {
    groupId: "chapter_3",
    id: "chapter3_17",
    backgroundImg: images.thirdChapter.scorpion,
    sound: sounds.thirdChapter.roomAmbience,
    text: "Наполовину собранный механизм напоминает тебе устройство, чертёж которого ты нашёл в библиотеке.",
    storyteller: { name: "Storyteller" },
  },
  {
    groupId: "chapter_3",
    id: "chapter3_18",
    backgroundImg: images.thirdChapter.scorpion,
    sound: sounds.thirdChapter.roomAmbience,
    text: "Корпус треснул, но шестерёнки внутри целы. Кажется, если всё установить правильно, механизм можно оживить.",
    storyteller: { name: "Storyteller" },
    actions: [
      {
        id: "chapter3_act_3",
        text: "Попробовать собрать механизм",
      },
    ],
    puzzle: {
      id: "chapter3_puzzle_0",
      type: "scorpion",
      nextSceneId: "chapter3_19",
    },
  },
  // --- активация ---
  {
    groupId: "chapter_3",
    id: "chapter3_19",
    backgroundImg: images.thirdChapter.scorpionActivated,
    sound: sounds.thirdChapter.memory,
    text: "Когда последний сегмент встаёт на место, скорпион оживает.",
    storyteller: { name: "Storyteller" },
  },
  {
    groupId: "chapter_3",
    id: "chapter3_20",
    backgroundImg: images.thirdChapter.scorpionActivated,
    sound: sounds.thirdChapter.memory,
    text: "Его глаза вспыхивают янтарным светом, а из его хвоста вырывается тонкий зелёный луч, направленный в стену.",
    storyteller: { name: "Storyteller" },
  },
  {
    groupId: "chapter_3",
    id: "chapter3_21",
    backgroundImg: images.thirdChapter.scorpionMessage,
    sound: sounds.thirdChapter.memory,
    text: 'На стене проступают слова: <i class="text-2xl">"SIEH DAS LICHT IM SPIEGEL..."</i>',
    storyteller: { name: "Storyteller" },
  },

  {
    groupId: "chapter_3",
    id: "chapter3_21",
    backgroundImg: images.thirdChapter.scorpionMessage,
    sound: sounds.thirdChapter.memory,
    text: '"Снова древний земнийский?.."',
    storyteller: { name: "Storyteller" },
  },

  {
    groupId: "chapter_3",
    id: "chapter3_22",
    backgroundImg: images.thirdChapter.scorpionMessage,
    sound: sounds.thirdChapter.memory,
    text: "Ты видишь своё отражение в блеске металла — и вдруг понимаешь, что кто-то оставил это устройство именно для тебя.",
    storyteller: { name: "Storyteller" },
  },
  {
    groupId: "chapter_3",
    id: "chapter3_23",
    backgroundImg: images.thirdChapter.scorpionButton,
    sound: sounds.thirdChapter.memory,
    text: "Свет меркнет. Скорпион замирает... но под панцирем начинает мерцать тусклый огонёк.",
    storyteller: { name: "Storyteller" },
  },
  // --- кнопка ---
  {
    groupId: "chapter_3",
    id: "chapter3_24",
    backgroundImg: images.thirdChapter.scorpionButton,
    sound: sounds.thirdChapter.memory,
    text: "Под панцирем ты замечаешь крошечную рубиновую кнопку. Она будто зовёт — нажми меня.",
    storyteller: { name: "Storyteller" },
    actions: [
      {
        id: "chapter3_act_4",
        text: "Нажать кнопку",
      },
    ],
  },
  {
    groupId: "chapter_3",
    id: "chapter3_25",
    backgroundImg: images.thirdChapter.darkness,
    sound: sounds.thirdChapter.darkness,
    text: `<span class="text-3xl">Щелчок...</span>`,
    storyteller: { name: "Storyteller" },
    duration: 3000,
  },
  {
    groupId: "chapter_3",
    id: "chapter3_26",
    backgroundImg: images.thirdChapter.darkness,
    sound: sounds.thirdChapter.darkness,
    text: `<span class="text-3xl">Тьма...</span>`,
    storyteller: { name: "Storyteller" },
    duration: 3000,
  },
  {
    groupId: "chapter_3",
    id: "chapter3_27",
    backgroundImg: images.thirdChapter.darkness,
    sound: sounds.thirdChapter.darkness,
    text: `<span class="text-3xl">WASTED...</span>`,
    storyteller: { name: "Storyteller" },
    duration: 8000,
  },
  {
    groupId: "chapter_3",
    id: "chapter3_28",
    backgroundImg: images.thirdChapter.darkness,
    sound: sounds.thirdChapter.darkness,
    text: "Ладно, это шутка😉 Можешь продолжить.",
    storyteller: { name: "Storyteller" },
  },
  {
    groupId: "chapter_3",
    id: "chapter3_29",
    backgroundImg: images.thirdChapter.flash,
    sound: sounds.thirdChapter.darkness,
    text: "Рубиновый свет заполняет всё вокруг, и мир растворяется в вихре света и пыли…",
    storyteller: { name: "Storyteller" },
  },
  // ===== CHAPTER 4 =====

  // --- Вход в обсерваторию ---
  {
    groupId: "chapter_4",
    id: "chapter_4_1",
    backgroundImg: images.fourthChapter.flash,
    sound: sounds.fourthChapter.observatory,
    text: `Вспышка рубинового света ослепляет тебя.`,
    storyteller: { name: "Storyteller" },
  },

  {
    groupId: "chapter_4",
    id: "chapter_4_2",
    backgroundImg: images.fourthChapter.observatory,
    sound: sounds.fourthChapter.observatory,
    text: `Когда зрение постепенно возвращается, ты понимаешь, что стоишь в огромной заброшенной обсерватории.`,
    storyteller: { name: "Storyteller" },
  },

  {
    groupId: "chapter_4",
    id: "chapter_4_3",
    backgroundImg: images.fourthChapter.telescope,
    sound: sounds.fourthChapter.observatory,
    text: "На стенах ты видишь пыльные звёздные карты, телескоп, покрытый паутиной, окна с сетью трещин.",
    storyteller: { name: "Storyteller" },
  },

  {
    groupId: "chapter_4",
    id: "chapter_4_4",
    backgroundImg: images.fourthChapter.observatory,
    sound: sounds.fourthChapter.observatory,
    text: "Холодный лунный свет пробивается сквозь трещины в куполе, выхватывая из темноты массивный каменный алтарь в центре зала.",
    storyteller: { name: "Storyteller" },
    actions: [
      {
        id: "chapter4_act_0",
        text: "Осмотреть алтарь",
      },
    ],
  },

  // --- Алтарь и кристалл ---
  {
    groupId: "chapter_4",
    id: "chapter_4_5",
    backgroundImg: images.fourthChapter.altar,
    sound: sounds.fourthChapter.observatory,
    text: "Алтарь покрыт древними рунами, от которых исходит едва заметное голубоватое свечение. На его вершине лежит расколотый кристалл.",
    storyteller: { name: "Storyteller" },
  },

  {
    groupId: "chapter_4",
    id: "chapter_4_6",
    backgroundImg: images.fourthChapter.altar,
    sound: sounds.fourthChapter.observatory,
    text: 'Одна из рун кажется тебе знакомой: <i class="text-2xl">"ERINNERUNG"</i>.',
    storyteller: { name: "Storyteller" },
  },

  // --- Зеркала ---
  {
    groupId: "chapter_4",
    id: "chapter_4_7",
    backgroundImg: images.fourthChapter.mirrors,
    sound: sounds.fourthChapter.observatory,
    text: "В зале стоят три массивных зеркала, затянутые пылью и паутиной. Каждое отражает зал под странным углом, искажая свет и пространство.",
    storyteller: { name: "Storyteller" },
    actions: [
      {
        id: "chapter4_act_1",
        text: "Осмотреть зеркала",
      },
    ],
  },

  {
    groupId: "chapter_4",
    id: "chapter_4_8",
    backgroundImg: images.fourthChapter.brokenMirror,
    sound: sounds.fourthChapter.observatory,
    text: "Первое зеркало треснуто — твоё отражение дробится на осколки.",
    storyteller: { name: "Storyteller" },
  },

  {
    groupId: "chapter_4",
    id: "chapter_4_9",
    backgroundImg: images.fourthChapter.mirrors,
    sound: sounds.fourthChapter.observatory,
    text: "Второе едва поворачивается, а третье почти скрыто под толстым слоем пыли и паутины.",
    storyteller: { name: "Storyteller" },
  },

  // --- Пазл: Настрой свет ---
  {
    groupId: "chapter_4",
    id: "chapter_4_10",
    backgroundImg: images.fourthChapter.mirrors,
    text: `"Кажется, эти зеркала часть какого-то очень древнего механизма."`,
    sound: sounds.fourthChapter.observatory,
  },

  {
    groupId: "chapter_4",
    id: "chapter_4_10_1",
    backgroundImg: images.fourthChapter.mirrors,
    text: `Механический скорпион едва вздрагивает, и из его хвоста вырывается тонкий зелёный луч. Он отражается от ближайшего зеркала, прорезая полумрак.`,
    sound: sounds.fourthChapter.observatory,
  },

  {
    groupId: "chapter_4",
    id: "chapter_4_10_2",
    backgroundImg: images.fourthChapter.mirrors,
    text: `Похоже, если навести луч на кристалл на алтаре, механизм можно будет активировать.`,
    sound: sounds.fourthChapter.observatory,
    puzzle: {
      id: "chapter4_puzzle_0",
      type: "lantern",
      nextSceneId: "chapter_4_11",
    },
    storyteller: { name: "Storyteller" },

    actions: [
      {
        id: "chapter4_act_2",
        text: "Попытаться активировать механизм",
      },
    ],
  },

  {
    groupId: "chapter_4",
    id: "chapter_4_11",
    backgroundImg: images.fourthChapter.lantern,
    sound: sounds.fourthChapter.memory,
    text: `Когда последний луч достигает центра, кристалл поднимается в воздух. Он вспыхивает мягким золотым светом и превращается в Волшебный фонарь.`,
    storyteller: { name: "Storyteller" },
  },

  // --- Видение прошлого ---
  {
    groupId: "chapter_4",
    id: "chapter_4_12",
    backgroundImg: images.fourthChapter.lantern,
    sound: sounds.fourthChapter.memory,
    text: "Свет фонаря касается стен, и тени прошлого выходят из темноты.",
    storyteller: { name: "Storyteller" },
  },

  {
    groupId: "chapter_4",
    id: "chapter_4_13",
    backgroundImg: images.fourthChapter.altarMemory,
    sound: sounds.fourthChapter.memory,
    text: "Перед тобой возникает видение: у алтаря стоят двое — молодой ученик и его наставник. Глаза мага полны восторга и безумия.",
    storyteller: { name: "Storyteller" },
  },

  {
    groupId: "chapter_4",
    id: "chapter_4_14",
    backgroundImg: images.fourthChapter.altarMemory,
    sound: sounds.fourthChapter.memory,
    text: "Он произносит древние слова, воздух наполняется гулом. Алтарь оживает, руны вспыхивают огнём. Сила выходит из-под контроля.",
    storyteller: { name: "Storyteller" },
  },

  {
    groupId: "chapter_4",
    id: "chapter_4_15",
    backgroundImg: images.fourthChapter.destruction,
    sound: sounds.fourthChapter.memory,
    text: "Поместье содрогается. Ученик кричит, пытаясь остановить заклинание. Но поздно. Потоки магии вырываются наружу, уничтожая всё живое.",
    storyteller: { name: "Storyteller" },
  },

  {
    groupId: "chapter_4",
    id: "chapter_4_16",
    backgroundImg: images.fourthChapter.destruction,
    sound: sounds.fourthChapter.memory,
    text: "На губах мага — холодная улыбка. Он получил то, чего так жаждал — вечную жизнь.",
    storyteller: { name: "Storyteller" },
  },

  {
    groupId: "chapter_4",
    id: "chapter_4_17",
    backgroundImg: images.fourthChapter.destruction,
    sound: sounds.fourthChapter.memory,
    text: "Ты осознаёшь — это было твоё собственное воспоминание. Твоё прошлое.",
    storyteller: { name: "Storyteller" },
  },

  {
    groupId: "chapter_4",
    id: "chapter_4_20",
    backgroundImg: images.fourthChapter.lanternDark,
    sound: sounds.fourthChapter.memory,
    text: "Свет фонаря меркнет... и всё вокруг погружается в тихую, холодную тьму.",
    storyteller: { name: "Storyteller" },
    duration: 5000,
    nextSceneId: "epilogue_1",
  },

  // ===== Epilogue =====

  {
    groupId: "epilogue",
    id: "epilogue_1",
    backgroundImg: images.epilogue.library,
    sound: sounds.epilogue.library,
    text: "Ты стоишь в старой библиотеке. Свет свечей мягко колышется, отражаясь в пыли. Воздух пропитан запахом старых книг и дерева.",
    storyteller: { name: "Storyteller" },
  },

  {
    groupId: "epilogue",
    id: "epilogue_2",
    backgroundImg: images.epilogue.library,
    sound: sounds.epilogue.library,
    text: "Это та самая библиотека... из твоего видения.",
    storyteller: { name: "Storyteller" },
  },

  {
    groupId: "epilogue",
    id: "epilogue_3",
    backgroundImg: images.epilogue.book,
    sound: sounds.epilogue.library,
    text: "Ты подходишь к столу у окна. На нём раскрыта книга, её страницы шевелятся от лёгкого ветра.",
    storyteller: { name: "Storyteller" },
  },

  {
    groupId: "epilogue",
    id: "epilogue_4",
    backgroundImg: images.epilogue.ghostBook,
    sound: sounds.epilogue.library,
    text: "Ты тянешь руку, чтобы перевернуть страницу... но пальцы проходят сквозь бумагу. Ты лишь призрак... ",
    storyteller: { name: "Storyteller" },
  },

  {
    groupId: "epilogue",
    id: "epilogue_5",
    backgroundImg: images.epilogue.ghostBook,
    sound: sounds.epilogue.library,
    text: '"Если бы я мог... просто перевернуть страницу..."',
  },

  {
    groupId: "epilogue",
    id: "epilogue_6",
    backgroundImg: images.epilogue.ghost,
    sound: sounds.epilogue.library,
    text: `"Алтарь воскрешения был активирован. Учитель хотел вечной жизни... и получил её."`,
  },

  {
    groupId: "epilogue",
    id: "epilogue_7",
    backgroundImg: images.epilogue.ghost,
    sound: sounds.epilogue.library,
    text: `"А я остался здесь. Привязанный к этому месту. Книги стали моими цепями... и моим единственным утешением."`,
  },

  {
    groupId: "epilogue",
    id: "epilogue_8",
    backgroundImg: images.epilogue.book,
    sound: sounds.epilogue.library,
    notSoundLoop: true,
    text: "Вдруг тишину нарушает тихий скрип двери. Пламя свечей дрожит.",
    storyteller: { name: "Storyteller" },
  },

  {
    groupId: "epilogue",
    id: "epilogue_9",
    backgroundImg: images.epilogue.elf,
    sound: sounds.epilogue.ending,
    text: "Из темноты выходит фигура — эльфийка. Её шаги звучат глухо в тишине.",
    storyteller: { name: "Storyteller" },
  },

  {
    groupId: "epilogue",
    id: "epilogue_10",
    backgroundImg: images.epilogue.elf,
    sound: sounds.epilogue.ending,
    text: "Мысли смолкают. Ты замираешь, не в силах отвести взгляд от фонаря, мерцающего в её руке.",
    storyteller: { name: "Storyteller" },
    duration: 3000,
  },

  {
    groupId: "epilogue",
    id: "epilogue_11",
    backgroundImg: images.epilogue.elf,
    sound: sounds.epilogue.ending,
    // text: `"„Manchmal endet eine Geschichte…<br/>nur damit eine andere beginnen kann.“<br/><br/><i>Иногда одна история заканчивается… лишь для того, чтобы началась другая.</i>"`,
    text: `<i class="text-3xl">"Manchmal endet eine Geschichte...<br/>nur damit eine andere beginnen kann."</i>`,
    storyteller: { name: "Storyteller" },
    duration: 3500,
    nextSceneId: "final_scene_1",
    // isEndOfGame: true,
  },

  {
    groupId: "final",
    id: "final_scene_1",
    backgroundImg: images.final.finalScreen,
    text: `<span class='text-7xl'>THE END?..</span>`,
    sound: sounds.epilogue.ending,
    isEndOfGame: true,
  },
];
