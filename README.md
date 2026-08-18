# 🔒 Security Headers Checker

> Analizza gli header HTTP di qualsiasi sito web e ottieni un report dettagliato con score, raccomandazioni e suggerimenti per migliorare la sicurezza.

![Security Score](https://img.shields.io/badge/security-score%20A%2B-brightgreen)
![License](https://img.shields.io/badge/license-MIT-blue)
![Version](https://img.shields.io/badge/version-1.0.0-orange)
[![Get Pro](https://img.shields.io/badge/Get%20Pro-%E2%82%AC9-00d992?style=flat&logo=gumroad&logoColor=white)](https://cub4nh1.gumroad.com/l/security-checker-pro)

## 🚀 Demo Live

Prova la demo: [security-headers-checker.onrender.com](https://security-headers-checker.onrender.com)

## ⚡ Versione Pro — €9

Questa è la versione **open source e gratuita**. Se ti serve di più, esiste la versione **Pro**:

### 👉 [Security Headers Checker Pro — €9](https://cub4nh1.gumroad.com/l/security-checker-pro)

| Funzionalità | Free (questo repo) | **Pro** |
|---|:---:|:---:|
| Analisi 15 header di sicurezza | ✅ | ✅ |
| Score A+ → F | ✅ | ✅ |
| Raccomandazioni per header | ✅ | ✅ |
| **Report PDF professionale** (grafico a torta, barre per categoria, tabella completa, branding) | ❌ | ✅ |
| **Export CSV** con statistiche e raccomandazioni prioritarie | ❌ | ✅ |
| **Bulk Scan** fino a 50 domini in una volta | ❌ | ✅ |
| **Confronto punteggi** tra domini con grafici | ❌ | ✅ |
| Distribuzione per categoria (Transport, CSP, Cross-Origin…) | ❌ | ✅ |
| Codice sorgente completo, licenza MIT, self-hosted | ❌ | ✅ |
| Aggiornamenti a vita | ❌ | ✅ |

Pagamento una volta sola, nessun abbonamento. Perfetto per agenzie, freelance e security researcher che devono consegnare report ai clienti.

**[→ Acquista la Pro a €9](https://cub4nh1.gumroad.com/l/security-checker-pro)**

## ✨ Features

- ✅ **Analisi completa** di 15+ header di sicurezza
- ✅ **Score visuale** (A+ a F) con colori intuitivi
- ✅ **Raccomandazioni dettagliate** per ogni header mancante
- ✅ **Tempo di risposta** e informazioni server
- ✅ **Export PDF** del report
- ✅ **API REST** per integrazione con CI/CD
- ✅ **Dark mode** elegante

## 📸 Screenshot

![Demo Preview](demo-screenshot.png)

## 🛠️ Tech Stack

- **Frontend:** HTML5, CSS3, JavaScript (Vanilla)
- **Backend:** Node.js + Express
- **Security:** Helmet, CORS, Rate Limiting
- **Stile:** Design ispirato a Linear/Vercel

## 🚀 Quick Start

### Prerequisiti

- Node.js 18+
- npm o yarn

### Installazione

```bash
# Clona il repository
git clone https://github.com/Cub4nH1/security-headers-checker.git
cd security-headers-checker

# Installa le dipendenze
npm install

# Avvia il server
npm start

# Apri http://localhost:3000
```

### Uso da riga di comando

```bash
# Analizza un URL
curl http://localhost:3000/api/check?url=https://example.com

# Ottieni solo lo score
curl http://localhost:3000/api/score?url=https://example.com
```

## 📚 API Endpoints

| Metodo | Endpoint | Descrizione |
|--------|----------|-------------|
| GET | `/api/check?url={url}` | Analisi completa |
| GET | `/api/score?url={url}` | Solo score |
| POST | `/api/check` | Analisi con body JSON |

## 🔐 Header Analizzati

- `Strict-Transport-Security`
- `X-Content-Type-Options`
- `X-Frame-Options`
- `X-XSS-Protection`
- `Content-Security-Policy`
- `Referrer-Policy`
- `Permissions-Policy`
- `Cross-Origin-Opener-Policy`
- `Cross-Origin-Resource-Policy`
- `Cross-Origin-Embedder-Policy`
- `Expect-CT`
- `X-Permitted-Cross-Domain-Policies`
- `X-DNS-Prefetch-Control`
- `X-Download-Options`
- `X-Powered-By` (rimozione)

## 📊 Sistema di Score

| Score | Descrizione |
|-------|-------------|
| **A+** | 15/15 header presenti |
| **A** | 12-14 header |
| **B** | 9-11 header |
| **C** | 6-8 header |
| **D** | 3-5 header |
| **F** | 0-2 header |

## 🤝 Contribuizione

Le contribuzioni sono benvenute! Leggi [CONTRIBUTING.md](CONTRIBUTING.md) per iniziare.

1. Fork il progetto
2. Crea un branch (`git checkout -b feature/amazing`)
3. Commit delle modifiche (`git commit -m 'Add amazing feature'`)
4. Push (`git push origin feature/amazing`)
5. Apri una Pull Request

## 📝 Licenza

Distribuito sotto licenza MIT. Vedi [LICENSE](LICENSE) per maggiori informazioni.

## 👨‍💻 Autore

**Jon Nou (Cub4nH1)**
- GitHub: [@Cub4nH1](https://github.com/Cub4nH1)
- Twitter: [@cub4nh1](https://twitter.com/cub4nh1)

## 🙏 Ringraziamenti

- Ispirato da [securityheaders.com](https://securityheaders.com)
- Design ispirato a Linear e Vercel

---

⭐ Se questo progetto ti è utile, lascia una stella!

💎 Ti serve **PDF, CSV e Bulk Scan**? Prendi la [versione Pro a €9](https://cub4nh1.gumroad.com/l/security-checker-pro).
