import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../../lib/api';
import Loader from '../../components/common/Loader';
import ErrorState from '../../components/common/ErrorState';
import { ArrowLeft } from 'lucide-react';
import Button from '../../components/common/Button';

const AdminEnquiryDetailPage = () => {
  const { id } = useParams();
  const [enquiry, setEnquiry] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    fetchEnquiry();
  }, [id]);

  const fetchEnquiry = async () => {
    try {
      const res = await api.get(`/admin/enquiries/${id}`);
      setEnquiry(res.data.data);
    } catch (err) {
      setError('Could not load enquiry details');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (newStatus) => {
    setUpdating(true);
    try {
      await api.patch(`/admin/enquiries/${id}/status`, { status: newStatus });
      setEnquiry({ ...enquiry, status: newStatus });
    } catch (err) {
      alert('Failed to update status');
    } finally {
      setUpdating(false);
    }
  };

  if (loading) return <Loader />;
  if (error) return <ErrorState message={error} />;
  if (!enquiry) return null;

  return (
    <div className="max-w-4xl mx-auto">
      <Link to="/admin/enquiries" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-brand-charcoal mb-6 transition-colors">
        <ArrowLeft size={16} /> Back to Enquiries
      </Link>
      
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl font-serif text-brand-charcoal">{enquiry.name}</h1>
            <p className="text-sm text-gray-500">Submitted on {new Date(enquiry.createdAt).toLocaleString()}</p>
          </div>
          
          <div className="flex items-center gap-3">
            <span className="text-sm font-medium text-gray-500">Status:</span>
            <select
              value={enquiry.status}
              onChange={(e) => handleStatusChange(e.target.value)}
              disabled={updating}
              className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium focus:outline-none focus:border-brand-gold bg-gray-50 disabled:opacity-50"
            >
              <option value="NEW">New</option>
              <option value="CONTACTED">Contacted</option>
              <option value="CLOSED">Closed</option>
            </select>
          </div>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div>
              <h3 className="text-sm uppercase tracking-wider text-gray-400 font-bold mb-4">Contact Info</h3>
              <div className="space-y-3 text-sm">
                <p><span className="text-gray-500">Email:</span> <a href={`mailto:${enquiry.email}`} className="text-brand-gold hover:underline">{enquiry.email}</a></p>
                <p><span className="text-gray-500">Phone:</span> <a href={`tel:${enquiry.phone}`} className="text-brand-gold hover:underline">{enquiry.phone}</a></p>
              </div>
            </div>
            
            <div>
              <h3 className="text-sm uppercase tracking-wider text-gray-400 font-bold mb-4">Event Details</h3>
              <div className="space-y-3 text-sm">
                <p><span className="text-gray-500">Type:</span> {enquiry.eventType?.name}</p>
                <p><span className="text-gray-500">Date:</span> {new Date(enquiry.eventDate).toLocaleDateString()}</p>
                <p><span className="text-gray-500">Guests:</span> {enquiry.guestCount}</p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-sm uppercase tracking-wider text-gray-400 font-bold mb-4">Message</h3>
            <div className="bg-gray-50 p-4 rounded text-sm text-gray-700 whitespace-pre-wrap border border-gray-100">
              {enquiry.message}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminEnquiryDetailPage;
