import { useFetch } from '../../hooks/useFetch';
import api from '../../lib/api';
import Loader from '../../components/common/Loader';
import ErrorState from '../../components/common/ErrorState';
import { Users, Inbox, CheckCircle, MailOpen } from 'lucide-react';

const AdminDashboardPage = () => {
  const { data: stats, loading, error } = useFetch(() => api.get('/admin/stats').then(res => res.data.data));

  if (loading) return <Loader />;
  if (error) return <ErrorState message="Could not load dashboard statistics." />;

  const statCards = [
    { label: 'Total Enquiries', value: stats.total, icon: Users, color: 'text-blue-600', bg: 'bg-blue-100' },
    { label: 'New Enquiries', value: stats.new, icon: Inbox, color: 'text-yellow-600', bg: 'bg-yellow-100' },
    { label: 'Contacted', value: stats.contacted, icon: MailOpen, color: 'text-orange-600', bg: 'bg-orange-100' },
    { label: 'Closed', value: stats.closed, icon: CheckCircle, color: 'text-green-600', bg: 'bg-green-100' },
  ];

  return (
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
  );
};

export default AdminDashboardPage;
