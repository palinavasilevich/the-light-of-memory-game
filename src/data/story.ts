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
  // {
  //   groupId: "chapter1",
  //   id: "chapter1_1",
  //   backgroundImg: images.room,
  //   text: "Ты просыпаешься на холодном полу...",
  //   sound: sounds.wake,
  //   storyteller: { name: "Storyteller" },
  // },

  // {
  //   groupId: "chapter1",
  //   id: "chapter1_2",
  //   backgroundImg: images.room,
  //   text: "Голова гудит. В висках — тяжесть, как после долгого сна.",
  //   sound: sounds.wake,
  //   storyteller: { name: "Storyteller" },
  // },
  // {
  //   groupId: "chapter1",
  //   id: "chapter1_3",
  //   backgroundImg: images.room,
  //   text: "Или дело просто в том, что тебе уже за тридцать...",
  //   sound: sounds.wake,
  //   storyteller: { name: "Storyteller" },
  //   actions: [
  //     {
  //       id: "act-0",
  //       text: "Подняться на ноги и осмотреться вокруг",
  //     },
  //   ],
  // },

  // {
  //   groupId: "chapter1",
  //   id: "chapter1_4",
  //   backgroundImg: images.room,
  //   text: "Вокруг — разбросанные страницы книг, осколки стекла и обломки мебели.",
  //   sound: sounds.wake,
  //   storyteller: { name: "Storyteller" },
  // },

  // {
  //   groupId: "chapter1",
  //   id: "chapter1_5",
  //   backgroundImg: images.room,
  //   text: "В воздухе стоит терпкий запах пыли и старого дерева.",
  //   sound: sounds.wake,
  //   storyteller: { name: "Storyteller" },
  // },
  // {
  //   groupId: "chapter1",
  //   id: "chapter1_6",
  //   backgroundImg: images.corridor,
  //   text: "Свет редких мерцающих светильников позволяет разглядеть разрушенный коридор.",
  //   sound: sounds.wake,
  //   storyteller: { name: "Storyteller" },
  // },

  // {
  //   groupId: "chapter1",
  //   id: "chapter1_7",
  //   backgroundImg: images.corridor,
  //   text: "В нескольких шагах от тебя перекошенная дверь.",
  //   sound: sounds.wake,
  //   storyteller: { name: "Storyteller" },
  // },

  {
    groupId: "chapter1",
    id: "chapter1_7",
    backgroundImg: images.corridor,
    text: "В нескольких шагах от тебя перекошенная дверь. У ног блестит осколок зеркала.",
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
    text: "Ты подходишь к двери. Дерево рассохлось, из-под краски проступают трещины.",
    sound: sounds.wake,
    storyteller: { name: "Storyteller" },
    actions: [
      {
        id: "chapter1_act_3",
        text: "Осторожно прислониться ухом к двери, ловя каждый звук",
        nextSceneId: "chapter1_9",
      },
    ],
  },

  {
    groupId: "chapter1",
    id: "chapter1_9",
    backgroundImg: images.corridor,
    text: "За дверью — едва слышный шелест, будто кто-то листает страницы.",
    sound: sounds.wake,
    storyteller: { name: "Storyteller" },
  },

  {
    groupId: "chapter1",
    id: "chapter1_10",
    backgroundImg: images.corridor,
    text: "Книги?.. Может, там библиотека.",
    sound: sounds.wake,
    storyteller: { name: "Player" },
    showAvailableActions: true,
    nextSceneId: "chapter1_16",
  },

  {
    groupId: "chapter1",
    id: "chapter1_11",
    backgroundImg: images.corridor,
    text: "В осколке зеркала мелькает силуэт мужчины в чёрной мантии. Он слегка улыбается.",
    sound: sounds.wake,
    storyteller: { name: "Storyteller" },
  },

  {
    groupId: "chapter1",
    id: "chapter1_12",
    backgroundImg: images.corridor,
    text: `Ты замечаешь гравировку на его перчатке: "AD MEMORIAM"`,
    sound: sounds.wake,
    storyteller: { name: "Storyteller" },
  },

  {
    groupId: "chapter1",
    id: "chapter1_13",
    backgroundImg: images.corridor,
    text: `Кажется, я уже видел когда-то эту надпись...`,
    sound: sounds.wake,
    storyteller: { name: "Player" },
    actions: [
      {
        id: "chapter1_act_4",
        text: "Попробовать вспомнить, что значит эта фраза",
        nextSceneId: "chapter1_14",
      },
    ],
  },

  {
    groupId: "chapter1",
    id: "chapter1_14",
    backgroundImg: images.corridor,
    text: "Ты напрягаешь память, стараясь вспомнить, что означает эта надпись.",
    sound: sounds.wake,
    storyteller: { name: "Storyteller" },
  },

  {
    groupId: "chapter1",
    id: "chapter1_15",
    backgroundImg: images.corridor,
    text: "Внезапно зеркало трескается. Яркая вспышка света — и ты вновь стоишь в коридоре.",
    sound: sounds.wake,
    storyteller: { name: "Storyteller" },
    showAvailableActions: true,
    nextSceneId: "chapter1_16",
  },

  {
    groupId: "chapter1",
    id: "chapter1_16",
    backgroundImg: images.corridor,
    text: "...",
    sound: sounds.wake,
    storyteller: { name: "Storyteller" },
    actions: [{ id: "chapter1_act_5", text: "Oткрыть дверь" }],
  },
];

// {
//   groupId: "chapter1",
//   id: "chapter1_4",
//   backgroundImg: images.room,
//   text: "Перед тобой появляется загадка — составь немецкие предложения правильно.",
//   puzzle: {
//     id: "puzzle-1",
//     type: "sentence",
//     nextSceneId: "8",
//   },
// },
// {
//   id: "7",
//   backgroundImg: images.mirror,
//   text: "Зеркало блестит странным светом, отражая что-то, чего нет в комнате.",
//   specialEffects: ["flash"],
//   actions: [{ id: "act-3", text: "Поднять осколок", nextSceneId: "8" }],
// },
// {
//   id: "8",
//   text: "Ты собрался дальше идти, и твоя история продолжается...",
//   duration: 4000,
// },
