import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../lib/api';
import Loader from '../../components/common/Loader';
import { Eye, Search } from 'lucide-react';
import { cn } from '../../utils/cn';

const StatusBadge = ({ status }) => {
  const styles = {
    NEW: "bg-yellow-100 text-yellow-800",
    CONTACTED: "bg-orange-100 text-orange-800",
    CLOSED: "bg-green-100 text-green-800"
  };
  return (
    <span className={cn("px-2.5 py-0.5 rounded-full text-xs font-medium", styles[status])}>
      {status}
    </span>
  );
};

const AdminEnquiriesPage = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState('');
  const [search, setSearch] = useState('');

  const fetchEnquiries = async () => {
    setLoading(true);
    try {
      let url = `/admin/enquiries?page=${page}`;
      if (statusFilter) url += `&status=${statusFilter}`;
      if (search) url += `&search=${search}`;
      
      const res = await api.get(url);
      setData(res.data.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetchEnquiries();
    }, 300);
    return () => clearTimeout(delayDebounceFn);
  }, [page, statusFilter, search]);

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
      <div className="p-6 border-b border-gray-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h1 className="text-xl font-serif text-brand-charcoal">Enquiries</h1>
        
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text"
              placeholder="Search name or email..."
              value={search}
              onChange={(e) => { setSearch(e.target.value); setPage(1); }}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:border-brand-gold w-full sm:w-64"
            />
          </div>
          <select 
            value={statusFilter}
            onChange={(e) => { setStatusFilter(e.target.value); setPage(1); }}
            className="px-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:border-brand-gold"
          >
            <option value="">All Statuses</option>
            <option value="NEW">New</option>
            <option value="CONTACTED">Contacted</option>
            <option value="CLOSED">Closed</option>
          </select>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 text-gray-500 text-sm uppercase tracking-wider">
              <th className="p-4 font-medium">Name</th>
              <th className="p-4 font-medium">Event Type</th>
              <th className="p-4 font-medium">Date</th>
              <th className="p-4 font-medium">Status</th>
              <th className="p-4 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 text-sm">
            {loading ? (
              <tr>
                <td colSpan="5" className="p-8 text-center"><Loader text="Loading..." /></td>
              </tr>
            ) : data?.enquiries?.length === 0 ? (
              <tr>
                <td colSpan="5" className="p-8 text-center text-gray-500">No enquiries found.</td>
              </tr>
            ) : (
              data?.enquiries?.map((enq) => (
                <tr key={enq.id} className="hover:bg-gray-50 transition-colors">
                  <td className="p-4">
                    <p className="font-medium text-gray-900">{enq.name}</p>
                    <p className="text-gray-500 text-xs">{enq.email}</p>
                  </td>
                  <td className="p-4 text-gray-600">{enq.eventType?.name}</td>
                  <td className="p-4 text-gray-600">
                    {new Date(enq.eventDate).toLocaleDateString()}
                  </td>
                  <td className="p-4">
                    <StatusBadge status={enq.status} />
                  </td>
                  <td className="p-4">
                    <Link 
                      to={`/admin/enquiries/${enq.id}`} 
                      className="text-brand-gold hover:text-brand-charcoal transition-colors p-2 inline-flex"
                      title="View Details"
                    >
                      <Eye size={18} />
                    </Link>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      
      {/* Pagination */}
      {data?.pagination && data.pagination.totalPages > 1 && (
        <div className="p-4 border-t border-gray-100 flex items-center justify-between">
          <span className="text-sm text-gray-500">
            Page {data.pagination.page} of {data.pagination.totalPages}
          </span>
          <div className="flex gap-2">
            <button 
              disabled={page === 1}
              onClick={() => setPage(p => p - 1)}
              className="px-3 py-1 border border-gray-300 rounded text-sm disabled:opacity-50"
            >
              Prev
            </button>
            <button 
              disabled={page === data.pagination.totalPages}
              onClick={() => setPage(p => p + 1)}
              className="px-3 py-1 border border-gray-300 rounded text-sm disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminEnquiriesPage;
