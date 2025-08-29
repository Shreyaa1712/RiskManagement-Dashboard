import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../dist')));

// In-memory data storage for demonstration
let portfolioAssets = [
  {
    id: 1,
    symbol: 'AAPL',
    name: 'Apple Inc.',
    quantity: 100,
    price: 150.25,
    sector: 'Technology',
    risk_score: 7.2,
    created_at: '2024-01-15T10:30:00Z'
  },
  {
    id: 2,
    symbol: 'MSFT',
    name: 'Microsoft Corporation',
    quantity: 75,
    price: 320.50,
    sector: 'Technology',
    risk_score: 6.8,
    created_at: '2024-01-15T10:30:00Z'
  },
  {
    id: 3,
    symbol: 'JPM',
    name: 'JPMorgan Chase & Co.',
    quantity: 50,
    price: 140.75,
    sector: 'Financial',
    risk_score: 8.1,
    created_at: '2024-01-15T10:30:00Z'
  },
  {
    id: 4,
    symbol: 'JNJ',
    name: 'Johnson & Johnson',
    quantity: 60,
    price: 165.30,
    sector: 'Healthcare',
    risk_score: 5.9,
    created_at: '2024-01-15T10:30:00Z'
  },
  {
    id: 5,
    symbol: 'XOM',
    name: 'Exxon Mobil Corporation',
    quantity: 40,
    price: 95.20,
    sector: 'Energy',
    risk_score: 9.2,
    created_at: '2024-01-15T10:30:00Z'
  }
];

let riskMetrics = [
  {
    id: 1,
    date: '2024-01-15',
    var_95: 12450,
    var_99: 18750,
    sharpe_ratio: 1.42,
    volatility: 0.18,
    beta: 1.12,
    created_at: '2024-01-15T10:30:00Z'
  },
  {
    id: 2,
    date: '2024-01-14',
    var_95: 11890,
    var_99: 17920,
    sharpe_ratio: 1.38,
    volatility: 0.17,
    beta: 1.10,
    created_at: '2024-01-14T10:30:00Z'
  }
];

// Routes
app.get('/api/portfolio', (req, res) => {
  try {
    res.json({ success: true, data: portfolioAssets });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.get('/api/risk-metrics', (req, res) => {
  try {
    res.json({ success: true, data: riskMetrics });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.post('/api/portfolio/add', (req, res) => {
  try {
    const { symbol, name, quantity, price, sector, risk_score } = req.body;
    const newAsset = {
      id: Date.now(),
      symbol,
      name,
      quantity: parseFloat(quantity),
      price: parseFloat(price),
      sector,
      risk_score: parseFloat(risk_score),
      created_at: new Date().toISOString()
    };
    portfolioAssets.unshift(newAsset);
    res.json({ success: true, id: newAsset.id });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.post('/api/risk-metrics/add', (req, res) => {
  try {
    const { date, var_95, var_99, sharpe_ratio, volatility, beta } = req.body;
    const newMetric = {
      id: Date.now(),
      date,
      var_95: parseFloat(var_95),
      var_99: parseFloat(var_99),
      sharpe_ratio: parseFloat(sharpe_ratio),
      volatility: parseFloat(volatility),
      beta: parseFloat(beta),
      created_at: new Date().toISOString()
    };
    riskMetrics.unshift(newMetric);
    res.json({ success: true, id: newMetric.id });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.get('/api/portfolio/analytics', (req, res) => {
  try {
    const totalValue = portfolioAssets.reduce((sum, asset) => sum + (asset.quantity * asset.price), 0);
    const sectorExposure = portfolioAssets.reduce((acc, asset) => {
      if (!acc[asset.sector]) {
        acc[asset.sector] = { value: 0, count: 0 };
      }
      acc[asset.sector].value += asset.quantity * asset.price;
      acc[asset.sector].count += 1;
      return acc;
    }, {});
    
    const sectorExposureArray = Object.entries(sectorExposure).map(([sector, data]) => ({
      sector,
      value: data.value,
      count: data.count
    })).sort((a, b) => b.value - a.value);
    
    const avgRiskScore = portfolioAssets.reduce((sum, asset) => sum + asset.risk_score, 0) / portfolioAssets.length;
    
    res.json({
      success: true,
      data: {
        totalValue,
        sectorExposure: sectorExposureArray,
        avgRiskScore
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'healthy', 
    timestamp: new Date().toISOString(),
    services: {
      portfolio: 'running',
      riskMetrics: 'running',
      analytics: 'running'
    }
  });
});

// Serve React app for all other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

app.listen(PORT, () => {
  console.log(`🚀 Risk Management Server running on port ${PORT}`);
  console.log(`📊 API available at http://localhost:${PORT}/api`);
  console.log(`🔗 Health check: http://localhost:${PORT}/api/health`);
  console.log(`📁 Portfolio API: http://localhost:${PORT}/api/portfolio`);
  console.log(`📈 Risk Metrics API: http://localhost:${PORT}/api/risk-metrics`);
});

export default app; 