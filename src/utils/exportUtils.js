export function useExportUtils() {
  const exportAsMarkdown = (content, filename = 'document.md') => {
    const blob = new Blob([content], { type: 'text/markdown;charset=utf-8' });
    downloadBlob(blob, filename);
  };

  const exportAsHTML = (content, filename = 'document.html') => {
    const html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Markdown Export</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.8.0/styles/github.min.css">
    <style>
        body { 
            font-family: 'Inter', system-ui, -apple-system, sans-serif; 
            max-width: 800px; 
            margin: 0 auto; 
            padding: 2rem; 
            line-height: 1.6; 
            color: #1e293b;
            background: #ffffff;
        }
        .code-block { 
            margin: 1rem 0; 
            border-radius: 8px;
            overflow: hidden;
            border: 1px solid #e2e8f0;
        }
        .code-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 0.5rem 1rem;
            background: #f1f5f9;
            border-bottom: 1px solid #e2e8f0;
            font-size: 0.875rem;
        }
        .table-container { 
            overflow-x: auto; 
            margin: 1rem 0; 
            border-radius: 8px;
            border: 1px solid #e2e8f0;
        }
        table { 
            border-collapse: collapse; 
            width: 100%; 
            background: white;
        }
        th, td { 
            border: 1px solid #e2e8f0; 
            padding: 0.75rem; 
            text-align: left; 
        }
        th {
            background: #f8fafc;
            font-weight: 600;
        }
        blockquote { 
            border-left: 4px solid #3b82f6; 
            padding-left: 1rem; 
            margin: 1rem 0; 
            color: #64748b;
            background: #f8fafc;
            padding: 1rem 1.5rem;
            border-radius: 0 8px 8px 0;
        }
        .empty-state {
            text-align: center;
            color: #94a3b8;
            font-style: italic;
            padding: 2rem;
        }
    </style>
</head>
<body>
    ${content}
</body>
</html>`;
    
    const blob = new Blob([html], { type: 'text/html;charset=utf-8' });
    downloadBlob(blob, filename);
  };

  const downloadBlob = (blob, filename) => {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return { exportAsMarkdown, exportAsHTML };
}