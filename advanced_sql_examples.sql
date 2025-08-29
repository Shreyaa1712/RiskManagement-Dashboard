--Portfolio Value Ranking using Window Function
SELECT
  id,
  symbol,
  name,
  quantity,
  price,
  sector,
  risk_score,
  SUM(quantity * price) OVER (PARTITION BY sector) AS sector_portfolio_value,
  RANK() OVER (ORDER BY risk_score DESC) AS risk_rank
FROM PortfolioAsset;

-- Rolling Average Risk Score
SELECT
  id,
  symbol,
  name,
  risk_score,
  AVG(risk_score) OVER (ORDER BY created_at ROWS BETWEEN 2 PRECEDING AND CURRENT ROW) AS rolling_avg_risk
FROM PortfolioAsset;

-- Daily Change in VaR Using LAG
SELECT
  id,
  date,
  var_95,
  var_95 - LAG(var_95) OVER (ORDER BY date) AS daily_var_change
FROM RiskMetric;