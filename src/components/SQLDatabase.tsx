import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Database, 
  Plus, 
  Search, 
  Filter, 
  Download, 
  RefreshCw,
  BarChart3,
  TrendingUp,
  AlertTriangle,
  Shield
} from 'lucide-react';

interface PortfolioAsset {
  id: number;
  symbol: string;
  name: string;
  quantity: number;
  price: number;
  sector: string;
  risk_score: number;
  created_at: string;
}

interface RiskMetric {
  id: number;
  date: string;
  var_95: number;
  var_99: number;
  sharpe_ratio: number;
  volatility: number;
  beta: number;
  created_at: string;
}

const SQLDatabase: React.FC = () => {
  const [portfolioAssets, setPortfolioAssets] = useState<PortfolioAsset[]>([]);
  const [riskMetrics, setRiskMetrics] = useState<RiskMetric[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSector, setSelectedSector] = useState<string>('all');
  const [showAddAsset, setShowAddAsset] = useState(false);
  const [newAsset, setNewAsset] = useState({
    symbol: '',
    name: '',
    quantity: 0,
    price: 0,
    sector: '',
    risk_score: 0
  });

  // Sample data for demonstration
  const samplePortfolioAssets: PortfolioAsset[] = [
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

  const sampleRiskMetrics: RiskMetric[] = [
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

  useEffect(() => {
    setPortfolioAssets(samplePortfolioAssets);
    setRiskMetrics(sampleRiskMetrics);
  }, []);

  const filteredAssets = portfolioAssets.filter(asset => {
    const matchesSearch = asset.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         asset.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSector = selectedSector === 'all' || asset.sector === selectedSector;
    return matchesSearch && matchesSector;
  });

  const sectors = Array.from(new Set(portfolioAssets.map(asset => asset.sector)));

  const totalPortfolioValue = portfolioAssets.reduce((sum, asset) => sum + (asset.quantity * asset.price), 0);
  const avgRiskScore = portfolioAssets.reduce((sum, asset) => sum + asset.risk_score, 0) / portfolioAssets.length;

  const handleAddAsset = () => {
    if (newAsset.symbol && newAsset.name && newAsset.quantity > 0 && newAsset.price > 0) {
      const asset: PortfolioAsset = {
        id: Date.now(),
        ...newAsset,
        created_at: new Date().toISOString()
      };
      setPortfolioAssets(prev => [asset, ...prev]);
      setNewAsset({
        symbol: '',
        name: '',
        quantity: 0,
        price: 0,
        sector: '',
        risk_score: 0
      });
      setShowAddAsset(false);
    }
  };

  const exportToCSV = (data: any[], filename: string) => {
    if (data.length === 0) return;
    
    const headers = Object.keys(data[0]);
    const csvContent = [
      headers.join(','),
      ...data.map(row => headers.map(header => row[header]).join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <Card className="bg-gradient-card border-border/50 shadow-card">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Database className="h-5 w-5 text-primary" />
            <CardTitle className="text-lg font-semibold">SQL Database Management</CardTitle>
          </div>
          <div className="flex items-center space-x-2">
            <Badge variant="outline" className="bg-success/10 text-success border-success/20">
              SQLite
            </Badge>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowAddAsset(true)}
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Asset
            </Button>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Search and Filter Controls */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <Label htmlFor="search">Search Assets</Label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="search"
                placeholder="Search by symbol or name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          <div className="sm:w-48">
            <Label htmlFor="sector">Filter by Sector</Label>
            <Select value={selectedSector} onValueChange={setSelectedSector}>
              <SelectTrigger>
                <SelectValue placeholder="All Sectors" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Sectors</SelectItem>
                {sectors.map(sector => (
                  <SelectItem key={sector} value={sector}>{sector}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Portfolio Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="p-4">
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Total Value</p>
                <p className="text-2xl font-bold">${totalPortfolioValue.toLocaleString()}</p>
              </div>
            </div>
          </Card>
          <Card className="p-4">
            <div className="flex items-center space-x-2">
              <Database className="h-5 w-5 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Total Assets</p>
                <p className="text-2xl font-bold">{portfolioAssets.length}</p>
              </div>
            </div>
          </Card>
          <Card className="p-4">
            <div className="flex items-center space-x-2">
              <Shield className="h-5 w-5 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Avg Risk Score</p>
                <p className="text-2xl font-bold">{avgRiskScore.toFixed(1)}</p>
              </div>
            </div>
          </Card>
          <Card className="p-4">
            <div className="flex items-center space-x-2">
              <AlertTriangle className="h-5 w-5 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">High Risk Assets</p>
                <p className="text-2xl font-bold">
                  {portfolioAssets.filter(asset => asset.risk_score > 8).length}
                </p>
              </div>
            </div>
          </Card>
        </div>

        {/* Data Tables */}
        <Tabs defaultValue="portfolio" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="portfolio" className="flex items-center space-x-2">
              <BarChart3 className="h-4 w-4" />
              <span>Portfolio Assets</span>
            </TabsTrigger>
            <TabsTrigger value="risk-metrics" className="flex items-center space-x-2">
              <Shield className="h-4 w-4" />
              <span>Risk Metrics</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="portfolio" className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="font-medium">Portfolio Assets ({filteredAssets.length})</h4>
              <Button
                variant="outline"
                size="sm"
                onClick={() => exportToCSV(filteredAssets, 'portfolio_assets.csv')}
              >
                <Download className="h-4 w-4 mr-2" />
                Export CSV
              </Button>
            </div>
            
            <div className="border rounded-lg overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Symbol</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Quantity</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Value</TableHead>
                    <TableHead>Sector</TableHead>
                    <TableHead>Risk Score</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredAssets.map((asset) => (
                    <TableRow key={asset.id}>
                      <TableCell className="font-mono font-medium">{asset.symbol}</TableCell>
                      <TableCell>{asset.name}</TableCell>
                      <TableCell>{asset.quantity.toLocaleString()}</TableCell>
                      <TableCell>${asset.price.toFixed(2)}</TableCell>
                      <TableCell className="font-medium">
                        ${(asset.quantity * asset.price).toLocaleString()}
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{asset.sector}</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge 
                          variant={asset.risk_score > 8 ? 'destructive' : asset.risk_score > 6 ? 'default' : 'secondary'}
                        >
                          {asset.risk_score}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </TabsContent>

          <TabsContent value="risk-metrics" className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="font-medium">Risk Metrics ({riskMetrics.length})</h4>
              <Button
                variant="outline"
                size="sm"
                onClick={() => exportToCSV(riskMetrics, 'risk_metrics.csv')}
              >
                <Download className="h-4 w-4 mr-2" />
                Export CSV
              </Button>
            </div>
            
            <div className="border rounded-lg overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>VaR (95%)</TableHead>
                    <TableHead>VaR (99%)</TableHead>
                    <TableHead>Sharpe Ratio</TableHead>
                    <TableHead>Volatility</TableHead>
                    <TableHead>Beta</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {riskMetrics.map((metric) => (
                    <TableRow key={metric.id}>
                      <TableCell className="font-medium">{metric.date}</TableCell>
                      <TableCell>${metric.var_95.toLocaleString()}</TableCell>
                      <TableCell>${metric.var_99.toLocaleString()}</TableCell>
                      <TableCell>{metric.sharpe_ratio.toFixed(2)}</TableCell>
                      <TableCell>{(metric.volatility * 100).toFixed(1)}%</TableCell>
                      <TableCell>{metric.beta.toFixed(2)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </TabsContent>
        </Tabs>

        {/* Add Asset Dialog */}
        <Dialog open={showAddAsset} onOpenChange={setShowAddAsset}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Portfolio Asset</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="symbol">Symbol</Label>
                  <Input
                    id="symbol"
                    value={newAsset.symbol}
                    onChange={(e) => setNewAsset(prev => ({ ...prev, symbol: e.target.value.toUpperCase() }))}
                    placeholder="AAPL"
                  />
                </div>
                <div>
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    value={newAsset.name}
                    onChange={(e) => setNewAsset(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="Company Name"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="quantity">Quantity</Label>
                  <Input
                    id="quantity"
                    type="number"
                    value={newAsset.quantity}
                    onChange={(e) => setNewAsset(prev => ({ ...prev, quantity: parseFloat(e.target.value) || 0 }))}
                    placeholder="100"
                  />
                </div>
                <div>
                  <Label htmlFor="price">Price</Label>
                  <Input
                    id="price"
                    type="number"
                    step="0.01"
                    value={newAsset.price}
                    onChange={(e) => setNewAsset(prev => ({ ...prev, price: parseFloat(e.target.value) || 0 }))}
                    placeholder="150.25"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="sector">Sector</Label>
                  <Select value={newAsset.sector} onValueChange={(value) => setNewAsset(prev => ({ ...prev, sector: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Sector" />
                    </SelectTrigger>
                    <SelectContent>
                      {sectors.map(sector => (
                        <SelectItem key={sector} value={sector}>{sector}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="risk_score">Risk Score</Label>
                  <Input
                    id="risk_score"
                    type="number"
                    step="0.1"
                    min="0"
                    max="10"
                    value={newAsset.risk_score}
                    onChange={(e) => setNewAsset(prev => ({ ...prev, risk_score: parseFloat(e.target.value) || 0 }))}
                    placeholder="7.2"
                  />
                </div>
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setShowAddAsset(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAddAsset}>
                  Add Asset
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
};

export default SQLDatabase; 