export type SentenceType = {
  german: string;
  translation: string;
};

export const SENTENCES: Array<SentenceType> = [
  {
    german:
      "Ich ging an der Tür vorbei und provozierte einen Gelegenheitsangriff",
    translation: "Шла мимо двери и спровоцировала атаку по возможности",
  },
  {
    german: "Welche Farbe hatte die Katze? Die Farbe eines Spatzen",
    translation: "Какого цвета был кот? Цвета воробья",
  },

  // {
  //   german:
  //     "Habe ich Bauchmuskeln? Oder ist es Pizza?",
  //   translation:
  //     "У меня есть пресс? Или это пицца?",
  // },
  {
    german: "Ich sitze und esse, und in meiner Kiste ist ein Vogel",
    translation: "Сижу, ем, а у меня птица в коробке",
  },
];
