import { MetricCard } from "@/components/MetricCard";
import { PortfolioChart } from "@/components/PortfolioChart";
import { SectorExposure } from "@/components/SectorExposure";
import { RiskMetrics } from "@/components/RiskMetrics";
import { StressTesting } from "@/components/StressTesting";
import PowerBIIntegration from "@/components/PowerBIIntegration";
import TabulaIntegration from "@/components/TabulaIntegration";
import SQLDatabase from "@/components/SQLDatabase";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TrendingUp, Shield, AlertTriangle, DollarSign, BarChart3, Database, FileText, BarChart } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/50 bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                Risk Analytics Dashboard
              </h1>
              <p className="text-muted-foreground">Portfolio Risk Management & Stress Testing</p>
            </div>
            <div className="flex items-center space-x-2">
              <Badge variant="outline" className="bg-success/10 text-success border-success/20">
                Live Data
              </Badge>
              <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                SQL + Power BI + Tabula
              </Badge>
              <Badge variant="outline" className="bg-warning/10 text-warning border-warning/20">
                Demo Mode
              </Badge>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8 space-y-8">
        {/* Key Metrics */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <MetricCard
            title="Portfolio Value"
            value="$1,324,750"
            change="+2.4% (1D)"
            changeType="positive"
            icon={<DollarSign className="h-6 w-6" />}
          />
          <MetricCard
            title="Daily VaR (95%)"
            value="$12,450"
            change="4.2% of portfolio"
            changeType="neutral"
            icon={<AlertTriangle className="h-6 w-6" />}
          />
          <MetricCard
            title="Sharpe Ratio"
            value="1.42"
            change="+0.15 (1M)"
            changeType="positive"
            icon={<TrendingUp className="h-6 w-6" />}
          />
          <MetricCard
            title="Risk Score"
            value="6.8/10"
            change="Moderate Risk"
            changeType="neutral"
            icon={<Shield className="h-6 w-6" />}
          />
        </section>

        {/* Main Dashboard Tabs */}
        <section>
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="overview" className="flex items-center space-x-2">
                <BarChart3 className="h-4 w-4" />
                <span>Overview</span>
              </TabsTrigger>
              <TabsTrigger value="powerbi" className="flex items-center space-x-2">
                <BarChart className="h-4 w-4" />
                <span>Power BI</span>
              </TabsTrigger>
              <TabsTrigger value="sql" className="flex items-center space-x-2">
                <Database className="h-4 w-4" />
                <span>SQL Database</span>
              </TabsTrigger>
              <TabsTrigger value="tabula" className="flex items-center space-x-2">
                <FileText className="h-4 w-4" />
                <span>PDF Extraction</span>
              </TabsTrigger>
              <TabsTrigger value="analytics" className="flex items-center space-x-2">
                <TrendingUp className="h-4 w-4" />
                <span>Analytics</span>
              </TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-6">
              {/* Main Charts */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="bg-gradient-card border-border/50 p-6 shadow-card">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold text-foreground">Portfolio Performance vs VaR</h3>
                      <Badge variant="outline" className="text-primary border-primary/20">
                        12M View
                      </Badge>
                    </div>
                    <PortfolioChart />
                  </div>
                </Card>

                <Card className="bg-gradient-card border-border/50 p-6 shadow-card">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold text-foreground">Sector Exposure</h3>
                      <BarChart3 className="h-5 w-5 text-primary" />
                    </div>
                    <SectorExposure />
                  </div>
                </Card>
              </div>

              {/* Risk Analytics & Stress Testing */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <RiskMetrics />
                <StressTesting />
              </div>

              {/* Additional Insights */}
              <Card className="bg-gradient-card border-border/50 p-6 shadow-card">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-foreground">Market Insights</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <p className="font-medium text-foreground">Correlation Analysis</p>
                      <p className="text-sm text-muted-foreground">
                        Portfolio correlation to S&P 500: <span className="text-primary font-medium">0.75</span>
                      </p>
                    </div>
                    <div className="space-y-2">
                      <p className="font-medium text-foreground">Volatility Regime</p>
                      <p className="text-sm text-muted-foreground">
                        Current volatility: <span className="text-warning font-medium">Elevated</span>
                      </p>
                    </div>
                    <div className="space-y-2">
                      <p className="font-medium text-foreground">Next Rebalancing</p>
                      <p className="text-sm text-muted-foreground">
                        Scheduled for: <span className="text-accent font-medium">Dec 31, 2024</span>
                      </p>
                    </div>
                  </div>
                </div>
              </Card>
            </TabsContent>

            {/* Power BI Tab */}
            <TabsContent value="powerbi" className="space-y-6">
              <PowerBIIntegration />
            </TabsContent>

            {/* SQL Database Tab */}
            <TabsContent value="sql" className="space-y-6">
              <SQLDatabase />
            </TabsContent>

            {/* Tabula PDF Extraction Tab */}
            <TabsContent value="tabula" className="space-y-6">
              <TabulaIntegration />
            </TabsContent>

            {/* Analytics Tab */}
            <TabsContent value="analytics" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="bg-gradient-card border-border/50 p-6 shadow-card">
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-foreground">Data Integration Status</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 bg-muted/20 rounded-lg">
                        <div className="flex items-center space-x-2">
                          <Database className="h-4 w-4 text-success" />
                          <span>SQL Database</span>
                        </div>
                        <Badge variant="default">Connected</Badge>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-muted/20 rounded-lg">
                        <div className="flex items-center space-x-2">
                          <BarChart className="h-4 w-4 text-success" />
                          <span>Power BI</span>
                        </div>
                        <Badge variant="default">Connected</Badge>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-muted/20 rounded-lg">
                        <div className="flex items-center space-x-2">
                          <FileText className="h-4 w-4 text-success" />
                          <span>Tabula PDF</span>
                        </div>
                        <Badge variant="default">Ready</Badge>
                      </div>
                    </div>
                  </div>
                </Card>

                <Card className="bg-gradient-card border-border/50 p-6 shadow-card">
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-foreground">System Health</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span>Database Performance</span>
                        <Badge variant="default">Excellent</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>API Response Time</span>
                        <Badge variant="default">Fast</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Data Sync Status</span>
                        <Badge variant="default">Up to Date</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Security Status</span>
                        <Badge variant="default">Secure</Badge>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </section>
      </main>
    </div>
  );
};

export default Index;
