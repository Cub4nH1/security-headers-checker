# 🔒 Security Headers Checker

> Analyse the HTTP security headers of any website and get a detailed report with a score, per-header findings and concrete remediation advice.

![Security Score](https://img.shields.io/badge/security-score%20A%2B-brightgreen)
![License](https://img.shields.io/badge/license-MIT-blue)
![Version](https://img.shields.io/badge/version-1.0.0-orange)
[![Get Pro](https://img.shields.io/badge/Get%20Pro-%E2%82%AC9-00d992?style=flat&logo=gumroad&logoColor=white)](https://cub4nh1.gumroad.com/l/security-checker-pro)

## 🚀 Live Demo

Try it: [security-headers-checker.onrender.com](https://security-headers-checker.onrender.com)

## ✨ Features

- ✅ **Full analysis** of 15 security headers
- ✅ **Letter score** (A+ to F) with intuitive colours
- ✅ **Per-header recommendations** explaining what to set and why
- ✅ **Response time** and server information
- ✅ **REST API** for CI/CD integration
- ✅ **Dark mode** interface

## 🛠️ Tech Stack

- **Frontend:** HTML5, CSS3, vanilla JavaScript
- **Backend:** Node.js + Express
- **Security:** Helmet, CORS, rate limiting
- **Design:** inspired by Linear and Vercel

## 🚀 Quick Start

### Requirements

- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/Cub4nH1/security-headers-checker.git
cd security-headers-checker

# Install dependencies
npm install

# Start the server
npm start

# Open http://localhost:3000
```

### Command line usage

```bash
# Analyse a URL
curl "http://localhost:3000/api/check?url=https://example.com"

# Get the score only
curl "http://localhost:3000/api/score?url=https://example.com"
```

## 📚 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/check?url={url}` | Full analysis |
| GET | `/api/score?url={url}` | Score only |

## 🔐 Headers Analysed

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
- `X-Powered-By` (flagged when present — it should be removed)

## 📊 Scoring

| Score | Meaning |
|-------|---------|
| **A+** | 15/15 headers present |
| **A** | 12-14 headers |
| **B** | 9-11 headers |
| **C** | 6-8 headers |
| **D** | 3-5 headers |
| **F** | 0-2 headers |

## ⚡ Pro version — €9

This repository is the **free and open-source** version. If you need reporting and bulk features, there is a **Pro** version:

### 👉 [Security Headers Checker Pro — €9](https://cub4nh1.gumroad.com/l/security-checker-pro)

| Feature | Free (this repo) | **Pro** |
|---|:---:|:---:|
| Analysis of 15 security headers | ✅ | ✅ |
| Score A+ → F | ✅ | ✅ |
| Per-header recommendations | ✅ | ✅ |
| **Professional PDF report** (pie chart, per-category bars, full table, branding) | ❌ | ✅ |
| **CSV export** with statistics and prioritised recommendations | ❌ | ✅ |
| **Bulk scan** of up to 50 domains at once | ❌ | ✅ |
| **Score comparison** across domains with charts | ❌ | ✅ |
| Category breakdown (Transport, CSP, Cross-Origin…) | ❌ | ✅ |
| Full source code, MIT licence, self-hosted | ❌ | ✅ |
| Lifetime updates | ❌ | ✅ |

One-time payment, no subscription. Built for agencies, freelancers and security researchers who deliver reports to clients.

**[→ Get Pro for €9](https://cub4nh1.gumroad.com/l/security-checker-pro)**

## 🤝 Contributing

Contributions are welcome.

1. Fork the project
2. Create a branch (`git checkout -b feature/amazing`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push (`git push origin feature/amazing`)
5. Open a Pull Request

Found a bug or have an idea? [Open an issue](https://github.com/Cub4nH1/security-headers-checker/issues) or start a [discussion](https://github.com/Cub4nH1/security-headers-checker/discussions).

## 💖 Support

If this tool is useful to you, you can [sponsor the project on GitHub](https://github.com/sponsors/Cub4nH1). Sponsorships cover hosting and keep the free version online.

## 📝 Licence

Released under the MIT licence. See [LICENSE](LICENSE) for details.

## 👨‍💻 Author

**Jon Nou (Cub4nH1)**
- GitHub: [@Cub4nH1](https://github.com/Cub4nH1)
- X: [@Cub4nH1](https://x.com/Cub4nH1)

## 🙏 Acknowledgements

- Inspired by [securityheaders.com](https://securityheaders.com)
- Design inspired by Linear and Vercel

---

⭐ If you find this project useful, leave a star!

💎 Need **PDF, CSV and bulk scanning**? Get the [Pro version for €9](https://cub4nh1.gumroad.com/l/security-checker-pro).
