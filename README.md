# 🕹️ My Interactive Game

**Description:**  
This is an interactive text-and-graphics game where the player goes through story scenes, solves puzzles, and makes decisions that affect the story outcome.

- Built with **React**, **TypeScript**, and **Tailwind CSS**.
- Each scene can include: animated text, sound, images, player actions, and puzzles.
- Supports **dialog windows**, **extra content modals**, and **automatic scene transitions**.

---

## 📦 Project Structure

```
/src
 ├─ /assets           # Static assets (images and sounds)
 ├─ /components       # Game components (TextTyper, Puzzle, ActionButton, Layout, Modal)
 ├─ /constants        # Constants used across the project
 ├─ /data             # Scene, image, and sound data
 ├─ /hooks            # Custom React hooks
 ├─ /store            # Zustand gameStore for global game state
 ├─ /types            # TypeScript types
 └─ App.tsx           # Main application component
```

---

## 🚀 Installation and Running

1. Clone the repository:

```bash
git clone <repo_url>
cd <repo_folder>
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Open your browser and go to:

```
http://localhost:5173
```

---

## 🕹️ How to Play

- Read the text displayed on the screen.
- Use action buttons to interact with objects or progress to the next scene.
- Solve puzzles to unlock new scenes.
- Some scenes may automatically transition after a set duration (`duration`).

---

## ⚙️ Configuration

- Sounds can be toggled on/off via the global `gameStore`.
- Background images and sounds are defined per scene in the `story` object.
- Extra content modals are handled through the `ExtraContentModal` component.

---

## 🧩 Technologies

- React + TypeScript
- Tailwind CSS
- Zustand (state management)
- Vite (bundler and dev server)

---

## 🎨 Future Plans

- Add more scenes and puzzles
- Expand the action choice system
- Improve text animation and sound effects
- Add save/load game progress
