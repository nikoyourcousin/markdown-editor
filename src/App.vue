<template>
  <div :data-theme="store.isDarkTheme ? 'dark' : 'light'" class="app-container">
    <Toolbar />
    <div class="editor-container" ref="containerRef">
      <div class="panels-wrapper">
        <div class="panel panel-editor" :class="{ 'hidden': store.viewMode === 'preview' }">
          <textarea
            class="editor-textarea"
            v-model="store.markdownText"
            placeholder="Начните творить! Просто начните писать свой Markdown... ✨"
            ref="textareaRef"
            @input="handleInput"
          ></textarea>
        </div>
        
        <div class="panel preview-panel" :class="{ 'hidden': store.viewMode === 'editor' }">
          <div 
            class="preview-content" 
            v-html="store.htmlPreview"
            ref="previewRef"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick, watch } from 'vue';
import { useEditorStore } from './stores/editor.js';
import Toolbar from './components/Toolbar.vue';

import './styles/themes.css';

const store = useEditorStore();
const containerRef = ref(null);
const textareaRef = ref(null);
const previewRef = ref(null);

const handleInput = async () => {
  await nextTick();
  const textarea = textareaRef.value;
};

const updateContainerHeight = () => {
  const textarea = textareaRef.value;
  const preview = previewRef.value;
  
  if (textarea && preview) {
    const maxHeight = Math.max(
      textarea.scrollHeight,
      preview.scrollHeight,
      containerRef.value?.clientHeight || 0
    );
    
    document.documentElement.style.setProperty('--content-height', maxHeight + 'px');
  }
};

watch(() => store.isDarkTheme, (newVal) => {
  document.documentElement.setAttribute('data-theme', newVal ? 'dark' : 'light');
}, { immediate: true });

watch(() => store.htmlPreview, () => {
  nextTick(() => {
    updateContainerHeight();
  });
});

watch(() => store.viewMode, () => {
  nextTick(() => {
    handleInput();
    updateContainerHeight();
  });
});

onMounted(() => {
  store.loadFromStorage();
  
  setTimeout(() => {
    handleInput();
    updateContainerHeight();
  }, 100);

  window.addEventListener('resize', updateContainerHeight);
});
</script>

<style scoped>
.app-container {
  min-height: 100vh;
  background: var(--bg-primary);
  transition: all 0.3s ease;
}

.panels-wrapper {
  display: flex;
  min-height: var(--content-height);
  height: var(--content-height);
  gap: 0;
  transition: all 0.3s ease;
}

.panel {
  flex: 1;
  min-width: 300px;
  height: var(--content-height);
  overflow: hidden;
  transition: all 0.3s ease;
}

.panel-editor {
  background: var(--bg-primary);
  border-right: 1px solid var(--border-color);
}

.preview-panel {
  background: var(--bg-primary);
}

.hidden {
  display: none !important;
}

* {
  transition: background-color 0.3s ease, border-color 0.3s ease, color 0.3s ease;
}
</style>