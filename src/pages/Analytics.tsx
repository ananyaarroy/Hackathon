import React, { useState } from 'react';
import { Calendar, Download, TrendingUp, BarChart3, PieChart } from 'lucide-react';
import { Chart } from '../components/Chart';
import { MetricCard } from '../components/MetricCard';
import { generateEnergyData, mockPredictions } from '../services/mockData';
import { reportingService, ReportData } from '../services/reportingService';

type TimeFrame = 'day' | 'week' | 'month' | 'year';
type ChartType = 'line' | 'bar';

export const Analytics: React.FC = () => {
  const [timeFrame, setTimeFrame] = useState<TimeFrame>('day');
  const [chartType, setChartType] = useState<ChartType>('line');
  const [selectedMetric, setSelectedMetric] = useState<'consumption' | 'cost' | 'co2Emissions'>('consumption');
  const [isExporting, setIsExporting] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const energyData = generateEnergyData();

  const exportData = async (format: 'pdf' | 'excel' | 'csv') => {
    setIsExporting(format);
    
    try {
      // Prepare report data
      const reportData: ReportData = {
        title: 'Advanced Analytics Report',
        generatedAt: new Date().toISOString(),
        metrics: [
          {
            label: 'Total Consumption',
            value: energyData.reduce((sum, d) => sum + d.consumption, 0).toFixed(1),
            unit: 'kWh',
            trend: 5.2
          },
          {
            label: 'Average per Hour',
            value: (energyData.reduce((sum, d) => sum + d.consumption, 0) / energyData.length).toFixed(2),
            unit: 'kWh'
          },
          {
            label: 'Peak Usage',
            value: Math.max(...energyData.map(d => d.consumption)).toFixed(1),
            unit: 'kWh'
          },
          {
            label: 'Total Cost',
            value: energyData.reduce((sum, d) => sum + d.cost, 0).toFixed(2),
            unit: 'USD',
            trend: -3.1
          },
          {
            label: 'CO₂ Emissions',
            value: energyData.reduce((sum, d) => sum + d.co2Emissions, 0).toFixed(1),
            unit: 'kg',
            trend: -8.7
          }
        ],
        recommendations: [
          'Optimize energy usage during peak hours (2-6 PM) to reduce costs by 15%',
          'Consider installing smart thermostats to improve efficiency by 12%',
          'Implement demand response programs to earn $200+ monthly credits',
          'Switch to renewable energy sources to reduce carbon footprint by 40%'
        ]
      };

      // Export based on format
      switch (format) {
        case 'pdf':
          await reportingService.exportToPDF(reportData);
          break;
        case 'excel':
          await reportingService.exportToExcel(reportData);
          break;
        case 'csv':
          await reportingService.exportToCSV(reportData);
          break;
      }
      
      // Show success message
      alert(`${format.toUpperCase()} report exported successfully!`);
    } catch (error) {
      console.error(`Export failed:`, error);
      alert(`Failed to export ${format.toUpperCase()} report. Please try again.`);
    } finally {
      setIsExporting(null);
    }
  };

  const saveReport = async () => {
    setIsSaving(true);
    
    try {
      const reportData: ReportData = {
        title: 'Advanced Analytics Report',
        generatedAt: new Date().toISOString(),
        metrics: [
          {
            label: 'Total Consumption',
            value: energyData.reduce((sum, d) => sum + d.consumption, 0).toFixed(1),
            unit: 'kWh'
          },
          {
            label: 'Total Cost',
            value: energyData.reduce((sum, d) => sum + d.cost, 0).toFixed(2),
            unit: 'USD'
          }
        ]
      };

      await reportingService.saveReport(reportData);
      alert('Report saved successfully!');
    } catch (error) {
      console.error('Save failed:', error);
      alert('Failed to save report. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Advanced Analytics
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Deep insights and predictive analysis
          </p>
        </div>
        
        {/* Export Buttons */}
        <div className="flex items-center space-x-2">
          <button
            onClick={saveReport}
            disabled={isSaving}
            className="flex items-center space-x-2 px-3 py-2 bg-emerald-100 dark:bg-emerald-900/20 
                       text-emerald-700 dark:text-emerald-400 rounded-lg hover:bg-emerald-200 
                       dark:hover:bg-emerald-900/30 transition-colors disabled:opacity-50"
          >
            {isSaving ? (
              <div className="w-4 h-4 border-2 border-emerald-600 border-t-transparent rounded-full animate-spin" />
            ) : (
              <Download className="w-4 h-4" />
            )}
            <span className="text-sm">{isSaving ? 'Saving...' : 'Save'}</span>
          </button>
          <button
            onClick={() => exportData('pdf')}
            disabled={isExporting === 'pdf'}
            className="flex items-center space-x-2 px-3 py-2 bg-red-100 dark:bg-red-900/20 
                       text-red-700 dark:text-red-400 rounded-lg hover:bg-red-200 
                       dark:hover:bg-red-900/30 transition-colors disabled:opacity-50"
          >
            {isExporting === 'pdf' ? (
              <div className="w-4 h-4 border-2 border-red-600 border-t-transparent rounded-full animate-spin" />
            ) : (
              <Download className="w-4 h-4" />
            )}
            <span className="text-sm">{isExporting === 'pdf' ? 'Exporting...' : 'PDF'}</span>
          </button>
          <button
            onClick={() => exportData('excel')}
            disabled={isExporting === 'excel'}
            className="flex items-center space-x-2 px-3 py-2 bg-green-100 dark:bg-green-900/20 
                       text-green-700 dark:text-green-400 rounded-lg hover:bg-green-200 
                       dark:hover:bg-green-900/30 transition-colors disabled:opacity-50"
          >
            {isExporting === 'excel' ? (
              <div className="w-4 h-4 border-2 border-green-600 border-t-transparent rounded-full animate-spin" />
            ) : (
              <Download className="w-4 h-4" />
            )}
            <span className="text-sm">{isExporting === 'excel' ? 'Exporting...' : 'Excel'}</span>
          </button>
          <button
            onClick={() => exportData('csv')}
            disabled={isExporting === 'csv'}
            className="flex items-center space-x-2 px-3 py-2 bg-blue-100 dark:bg-blue-900/20 
                       text-blue-700 dark:text-blue-400 rounded-lg hover:bg-blue-200 
                       dark:hover:bg-blue-900/30 transition-colors disabled:opacity-50"
          >
            {isExporting === 'csv' ? (
              <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
            ) : (
              <Download className="w-4 h-4" />
            )}
            <span className="text-sm">{isExporting === 'csv' ? 'Exporting...' : 'CSV'}</span>
          </button>
        </div>
      </div>

      {/* Controls */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-lg border border-gray-200 dark:border-gray-700">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Time Frame Selector */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Time Frame
            </label>
            <div className="flex space-x-1 bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
              {(['day', 'week', 'month', 'year'] as TimeFrame[]).map((frame) => (
                <button
                  key={frame}
                  onClick={() => setTimeFrame(frame)}
                  className={`flex-1 px-3 py-1 text-sm font-medium rounded-md transition-colors
                             ${timeFrame === frame
                               ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm'
                               : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                             }`}
                >
                  {frame.charAt(0).toUpperCase() + frame.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Chart Type Selector */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Chart Type
            </label>
            <div className="flex space-x-1 bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
              <button
                onClick={() => setChartType('line')}
                className={`flex-1 flex items-center justify-center px-3 py-1 text-sm font-medium rounded-md transition-colors
                           ${chartType === 'line'
                             ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm'
                             : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                           }`}
              >
                <TrendingUp className="w-4 h-4 mr-1" />
                Line
              </button>
              <button
                onClick={() => setChartType('bar')}
                className={`flex-1 flex items-center justify-center px-3 py-1 text-sm font-medium rounded-md transition-colors
                           ${chartType === 'bar'
                             ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm'
                             : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                           }`}
              >
                <BarChart3 className="w-4 h-4 mr-1" />
                Bar
              </button>
            </div>
          </div>

          {/* Metric Selector */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Metric
            </label>
            <select
              value={selectedMetric}
              onChange={(e) => setSelectedMetric(e.target.value as typeof selectedMetric)}
              className="w-full px-3 py-2 bg-gray-100 dark:bg-gray-700 border border-gray-300 
                         dark:border-gray-600 rounded-lg text-gray-900 dark:text-white
                         focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            >
              <option value="consumption">Energy Consumption</option>
              <option value="cost">Cost</option>
              <option value="co2Emissions">CO₂ Emissions</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Chart
            data={energyData}
            type={chartType}
            metric={selectedMetric}
            title={`${selectedMetric === 'consumption' ? 'Energy Consumption' : 
                     selectedMetric === 'cost' ? 'Cost Analysis' : 'CO₂ Emissions'} - ${timeFrame}`}
            color={selectedMetric === 'consumption' ? '#10b981' : 
                   selectedMetric === 'cost' ? '#3b82f6' : '#f59e0b'}
            height={320}
          />
        </div>

        {/* Predictions Panel */}
        <div className="space-y-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
              <TrendingUp className="w-5 h-5 mr-2 text-emerald-500" />
              AI Predictions
            </h3>
            
            <div className="space-y-3">
              {mockPredictions.map((prediction, index) => (
                <div key={index} className="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                  <div className="flex justify-between items-start mb-1">
                    <span className="text-sm font-medium text-gray-900 dark:text-white">
                      {prediction.period}
                    </span>
                    <span className={`text-xs px-2 py-1 rounded-full
                                   ${prediction.trend === 'increasing' ? 'bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-400' :
                                     prediction.trend === 'decreasing' ? 'bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400' :
                                     'bg-gray-100 dark:bg-gray-600 text-gray-700 dark:text-gray-300'}`}>
                      {prediction.trend}
                    </span>
                  </div>
                  <div className="text-lg font-bold text-gray-900 dark:text-white">
                    {prediction.predicted.toFixed(1)} kWh
                  </div>
                  {prediction.actual && (
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      Actual: {prediction.actual.toFixed(1)} kWh
                    </div>
                  )}
                  <div className="text-xs text-emerald-600 dark:text-emerald-400 mt-1">
                    {prediction.confidence}% confidence
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Summary Stats */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Period Summary
            </h3>
            
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">Total Consumption</span>
                <span className="text-sm font-medium text-gray-900 dark:text-white">
                  {energyData.reduce((sum, d) => sum + d.consumption, 0).toFixed(1)} kWh
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">Average per Hour</span>
                <span className="text-sm font-medium text-gray-900 dark:text-white">
                  {(energyData.reduce((sum, d) => sum + d.consumption, 0) / energyData.length).toFixed(2)} kWh
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">Peak Usage</span>
                <span className="text-sm font-medium text-gray-900 dark:text-white">
                  {Math.max(...energyData.map(d => d.consumption)).toFixed(1)} kWh
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">Total Cost</span>
                <span className="text-sm font-medium text-gray-900 dark:text-white">
                  ${energyData.reduce((sum, d) => sum + d.cost, 0).toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};