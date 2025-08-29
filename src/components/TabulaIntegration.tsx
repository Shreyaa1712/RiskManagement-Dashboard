import React, { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Progress } from '@/components/ui/progress';
import { 
  Upload, 
  FileText, 
  Table as TableIcon, 
  Download, 
  Trash2, 
  Eye,
  BarChart3,
  AlertCircle
} from 'lucide-react';

interface ExtractedData {
  id: string;
  filename: string;
  tables: Array<{
    id: string;
    data: string[][];
    headers: string[];
    rows: number;
    columns: number;
  }>;
  extractedAt: Date;
  status: 'success' | 'error' | 'processing';
}

const TabulaIntegration: React.FC = () => {
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [extractedData, setExtractedData] = useState<ExtractedData[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Sample extracted data for demonstration
  const sampleData: ExtractedData[] = [
    {
      id: '1',
      filename: 'risk_report_2024.pdf',
      tables: [
        {
          id: 'table1',
          data: [
            ['Asset', 'Current Value', 'Risk Score', 'VaR (95%)', 'Beta'],
            ['AAPL', '$15,025', '7.2', '$1,203', '1.15'],
            ['MSFT', '$24,038', '6.8', '$1,923', '1.08'],
            ['JPM', '$7,038', '8.1', '$570', '1.25'],
            ['JNJ', '$9,918', '5.9', '$595', '0.85'],
            ['XOM', '$3,808', '9.2', '$350', '1.45']
          ],
          headers: ['Asset', 'Current Value', 'Risk Score', 'VaR (95%)', 'Beta'],
          rows: 5,
          columns: 5
        }
      ],
      extractedAt: new Date(),
      status: 'success'
    },
    {
      id: '2',
      filename: 'portfolio_analysis.pdf',
      tables: [
        {
          id: 'table2',
          data: [
            ['Sector', 'Allocation %', 'Risk Level', 'Expected Return'],
            ['Technology', '45.2%', 'Medium', '12.5%'],
            ['Financial', '18.7%', 'High', '8.2%'],
            ['Healthcare', '15.3%', 'Low', '9.8%'],
            ['Energy', '12.1%', 'Very High', '15.2%'],
            ['Consumer', '8.7%', 'Medium', '10.1%']
          ],
          headers: ['Sector', 'Allocation %', 'Risk Level', 'Expected Return'],
          rows: 5,
          columns: 4
        }
      ],
      extractedAt: new Date(Date.now() - 86400000), // 1 day ago
      status: 'success'
    }
  ];

  React.useEffect(() => {
    setExtractedData(sampleData);
  }, []);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    setUploadedFiles(prev => [...prev, ...files]);
  };

  const processFiles = async () => {
    if (uploadedFiles.length === 0) return;

    setIsProcessing(true);
    setProgress(0);

    for (let i = 0; i < uploadedFiles.length; i++) {
      const file = uploadedFiles[i];
      setProgress((i / uploadedFiles.length) * 100);

      // Simulate processing delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Simulate extracted data
      const newExtractedData: ExtractedData = {
        id: Date.now().toString(),
        filename: file.name,
        tables: [
          {
            id: `table_${Date.now()}`,
            data: [
              ['Column 1', 'Column 2', 'Column 3'],
              ['Data 1', 'Data 2', 'Data 3'],
              ['Data 4', 'Data 5', 'Data 6']
            ],
            headers: ['Column 1', 'Column 2', 'Column 3'],
            rows: 2,
            columns: 3
          }
        ],
        extractedAt: new Date(),
        status: 'success'
      };

      setExtractedData(prev => [newExtractedData, ...prev]);
    }

    setProgress(100);
    setIsProcessing(false);
    setUploadedFiles([]);
  };

  const removeFile = (index: number) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const downloadData = (data: ExtractedData) => {
    const csvContent = data.tables.map(table => {
      const headers = table.headers.join(',');
      const rows = table.data.map(row => row.join(',')).join('\n');
      return `${headers}\n${rows}`;
    }).join('\n\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${data.filename.replace('.pdf', '')}_extracted.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const deleteData = (id: string) => {
    setExtractedData(prev => prev.filter(data => data.id !== id));
  };

  return (
    <Card className="bg-gradient-card border-border/50 shadow-card">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <FileText className="h-5 w-5 text-primary" />
            <CardTitle className="text-lg font-semibold">PDF Data Extraction</CardTitle>
          </div>
          <Badge variant="outline" className="bg-success/10 text-success border-success/20">
            Tabula.js
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* File Upload Section */}
        <div className="space-y-4">
          <div className="flex items-center space-x-4">
            <Button
              variant="outline"
              onClick={() => fileInputRef.current?.click()}
              disabled={isProcessing}
            >
              <Upload className="h-4 w-4 mr-2" />
              Select PDF Files
            </Button>
            <Button
              onClick={processFiles}
              disabled={uploadedFiles.length === 0 || isProcessing}
            >
              <TableIcon className="h-4 w-4 mr-2" />
              Extract Tables
            </Button>
            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept=".pdf"
              onChange={handleFileUpload}
              className="hidden"
            />
          </div>

          {uploadedFiles.length > 0 && (
            <div className="space-y-2">
              <Label>Selected Files:</Label>
              <div className="space-y-2">
                {uploadedFiles.map((file, index) => (
                  <div key={index} className="flex items-center justify-between p-2 bg-muted/20 rounded-md">
                    <div className="flex items-center space-x-2">
                      <FileText className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{file.name}</span>
                      <Badge variant="secondary" className="text-xs">
                        {(file.size / 1024 / 1024).toFixed(2)} MB
                      </Badge>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeFile(index)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {isProcessing && (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span>Processing PDF files...</span>
                <span>{Math.round(progress)}%</span>
              </div>
              <Progress value={progress} className="w-full" />
            </div>
          )}
        </div>

        {/* Extracted Data Tabs */}
        <Tabs defaultValue="tables" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="tables" className="flex items-center space-x-2">
              <TableIcon className="h-4 w-4" />
              <span>Tables</span>
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center space-x-2">
              <BarChart3 className="h-4 w-4" />
              <span>Analytics</span>
            </TabsTrigger>
            <TabsTrigger value="export" className="flex items-center space-x-2">
              <Download className="h-4 w-4" />
              <span>Export</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="tables" className="space-y-4">
            {extractedData.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>No extracted data available</p>
                <p className="text-sm">Upload PDF files to extract table data</p>
              </div>
            ) : (
              <div className="space-y-6">
                {extractedData.map((data) => (
                  <div key={data.id} className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <FileText className="h-4 w-4 text-primary" />
                        <h4 className="font-medium">{data.filename}</h4>
                        <Badge variant={data.status === 'success' ? 'default' : 'destructive'}>
                          {data.status}
                        </Badge>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => downloadData(data)}
                        >
                          <Download className="h-4 w-4 mr-2" />
                          CSV
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => deleteData(data.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    
                    {data.tables.map((table) => (
                      <div key={table.id} className="border rounded-lg overflow-hidden">
                        <div className="bg-muted/20 px-4 py-2 border-b">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium">
                              Table: {table.rows} rows × {table.columns} columns
                            </span>
                            <Badge variant="outline" className="text-xs">
                              {table.headers.length} columns
                            </Badge>
                          </div>
                        </div>
                        <div className="max-h-96 overflow-auto">
                          <Table>
                            <TableHeader>
                              <TableRow>
                                {table.headers.map((header, index) => (
                                  <TableHead key={index}>{header}</TableHead>
                                ))}
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {table.data.map((row, rowIndex) => (
                                <TableRow key={rowIndex}>
                                  {row.map((cell, cellIndex) => (
                                    <TableCell key={cellIndex}>{cell}</TableCell>
                                  ))}
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </div>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="analytics" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="p-4">
                <div className="flex items-center space-x-2">
                  <FileText className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-sm text-muted-foreground">Total Files</p>
                    <p className="text-2xl font-bold">{extractedData.length}</p>
                  </div>
                </div>
              </Card>
              <Card className="p-4">
                <div className="flex items-center space-x-2">
                  <TableIcon className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-sm text-muted-foreground">Total Tables</p>
                    <p className="text-2xl font-bold">
                      {extractedData.reduce((sum, data) => sum + data.tables.length, 0)}
                    </p>
                  </div>
                </div>
              </Card>
              <Card className="p-4">
                <div className="flex items-center space-x-2">
                  <BarChart3 className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-sm text-muted-foreground">Success Rate</p>
                    <p className="text-2xl font-bold">
                      {extractedData.length > 0 
                        ? Math.round((extractedData.filter(d => d.status === 'success').length / extractedData.length) * 100)
                        : 0}%
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="export" className="space-y-4">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <AlertCircle className="h-4 w-4 text-warning" />
                <span className="text-sm text-muted-foreground">
                  Export extracted data in various formats for further analysis
                </span>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Button variant="outline" className="h-20 flex-col space-y-2">
                  <Download className="h-6 w-6" />
                  <span>Export All as CSV</span>
                </Button>
                <Button variant="outline" className="h-20 flex-col space-y-2">
                  <TableIcon className="h-6 w-6" />
                  <span>Export as Excel</span>
                </Button>
                <Button variant="outline" className="h-20 flex-col space-y-2">
                  <BarChart3 className="h-6 w-6" />
                  <span>Generate Report</span>
                </Button>
                <Button variant="outline" className="h-20 flex-col space-y-2">
                  <Eye className="h-6 w-6" />
                  <span>Preview Data</span>
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default TabulaIntegration; 