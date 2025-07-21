import React, { useState } from 'react';
import { TreePine, Award, TrendingUp, Globe, Users, Building, Download, Share } from 'lucide-react';
import { mockESGMetrics } from '../services/mockData';
import { reportingService, ESGReportData } from '../services/reportingService';

export const Sustainability: React.FC = () => {
  const [selectedReport, setSelectedReport] = useState<'esg' | 'carbon' | 'compliance' | 'impact'>('esg');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSharing, setIsSharing] = useState(false);

  const reportTypes = [
    { id: 'esg' as const, label: 'ESG Overview', icon: Award },
    { id: 'carbon' as const, label: 'Carbon Footprint', icon: TreePine },
    { id: 'compliance' as const, label: 'Compliance Status', icon: Building },
    { id: 'impact' as const, label: 'Social Impact', icon: Users }
  ];

  const generateReport = async () => {
    setIsGenerating(true);
    
    try {
      const esgData: ESGReportData = {
        companyName: 'EcoFlow Energy Solutions',
        reportPeriod: 'Q4 2024',
        environmental: {
          carbonReduction: mockESGMetrics.environmental.carbonReduction,
          renewableUsage: mockESGMetrics.environmental.renewableUsage,
          wasteReduction: mockESGMetrics.environmental.wasteReduction,
          waterSavings: mockESGMetrics.environmental.waterSavings
        },
        social: {
          communityImpact: mockESGMetrics.social.communityImpact,
          jobsCreated: mockESGMetrics.social.jobsCreated,
          healthBenefits: mockESGMetrics.social.healthBenefits,
          educationPrograms: mockESGMetrics.social.educationPrograms
        },
        governance: {
          transparencyScore: mockESGMetrics.governance.transparencyScore,
          complianceRating: mockESGMetrics.governance.complianceRating,
          ethicsScore: mockESGMetrics.governance.ethicsScore,
          stakeholderEngagement: mockESGMetrics.governance.stakeholderEngagement
        },
        overallScore: mockESGMetrics.overallScore,
        industryRanking: mockESGMetrics.industryRanking,
        certifications: mockESGMetrics.certifications,
        improvementAreas: mockESGMetrics.improvementAreas
      };

      const reportId = await reportingService.generateESGReport(esgData);
      alert(`ESG report generated successfully! Report ID: ${reportId}`);
    } catch (error) {
      console.error('Report generation failed:', error);
      alert('Failed to generate ESG report. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const shareReport = async () => {
    setIsSharing(true);
    
    try {
      const esgData: ESGReportData = {
        companyName: 'EcoFlow Energy Solutions',
        reportPeriod: 'Q4 2024',
        environmental: {
          carbonReduction: mockESGMetrics.environmental.carbonReduction,
          renewableUsage: mockESGMetrics.environmental.renewableUsage,
          wasteReduction: mockESGMetrics.environmental.wasteReduction,
          waterSavings: mockESGMetrics.environmental.waterSavings
        },
        social: {
          communityImpact: mockESGMetrics.social.communityImpact,
          jobsCreated: mockESGMetrics.social.jobsCreated,
          healthBenefits: mockESGMetrics.social.healthBenefits,
          educationPrograms: mockESGMetrics.social.educationPrograms
        },
        governance: {
          transparencyScore: mockESGMetrics.governance.transparencyScore,
          complianceRating: mockESGMetrics.governance.complianceRating,
          ethicsScore: mockESGMetrics.governance.ethicsScore,
          stakeholderEngagement: mockESGMetrics.governance.stakeholderEngagement
        },
        overallScore: mockESGMetrics.overallScore,
        industryRanking: mockESGMetrics.industryRanking,
        certifications: mockESGMetrics.certifications,
        improvementAreas: mockESGMetrics.improvementAreas
      };

      await reportingService.createESGSummaryCard(esgData);
      alert('ESG summary card created and downloaded successfully!');
    } catch (error) {
      console.error('Share report failed:', error);
      alert('Failed to create ESG summary card. Please try again.');
    } finally {
      setIsSharing(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">
            ESG & Sustainability Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2 text-lg">
            Comprehensive environmental, social, and governance reporting
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <div className="bg-emerald-100 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400 px-4 py-2 rounded-lg">
            <span className="font-medium">ESG Score: {mockESGMetrics.overallScore}/100</span>
          </div>
          <div className="bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400 px-4 py-2 rounded-lg">
            <span className="font-medium">Industry Rank: #{mockESGMetrics.industryRanking}</span>
          </div>
        </div>
      </div>

      {/* ESG Score Overview */}
      <div className="bg-gradient-to-br from-emerald-50 to-green-50 dark:from-emerald-900/20 dark:to-green-900/20 rounded-xl p-8 border border-emerald-200 dark:border-emerald-700">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Environmental */}
          <div className="text-center">
            <div className="w-24 h-24 mx-auto mb-4 relative">
              <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  stroke="currentColor"
                  strokeWidth="8"
                  fill="transparent"
                  className="text-gray-200 dark:text-gray-700"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  stroke="currentColor"
                  strokeWidth="8"
                  fill="transparent"
                  strokeDasharray={`${2 * Math.PI * 40}`}
                  strokeDashoffset={`${2 * Math.PI * 40 * (1 - 0.847)}`}
                  strokeLinecap="round"
                  className="text-emerald-500 transition-all duration-1000"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-2xl font-bold text-gray-900 dark:text-white">84.7</span>
              </div>
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Environmental</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Carbon Reduction</span>
                <span className="font-medium text-emerald-600 dark:text-emerald-400">
                  {mockESGMetrics.environmental.carbonReduction}%
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Renewable Usage</span>
                <span className="font-medium text-emerald-600 dark:text-emerald-400">
                  {mockESGMetrics.environmental.renewableUsage}%
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Waste Reduction</span>
                <span className="font-medium text-emerald-600 dark:text-emerald-400">
                  {mockESGMetrics.environmental.wasteReduction}%
                </span>
              </div>
            </div>
          </div>

          {/* Social */}
          <div className="text-center">
            <div className="w-24 h-24 mx-auto mb-4 relative">
              <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  stroke="currentColor"
                  strokeWidth="8"
                  fill="transparent"
                  className="text-gray-200 dark:text-gray-700"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  stroke="currentColor"
                  strokeWidth="8"
                  fill="transparent"
                  strokeDasharray={`${2 * Math.PI * 40}`}
                  strokeDashoffset={`${2 * Math.PI * 40 * (1 - 0.892)}`}
                  strokeLinecap="round"
                  className="text-blue-500 transition-all duration-1000"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-2xl font-bold text-gray-900 dark:text-white">89.2</span>
              </div>
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Social</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Community Impact</span>
                <span className="font-medium text-blue-600 dark:text-blue-400">
                  {mockESGMetrics.social.communityImpact}%
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Jobs Created</span>
                <span className="font-medium text-blue-600 dark:text-blue-400">
                  {mockESGMetrics.social.jobsCreated}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Health Benefits</span>
                <span className="font-medium text-blue-600 dark:text-blue-400">
                  {mockESGMetrics.social.healthBenefits}%
                </span>
              </div>
            </div>
          </div>

          {/* Governance */}
          <div className="text-center">
            <div className="w-24 h-24 mx-auto mb-4 relative">
              <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  stroke="currentColor"
                  strokeWidth="8"
                  fill="transparent"
                  className="text-gray-200 dark:text-gray-700"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  stroke="currentColor"
                  strokeWidth="8"
                  fill="transparent"
                  strokeDasharray={`${2 * Math.PI * 40}`}
                  strokeDashoffset={`${2 * Math.PI * 40 * (1 - 0.911)}`}
                  strokeLinecap="round"
                  className="text-purple-500 transition-all duration-1000"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-2xl font-bold text-gray-900 dark:text-white">91.1</span>
              </div>
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Governance</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Transparency</span>
                <span className="font-medium text-purple-600 dark:text-purple-400">
                  {mockESGMetrics.governance.transparencyScore}%
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Compliance</span>
                <span className="font-medium text-purple-600 dark:text-purple-400">
                  {mockESGMetrics.governance.complianceRating}%
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Ethics Score</span>
                <span className="font-medium text-purple-600 dark:text-purple-400">
                  {mockESGMetrics.governance.ethicsScore}%
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Certifications and Awards */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
          <Award className="w-6 h-6 mr-3 text-yellow-500" />
          Certifications & Recognition
        </h3>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {mockESGMetrics.certifications.map((cert, index) => (
            <div key={index} className="text-center p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
              <div className="w-12 h-12 bg-yellow-100 dark:bg-yellow-900/20 rounded-full flex items-center justify-center mx-auto mb-3">
                <Award className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
              </div>
              <div className="text-sm font-medium text-gray-900 dark:text-white">{cert}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Report Generation */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">
            Generate Sustainability Reports
          </h3>
          <div className="flex space-x-1">
            {reportTypes.map((type) => {
              const Icon = type.icon;
              return (
                <button
                  key={type.id}
                  onClick={() => setSelectedReport(type.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors
                             ${selectedReport === type.id
                               ? 'bg-emerald-100 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400'
                               : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                             }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="text-sm font-medium">{type.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Report Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
              {reportTypes.find(t => t.id === selectedReport)?.label} Report
            </h4>
            
            {selectedReport === 'esg' && (
              <div className="space-y-3">
                <p className="text-gray-600 dark:text-gray-400">
                  Comprehensive ESG performance analysis including environmental impact, 
                  social responsibility metrics, and governance practices.
                </p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full" />
                    <span>Carbon footprint analysis and reduction strategies</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full" />
                    <span>Social impact assessment and community engagement</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full" />
                    <span>Governance framework and compliance status</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full" />
                    <span>Industry benchmarking and best practices</span>
                  </li>
                </ul>
              </div>
            )}

            {selectedReport === 'carbon' && (
              <div className="space-y-3">
                <p className="text-gray-600 dark:text-gray-400">
                  Detailed carbon footprint analysis across all scopes with reduction 
                  recommendations and offset opportunities.
                </p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full" />
                    <span>Scope 1, 2, and 3 emissions breakdown</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full" />
                    <span>Carbon reduction roadmap and targets</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full" />
                    <span>Offset project recommendations</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full" />
                    <span>Net-zero pathway analysis</span>
                  </li>
                </ul>
              </div>
            )}

            {selectedReport === 'compliance' && (
              <div className="space-y-3">
                <p className="text-gray-600 dark:text-gray-400">
                  Regulatory compliance status across environmental, social, and governance 
                  requirements with action plans for improvement.
                </p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full" />
                    <span>Environmental regulation compliance</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full" />
                    <span>Labor and safety standards assessment</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full" />
                    <span>Corporate governance requirements</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full" />
                    <span>Risk mitigation strategies</span>
                  </li>
                </ul>
              </div>
            )}

            {selectedReport === 'impact' && (
              <div className="space-y-3">
                <p className="text-gray-600 dark:text-gray-400">
                  Social impact measurement including community benefits, job creation, 
                  and stakeholder engagement metrics.
                </p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full" />
                    <span>Community development programs</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full" />
                    <span>Employment and economic impact</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full" />
                    <span>Health and safety improvements</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full" />
                    <span>Educational and training initiatives</span>
                  </li>
                </ul>
              </div>
            )}
          </div>

          <div className="space-y-4">
            <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
              <h5 className="font-medium text-gray-900 dark:text-white mb-3">Report Options</h5>
              <div className="space-y-3">
                <label className="flex items-center space-x-2">
                  <input type="checkbox" defaultChecked className="rounded" />
                  <span className="text-sm text-gray-700 dark:text-gray-300">Include executive summary</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input type="checkbox" defaultChecked className="rounded" />
                  <span className="text-sm text-gray-700 dark:text-gray-300">Add visual charts and graphs</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input type="checkbox" className="rounded" />
                  <span className="text-sm text-gray-700 dark:text-gray-300">Include raw data appendix</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input type="checkbox" defaultChecked className="rounded" />
                  <span className="text-sm text-gray-700 dark:text-gray-300">Benchmark against industry</span>
                </label>
              </div>
            </div>

            <div className="space-y-3">
              <button
                onClick={generateReport}
                disabled={isGenerating}
                className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-medium transition-colors"
              >
                {isGenerating ? (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <Download className="w-4 h-4" />
                )}
                <span>{isGenerating ? 'Generating...' : 'Generate Report'}</span>
              </button>
              
              <button
                onClick={shareReport}
                disabled={isSharing}
                className="w-full flex items-center justify-center space-x-2 px-4 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                {isSharing ? (
                  <div className="w-4 h-4 border-2 border-gray-600 border-t-transparent rounded-full animate-spin" />
                ) : (
                  <Share className="w-4 h-4" />
                )}
                <span>{isSharing ? 'Creating Card...' : 'Share Report'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Improvement Areas */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
          <TrendingUp className="w-6 h-6 mr-3 text-blue-500" />
          Priority Improvement Areas
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {mockESGMetrics.improvementAreas.map((area, index) => (
            <div key={index} className="p-4 bg-amber-50 dark:bg-amber-900/20 rounded-lg border border-amber-200 dark:border-amber-800">
              <h4 className="font-medium text-amber-800 dark:text-amber-400 mb-2">{area}</h4>
              <p className="text-sm text-amber-700 dark:text-amber-300">
                Identified as a key area for improvement to enhance overall ESG performance.
              </p>
              <button className="mt-3 text-sm font-medium text-amber-600 dark:text-amber-400 hover:text-amber-800 dark:hover:text-amber-300">
                View Action Plan →
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};