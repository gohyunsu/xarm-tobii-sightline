window.MathJax = {
  tex: {
    inlineMath: [['\\(', '\\)']],
    displayMath: [['\\[', '\\]'], ['$$', '$$']],
    processEscapes: true,
    processEnvironments: true,
    tags: 'ams',
    macros: {
      E: '\\mathbb{E}',
      Pr: '\\operatorname{Pr}',
      logit: '\\operatorname{logit}',
      TTC: '\\operatorname{TTC}',
      AOI: '\\operatorname{AOI}',
      clip: '\\operatorname{clip}',
      argmax: '\\operatorname*{arg\\,max}',
      ind: ['\\mathbf{1}\\!\\left\\{#1\\right\\}', 1]
    }
  },
  options: {
    skipHtmlTags: ['script', 'noscript', 'style', 'textarea', 'pre', 'code']
  },
  chtml: {
    scale: 0.98
  }
};
