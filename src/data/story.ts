import type { SceneType } from "../types/game";

import { images, sounds } from "./assets";

export const story: SceneType[] = [
  // {
  //   groupId: "prologue",
  //   id: "prologue_1",
  //   backgroundImg: images.room,
  //   text: "Серое утреннее свечение проникает внутрь разбитого окна...",
  //   sound: sounds.wake,
  //   storyteller: { name: "Storyteller" },
  //   specialEffects: ["fade"],
  // },
  // {
  //   groupId: "prologue",
  //   id: "prologue_2",
  //   backgroundImg: images.room,
  //   text: "Пыль кружится в воздухе, время здесь будто застыло.",
  //   sound: sounds.wake,
  //   storyteller: { name: "Storyteller" },
  // },
  // {
  //   groupId: "prologue",
  //   id: "prologue_3",
  //   backgroundImg: images.room,
  //   text: "На мгновение в отражении осколков стекла мерцает силуэт — и исчезает.",
  //   sound: sounds.wake,
  //   storyteller: { name: "Storyteller" },
  // },
  // ////
  {
    groupId: "chapter1",
    id: "chapter1_1",
    backgroundImg: images.room,
    // text: "Ты приходишь в себя на холодном полу...",
    text: "Ты просыпаешься на холодном полу...",
    sound: sounds.wake,
    storyteller: { name: "Storyteller" },
  },
  {
    groupId: "chapter1",
    id: "chapter1_2",
    backgroundImg: images.room,
    // text: "Голова гудит. В висках — тяжесть, будто после слишком долгого сна.",
    text: "Голова гудит. В висках пульсирует тупая боль, будто после слишком долгого сна.",
    sound: sounds.wake,
    storyteller: { name: "Storyteller" },
  },
  {
    groupId: "chapter1",
    id: "chapter1_3",
    backgroundImg: images.room,
    text: "Или, может, просто сказывается возраст — тебе ведь уже за тридцать...",
    sound: sounds.wake,
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
    backgroundImg: images.room,
    text: "Вокруг — разбросанные страницы книг, осколки стекла и обломки мебели.",
    sound: sounds.wake,
    storyteller: { name: "Storyteller" },
  },
  {
    groupId: "chapter1",
    id: "chapter1_5",
    backgroundImg: images.room,
    text: "В воздухе висит терпкий запах пыли и старого дерева.",
    sound: sounds.wake,
    storyteller: { name: "Storyteller" },
  },
  {
    groupId: "chapter1",
    id: "chapter1_6",
    backgroundImg: images.corridor,
    text: "Тусклые, мерцающие светильники выхватывают из темноты разрушенный коридор.",
    sound: sounds.wake,
    storyteller: { name: "Storyteller" },
  },
  {
    groupId: "chapter1",
    id: "chapter1_7",
    backgroundImg: images.corridor,
    text: "В нескольких шагах — перекошенная дверь. У ног блестит осколок зеркала.",
    sound: sounds.wake,
    storyteller: { name: "Storyteller" },
    actions: [
      {
        id: "chapter1_act_1",
        text: "Осмотреть дверь",
        nextSceneId: "chapter1_8",
      },
      {
        id: "chapter1_act_2",
        text: "Осмотреть осколок зеркала",
        nextSceneId: "chapter1_11",
      },
    ],
  },
  {
    groupId: "chapter1",
    id: "chapter1_8",
    backgroundImg: images.corridor,
    text: "Ты подходишь ближе. Дерево рассохлось, краска облупилась, трещины потемнели от времени.",
    sound: sounds.wake,
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
    backgroundImg: images.corridor,
    text: "За дверью — едва различимый шелест, будто кто-то неторопливо листает страницы.",
    sound: sounds.wake,
    storyteller: { name: "Storyteller" },
  },
  {
    groupId: "chapter1",
    id: "chapter1_10",
    backgroundImg: images.corridor,
    text: `"Шелест страниц... Может, за дверью библиотека?"`,
    sound: sounds.wake,
    storyteller: { name: "Player" },
    showAvailableActions: true,
    nextSceneId: "chapter1_19",
  },

  ///mirror

  {
    groupId: "chapter1",
    id: "chapter1_11",
    backgroundImg: images.corridor,
    text: "В осколке зеркала мелькает силуэт молодого мужчины. Он стоит за письменным столом, в руке — книга.",
    sound: sounds.wake,
    storyteller: { name: "Storyteller" },
  },
  {
    groupId: "chapter1",
    id: "chapter1_12",
    backgroundImg: images.corridor,
    text: "Мужчина берёт со стола письмо, разворачивает его и начинает читать. На его лице появляется тёплая улыбка - будто строки возвращают его в счастливое прошлое.",
    // text: "Мужчина берёт со стола письмо, читает несколько строк и едва заметно улыбается.",
    // На его лице появляется тёплая улыбка — будто строки возвращают его в счастливое прошлое.
    sound: sounds.wake,
    storyteller: { name: "Storyteller" },
  },
  {
    groupId: "chapter1",
    id: "chapter1_13",
    backgroundImg: images.corridor,
    // text: `На его перчатке виднеется гравировка: "AD MEMORIAM".`,
    text: "Твои глаза невольно задерживаются на его перчатках.",
    sound: sounds.wake,
    storyteller: { name: "Storyteller" },
  },

  {
    groupId: "chapter1",
    id: "chapter1_14",
    backgroundImg: images.corridor,
    // text: `На его перчатке виднеется гравировка: "AD MEMORIAM".`,
    text: "Они покрыты странными узорами и излучают лёгкое мерцание — словно магические предметы, которые редко встретишь в реальном мире.",
    sound: sounds.wake,
    storyteller: { name: "Storyteller" },
  },
  {
    groupId: "chapter1",
    id: "chapter1_15",
    backgroundImg: images.corridor,
    text: `Приглядевшись внимательнее, ты замечаешь на перчатке выгравированную надпись: "AD MEMORIAM".`,
    sound: sounds.wake,
    storyteller: { name: "Storyteller" },
  },
  {
    groupId: "chapter1",
    id: "chapter1_16",
    backgroundImg: images.corridor,
    text: `"Эта надпись... Почему она кажется мне знакомой?"`,
    sound: sounds.wake,
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
    backgroundImg: images.corridor,
    text: "Ты напрягаешь память, стараясь вытащить из глубин сознания смысл этих слов.",
    sound: sounds.wake,
    storyteller: { name: "Storyteller" },
  },
  {
    groupId: "chapter1",
    id: "chapter1_18",
    backgroundImg: images.corridor,
    text: "Зеркало вдруг трескается. Яркая вспышка света — и ты вновь стоишь посреди коридора.",
    sound: sounds.wake,
    storyteller: { name: "Storyteller" },
    showAvailableActions: true,
    nextSceneId: "chapter1_19",
  },

  {
    groupId: "chapter1",
    id: "chapter1_19",
    backgroundImg: images.corridor,
    text: "Ты делаешь глубокий вдох и решаешься войти внутрь.",
    sound: sounds.wake,
    storyteller: { name: "Storyteller" },
    actions: [{ id: "chapter1_act_5", text: "Открыть дверь" }],
  },

  ///chapter2 ///
  {
    groupId: "chapter2",
    id: "chapter2_1",
    backgroundImg: images.corridor,
    text: "Ты медленно входишь в комнату. Внутри всё кажется неподвижным, будто время здесь остановилось.",
    sound: sounds.wake,
    storyteller: { name: "Storyteller" },
  },

  {
    groupId: "chapter2",
    id: "chapter2_2",
    backgroundImg: images.corridor,
    text: "С каждым шагом запах пепла и старой бумаги становится сильнее.",
    sound: sounds.wake,
    storyteller: { name: "Storyteller" },
    actions: [
      {
        id: "chapter2_act_0",
        text: "Осмотреться вокруг",
        nextSceneId: "chapter2_3",
      },
    ],
  },

  {
    groupId: "chapter2",
    id: "chapter2_3",
    backgroundImg: images.corridor,
    text: "Вдоль стен тянутся высокие стеллажи с тысячами книг — потемневших от времени и покрытых толстым (thin or thick) слоем пыли.",
    sound: sounds.wake,
    storyteller: { name: "Storyteller" },
  },

  {
    groupId: "chapter2",
    id: "chapter2_4",
    backgroundImg: images.corridor,
    text: "Некоторые книги сами приоткрываются, когда ты проходишь мимо. Их страницы шуршат, словно приветствуя давнего знакомого.",
    sound: sounds.wake,
    storyteller: { name: "Storyteller" },
  },

  {
    groupId: "chapter2",
    id: "chapter2_5",
    backgroundImg: images.corridor,
    text: "В центре комнаты стоит массивный дубовый стол, заваленный пожелтевшими пергаментами и обугленными обрывками бумаги.",
    sound: sounds.wake,
    storyteller: { name: "Storyteller" },
  },

  {
    groupId: "chapter2",
    id: "chapter2_6",
    backgroundImg: images.corridor,
    text: "На полу следы пепла и осколки тусклого стекла, будто здесь совсем недавно что-то сгорело.",
    sound: sounds.wake,
    storyteller: { name: "Storyteller" },
  },

  {
    groupId: "chapter2",
    id: "chapter2_7",
    backgroundImg: images.corridor,
    text: "У основания стола что-то блестит в тусклом свете.",
    sound: sounds.wake,
    storyteller: { name: "Storyteller" },
    actions: [
      {
        id: "chapter2_act_2",
        text: "Подойти ближе и рассмотреть",
        nextSceneId: "chapter2_8",
      },
    ],
  },

  {
    groupId: "chapter2",
    id: "chapter2_8",
    backgroundImg: images.corridor,
    text: "Ты наклоняешься и замечаешь крошечную фигурку мыши 🐭, лежащую в пыли.",
    sound: sounds.wake,
    storyteller: { name: "Storyteller" },
    actions: [
      {
        id: "chapter2_act_3",
        text: "Взять фигурку",
        nextSceneId: "chapter2_9",
      },
    ],
  },

  {
    groupId: "chapter2",
    id: "chapter2_9",
    backgroundImg: images.corridor,
    text: "Фигурка холодна на ощупь и сделана из потемневшего металла. В её глазах мерцают крошечные рубины.",
    sound: sounds.wake,
    storyteller: { name: "Storyteller" },
    conditions: [
      { item: "<br/>В инвентарь добавлен предмет: <i>figurine_mouse</i>." },
    ],
  },

  {
    groupId: "chapter2",
    id: "chapter2_10",
    backgroundImg: images.corridor,
    text: "Подняв взгляд, ты ощущаешь странное дежавю — будто уже бывал здесь раньше.",
    sound: sounds.wake,
    storyteller: { name: "Storyteller" },
  },

  {
    groupId: "chapter2",
    id: "chapter2_11",
    backgroundImg: images.corridor,
    text: `"Почему это место кажется мне таким знакомым?.."`,
    sound: sounds.wake,
    storyteller: { name: "Player" },
  },

  {
    groupId: "chapter2",
    id: "chapter2_12",
    backgroundImg: images.corridor,
    text: "Мысль ускользает от тебя, оставляя лёгкое беспокойство.",
    sound: sounds.wake,
    storyteller: { name: "Storyteller" },
  },

  {
    groupId: "chapter2",
    id: "chapter2_13",
    backgroundImg: images.corridor,
    text: "Перед тобой — тот же дубовый стол. Он будто ждёт, когда ты прикоснёшься к его тайнам.",
    sound: sounds.wake,
    storyteller: { name: "Storyteller" },
    actions: [
      {
        id: "chapter2_act_4",
        text: "Осмотреть стол",
        nextSceneId: "chapter2_14",
      },
    ],
  },

  {
    groupId: "chapter2",
    id: "chapter2_14",
    backgroundImg: images.corridor,
    text: "На столе — чернильница, пожелтевшие и обгоревшие страницы, и толстая книга в тёмно-зелёном переплёте.",
    sound: sounds.wake,
    storyteller: { name: "Storyteller" },
    actions: [
      {
        id: "chapter2_act_5",
        text: "Осмотреть бумаги",
        nextSceneId: "chapter2_15",
      },
    ],
  },

  ///letter
  {
    groupId: "chapter2",
    id: "chapter2_15",
    backgroundImg: images.tableClose,
    sound: sounds.memory,
    text: `Ты осторожно разгребаешь старые страницы. Среди них ты замечаешь письмо с почерневшими краями.`,
    storyteller: { name: "Storyteller" },
  },

  {
    groupId: "chapter2",
    id: "chapter2_16",
    backgroundImg: images.tableClose,
    sound: sounds.memory,
    text: `Чернила едва различимы, но некоторые строки всё ещё можно прочесть.`,
    storyteller: { name: "Storyteller" },
    actions: [
      {
        id: "chapter2_act_6",
        text: "Прочесть письмо",
        // showExtraContent: true;
        nextSceneId: "chapter2_17",
      },
    ],
  },

  {
    groupId: "chapter2",
    id: "chapter2_17",
    backgroundImg: images.memoryBlur,
    sound: sounds.memory,
    text: "Мир вокруг меркнет. В голове вспыхивают образы — короткие, обрывочные: смех, солнечный свет на ладонях, чьи-то знакомые глаза.",
    storyteller: { name: "Storyteller" },
  },

  {
    groupId: "chapter2",
    id: "chapter2_18",
    backgroundImg: images.memoryBlur,
    sound: sounds.memory,
    text: "Ты пытаешься удержать их, но они тают, как дым...",
    storyteller: { name: "Storyteller" },
  },

  {
    groupId: "chapter2",
    id: "chapter2_19",
    backgroundImg: images.memoryBlur,
    sound: sounds.memory,
    // text: "Ты возвращаешься в реальность, стоя возле стола, и твоё внимание приковывает книга в тёмно-зелёном переплёте.",

    text: "Ты возвращаешься в реальность. Стоя возле стола, ты замечаешь, как мягкий свет падает на книгу в тёмно-зелёном переплёте.",
    storyteller: { name: "Storyteller" },
  },

  {
    groupId: "chapter2",
    id: "chapter2_20",
    backgroundImg: images.memoryBlur,
    sound: sounds.memory,
    // text: "Ты возвращаешься в реальность, стоя возле стола, и твоё внимание приковывает книга в тёмно-зелёном переплёте.",

    text: "Внутри что-то будто подсказывает — здесь спрятана тайна, которую нужно разгадать.",
    storyteller: { name: "Storyteller" },
    actions: [
      {
        id: "chapter2_act_7",
        text: "Осмотреть книгу",
        nextSceneId: "chapter2_21",
      },
    ],
  },

  {
    groupId: "chapter2",
    id: "chapter2_21",
    backgroundImg: images.corridor,
    text: "Переплёт покрыт странными символами — смесью рун и знаков древнего языка, напоминающего тебе эльфийский.",
    sound: sounds.wake,
    storyteller: { name: "Storyteller" },
  },

  {
    groupId: "chapter2",
    id: "chapter2_22",
    backgroundImg: images.corridor,
    text: "Ты проводишь пальцами по обложке и она едва заметно дрожит, словно живая. В следующее мгновение книга внезапно раскрывается сама.",
    sound: sounds.wake,
    storyteller: { name: "Storyteller" },
  },

  {
    groupId: "chapter2",
    id: "chapter2_23",
    backgroundImg: images.room,
    text: "Буквы на страницах оживают и начинают складываться в строки на смутно знакомом тебе языке.",
    sound: sounds.wake,
    storyteller: { name: "Storyteller" },
  },

  {
    groupId: "chapter2",
    id: "chapter2_24",
    backgroundImg: images.room,
    text: "Это не эльфийский, как показалось сначала... Это древний немецкий.",
    sound: sounds.wake,
    storyteller: { name: "Storyteller" },
  },

  {
    groupId: "chapter2",
    id: "chapter2_25",
    backgroundImg: images.room,
    text: `"Древний немецкий?.. Откуда я его вообще знаю?.."`,
    sound: sounds.wake,
    storyteller: { name: "Player" },
  },

  {
    groupId: "chapter2",
    id: "chapter2_26",
    backgroundImg: images.room,
    text: `Голос из темноты прерывает твои мысли: <i>"BEOBACHTEN... LERNEN... WACHSEN..."</i>`,
    puzzle: {
      id: "chapter2_puzzle_0",
      type: "sentence",
      nextSceneId: "chapter2_27",
    },
    sound: sounds.wake,
    storyteller: { name: "Storyteller" },
  },

  {
    groupId: "chapter2",
    id: "chapter2_27",
    backgroundImg: images.room,
    text: `Слова вспыхивают мягким золотым светом и складываются в новую фразу: <i>"FOLGE DER GOLDENEN MAUS."</i>`,
    sound: sounds.wake,
    storyteller: { name: "Storyteller" },
    duration: 5000,
  },

  {
    groupId: "chapter2",
    id: "chapter2_28",
    backgroundImg: images.room,
    text: "Ты чувствуешь лёгкое движение в кармане...",
    sound: sounds.wake,
    storyteller: { name: "Storyteller" },
    actions: [
      {
        id: "chapter2_act_8",
        text: "Проверить карман",
        nextSceneId: "chapter2_29",
      },
    ],
  },

  {
    groupId: "chapter2",
    id: "chapter2_29",
    backgroundImg: images.room,
    text: "Доставая фигурку, ты видишь, как она оживает на твоей ладоне.",
    sound: sounds.wake,
    storyteller: { name: "Storyteller" },
  },

  {
    groupId: "chapter2",
    id: "chapter2_30",
    backgroundImg: images.room,
    text: "Мышь спрыгивает на пол и бежит в дальнюю часть комнаты.",
    sound: sounds.wake,
    storyteller: { name: "Storyteller" },
    actions: [
      {
        id: "chapter2_act_9",
        text: "Следовать за ней",
        nextSceneId: "chapter2_31",
      },
    ],
  },

  {
    groupId: "chapter2",
    id: "chapter2_31",
    backgroundImg: images.room,
    text: "Ты идёшь следом и видишь, как каменная плита в стене медленно сдвигается, открывая узкий проход вниз.",
    sound: sounds.wake,
    storyteller: { name: "Storyteller" },
  },
];
