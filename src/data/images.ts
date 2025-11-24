// images.ts
import startScreen from "../assets/images/startScreen_5.png";
import scorpionPuzzle from "../assets/images/scorpion.png";

// first chapter
import estate from "../assets/images/first-chapter/​estate.png";
import corridorEstate from "../assets/images/first-chapter/corridor.png";
import doorAndMirror from "../assets/images/first-chapter/doorAndMirror.png";
import door from "../assets/images/first-chapter/door.png";
import vision from "../assets/images/first-chapter/vision_5.png";
import gloves from "../assets/images/first-chapter/gloves.png";

// second chapter
import library from "../assets/images/second-chapter/library.png";
import bookShelves from "../assets/images/second-chapter/bookShelves.png";
import shelfClose from "../assets/images/second-chapter/shelfClose.jpg";
import shelfRows from "../assets/images/second-chapter/shelfRows_2.jpg";
import scorpionDrawing from "../assets/images/second-chapter/scorpion.png";
import topShelf from "../assets/images/second-chapter/topShelf.jpg";
import mouse from "../assets/images/second-chapter/mouse.png";
import table from "../assets/images/second-chapter/table.png";
import letter from "../assets/images/second-chapter/letter.png";
import letterText from "../assets/images/second-chapter/letterText_2.png";
import memory from "../assets/images/second-chapter/memory.jpg";
import book from "../assets/images/second-chapter/book.png";
import bookOpen from "../assets/images/second-chapter/bookOpen.png";
import bookLetters from "../assets/images/second-chapter/bookLetters.png";
import libraryWall from "../assets/images/second-chapter/libraryWall.png";

// third chapter
import staircase from "../assets/images/third-chapter/corridor_4.png";
import corridorDungeon from "../assets/images/third-chapter/corridor_3.png";
import room from "../assets/images/third-chapter/room.png";
import tableDungeon from "../assets/images/third-chapter/table.png";
import tableWithPapier from "../assets/images/third-chapter/tablePapier.jpg";
import notebook from "../assets/images/third-chapter/notebook.png";
import notebookOpen from "../assets/images/third-chapter/notebookOpen.png";
import notebookOpenMessage from "../assets/images/third-chapter/notebookOpenMessage.png";
import scorpion3 from "../assets/images/third-chapter/scorpion_2.png";
import scorpionMessage from "../assets/images/third-chapter/scorpionMessage.png";
import scorpionActivated from "../assets/images/third-chapter/scorpionActivated.png";
import scorpionButton from "../assets/images/third-chapter/scorpionButton.png";
import darkness from "../assets/images/third-chapter/darkness_7.jpg";
import flashDungeon from "../assets/images/third-chapter/flash.png";

// fourth chapter
import flashObservatory from "../assets/images/fourth-chapter/flash.png";
import observatory from "../assets/images/fourth-chapter/observatory_3.png";
import telescope from "../assets/images/fourth-chapter/observatory_3.png";
import altar from "../assets/images/fourth-chapter/altar_2.png";
import mirrors from "../assets/images/fourth-chapter/mirrors_2.png";
import brokenMirror from "../assets/images/fourth-chapter/brokenMirror_2.png";
import altarMemory from "../assets/images/fourth-chapter/altarMemory.png";
import destruction from "../assets/images/fourth-chapter/destruction_3.png";
import lantern from "../assets/images/fourth-chapter/lantern_2.png";
import lanternDark from "../assets/images/fourth-chapter/lanternDark.png";

// epilogue
import libraryEpilogue from "../assets/images/epilogue/library.png";
import ghost from "../assets/images/epilogue/ghost.png";
import bookEpilogue from "../assets/images/epilogue/book.png";
import ghostBook from "../assets/images/epilogue/ghostBook.png";
import elf from "../assets/images/epilogue/elf_2.png";
import finish from "../assets/images/fourth-chapter/lantern.png";

// final
import finalScreen from "../assets/images/darkness.jpg";

export const images = {
  startScreen,
  puzzle: { scorpionPuzzle },
  firstChapter: {
    estate,
    corridor: corridorEstate,
    doorAndMirror,
    door,
    vision,
    gloves,
  },
  secondChapter: {
    library,
    bookShelves,
    shelfClose,
    shelfRows,
    scorpion: scorpionDrawing,
    topShelf,
    mouse,
    table,
    letter,
    letterText,
    memory,
    book,
    bookOpen,
    bookLetters,
    libraryWall,
  },
  thirdChapter: {
    staircase,
    corridor: corridorDungeon,
    room,
    table: tableDungeon,
    tableWithPapier,
    notebook,
    notebookOpen,
    notebookOpenMessage,
    scorpion: scorpion3,
    scorpionMessage,
    scorpionActivated,
    scorpionButton,
    darkness,
    flash: flashDungeon,
  },
  fourthChapter: {
    flash: flashObservatory,
    observatory,
    telescope,
    altar,
    mirrors,
    brokenMirror,
    altarMemory,
    destruction,
    lantern,
    lanternDark,
  },
  epilogue: {
    library: libraryEpilogue,
    ghost,
    book: bookEpilogue,
    ghostBook,
    elf,
    finish,
  },
  final: { finalScreen },
};
