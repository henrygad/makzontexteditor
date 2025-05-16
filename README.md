# Makzontexteditor



Makzontexteditor is a modern, customizable, and lightweight rich text editor built with **React**, **TypeScript**, and **Tailwind CSS**. It offers intuitive formatting options, media embedding, and full control over your content creation workflow — perfect for blogs, CMS, note apps, and publishing platforms.

---

## ✨ Features

- 📝 WYSIWYG Rich Text Editing
- 🎨 Text Styling (bold, italic, underline, colors, font sizes)
- 📷 Image Embedding Support
- 🎯 Headings, Lists, and Code Blocks
- 💾 Built-in Undo/Redo
- 😎 Emojis Support
- 📦 Lightweight and Tree-shakable
- 💅 Styled with TailwindCSS (fully customizable)

---

## 📦 Installation

```bash
npm install makzontexteditor
```

or if you're using Yarn:

```bash
yarn add makzontexteditor
```

---

## 🛠 Usage

```tsx
import React from 'react';
import { Makzontexteditor } from 'makzontexteditor';
import 'makzontexteditor/styles.css'; // Optional if the editor includes default styles

function App() {
  return (
    <div className="p-4">
      <Makzontexteditor />
    </div>
  );
}

export default App;
```

---

## 🛠️ Peer Dependencies

To work properly, make sure your project includes the following:

```json
"peerDependencies": {
  "react": "^18.2.0 || ^19.0.0",
  "react-dom": "^18.2.0 || ^19.0.0",
  "tailwindcss": "^3.4.3",
  "react-icons": "^5.5.0",
  "react-router-dom": "^6 || ^7"
}
```

---

## 🧪 Development & Scripts

This project uses Vite for development and Tsup for packaging:

```bash
yarn dev          # Run demo locally
yarn build        # Build the package with tsup
yarn demo-build   # Build the demo app separately
yarn preview      # Preview the demo build
yarn lint         # Run linter

```

---

## ⚙️ Props (Coming Soon)

> Full props documentation will be added soon. The editor is designed to be flexible and highly customizable.

---

### ⚠️ TailwindCSS Setup

1. Your project must have Tailwind CSS installed.
2. Make sure your Tailwind config includes the editor in the `content` path:

If you are using TailwindCSS in your project, make sure to include the editor in your Tailwind config's `content` array so styles are properly applied:

```js
// tailwind.config.js
import path from 'path';

export default {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    path.join(__dirname, 'node_modules', 'makzontexteditor', '**/*.{js,ts,jsx,tsx}')
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};

## 🖼 Preview

![Editor Preview](./mytexteeditor.png)

---

## 📜 License

This project is licensed under the MIT License.
You're free to use, modify, and distribute this package in personal or commercial projects. Attribution is appreciated but not required.

---

## 🙌 Author

Created by Henry Orji. If you like this project, feel free to ⭐ it and contribute!

---

## 📮 Feedback / Issues

Have a suggestion or found a bug? [Open an issue](https://github.com/henrygad/makzontexteditor.git) or submit a PR.

---

## 🔮 Roadmap

-

