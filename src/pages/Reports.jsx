import { useState, useEffect } from 'react';
import { getUserReport, getEventReport, generatePdfReport } from '../api/organizer';
import Card from '../components/Card';
import Button from '../components/Button';
import { FileTextIcon, UsersIcon, CalendarIcon, DownloadIcon } from 'lucide-react';

export default function Reports() {
  const [reportType, setReportType] = useState('users');
  const [reportData, setReportData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [filters, setFilters] = useState({
    startDate: '',
    endDate: '',
    eventId: ''
  });

  useEffect(() => {
    loadReport();
  }, [reportType]);

  const loadReport = async () => {
    setIsLoading(true);
    try {
      const params = {};
      if (filters.startDate) params.startDate = filters.startDate;
      if (filters.endDate) params.endDate = filters.endDate;
      if (filters.eventId) params.eventId = filters.eventId;

      const data = reportType === 'users'
        ? await getUserReport(params)
        : await getEventReport(params);

      setReportData(data);
    } catch (error) {
      console.error('Error loading report:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGeneratePdf = async () => {
    setIsGenerating(true);
    try {
      const reportRequest = {
        reportType,
        startDate: filters.startDate || null,
        endDate: filters.endDate || null,
        eventId: filters.eventId || null
      };

      const blob = await generatePdfReport(reportRequest);

      // Create download link
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${reportType}-report-${new Date().toISOString().split('T')[0]}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Error generating PDF report');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleFilterChange = (field, value) => {
    setFilters(prev => ({ ...prev, [field]: value }));
  };

  const applyFilters = () => {
    loadReport();
  };

  const clearFilters = () => {
    setFilters({ startDate: '', endDate: '', eventId: '' });
    loadReport();
  };

  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-extrabold text-white">Reports</h1>
        <Button
          onClick={handleGeneratePdf}
          disabled={isGenerating}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg flex items-center gap-2"
        >
          <DownloadIcon size={16} />
          {isGenerating ? 'Generating...' : 'Generate PDF'}
        </Button>
      </div>

      {/* Report Type Selection */}
      <div className="mb-6">
        <div className="flex gap-4 mb-4">
          <button
            onClick={() => setReportType('users')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
              reportType === 'users'
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            <UsersIcon size={16} />
            User Report
          </button>
          <button
            onClick={() => setReportType('events')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
              reportType === 'events'
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            <CalendarIcon size={16} />
            Event Report
          </button>
        </div>
      </div>

      {/* Filters */}
      <Card className="bg-gray-800 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Start Date
            </label>
            <input
              type="date"
              value={filters.startDate}
              onChange={(e) => handleFilterChange('startDate', e.target.value)}
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:border-indigo-500 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              End Date
            </label>
            <input
              type="date"
              value={filters.endDate}
              onChange={(e) => handleFilterChange('endDate', e.target.value)}
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:border-indigo-500 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Event ID (optional)
            </label>
            <input
              type="number"
              value={filters.eventId}
              onChange={(e) => handleFilterChange('eventId', e.target.value)}
              placeholder="Enter Event ID"
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:border-indigo-500 focus:outline-none"
            />
          </div>
        </div>
        <div className="flex gap-2">
          <Button
            onClick={applyFilters}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg"
          >
            Apply Filters
          </Button>
          <Button
            onClick={clearFilters}
            className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg"
          >
            Clear
          </Button>
        </div>
      </Card>

      {/* Report Content */}
      {isLoading ? (
        <div className="flex justify-center items-center h-32 text-gray-400">
          Loading report data...
        </div>
      ) : (
        <div className="bg-gray-800 rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-700">
                <tr>
                  {reportType === 'users' ? (
                    <>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">ID</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Email</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Name</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Joined</th>
                    </>
                  ) : (
                    <>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">ID</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Title</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Venue</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Sold</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Capacity</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Revenue</th>
                    </>
                  )}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {reportData.map((item, index) => (
                  <tr key={item.id} className={index % 2 === 0 ? 'bg-gray-800' : 'bg-gray-750'}>
                    {reportType === 'users' ? (
                      <>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{item.id}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{item.email}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{item.firstName} {item.lastName}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{item.totalTicketsPurchased}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-indigo-400 font-medium">${item.totalAmountSpent.toFixed(2)}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                          {new Date(item.createdAt).toLocaleDateString()}
                        </td>
                      </>
                    ) : (
                      <>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{item.id}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{item.title}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{item.venueName}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 text-xs rounded-full ${
                            item.status === 'Published' ? 'bg-green-100 text-green-800' :
                            item.status === 'Draft' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {item.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{item.totalTicketsSold}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{item.totalCapacity}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-indigo-400 font-medium">RS: {item.totalRevenue.toFixed(2)}</td>
                      </>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {reportData.length === 0 && (
            <div className="text-center py-8 text-gray-400">
              No data found for the selected criteria.
            </div>
          )}
        </div>
      )}
    </div>
  );
}
