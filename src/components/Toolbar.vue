<template>
  <div class="toolbar">
    <div class="toolbar-left">
      <div class="toolbar-group">
        <button class="btn btn-icon" @click="insertBold" title="Bold">
          <span class="icon">B</span>
        </button>
        <button class="btn btn-icon" @click="insertItalic" title="Italic">
          <span class="icon">I</span>
        </button>
        <button class="btn btn-icon" @click="insertCode" title="Inline Code">
          <span class="icon">&lt;/&gt;</span>
        </button>
        <button class="btn btn-icon" @click="insertLink" title="Link">
          <span class="icon">🔗</span>
        </button>
      </div>

      <div class="toolbar-group">
        <button class="btn" @click="insertCodeBlock" title="Code Block">
          <span>Code</span>
        </button>
        <button class="btn" @click="insertTable" title="Table">
          <span>Table</span>
        </button>
        <button class="btn" @click="insertQuote" title="Quote">
          <span>Quote</span>
        </button>
      </div>
    </div>

    <div class="toolbar-center">
      <div class="view-mode-toggle">
        <button 
          class="mode-btn" 
          @click="setViewMode('split')" 
          :class="{ 'active': store.viewMode === 'split' }"
          title="Split View"
        >
          <span>Split</span>
        </button>
        <button 
          class="mode-btn" 
          @click="setViewMode('editor')" 
          :class="{ 'active': store.viewMode === 'editor' }"
          title="Editor Only"
        >
          <span>Editor</span>
        </button>
        <button 
          class="mode-btn" 
          @click="setViewMode('preview')" 
          :class="{ 'active': store.viewMode === 'preview' }"
          title="Preview Only"
        >
          <span>Preview</span>
        </button>
      </div>
    </div>

    <div class="toolbar-right">
      <div class="toolbar-group stats">
        <span class="stat">{{ store.statistics.words }} words</span>
        <span class="stat">{{ store.statistics.characters }} chars</span>
      </div>

      <div class="toolbar-group">
        <button class="btn btn-icon" @click="toggleTheme" :title="store.isDarkTheme ? 'Light Theme' : 'Dark Theme'">
          <span class="icon">{{ store.isDarkTheme ? '☀️' : '🌙' }}</span>
        </button>
      </div>

      <div class="toolbar-group">
        <button class="btn btn-primary" @click="exportMarkdown">
          <span>Export MD</span>
        </button>
        <button class="btn btn-primary" @click="exportHTML">
          <span>Export HTML</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useEditorStore } from '../stores/editor.js';
import { useExportUtils } from '../utils/exportUtils.js';

const store = useEditorStore();
const { exportAsMarkdown, exportAsHTML } = useExportUtils();

const insertBold = () => store.insertText('**', '**', 'bold text');
const insertItalic = () => store.insertText('*', '*', 'italic text');
const insertCode = () => store.insertText('`', '`', 'code');
const insertLink = () => store.insertText('[', '](https://)', 'link text');

const insertCodeBlock = () => {
  store.insertText('```javascript\n', '\n```', '// Your code here');
};

const insertTable = () => {
  const table = `| Header 1 | Header 2 | Header 3 |
|----------|----------|----------|
| Data 1   | Data 2   | Data 3   |
| Data 4   | Data 5   | Data 6   |`;
  store.insertText(table + '\n\n');
};

const insertQuote = () => {
  store.insertText('> ', '', 'Your quote here');
};

const toggleTheme = () => {
  store.toggleTheme();
};

const setViewMode = (mode) => {
  store.setViewMode(mode);
};

const exportMarkdown = () => {
  exportAsMarkdown(store.markdownText);
};

const exportHTML = () => {
  exportAsHTML(store.htmlPreview);
};
</script>

<style scoped>
.toolbar {
  background: var(--bg-primary);
  border-bottom: 1px solid var(--border-color);
  padding: 0.75rem 1.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  height: 70px;
  backdrop-filter: blur(10px);
  position: relative;
  z-index: 10;
}

.toolbar-left,
.toolbar-right {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex: 1;
}

.toolbar-right {
  justify-content: flex-end;
}

.toolbar-center {
  display: flex;
  align-items: center;
}

.toolbar-group {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0;
}

.btn {
  background: transparent;
  border: 1px solid var(--border-color);
  color: var(--text-secondary);
  padding: 0.5rem 1rem;
  border-radius: 8px;
  cursor: pointer;
  font-size: 0.875rem;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 500;
}

.btn:hover {
  background: var(--bg-tertiary);
  border-color: var(--accent-color);
  color: var(--text-primary);
  transform: translateY(-1px);
}

.btn-icon {
  padding: 0.5rem;
  min-width: 36px;
  justify-content: center;
}

.btn-icon .icon {
  font-size: 0.9rem;
}

.btn-primary {
  background: var(--accent-color);
  color: var(--bg-primary);
  border-color: var(--accent-color);
}

.btn-primary:hover {
  background: var(--accent-hover);
  border-color: var(--accent-hover);
  transform: translateY(-1px);
}

.view-mode-toggle {
  display: flex;
  background: var(--bg-tertiary);
  border-radius: 8px;
  padding: 0.25rem;
  border: 1px solid var(--border-color);
}

.mode-btn {
  background: transparent;
  border: none;
  color: var(--text-secondary);
  padding: 0.5rem 1rem;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.875rem;
  transition: all 0.2s ease;
  font-weight: 500;
}

.mode-btn:hover {
  color: var(--text-primary);
}

.mode-btn.active {
  background: var(--accent-color);
  color: var(--bg-primary);
}

.stats {
  gap: 1rem;
}

.stat {
  font-size: 0.8rem;
  color: var(--text-muted);
  font-weight: 500;
}

@media (max-width: 1024px) {
  .toolbar {
    padding: 0.75rem 1rem;
    gap: 0.5rem;
  }
  
  .toolbar-group {
    gap: 0.125rem;
  }
  
  .btn {
    padding: 0.5rem 0.75rem;
    font-size: 0.8rem;
  }
  
  .stats .stat {
    display: none;
  }
}

@media (max-width: 768px) {
  .toolbar {
    flex-wrap: wrap;
    height: auto;
    min-height: 70px;
    gap: 0.5rem;
  }
  
  .toolbar-left,
  .toolbar-center,
  .toolbar-right {
    flex: none;
  }
  
  .toolbar-center {
    order: -1;
    width: 100%;
    justify-content: center;
  }
  
  .btn span:not(.icon) {
    display: none;
  }
  
  .btn-icon {
    min-width: 32px;
    padding: 0.4rem;
  }
  
  .view-mode-toggle {
    width: 100%;
    justify-content: center;
  }
  
  .mode-btn {
    flex: 1;
    text-align: center;
  }
}
</style>