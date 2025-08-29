import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { RefreshCw, BarChart3, TrendingUp, PieChart, Activity, Download, Share2, Settings } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar, PieChart as RechartsPieChart, Pie, Cell } from 'recharts';

interface PowerBIReport {
  id: string;
  name: string;
  type: 'dashboard' | 'report' | 'tile';
  description: string;
  lastUpdated: string;
  dataSource: string;
}

const PowerBIIntegration: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [activeReport, setActiveReport] = useState<string>('risk-dashboard');

  const reports: PowerBIReport[] = [
    {
      id: 'risk-dashboard',
      name: 'Risk Analytics Dashboard',
      type: 'dashboard',
      description: 'Interactive risk analytics dashboard with real-time portfolio monitoring',
      lastUpdated: '2 minutes ago',
      dataSource: 'Live Market Data'
    },
    {
      id: 'portfolio-performance',
      name: 'Portfolio Performance',
      type: 'report',
      description: 'Detailed portfolio performance analysis with historical trends',
      lastUpdated: '5 minutes ago',
      dataSource: 'Portfolio Database'
    },
    {
      id: 'stress-testing',
      name: 'Stress Testing Scenarios',
      type: 'report',
      description: 'Comprehensive stress testing scenarios and risk modeling',
      lastUpdated: '1 hour ago',
      dataSource: 'Risk Models'
    }
  ];

  // Sample data for charts
  const riskMetricsData = [
    { month: 'Jan', var95: 12450, var99: 18750, volatility: 0.18, sharpe: 1.42 },
    { month: 'Feb', var95: 11890, var99: 17920, volatility: 0.17, sharpe: 1.38 },
    { month: 'Mar', var95: 13200, var99: 19800, volatility: 0.19, sharpe: 1.45 },
    { month: 'Apr', var95: 12800, var99: 19200, volatility: 0.18, sharpe: 1.40 },
    { month: 'May', var95: 14100, var99: 21150, volatility: 0.20, sharpe: 1.48 },
    { month: 'Jun', var95: 13500, var99: 20250, volatility: 0.19, sharpe: 1.43 }
  ];

  const sectorPerformanceData = [
    { sector: 'Technology', return: 12.5, risk: 6.8, allocation: 45.2 },
    { sector: 'Financial', return: 8.2, risk: 8.1, allocation: 18.7 },
    { sector: 'Healthcare', return: 9.8, risk: 5.9, allocation: 15.3 },
    { sector: 'Energy', return: 15.2, risk: 9.2, allocation: 12.1 },
    { sector: 'Consumer', return: 10.1, risk: 7.1, allocation: 8.7 }
  ];

  const stressTestData = [
    { scenario: 'Market Crash', impact: -25.5, probability: 0.05, var: 31250 },
    { scenario: 'Interest Rate Hike', impact: -8.2, probability: 0.15, var: 18750 },
    { scenario: 'Currency Crisis', impact: -12.8, probability: 0.08, var: 22500 },
    { scenario: 'Sector Rotation', impact: -5.5, probability: 0.25, var: 15625 },
    { scenario: 'Geopolitical Risk', impact: -18.3, probability: 0.12, var: 28125 }
  ];

  const handleRefresh = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  };

  const handleExport = (reportId: string) => {
    // Simulate export functionality
    console.log(`Exporting ${reportId}`);
    // In real implementation, this would trigger a download
  };

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

  return (
    <Card className="bg-gradient-card border-border/50 shadow-card">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <BarChart3 className="h-5 w-5 text-primary" />
            <CardTitle className="text-lg font-semibold">Power BI Analytics (Demo Mode)</CardTitle>
          </div>
          <div className="flex items-center space-x-2">
            <Badge variant="outline" className="bg-warning/10 text-warning border-warning/20">
              Demo Mode
            </Badge>
            <Button
              variant="outline"
              size="sm"
              onClick={handleRefresh}
              disabled={isLoading}
            >
              <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
            <Button variant="outline" size="sm">
              <Settings className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        <Tabs value={activeReport} onValueChange={setActiveReport}>
          <TabsList className="grid w-full grid-cols-3">
            {reports.map((report) => (
              <TabsTrigger key={report.id} value={report.id} className="flex items-center space-x-2">
                {report.type === 'dashboard' && <BarChart3 className="h-4 w-4" />}
                {report.type === 'report' && <TrendingUp className="h-4 w-4" />}
                {report.type === 'tile' && <PieChart className="h-4 w-4" />}
                <span className="hidden sm:inline">{report.name}</span>
              </TabsTrigger>
            ))}
          </TabsList>
          
          {/* Risk Analytics Dashboard */}
          <TabsContent value="risk-dashboard" className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-foreground">Risk Analytics Dashboard</h4>
                <p className="text-sm text-muted-foreground">
                  Interactive risk analytics dashboard with real-time portfolio monitoring
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <Badge variant="secondary" className="capitalize">Dashboard</Badge>
                <Button variant="outline" size="sm" onClick={() => handleExport('risk-dashboard')}>
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Risk Metrics Chart */}
              <Card className="p-4">
                <h5 className="font-medium mb-4">Risk Metrics Trend</h5>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={riskMetricsData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip formatter={(value, name) => [
                      name === 'var95' ? `$${Number(value).toLocaleString()}` : 
                      name === 'var99' ? `$${Number(value).toLocaleString()}` : 
                      name === 'volatility' ? `${(Number(value) * 100).toFixed(1)}%` : 
                      Number(value).toFixed(2)
                    ]} />
                    <Legend />
                    <Line type="monotone" dataKey="var95" stroke="#8884d8" name="VaR (95%)" />
                    <Line type="monotone" dataKey="var99" stroke="#82ca9d" name="VaR (99%)" />
                    <Line type="monotone" dataKey="volatility" stroke="#ffc658" name="Volatility" />
                  </LineChart>
                </ResponsiveContainer>
              </Card>

              {/* Sector Performance */}
              <Card className="p-4">
                <h5 className="font-medium mb-4">Sector Performance</h5>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={sectorPerformanceData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="sector" />
                    <YAxis />
                    <Tooltip formatter={(value, name) => [
                      name === 'return' || name === 'allocation' ? `${value}%` : 
                      name === 'risk' ? Number(value).toFixed(1) : value
                    ]} />
                    <Legend />
                    <Bar dataKey="return" fill="#8884d8" name="Return %" />
                    <Bar dataKey="allocation" fill="#82ca9d" name="Allocation %" />
                  </BarChart>
                </ResponsiveContainer>
              </Card>
            </div>

            {/* Key Metrics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card className="p-4 text-center">
                <div className="text-2xl font-bold text-primary">$12,450</div>
                <div className="text-sm text-muted-foreground">Current VaR (95%)</div>
              </Card>
              <Card className="p-4 text-center">
                <div className="text-2xl font-bold text-success">1.42</div>
                <div className="text-sm text-muted-foreground">Sharpe Ratio</div>
              </Card>
              <Card className="p-4 text-center">
                <div className="text-2xl font-bold text-warning">18.2%</div>
                <div className="text-sm text-muted-foreground">Volatility</div>
              </Card>
              <Card className="p-4 text-center">
                <div className="text-2xl font-bold text-info">7.44</div>
                <div className="text-sm text-muted-foreground">Risk Score</div>
              </Card>
            </div>
          </TabsContent>

          {/* Portfolio Performance Report */}
          <TabsContent value="portfolio-performance" className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-foreground">Portfolio Performance Report</h4>
                <p className="text-sm text-muted-foreground">
                  Detailed portfolio performance analysis with historical trends
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <Badge variant="secondary" className="capitalize">Report</Badge>
                <Button variant="outline" size="sm" onClick={() => handleExport('portfolio-performance')}>
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Portfolio Value Trend */}
              <Card className="p-4">
                <h5 className="font-medium mb-4">Portfolio Value Trend</h5>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={riskMetricsData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip formatter={(value) => [`$${Number(value).toLocaleString()}`, 'Portfolio Value']} />
                    <Line type="monotone" dataKey="var95" stroke="#8884d8" name="Portfolio Value" />
                  </LineChart>
                </ResponsiveContainer>
              </Card>

              {/* Sector Allocation */}
              <Card className="p-4">
                <h5 className="font-medium mb-4">Sector Allocation</h5>
                <ResponsiveContainer width="100%" height={300}>
                  <RechartsPieChart>
                    <Pie
                      data={sectorPerformanceData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ sector, allocation }) => `${sector}: ${allocation}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="allocation"
                    >
                      {sectorPerformanceData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => [`${value}%`, 'Allocation']} />
                  </RechartsPieChart>
                </ResponsiveContainer>
              </Card>
            </div>
          </TabsContent>

          {/* Stress Testing Scenarios */}
          <TabsContent value="stress-testing" className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-foreground">Stress Testing Scenarios</h4>
                <p className="text-sm text-muted-foreground">
                  Comprehensive stress testing scenarios and risk modeling
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <Badge variant="secondary" className="capitalize">Report</Badge>
                <Button variant="outline" size="sm" onClick={() => handleExport('stress-testing')}>
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Stress Test Impact */}
              <Card className="p-4">
                <h5 className="font-medium mb-4">Stress Test Impact Analysis</h5>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={stressTestData} layout="horizontal">
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" />
                    <YAxis dataKey="scenario" type="category" width={100} />
                    <Tooltip formatter={(value) => [`${value}%`, 'Impact']} />
                    <Bar dataKey="impact" fill="#ff6b6b" name="Impact %" />
                  </BarChart>
                </ResponsiveContainer>
              </Card>

              {/* Risk Probability Matrix */}
              <Card className="p-4">
                <h5 className="font-medium mb-4">Risk Probability Matrix</h5>
                <div className="space-y-3">
                  {stressTestData.map((scenario, index) => (
                    <div key={index} className="flex items-center justify-between p-2 bg-muted/20 rounded">
                      <span className="text-sm font-medium">{scenario.scenario}</span>
                      <div className="flex items-center space-x-2">
                        <Badge variant="outline" className="text-xs">
                          {(scenario.probability * 100).toFixed(1)}%
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          ${scenario.var.toLocaleString()}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        {/* Footer Information */}
        <div className="flex items-center justify-between text-sm text-muted-foreground pt-4 border-t">
          <div className="flex items-center space-x-4">
            <span>Last updated: {new Date().toLocaleString()}</span>
            <span>Source: Demo Data</span>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="sm">
              <Share2 className="h-4 w-4 mr-2" />
              Share
            </Button>
            <Button variant="ghost" size="sm">
              <Settings className="h-4 w-4 mr-2" />
              Configure
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PowerBIIntegration; 