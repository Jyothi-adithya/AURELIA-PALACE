import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import ScrollToTop from './components/common/ScrollToTop';
import { useAuth } from './hooks/useAuth';

// Layouts
import PublicLayout from './layouts/PublicLayout';
import AdminLayout from './layouts/AdminLayout';

// Pages
import HomePage from './pages/HomePage';
import VenuePage from './pages/VenuePage';
import EventsPage from './pages/EventsPage';
import EventDetailPage from './pages/EventDetailPage';
import SpacesPage from './pages/SpacesPage';
import SpaceDetailPage from './pages/SpaceDetailPage';
import GalleryPage from './pages/GalleryPage';
import ServicesPage from './pages/ServicesPage';
import StoriesPage from './pages/StoriesPage';
import StoryDetailPage from './pages/StoryDetailPage';
import EnquiryPage from './pages/EnquiryPage';
import NotFoundPage from './pages/NotFoundPage';

// Admin Pages
import AdminLoginPage from './pages/admin/AdminLoginPage';
import AdminDashboardPage from './pages/admin/AdminDashboardPage';
import AdminEnquiriesPage from './pages/admin/AdminEnquiriesPage';
import AdminEnquiryDetailPage from './pages/admin/AdminEnquiryDetailPage';

// Protected Route Wrapper
const ProtectedRoute = ({ children }) => {
  const { admin, loading } = useAuth();
  
  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  if (!admin) return <Navigate to="/admin/login" replace />;
  
  return children;
};

function App() {
  return (
    <HelmetProvider>
    <Router>
      <ScrollToTop />
      <Routes>
        {/* Public Routes with Layout */}
        <Route path="/" element={<PublicLayout />}>
          <Route index element={<HomePage />} />
          <Route path="venue" element={<VenuePage />} />
          
          <Route path="events" element={<EventsPage />} />
          <Route path="events/:slug" element={<EventDetailPage />} />
          
          <Route path="spaces" element={<SpacesPage />} />
          <Route path="spaces/:slug" element={<SpaceDetailPage />} />
          
          <Route path="services" element={<ServicesPage />} />
          
          <Route path="gallery" element={<GalleryPage />} />
          
          <Route path="stories" element={<StoriesPage />} />
          <Route path="stories/:slug" element={<StoryDetailPage />} />
          
          <Route path="enquiry" element={<EnquiryPage />} />
          
          <Route path="*" element={<NotFoundPage />} />
        </Route>

        {/* Admin Login (No Layout) */}
        <Route path="/admin/login" element={<AdminLoginPage />} />

        {/* Protected Admin Routes with Layout */}
        <Route path="/admin" element={<ProtectedRoute><AdminLayout /></ProtectedRoute>}>
          <Route index element={<Navigate to="/admin/dashboard" replace />} />
          <Route path="dashboard" element={<AdminDashboardPage />} />
          <Route path="enquiries" element={<AdminEnquiriesPage />} />
          <Route path="enquiries/:id" element={<AdminEnquiryDetailPage />} />
        </Route>
      </Routes>
    </Router>
    </HelmetProvider>
  );
}

export default App;
