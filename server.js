const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const fetch = require('node-fetch');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(helmet({
  contentSecurityPolicy: false,
}));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Header di sicurezza da controllare
const SECURITY_HEADERS = {
  'strict-transport-security': {
    name: 'Strict-Transport-Security',
    description: 'Forza connessioni HTTPS',
    recommendation: 'max-age=31536000; includeSubDomains; preload',
    weight: 10,
  },
  'x-content-type-options': {
    name: 'X-Content-Type-Options',
    description: 'Previene MIME sniffing',
    recommendation: 'nosniff',
    weight: 8,
  },
  'x-frame-options': {
    name: 'X-Frame-Options',
    description: 'Protegge da clickjacking',
    recommendation: 'DENY o SAMEORIGIN',
    weight: 8,
  },
  'x-xss-protection': {
    name: 'X-XSS-Protection',
    description: 'Attiva filtro XSS browser',
    recommendation: '1; mode=block',
    weight: 6,
  },
  'content-security-policy': {
    name: 'Content-Security-Policy',
    description: 'Controlla risorse caricate',
    recommendation: "default-src 'self'",
    weight: 10,
  },
  'referrer-policy': {
    name: 'Referrer-Policy',
    description: 'Controlla informazioni referrer',
    recommendation: 'strict-origin-when-cross-origin',
    weight: 6,
  },
  'permissions-policy': {
    name: 'Permissions-Policy',
    description: 'Controlla API browser',
    recommendation: 'camera=(), microphone=()',
    weight: 6,
  },
  'cross-origin-opener-policy': {
    name: 'Cross-Origin-Opener-Policy',
    description: 'Isola finestra da origini diverse',
    recommendation: 'same-origin',
    weight: 7,
  },
  'cross-origin-resource-policy': {
    name: 'Cross-Origin-Resource-Policy',
    description: 'Protegge risorse da hotlinking',
    recommendation: 'same-origin',
    weight: 5,
  },
  'cross-origin-embedder-policy': {
    name: 'Cross-Origin-Embedder-Policy',
    description: 'Controlla embedding risorse',
    recommendation: 'require-corp',
    weight: 5,
  },
  'expect-ct': {
    name: 'Expect-CT',
    description: 'Certificato Transparency',
    recommendation: 'max-age=86400, enforce',
    weight: 4,
  },
  'x-permitted-cross-domain-policies': {
    name: 'X-Permitted-Cross-Domain-Policies',
    description: 'Controlla policy cross-domain',
    recommendation: 'none',
    weight: 3,
  },
  'x-dns-prefetch-control': {
    name: 'X-DNS-Prefetch-Control',
    description: 'Controlla prefetch DNS',
    recommendation: 'off',
    weight: 2,
  },
  'x-download-options': {
    name: 'X-Download-Options',
    description: 'Blocca download automatici IE',
    recommendation: 'noopen',
    weight: 2,
  },
  'x-powered-by': {
    name: 'X-Powered-By',
    description: 'Informazioni server (rimuovere)',
    recommendation: 'Rimuovere questo header',
    weight: -5,
  },
};

// Calcola score basato sui header
function calculateScore(headers) {
  let total = 0;
  let maxTotal = 0;
  
  Object.values(SECURITY_HEADERS).forEach(h => {
    if (h.weight > 0) maxTotal += h.weight;
  });
  
  Object.keys(SECURITY_HEADERS).forEach(key => {
    const header = SECURITY_HEADERS[key];
    const value = headers[key] || headers[key.toLowerCase()];
    if (value) {
      total += header.weight;
    }
  });
  
  // Penalità per X-Powered-By presente
  if (headers['x-powered-by']) {
    total += SECURITY_HEADERS['x-powered-by'].weight;
  }
  
  return Math.max(0, total);
}

// Calcola lettera score
function getScoreLetter(score) {
  if (score >= 90) return 'A+';
  if (score >= 80) return 'A';
  if (score >= 70) return 'B';
  if (score >= 60) return 'C';
  if (score >= 50) return 'D';
  return 'F';
}

// API: analisi completa
app.get('/api/check', async (req, res) => {
  const { url } = req.query;
  
  if (!url) {
    return res.status(400).json({ error: 'Parametro URL mancante' });
  }
  
  try {
    const targetUrl = url.startsWith('http') ? url : `https://${url}`;
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 30000);
    
    const response = await fetch(targetUrl, {
      method: 'GET',
      signal: controller.signal,
      redirect: 'manual',
      headers: {
        'User-Agent': 'SecurityHeadersChecker/1.0',
      },
    });
    
    clearTimeout(timeout);
    
    // Gestisci redirect (301, 302, ecc.)
    if (response.status >= 300 && response.status < 400) {
      const location = response.headers.get('location');
      return res.json({
        url: targetUrl,
        statusCode: response.status,
        score: 0,
        maxScore: 82,
        percentage: 0,
        grade: 'F',
        headers: [],
        serverInfo: {
          server: 'Non rivelato',
          poweredBy: 'Non presente',
          contentType: 'Non specificato',
        },
        redirect: {
          status: response.status,
          location: location,
          message: `Questo sito reindirizza a ${location}. Analizza l'URL di destinazione.`,
        },
      });
    }
    
    if (!response.ok && response.status >= 400) {
      return res.status(500).json({
        error: `Il sito ha risposto con status ${response.status}`,
      });
    }
    
    const headers = {};
    response.headers.forEach((value, key) => {
      headers[key.toLowerCase()] = value;
    });
    
    const analysis = [];
    let totalScore = 0;
    let maxTotal = 0;
    
    Object.keys(SECURITY_HEADERS).forEach(key => {
      const header = SECURITY_HEADERS[key];
      const value = headers[key] || headers[key.toLowerCase()];
      
      if (header.weight > 0) maxTotal += header.weight;
      
      analysis.push({
        header: header.name,
        present: !!value,
        value: value || null,
        description: header.description,
        recommendation: header.recommendation,
        weight: header.weight,
      });
      
      if (value) totalScore += header.weight;
    });
    
    // Penalità X-Powered-By
    if (headers['x-powered-by']) {
      totalScore += SECURITY_HEADERS['x-powered-by'].weight;
    }
    
    const finalScore = Math.max(0, totalScore);
    const percentage = maxTotal > 0 ? Math.round((finalScore / maxTotal) * 100) : 0;
    
    res.json({
      url: targetUrl,
      statusCode: response.status,
      score: finalScore,
      maxScore: maxTotal,
      percentage: percentage,
      grade: getScoreLetter(percentage),
      headers: analysis,
      serverInfo: {
        server: headers['server'] || 'Non rivelato',
        poweredBy: headers['x-powered-by'] || 'Non presente',
        contentType: headers['content-type'] || 'Non specificato',
      },
      redirect: null,
    });
    
  } catch (error) {
    if (error.name === 'AbortError') {
      return res.status(500).json({
        error: `Timeout: il sito non ha risposto entro 30 secondi`,
      });
    }
    if (error.message && error.message.includes('redirect')) {
      return res.status(500).json({
        error: `Loop di redirect: il sito reindirizza troppo spesso. Prova con l'URL esatto.`,
      });
    }
    res.status(500).json({
      error: `Errore nell'analisi: ${error.message}`,
    });
  }
});

// API: solo score
app.get('/api/score', async (req, res) => {
  const { url } = req.query;
  
  if (!url) {
    return res.status(400).json({ error: 'Parametro URL mancante' });
  }
  
  try {
    const targetUrl = url.startsWith('http') ? url : `https://${url}`;
    const response = await fetch(targetUrl, { method: 'GET', redirect: 'follow' });
    
    const headers = {};
    response.headers.forEach((value, key) => {
      headers[key.toLowerCase()] = value;
    });
    
    let totalScore = 0;
    let maxTotal = 0;
    
    Object.keys(SECURITY_HEADERS).forEach(key => {
      const header = SECURITY_HEADERS[key];
      if (header.weight > 0) maxTotal += header.weight;
      if (headers[key]) totalScore += header.weight;
    });
    
    if (headers['x-powered-by']) {
      totalScore += SECURITY_HEADERS['x-powered-by'].weight;
    }
    
    const finalScore = Math.max(0, totalScore);
    const percentage = maxTotal > 0 ? Math.round((finalScore / maxTotal) * 100) : 0;
    
    res.json({
      url: targetUrl,
      score: finalScore,
      maxScore: maxTotal,
      percentage: percentage,
      grade: getScoreLetter(percentage),
    });
    
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Frontend
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Avvio server
app.listen(PORT, () => {
  console.log(`🔒 Security Headers Checker avviato su http://localhost:${PORT}`);
});
