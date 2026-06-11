function parsePostmanItem(item, sequence = 1) {
  let output = '';
  if (!item) return output;

  if (item.request) {
    const req = item.request;
    const method = (req.method || 'GET').toLowerCase();
    const rawUrl = req.url?.raw || req.url || '';

    output += `meta {\n  name: "${item.name || 'API Request'}"\n  type: "http"\n  seq: ${sequence}\n}\n\n`;
    output += `${method} {\n  url: "${rawUrl}"\n`;

    // Detect empty body — treat same as no body
    const rawBody = req.body?.raw?.trim() || '';
    const isEmptyBody = !rawBody || rawBody === '{}' || rawBody === '[]';

    let bodyMode = 'none';
    if (req.body && !isEmptyBody) {
      if (req.body.mode === 'raw') bodyMode = 'json';
      else if (req.body.mode === 'formdata') bodyMode = 'multipart-form';
      else if (req.body.mode === 'urlencoded') bodyMode = 'form-url-encoded';
    }
    output += `  body: ${bodyMode}\n`;
    output += req.auth?.type === 'bearer' ? `  auth: bearer\n` : `  auth: none\n`;
    output += `}\n\n`;

    if (req.header?.length > 0) {
      output += `headers {\n`;
      req.header.forEach(h => { if (!h.disabled) output += `  ${h.key}: ${h.value}\n`; });
      output += `}\n\n`;
    }

    if (req.auth?.type === 'bearer' && req.auth.bearer) {
      const tokenObj = req.auth.bearer.find(b => b.key === 'token');
      if (tokenObj) output += `auth:bearer {\n  token: ${tokenObj.value}\n}\n\n`;
    }

    // JSON body — skip entirely if empty, strip outer { } otherwise
    if (req.body?.mode === 'raw' && !isEmptyBody) {
      output += `body:json {\n`;
      try {
        const parsed = JSON.parse(rawBody);
        const inner = JSON.stringify(parsed, null, 2)
          .split('\n')
          .slice(1, -1)
          .map(l => `  ${l}`)
          .join('\n');
        output += inner + '\n';
      } catch (e) {
        output += `  ${rawBody}\n`;
      }
      output += `}\n\n`;
    }

    if (req.body?.mode === 'formdata' && req.body.formdata) {
      output += `body:multipart-form {\n`;
      req.body.formdata.forEach(f => {
        if (!f.disabled) output += `  ${f.key}: ${f.type === 'file' ? `@file(${f.src || ''})` : (f.value || '')}\n`;
      });
      output += `}\n\n`;
    }

    if (req.body?.mode === 'urlencoded' && req.body.urlencoded) {
      output += `body:form-url-encoded {\n`;
      req.body.urlencoded.forEach(f => {
        if (!f.disabled) output += `  ${f.key}: ${f.value || ''}\n`;
      });
      output += `}\n\n`;
    }

    output += `// ────────────────────────────────────────────────────────\n\n`;
  }

  if (item.item && Array.isArray(item.item)) {
    item.item.forEach((subItem, idx) => {
      output += parsePostmanItem(subItem, sequence + idx);
    });
  }

  return output;
}

// Compile button
document.getElementById('compile-trigger').addEventListener('click', function () {
  const inputField = document.getElementById('input-json');
  const outputField = document.getElementById('output-bru');
  if (!inputField.value.trim()) return;
  try {
    const postman = JSON.parse(inputField.value);
    let compiledOutput = '';
    if (postman.item && Array.isArray(postman.item)) {
      postman.item.forEach((item, idx) => {
        compiledOutput += parsePostmanItem(item, idx + 1);
      });
    }
    outputField.value = compiledOutput || '# No executable request arrays located within this collection tree.';
  } catch (e) {
    outputField.value = '// Compilation AST Parse Error: ' + e.message + '\n// Validate structural format correctness.';
  }
});

// Copy button
document.getElementById('copy-btn').addEventListener('click', function () {
  const outputText = document.getElementById('output-bru');
  if (!outputText.value.trim()) return;
  navigator.clipboard.writeText(outputText.value).then(() => {
    const btn = document.getElementById('copy-btn');
    btn.textContent = 'Copied!';
    btn.style.background = 'var(--biolume-green)';
    btn.style.color = '#050406';
    btn.style.borderColor = 'var(--biolume-green)';
    setTimeout(() => {
      btn.textContent = 'Copy Code';
      btn.style.background = 'rgba(255, 170, 0, 0.1)';
      btn.style.color = 'var(--vibrant-gold)';
      btn.style.borderColor = 'rgba(255, 170, 0, 0.3)';
    }, 2000);
  }).catch(err => console.error('Clipboard error:', err));
});

// Sustainability sliders
const teamSlider = document.getElementById('team-slider');
const reqSlider = document.getElementById('req-slider');

function calculateSustainabilityOffsets() {
  const teamSize = parseInt(teamSlider.value);
  const reqCount = parseInt(reqSlider.value);
  document.getElementById('team-val').textContent = teamSize + ' devs';
  document.getElementById('req-val').textContent = reqCount.toLocaleString() + ' reqs';
  const savedKgs = ((teamSize * reqCount * 12) * 0.0000153).toFixed(2);
  const equivalentTrees = Math.max(1, Math.round(savedKgs / 22));
  document.getElementById('carbon-val').textContent = savedKgs + ' kg CO\u2082e';
  document.getElementById('tree-val').textContent = equivalentTrees + ' Mature Trees';
}

teamSlider.addEventListener('input', calculateSustainabilityOffsets);
reqSlider.addEventListener('input', calculateSustainabilityOffsets);
git add script.js
git commit -m "fix: skip body:json block for empty bodies"
git push
