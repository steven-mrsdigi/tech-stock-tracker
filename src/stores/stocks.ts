import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Stock, StockHistory, NewsItem } from '@/types'

export const useStockStore = defineStore('stocks', () => {
  // State
  const stocks = ref<Stock[]>([
    {
      symbol: 'NVDA',
      name: 'NVIDIA',
      nameZh: '輝達',
      price: 171.88,
      change: -2.31,
      changePercent: -1.33,
      marketCap: '4.19T',
      volume: '201.8M',
      pe: 42.54,
      high: 176.81,
      low: 171.03,
      open: 174.93,
      previousClose: 174.19
    },
    {
      symbol: 'AAPL',
      name: 'Apple',
      nameZh: '蘋果',
      price: 275.91,
      change: -0.58,
      changePercent: -0.21,
      marketCap: '4.06T',
      volume: '52.2M',
      pe: 34.97,
      high: 279.50,
      low: 273.23,
      open: 278.02,
      previousClose: 276.49
    },
    {
      symbol: 'GOOGL',
      name: 'Alphabet',
      nameZh: '谷歌',
      price: 331.25,
      change: -1.79,
      changePercent: -0.54,
      marketCap: '4.01T',
      volume: '87.1M',
      pe: 30.67,
      high: 332.69,
      low: 306.46,
      open: 312.23,
      previousClose: 333.04
    },
    {
      symbol: 'MSFT',
      name: 'Microsoft',
      nameZh: '微軟',
      price: 393.67,
      change: -20.52,
      changePercent: -4.95,
      marketCap: '2.93T',
      volume: '65.0M',
      pe: 24.64,
      high: 408.30,
      low: 392.33,
      open: 407.77,
      previousClose: 414.19
    },
    {
      symbol: 'AMZN',
      name: 'Amazon',
      nameZh: '亞馬遜',
      price: 222.69,
      change: -10.30,
      changePercent: -4.42,
      marketCap: '2.38T',
      volume: '95.7M',
      pe: 31.45,
      high: 226.30,
      low: 220.39,
      open: 224.99,
      previousClose: 232.99
    }
  ])

  const lastUpdate = ref<Date>(new Date())
  const autoUpdate = ref<boolean>(true)
  const selectedStocks = ref<string[]>(['NVDA'])
  const compareMode = ref<boolean>(false)

  // Generate mock 30-day history
  const generateHistory = (symbol: string, basePrice: number): StockHistory[] => {
    const history: StockHistory[] = []
    const today = new Date()
    for (let i = 29; i >= 0; i--) {
      const date = new Date(today)
      date.setDate(date.getDate() - i)
      const randomChange = (Math.random() - 0.5) * 10
      history.push({
        date: date.toISOString().split('T')[0],
        price: Number((basePrice + randomChange + (29 - i) * 0.5).toFixed(2))
      })
    }
    return history
  }

  const stockHistory = ref<Record<string, StockHistory[]>>({
    NVDA: generateHistory('NVDA', 165),
    AAPL: generateHistory('AAPL', 270),
    GOOGL: generateHistory('GOOGL', 325),
    MSFT: generateHistory('MSFT', 400),
    AMZN: generateHistory('AMZN', 230)
  })

  const news = ref<NewsItem[]>([
    {
      id: '1',
      title: 'NVIDIA Leads AI Chip Market Despite Recent Dip',
      titleZh: 'NVIDIA 雖近期下跌但仍領導 AI 晶片市場',
      summary: 'NVIDIA remains the dominant player in AI chip market with strong demand for H100 and upcoming H200 chips.',
      summaryZh: 'NVIDIA 憑藉 H100 和即將推出的 H200 晶片強勁需求，仍保持 AI 晶片市場主導地位。',
      source: 'TechCrunch',
      url: 'https://techcrunch.com',
      publishedAt: '2026-02-06T10:00:00Z',
      relatedStocks: ['NVDA']
    },
    {
      id: '2',
      title: 'Apple Achieves Record iPhone Market Share in US',
      titleZh: '蘋果在美國 iPhone 市場份額創歷史新高',
      summary: 'Apple captured 69% market share in the US smartphone market, marking its strongest quarter ever.',
      summaryZh: '蘋果在美國智能手機市場佔有率達到 69%，創下歷史最佳季度。',
      source: 'Bloomberg',
      url: 'https://bloomberg.com',
      publishedAt: '2026-02-05T14:30:00Z',
      relatedStocks: ['AAPL']
    },
    {
      id: '3',
      title: 'Microsoft Downgraded Due to AI Spending Concerns',
      titleZh: '微軟因 AI 支出擔憂被降級',
      summary: 'Stifel downgrades Microsoft citing concerns over massive AI capital expenditures impacting profitability.',
      summaryZh: 'Stifel 因擔憂大規模 AI 資本支出影響盈利能力而下調微軟評級。',
      source: 'Reuters',
      url: 'https://reuters.com',
      publishedAt: '2026-02-05T16:00:00Z',
      relatedStocks: ['MSFT']
    },
    {
      id: '4',
      title: 'Amazon Plans $200 Billion AI Investment',
      titleZh: '亞馬遜計劃投資 2000 億美元於 AI',
      summary: 'Amazon announces massive $200 billion capital expenditure plan focused on AI infrastructure.',
      summaryZh: '亞馬遜宣布將投資 2000 億美元於 AI 基礎設施。',
      source: 'CNBC',
      url: 'https://cnbc.com',
      publishedAt: '2026-02-05T12:00:00Z',
      relatedStocks: ['AMZN']
    },
    {
      id: '5',
      title: 'Alphabet Announces $180 Billion AI Investment Plan',
      titleZh: 'Alphabet 宣布 1800 億美元 AI 投資計劃',
      summary: 'Google\'s parent company plans to invest $180 billion in 2026 primarily for AI development.',
      summaryZh: 'Google 母公司計劃在 2026 年投資 1800 億美元主要用於 AI 開發。',
      source: 'Wall Street Journal',
      url: 'https://wsj.com',
      publishedAt: '2026-02-05T09:00:00Z',
      relatedStocks: ['GOOGL']
    },
    {
      id: '6',
      title: 'Tech Stocks Face Pressure Amid AI Investment Concerns',
      titleZh: '科技股因 AI 投資擔憂面臨壓力',
      summary: 'Major tech stocks declined as investors worry about the return on massive AI investments.',
      summaryZh: '主要科技股下跌，投資者擔心巨額 AI 投資的回報。',
      source: 'Financial Times',
      url: 'https://ft.com',
      publishedAt: '2026-02-06T08:00:00Z',
      relatedStocks: ['NVDA', 'MSFT', 'AMZN', 'GOOGL']
    }
  ])

  // Getters
  const sortedStocks = computed(() => {
    return [...stocks.value].sort((a, b) => b.marketCap.localeCompare(a.marketCap))
  })

  const getStockBySymbol = (symbol: string) => {
    return stocks.value.find(s => s.symbol === symbol)
  }

  const getHistoryBySymbol = (symbol: string) => {
    return stockHistory.value[symbol] || []
  }

  // Actions
  const updateStockPrices = () => {
    stocks.value.forEach(stock => {
      const randomChange = (Math.random() - 0.5) * 2
      stock.price = Number((stock.price + randomChange).toFixed(2))
      stock.change = Number((stock.price - stock.previousClose).toFixed(2))
      stock.changePercent = Number(((stock.change / stock.previousClose) * 100).toFixed(2))
    })
    lastUpdate.value = new Date()
  }

  const toggleAutoUpdate = () => {
    autoUpdate.value = !autoUpdate.value
  }

  const selectStock = (symbol: string) => {
    if (compareMode.value) {
      if (selectedStocks.value.includes(symbol)) {
        selectedStocks.value = selectedStocks.value.filter(s => s !== symbol)
      } else {
        selectedStocks.value.push(symbol)
      }
    } else {
      selectedStocks.value = [symbol]
    }
  }

  const toggleCompareMode = () => {
    compareMode.value = !compareMode.value
    if (!compareMode.value) {
      selectedStocks.value = [selectedStocks.value[0] || 'NVDA']
    }
  }

  return {
    stocks,
    sortedStocks,
    lastUpdate,
    autoUpdate,
    selectedStocks,
    compareMode,
    stockHistory,
    news,
    getStockBySymbol,
    getHistoryBySymbol,
    updateStockPrices,
    toggleAutoUpdate,
    selectStock,
    toggleCompareMode
  }
})
