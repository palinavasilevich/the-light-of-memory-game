import type { SceneType } from "../types/game";

import { images, sounds } from "./assets";

export const story: SceneType[] = [
  {
    groupId: "prologue",
    id: "prologue_1",
    backgroundImg: images.room,
    text: "Серое утреннее свечение проникает внутрь разбитого окна...",
    sound: sounds.wake,
    storyteller: { name: "Storyteller" },
    specialEffects: ["fade"],
  },
  {
    groupId: "prologue",
    id: "prologue_2",
    backgroundImg: images.room,
    text: "Пыль кружится в воздухе - время будто застыло.",
    sound: sounds.wake,
    storyteller: { name: "Storyteller" },
  },
  {
    groupId: "prologue",
    id: "prologue_3",
    backgroundImg: images.room,
    text: "На мгновение в отражении осколков стекла мерцает силуэт - и исчезает.",
    sound: sounds.wake,
    storyteller: { name: "Storyteller" },
  },

  ////
  {
    groupId: "prologue",
    id: "prologue_4",
    backgroundImg: images.room,
    text: "Ты просыпаешься на холодном полу.",
    sound: sounds.wake,
    storyteller: { name: "Storyteller" },
    duration: 5000, // через 5 сек автоматически переходит к следующей сцене
  },
  {
    id: "4",
    backgroundImg: images.room,
    text: "Вокруг — разбросанные страницы, осколки зеркала и слабый запах пыли и старого дерева.",
    actions: [
      {
        id: "act-0",
        text: "Подняться на ноги и осмотреться вокруг",
        nextSceneId: "5",
      },
    ],
  },
  {
    id: "5",
    backgroundImg: images.corridor,
    text: "Свет редких мерцающих светильников позволяет разглядеть разрушенный коридор.",
    actions: [
      { id: "act-1", text: "Осмотреть дверь", nextSceneId: "6" },
      { id: "act-2", text: "Осмотреть зеркало", nextSceneId: "7" },
    ],
  },
  {
    id: "6",
    backgroundImg: images.room,
    text: "Перед тобой появляется загадка — составь немецкие предложения правильно.",
    puzzle: {
      id: "puzzle-1",
      type: "sentence",
      nextSceneId: "8",
    },
  },
  {
    id: "7",
    backgroundImg: images.mirror,
    text: "Зеркало блестит странным светом, отражая что-то, чего нет в комнате.",
    specialEffects: ["flash"],
    actions: [{ id: "act-3", text: "Поднять осколок", nextSceneId: "8" }],
  },
  {
    id: "8",
    text: "Ты собрался дальше идти, и твоя история продолжается...",
    duration: 4000,
  },
];
