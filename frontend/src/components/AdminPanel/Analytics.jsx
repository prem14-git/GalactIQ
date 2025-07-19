import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

// Chart.js components
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line, Bar, Pie } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

export default function Analytics() {
  const [analyticsData, setAnalyticsData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch('/api/admin/analytics', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (!response.ok) throw new Error('Failed to fetch analytics');
      
      const data = await response.json();
      setAnalyticsData(data);
    } catch (error) {
      console.error('Error fetching analytics:', error);
      toast.error('Failed to load analytics data');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-lg text-gray-600">Loading analytics...</div>
      </div>
    );
  }

  if (!analyticsData) {
    return (
      <div className="text-center text-red-600">
        Failed to load analytics data
      </div>
    );
  }

  const { scientistsByCountry, newsByMonth, scientistsByMonth, summary } = analyticsData;

  // Prepare chart data
  const countryChartData = {
    labels: scientistsByCountry.map(item => item._id),
    datasets: [
      {
        data: scientistsByCountry.map(item => item.count),
        backgroundColor: [
          '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF',
          '#FF9F40', '#FF6384', '#C9CBCF', '#4BC0C0', '#FF6384'
        ],
        borderWidth: 2,
        borderColor: '#fff'
      }
    ]
  };

  const newsChartData = {
    labels: newsByMonth.map(item => `${item._id.month}/${item._id.year}`),
    datasets: [
      {
        label: 'News Published',
        data: newsByMonth.map(item => item.count),
        borderColor: '#36A2EB',
        backgroundColor: 'rgba(54, 162, 235, 0.1)',
        tension: 0.4,
        fill: true
      }
    ]
  };

  const scientistsChartData = {
    labels: scientistsByMonth.map(item => `${item._id.month}/${item._id.year}`),
    datasets: [
      {
        label: 'Scientists Added',
        data: scientistsByMonth.map(item => item.count),
        backgroundColor: 'rgba(75, 192, 192, 0.8)',
        borderColor: '#4BC0C0',
        borderWidth: 1
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1
        }
      }
    }
  };

  const pieOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
      },
    }
  };

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
          <div className="text-blue-600 text-sm font-medium">Total Scientists</div>
          <div className="text-2xl font-bold text-blue-800">{summary.totalScientists}</div>
        </div>
        <div className="bg-green-50 p-4 rounded-lg border border-green-200">
          <div className="text-green-600 text-sm font-medium">Total News</div>
          <div className="text-2xl font-bold text-green-800">{summary.totalNews}</div>
        </div>
        <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
          <div className="text-purple-600 text-sm font-medium">Total Comments</div>
          <div className="text-2xl font-bold text-purple-800">{summary.totalComments}</div>
        </div>
        <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
          <div className="text-orange-600 text-sm font-medium">Recent Activity (7 days)</div>
          <div className="text-2xl font-bold text-orange-800">{summary.recentNews + summary.recentComments}</div>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Scientists by Country */}
        <div className="bg-white p-4 rounded-lg border">
          <h3 className="text-lg font-semibold mb-4 text-gray-800">Scientists by Country</h3>
          <div className="h-64">
            <Pie data={countryChartData} options={pieOptions} />
          </div>
        </div>

        {/* News Publication Trends */}
        <div className="bg-white p-4 rounded-lg border">
          <h3 className="text-lg font-semibold mb-4 text-gray-800">News Publication Trends</h3>
          <div className="h-64">
            <Line data={newsChartData} options={chartOptions} />
          </div>
        </div>

        {/* Scientists Added Over Time */}
        <div className="bg-white p-4 rounded-lg border lg:col-span-2">
          <h3 className="text-lg font-semibold mb-4 text-gray-800">Scientists Added Over Time</h3>
          <div className="h-64">
            <Bar data={scientistsChartData} options={chartOptions} />
          </div>
        </div>
      </div>

      {/* Recent Activity Details */}
      <div className="bg-white p-4 rounded-lg border">
        <h3 className="text-lg font-semibold mb-4 text-gray-800">Recent Activity</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="text-center p-4 bg-blue-50 rounded">
            <div className="text-2xl font-bold text-blue-600">{summary.recentNews}</div>
            <div className="text-sm text-blue-800">News published in last 7 days</div>
          </div>
          <div className="text-center p-4 bg-green-50 rounded">
            <div className="text-2xl font-bold text-green-600">{summary.recentComments}</div>
            <div className="text-sm text-green-800">Comments made in last 7 days</div>
          </div>
        </div>
      </div>

      {/* Refresh Button */}
      <div className="text-center">
        <button
          onClick={fetchAnalytics}
          className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition"
        >
          Refresh Analytics
        </button>
      </div>
    </div>
  );
} 