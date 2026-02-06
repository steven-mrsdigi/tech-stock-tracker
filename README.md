# Tech Stock Tracker | 科技股追蹤

A real-time tech stock tracking application built with Vue 3, TypeScript, Vuetify, and Pinia.

![Vue](https://img.shields.io/badge/Vue-3.4-green)
![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue)
![Vuetify](https://img.shields.io/badge/Vuetify-3.5-blue)
![Pinia](https://img.shields.io/badge/Pinia-2.1-yellow)

## Features | 功能特點

- 📊 **Real-time Stock Data** | 實時股票數據 - Auto-updates every 30 seconds
- 📈 **Interactive Charts** | 交互式圖表 - 30-day price trends with comparison mode
- 📰 **Latest News** | 最新新聞 - Tech news from top 5 companies
- 🌐 **Bilingual Support** | 雙語支持 - Switch between English and Chinese
- 📱 **Responsive Design** | 響應式設計 - Works on desktop and mobile

## Tech Stack | 技術棧

- **Vue 3** - Progressive JavaScript framework
- **TypeScript** - Type-safe development
- **Vuetify 3** - Material Design component library
- **Pinia** - State management
- **Vue I18n** - Internationalization
- **Chart.js** - Interactive charts
- **Vite** - Fast development build tool

## Project Setup | 項目設置

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## Stock Coverage | 股票覆蓋

| Symbol | Company | 公司 |
|--------|---------|------|
| NVDA | NVIDIA | 輝達 |
| AAPL | Apple | 蘋果 |
| GOOGL | Alphabet | 谷歌 |
| MSFT | Microsoft | 微軟 |
| AMZN | Amazon | 亞馬遜 |

## Screenshots | 截圖

The application includes:
- Real-time stock price table with auto-update
- 30-day price trend charts with comparison mode
- Latest tech news section
- Bilingual UI (English/Chinese)

## Deployment | 部署

### Vercel (Recommended)
```bash
npm install -g vercel
vercel --prod
```

### Docker
```bash
docker build -t tech-stock-tracker .
docker run -p 8080:80 tech-stock-tracker
```

## License | 許可證

MIT
