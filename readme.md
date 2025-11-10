# 📝 Markdown Editor

A beautiful, minimalist markdown editor with real-time preview and paste-friendly code blocks. Built with Vue 3 and modern web technologies.

![Vue 3](https://img.shields.io/badge/Vue-3-4FC08D?logo=vue.js)
![License](https://img.shields.io/badge/License-MIT-blue)
![Version](https://img.shields.io/badge/Version-1.0.0-purple)

## ✨ Features

- **Real-time Preview** - See rendered markdown as you type
- **Sync Scrolling** - Editor and preview scroll together seamlessly  
- **Beautiful Code Blocks** - Syntax highlighting with one-click copy
- **Minimalist Design** - Clean interface in pastel purple themes
- **Dark/Light Mode** - Toggle between beautiful theme variants
- **Export Options** - Download as Markdown or HTML files
- **Auto-save** - Your work is automatically saved locally
- **Mobile Friendly** - Responsive design for all devices

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/nikoyourcousin/markdown-editor.git
cd markdown-editor

# Install dependencies
npm install

# Start development server
npm run dev

# Open http://localhost:3000 in your browser
```

### Build for Production

```bash
# Build the project
npm run build

# Preview production build
npm run preview
```

## 🎯 Usage

1. **Start typing** in the editor - see instant preview
2. **Use toolbar** for quick formatting (bold, italic, code, etc.)
3. **Toggle views** between split, editor-only, or preview-only
4. **Copy code** with one click from beautiful code blocks
5. **Export** your work as Markdown or HTML files

### Code Blocks Example

```javascript
function greet() {
  console.log("Hello, world!");
}
```

## 🛠 Tech Stack

- **Vue 3** - Composition API
- **Pinia** - State management  
- **Vite** - Build tool
- **Marked.js** - Markdown parsing
- **Highlight.js** - Syntax highlighting
- **DOMPurify** - Security

## 📦 Deployment

### GitHub Pages
```bash
npm run build
npm run deploy
```

### Other Platforms
Upload the `dist` folder to any static hosting service (Netlify, Vercel, etc.)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit issues, feature requests, or pull requests.

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.