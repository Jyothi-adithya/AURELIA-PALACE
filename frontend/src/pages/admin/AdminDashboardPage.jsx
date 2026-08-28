import { useFetch } from '../../hooks/useFetch';
import api from '../../lib/api';
import Loader from '../../components/common/Loader';
import ErrorState from '../../components/common/ErrorState';
import { Users, Inbox, CheckCircle, MailOpen } from 'lucide-react';
import { 
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer 
} from 'recharts';

const AdminDashboardPage = () => {
  const { data: stats, loading, error } = useFetch(() => api.get('/admin/stats').then(res => res.data.data));

  if (loading) return <Loader />;
  if (error) return <ErrorState message="Could not load dashboard statistics. Please try again." />;

  const statCards = [
    { label: 'Total Enquiries', value: stats?.total || 0, icon: Users, color: 'text-blue-600', bg: 'bg-blue-100' },
    { label: 'New Enquiries', value: stats?.new || 0, icon: Inbox, color: 'text-yellow-600', bg: 'bg-yellow-100' },
    { label: 'Contacted', value: stats?.contacted || 0, icon: MailOpen, color: 'text-orange-600', bg: 'bg-orange-100' },
    { label: 'Closed', value: stats?.closed || 0, icon: CheckCircle, color: 'text-green-600', bg: 'bg-green-100' },
  ];
  
  // Format dates for timeline tooltip
  const formattedTimeline = stats?.timeline?.map(item => {
    const d = new Date(item.date);
    return {
      ...item,
      displayDate: d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
    };
  }) || [];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-serif text-brand-charcoal mb-6">Dashboard Overview</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {statCards.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 flex items-center gap-4">
                <div className={`p-4 rounded-full ${stat.bg} ${stat.color}`}>
                  <Icon size={24} />
                </div>
                <div>
                  <p className="text-sm text-gray-500 font-medium">{stat.label}</p>
                  <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Timeline Chart */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 lg:col-span-2">
          <h2 className="text-lg font-serif text-brand-charcoal mb-4">Enquiry Trend (Last 30 Days)</h2>
          {stats?.total === 0 ? (
            <div className="h-72 flex items-center justify-center text-gray-400">No enquiries yet</div>
          ) : (
            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={formattedTimeline} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                  <XAxis 
                    dataKey="displayDate" 
                    tick={{ fontSize: 12, fill: '#6b7280' }} 
                    axisLine={false} 
                    tickLine={false} 
                    minTickGap={30}
                  />
                  <YAxis 
                    allowDecimals={false} 
                    tick={{ fontSize: 12, fill: '#6b7280' }} 
                    axisLine={false} 
                    tickLine={false} 
                  />
                  <Tooltip 
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="count" 
                    name="Enquiries"
                    stroke="#1C1917" 
                    strokeWidth={2}
                    dot={false}
                    activeDot={{ r: 6, fill: '#C9A96E', stroke: '#fff', strokeWidth: 2 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>

        {/* By Event Type Chart */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <h2 className="text-lg font-serif text-brand-charcoal mb-4">By Event Type</h2>
          {stats?.byEventType?.length === 0 ? (
            <div className="h-72 flex items-center justify-center text-gray-400">No enquiries yet</div>
          ) : (
            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={stats?.byEventType} layout="vertical" margin={{ top: 5, right: 30, bottom: 5, left: 10 }}>
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f3f4f6" />
                  <XAxis type="number" allowDecimals={false} tick={{ fontSize: 12, fill: '#6b7280' }} axisLine={false} tickLine={false} />
                  <YAxis dataKey="name" type="category" tick={{ fontSize: 12, fill: '#374151' }} axisLine={false} tickLine={false} width={80} />
                  <Tooltip 
                    cursor={{ fill: '#f3f4f6' }}
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  />
                  <Bar dataKey="count" name="Enquiries" fill="#C9A96E" radius={[0, 4, 4, 0]} barSize={24} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardPage;
