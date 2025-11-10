import { defineStore } from 'pinia';
import { ref, computed, watch } from 'vue';
import { useMarkdownParser } from '../utils/markdownParser.js';

export const useEditorStore = defineStore('editor', () => {
  const markdownText = ref('');
  const isDarkTheme = ref(false);
  const viewMode = ref('split');
  
  const { parseMarkdown } = useMarkdownParser();

  const htmlPreview = computed(() => parseMarkdown(markdownText.value));
  
  const statistics = computed(() => {
    const text = markdownText.value;
    const words = text.trim() ? text.trim().split(/\s+/).length : 0;
    const characters = text.length;
    const lines = text.split('\n').length;
    
    return { words, characters, lines };
  });

  const STORAGE_KEY = 'markdown-editor-content';
  
  const saveToStorage = () => {
    try {
      localStorage.setItem(STORAGE_KEY, markdownText.value);
      localStorage.setItem('editor-theme', isDarkTheme.value.toString());
    } catch (e) {
      console.warn('LocalStorage is not available');
    }
  };

  const loadFromStorage = () => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      const savedTheme = localStorage.getItem('editor-theme');
      
      if (saved) markdownText.value = saved;
      if (savedTheme) isDarkTheme.value = savedTheme === 'true';
    } catch (e) {
      console.warn('LocalStorage is not available');
    }
  };

  const insertText = (before, after = '', defaultText = '') => {
    const textarea = document.querySelector('.editor-textarea');
    if (!textarea) {
      const currentText = markdownText.value;
      const cursorPos = currentText.length;
      const newText = currentText.substring(0, cursorPos) + 
                     before + defaultText + after + 
                     currentText.substring(cursorPos);
      markdownText.value = newText;
      return;
    }

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = markdownText.value.substring(start, end) || defaultText;
    
    const newText = markdownText.value.substring(0, start) + 
                   before + selectedText + after + 
                   markdownText.value.substring(end);
    
    markdownText.value = newText;
    
    setTimeout(() => {
      textarea.focus();
      const newCursorPos = start + before.length + selectedText.length;
      textarea.setSelectionRange(newCursorPos, newCursorPos);
    }, 10);
  };

  const toggleTheme = () => {
    isDarkTheme.value = !isDarkTheme.value;
    saveToStorage();
  };

  const setViewMode = (mode) => {
    viewMode.value = mode;
  };

  watch([markdownText, isDarkTheme], () => {
    saveToStorage();
  }, { deep: true });

  return {
    markdownText,
    isDarkTheme,
    viewMode,
    htmlPreview,
    statistics,
    loadFromStorage,
    insertText,
    toggleTheme,
    setViewMode
  };
});