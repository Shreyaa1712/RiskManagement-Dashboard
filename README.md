# Risk Navigator Vibe - Integrated Risk Management Dashboard

A comprehensive risk management application that integrates SQL database management, Power BI analytics, and PDF data extraction using Tabula.js.

## 🚀 Features

### Core Risk Management
- **Portfolio Analytics**: Real-time portfolio performance tracking
- **Risk Metrics**: VaR calculations, Sharpe ratios, volatility analysis
- **Stress Testing**: Scenario-based risk assessment
- **Sector Exposure**: Portfolio diversification analysis

### Technology Integrations
- **SQL Database**: SQLite backend with portfolio and risk data management
- **Power BI**: Embedded analytics dashboards and reports
- **Tabula.js**: PDF table extraction and data processing
- **React + TypeScript**: Modern frontend with shadcn/ui components

## 🛠️ Tech Stack

- **Frontend**: React 18, TypeScript, Vite, Tailwind CSS
- **Backend**: Node.js, Express, SQLite (better-sqlite3)
- **UI Components**: shadcn/ui, Radix UI, Lucide React icons
- **Charts**: Recharts for data visualization
- **PDF Processing**: Tabula.js for table extraction
- **Database**: SQLite with prepared statements

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd risk-navigator-vibe
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory:
   ```env
   PORT=3001
   NODE_ENV=development
   POWERBI_CLIENT_ID=your_powerbi_client_id
   POWERBI_CLIENT_SECRET=your_powerbi_client_secret
   POWERBI_TENANT_ID=your_powerbi_tenant_id
   POWERBI_WORKSPACE_ID=your_powerbi_workspace_id
   POWERBI_REPORT_ID=your_powerbi_report_id
   ```

## 🚀 Running the Application

### Development Mode (Frontend + Backend)
```bash
npm run dev:full
```
This will start both the React frontend (port 5173) and the Express backend (port 3001).

### Frontend Only
```bash
npm run dev
```

### Backend Only
```bash
npm run server
```

### Production Build
```bash
npm run build
npm run preview
```

## 🗄️ Database Schema

The application uses SQLite with the following tables:

### Portfolio Assets
- `id`: Primary key
- `symbol`: Stock symbol
- `name`: Company name
- `quantity`: Number of shares
- `price`: Current price
- `sector`: Industry sector
- `risk_score`: Risk assessment (1-10)
- `created_at`: Timestamp

### Risk Metrics
- `id`: Primary key
- `date`: Date of metrics
- `var_95`: 95% Value at Risk
- `var_99`: 99% Value at Risk
- `sharpe_ratio`: Risk-adjusted return
- `volatility`: Portfolio volatility
- `beta`: Market correlation

### Stress Test Scenarios
- `id`: Primary key
- `name`: Scenario name
- `description`: Scenario description
- `market_shock`: Market impact percentage
- `interest_rate_shock`: Rate change impact
- `currency_shock`: Currency impact

### PDF Reports
- `id`: Primary key
- `filename`: Original PDF filename
- `content`: Extracted text content
- `extracted_data`: Structured table data
- `uploaded_at`: Processing timestamp

## 🔌 API Endpoints

### Portfolio Management
- `GET /api/portfolio` - Get all portfolio assets
- `POST /api/portfolio/add` - Add new asset
- `GET /api/portfolio/analytics` - Portfolio summary analytics

### Risk Metrics
- `GET /api/risk-metrics` - Get risk metrics history
- `POST /api/risk-metrics/add` - Add new risk metrics

## 📊 Power BI Integration

The application includes embedded Power BI reports for:
- Risk Analytics Dashboard
- Portfolio Performance Analysis
- Stress Testing Scenarios

To configure Power BI:
1. Set up Power BI Service account
2. Configure workspace and report IDs
3. Update environment variables
4. Embed reports in the PowerBIIntegration component

## 📄 PDF Data Extraction

Tabula.js integration provides:
- PDF file upload and processing
- Table extraction and data parsing
- CSV export functionality
- Data analytics and insights

## 🎨 UI Components

Built with shadcn/ui components:
- Cards, Tables, Forms
- Tabs, Dialogs, Modals
- Charts and Data Visualization
- Responsive design for all devices

## 🔒 Security Features

- Helmet.js for security headers
- CORS configuration
- Input validation and sanitization
- Prepared SQL statements

## 📱 Responsive Design

- Mobile-first approach
- Responsive grid layouts
- Touch-friendly interactions
- Adaptive component sizing

## 🧪 Testing

```bash
npm run lint          # ESLint checking
npm run build         # Build verification
```

## 🚀 Deployment

### Frontend (Vercel/Netlify)
```bash
npm run build
# Deploy dist/ folder
```

### Backend (Railway/Render)
```bash
npm run build
# Deploy server/ folder
```

## 📈 Performance Optimization

- React Query for data caching
- Lazy loading of components
- Optimized bundle splitting
- Efficient re-renders

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Check the documentation
- Review the code examples

## 🔄 Updates

Stay updated with:
- Regular dependency updates
- Security patches
- New feature additions
- Performance improvements

---

**Built with ❤️ by Shreyaa.**
