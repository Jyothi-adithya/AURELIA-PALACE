import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { LayoutDashboard, Inbox, LogOut, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { cn } from '../utils/cn';

const AdminLayout = () => {
  const { logout, admin } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const navItems = [
    { name: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
    { name: 'Enquiries', path: '/admin/enquiries', icon: Inbox },
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex font-sans">
      {/* Mobile sidebar toggle */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-brand-charcoal text-white flex items-center justify-between px-4 z-50">
        <span className="font-serif text-xl text-brand-gold">Aurelia Admin</span>
        <button onClick={() => setSidebarOpen(!sidebarOpen)}>
          {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Sidebar */}
      <aside className={cn(
        "fixed inset-y-0 left-0 bg-brand-charcoal text-brand-ivory w-64 transform transition-transform duration-200 ease-in-out z-40 lg:translate-x-0 lg:static lg:block",
        sidebarOpen ? "translate-x-0 pt-16 lg:pt-0" : "-translate-x-full"
      )}>
        <div className="h-16 flex items-center px-6 bg-black/20 hidden lg:flex">
          <span className="font-serif text-2xl text-brand-gold">Aurelia Admin</span>
        </div>
        
        <div className="p-4">
          <p className="text-sm text-gray-400 mb-6 px-2">Welcome, {admin?.name}</p>
          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname.startsWith(item.path);
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  onClick={() => setSidebarOpen(false)}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2 rounded-md transition-colors",
                    isActive ? "bg-brand-gold text-brand-charcoal" : "hover:bg-white/10"
                  )}
                >
                  <Icon size={20} />
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="absolute bottom-0 w-full p-4 border-t border-white/10">
          <button 
            onClick={handleLogout}
            className="flex items-center gap-3 px-3 py-2 w-full text-left text-red-400 hover:bg-white/10 rounded-md transition-colors"
          >
            <LogOut size={20} />
            Logout
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 lg:ml-0 pt-16 lg:pt-0 overflow-auto">
        <div className="p-4 sm:p-6 lg:p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
