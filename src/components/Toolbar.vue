<template>
  <div class="toolbar">
    <div class="toolbar-left">
      <div class="toolbar-group">
        <button class="btn btn-icon" @click="insertBold" title="Bold">
          <Bold :size="18" />
        </button>
        <button class="btn btn-icon" @click="insertItalic" title="Italic">
          <Italic :size="18" />
        </button>
        <button class="btn btn-icon" @click="insertCode" title="Inline Code">
          <Code :size="18" />
        </button>
        <button class="btn btn-icon" @click="insertLink" title="Link">
          <Link :size="18" />
        </button>
      </div>

      <div class="toolbar-group">
        <button class="btn" @click="insertCodeBlock" title="Code Block">
          <CodeSquare :size="16" />
          <span>Code</span>
        </button>
        <button class="btn" @click="insertTable" title="Table">
          <Table :size="16" />
          <span>Table</span>
        </button>
        <button class="btn" @click="insertQuote" title="Quote">
          <Quote :size="16" />
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
          <LayoutPanelLeft :size="14" />
          <span>Split</span>
        </button>
        <button 
          class="mode-btn" 
          @click="setViewMode('editor')" 
          :class="{ 'active': store.viewMode === 'editor' }"
          title="Editor Only"
        >
          <FileText :size="14" />
          <span>Editor</span>
        </button>
        <button 
          class="mode-btn" 
          @click="setViewMode('preview')" 
          :class="{ 'active': store.viewMode === 'preview' }"
          title="Preview Only"
        >
          <Eye :size="14" />
          <span>Preview</span>
        </button>
      </div>
    </div>

    <div class="toolbar-right">
      <div class="toolbar-group stats">
        <FileText :size="14" class="stat-icon" />
        <span class="stat">{{ store.statistics.words }} words</span>
        <span class="stat-separator">•</span>
        <span class="stat">{{ store.statistics.characters }} chars</span>
      </div>

      <div class="toolbar-group">
        <button class="btn btn-icon" @click="toggleTheme" :title="store.isDarkTheme ? 'Light Theme' : 'Dark Theme'">
          <Sun v-if="store.isDarkTheme" :size="18" />
          <Moon v-else :size="18" />
        </button>
      </div>

      <div class="toolbar-group">
        <button class="btn btn-primary" @click="exportMarkdown">
          <FileDown :size="16" />
          <span>Export MD</span>
        </button>
        <button class="btn btn-primary" @click="exportHTML">
          <Code :size="16" />
          <span>Export HTML</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useEditorStore } from '../stores/editor.js';
import { useExportUtils } from '../utils/exportUtils.js';
import {
  Bold,
  Italic,
  Code,
  Link,
  CodeSquare,
  Table,
  Quote,
  LayoutPanelLeft,
  FileText,
  Eye,
  Sun,
  Moon,
  FileDown
} from 'lucide-vue-next';

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
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.mode-btn:hover {
  color: var(--text-primary);
}

.mode-btn.active {
  background: var(--accent-color);
  color: var(--bg-primary);
}

.stats {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0 0.5rem;
}

.stat {
  font-size: 0.8rem;
  color: var(--text-muted);
  font-weight: 500;
}

.stat-icon {
  color: var(--text-muted);
}

.stat-separator {
  color: var(--border-color);
  margin: 0 0.25rem;
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
  
  .btn span:not(.icon) {
    display: inline-block;
  }
  
  .stats .stat:nth-child(3) {
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
  
  .mode-btn span {
    display: inline-block;
  }
  
  .mode-btn {
    justify-content: center;
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
  
  .stats .stat-icon {
    display: none;
  }
}
</style>
