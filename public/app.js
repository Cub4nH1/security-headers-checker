    // Setup event listeners
    document.addEventListener('DOMContentLoaded', () => {
      document.getElementById('checkBtn').addEventListener('click', checkHeaders);
      document.getElementById('urlInput').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') checkHeaders();
      });
    });

    async function checkHeaders() {
      const urlInput = document.getElementById('urlInput');
      const url = urlInput.value.trim();
      
      if (!url) {
        showError('Inserisci un URL valido');
        return;
      }

      // Controlla se siamo in file:// (non funziona senza server)
      if (window.location.protocol === 'file:') {
        showError('⚠️ Apri questa pagina tramite http://localhost:3000 (avvia prima il server con: node server.js)');
        return;
      }

      // UI state
      document.getElementById('error').classList.remove('active');
      document.getElementById('results').classList.remove('active');
      document.getElementById('loading').classList.add('active');
      document.getElementById('checkBtn').disabled = true;

      try {
        const response = await fetch(`/api/check?url=${encodeURIComponent(url)}`);
        const data = await response.json();

        if (data.error) {
          showError(data.error);
          return;
        }

        displayResults(data);
      } catch (err) {
        showError('Errore di connessione. Verifica che il server sia avviato su http://localhost:3000');
      } finally {
        document.getElementById('loading').classList.remove('active');
        document.getElementById('checkBtn').disabled = false;
      }
    }

    function displayResults(data) {
      // Score
      const scoreCircle = document.getElementById('scoreCircle');
      scoreCircle.textContent = data.grade;
      scoreCircle.className = `score-circle ${data.grade.replace('+', '\\+')}`;
      
      document.getElementById('scoreText').textContent = `Security Score: ${data.grade}`;
      document.getElementById('scorePercent').textContent = `${data.percentage}% - ${getScoreText(data.percentage)}`;
      
      const scoreBar = document.getElementById('scoreBar');
      scoreBar.style.width = `${data.percentage}%`;
      scoreBar.className = `score-bar-fill ${data.percentage >= 70 ? 'high' : data.percentage >= 50 ? 'medium' : 'low'}`;

      // Headers
      const headersList = document.getElementById('headersList');
      headersList.innerHTML = '';
      
      let presentCount = 0;
      data.headers.forEach(h => {
        if (h.present) presentCount++;
        
        const item = document.createElement('div');
        item.className = 'header-item';
        item.innerHTML = `
          <div class="header-status ${h.present ? 'present' : 'missing'}">
            ${h.present ? '✓' : '✗'}
          </div>
          <div class="header-info">
            <div class="header-name">${h.header}</div>
            <div class="header-desc">${h.description}</div>
            ${!h.present ? `<div class="header-recommendation">💡 ${h.recommendation}</div>` : ''}
          </div>
          ${h.present ? `<div class="header-value">${h.value}</div>` : ''}
        `;
        headersList.appendChild(item);
      });

      document.getElementById('headerCount').textContent = `${presentCount}/${data.headers.length} presenti`;

      // Server Info
      const serverInfo = document.getElementById('serverInfo');
      serverInfo.innerHTML = `
        <div class="info-item">
          <div class="info-label">URL Analizzato</div>
          <div class="info-value">${data.url}</div>
        </div>
        <div class="info-item">
          <div class="info-label">Status Code</div>
          <div class="info-value">${data.statusCode}</div>
        </div>
        <div class="info-item">
          <div class="info-label">Server</div>
          <div class="info-value">${data.serverInfo.server}</div>
        </div>
        <div class="info-item">
          <div class="info-label">X-Powered-By</div>
          <div class="info-value">${data.serverInfo.poweredBy}</div>
        </div>
      `;

      document.getElementById('results').classList.add('active');
    }

    function getScoreText(percentage) {
      if (percentage >= 90) return 'Eccellente';
      if (percentage >= 80) return 'Ottimo';
      if (percentage >= 70) return 'Buono';
      if (percentage >= 60) return 'Discreto';
      if (percentage >= 50) return 'Sufficiente';
      return 'Insufficiente';
    }

    function showError(message) {
      const error = document.getElementById('error');
      error.textContent = message;
      error.classList.add('active');
    }