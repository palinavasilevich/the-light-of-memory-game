// sounds.ts
import thunder from "../assets/sounds/first-chapter/thunder.mp3";
import memoryFirstChapter from "../assets/sounds/first-chapter/memory.mp3";
import paperFlutter from "../assets/sounds/first-chapter/paper-book-flutter.mp3";

import library from "../assets/sounds/second-chapter/crystal-ambient-piano-252638.mp3";
import book from "../assets/sounds/second-chapter/book_3.mp3";
import openBook from "../assets/sounds/second-chapter/mystery-magic-harry-potter-music-277018.mp3";

import water from "../assets/sounds/third-chapter/dripping-water-stereo-sound.mp3";
import echo from "../assets/sounds/third-chapter/walk-to-dungeon.mp3";
import roomAmbience from "../assets/sounds/third-chapter/crawling-danger-303228.mp3";
import memoryThirdChapter from "../assets/sounds/third-chapter/atmosphere-dark-fantasy-dungeon-synthpiano-verse.mp3";
import darkness from "../assets/sounds/third-chapter/darkness_3.mp3";

import observatory from "../assets/sounds/fourth-chapter/dark-piano-ambient-background-music-concrete-forest-208256.mp3";
import memoryFourthChapter from "../assets/sounds/fourth-chapter/memory.mp3";

import libraryEpi from "../assets/sounds/epilogue/season-memory-piano-music_edit.mp3";
import doorCreak from "../assets/sounds/epilogue/door-creak.mp3";
import ending from "../assets/sounds/epilogue/magic-night-ambient-music.mp3";

export const sounds = {
  firstChapter: { thunder, memory: memoryFirstChapter, paperFlutter },
  secondChapter: { library, book, openBook },
  thirdChapter: {
    water,
    echo,
    roomAmbience,
    memory: memoryThirdChapter,
    darkness,
  },
  fourthChapter: { observatory, memory: memoryFourthChapter },
  epilogue: { library: libraryEpi, doorCreak, ending },
};
