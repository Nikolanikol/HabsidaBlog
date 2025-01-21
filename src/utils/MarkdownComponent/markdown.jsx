import React from 'react';
import { marked } from 'marked';
import './MarkdownViewer.css'
const MarkdownViewer = ({ markdownText }) => {
  const htmlContent = marked(markdownText);
  console.log(htmlContent)

  return (
    <div  className='markdown-body'>
        <div  dangerouslySetInnerHTML={{ __html: htmlContent }}></div>
    </div>
  );
};

export default MarkdownViewer;