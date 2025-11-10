import { marked } from 'marked';
import hljs from 'highlight.js';
import DOMPurify from 'dompurify';

marked.setOptions({
  highlight: function(code, lang) {
    const language = hljs.getLanguage(lang) ? lang : 'plaintext';
    try {
      return hljs.highlight(code, { language }).value;
    } catch (err) {
      return hljs.highlight(code, { language: 'plaintext' }).value;
    }
  },
  langPrefix: 'hljs language-',
  breaks: true,
  gfm: true,
  tables: true
});

const renderer = {
  table(header, body) {
    return `<div class="table-container">
      <table>
        <thead>${header}</thead>
        <tbody>${body}</tbody>
      </table>
    </div>`;
  },
  
  code(code, language, isEscaped) {
    const validLanguage = hljs.getLanguage(language) ? language : 'plaintext';
    let highlighted;
    try {
      highlighted = hljs.highlight(code, { language: validLanguage }).value;
    } catch (err) {
      highlighted = hljs.highlight(code, { language: 'plaintext' }).value;
    }
    
    return `<div class="code-block">
      <pre><span class="language-label">${validLanguage}</span><!-- <button class="copy-button" onclick="copyToClipboard(this)">Copy</button> --><code class="hljs language-${validLanguage}">${highlighted}</code></pre>
    </div>`;
  },
  
  blockquote(quote) {
    return `<blockquote class="enhanced-blockquote">${quote}</blockquote>`;
  },
  
  list(body, ordered, start) {
    const type = ordered ? 'ol' : 'ul';
    const startAttr = ordered && start !== 1 ? ` start="${start}"` : '';
    return `<${type}${startAttr} class="markdown-list">${body}</${type}>`;
  }
};

marked.use({ renderer });

export function useMarkdownParser() {
  const parseMarkdown = (text) => {
    if (!text || !text.trim()) {
      return '<div class="empty-state">Start typing your Markdown...</div>';
    }
    
    try {
      const rawHtml = marked.parse(text);
      return DOMPurify.sanitize(rawHtml, {
        ALLOWED_TAGS: [
          'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'br', 'hr',
          'ul', 'ol', 'li', 'blockquote', 'pre', 'code',
          'strong', 'em', 'del', 'a', 'img', 'table',
          'thead', 'tbody', 'tr', 'th', 'td'
        ],
        ALLOWED_ATTR: ['href', 'src', 'alt', 'class', 'target']
      });
    } catch (error) {
      console.error('Markdown parsing error:', error);
      return '<div class="error-state">Error parsing Markdown</div>';
    }
  };

  return { parseMarkdown };
}

if (typeof window !== 'undefined') {
  window.copyToClipboard = async function(button) {
    const codeBlock = button.closest('.code-block');
    if (!codeBlock) return;
    
    const codeElement = codeBlock.querySelector('code');
    if (!codeElement) return;
    
    const code = codeElement.textContent;
    try {
      await navigator.clipboard.writeText(code);
      const originalText = button.textContent;
      button.textContent = 'Copied!';
      button.style.background = '#10b981';
      
      setTimeout(() => {
        button.textContent = originalText;
        button.style.background = '';
      }, 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
      button.textContent = 'Failed!';
      setTimeout(() => button.textContent = 'Copy', 2000);
    }
  };
}