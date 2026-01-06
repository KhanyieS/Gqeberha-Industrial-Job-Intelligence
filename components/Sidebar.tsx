import React from 'react';
import { 
  LayoutDashboard, 
  Briefcase, 
  ShieldAlert, 
  ClipboardList, 
  Settings,
  LogOut,
  UserCircle
} from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (open: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab, isMobileMenuOpen, setIsMobileMenuOpen }) => {
  const menuItems = [
    { id: 'dashboard', label: 'My Stats', icon: LayoutDashboard },
    { id: 'feed', label: 'Live Job Feed', icon: Briefcase },
    { id: 'safety', label: 'Safety Check', icon: ShieldAlert },
    { id: 'applications', label: 'App Tracker', icon: ClipboardList },
  ];

  return (
    <>
      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-20 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed top-0 left-0 z-30 h-full w-64 bg-surface text-slate-800 shadow-xl transition-transform duration-300 ease-in-out
        lg:translate-x-0 lg:static lg:shadow-none lg:border-r lg:border-slate-200
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="flex flex-col h-full p-6">
          {/* Logo / Header */}
          <div className="mb-10 flex items-center gap-3">
            <div className="h-10 w-10 bg-primary rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-primary/30">
              G
            </div>
            <div>
              <h1 className="font-bold text-lg leading-tight">Job Intel</h1>
              <p className="text-xs text-secondary">Gqeberha Industrial</p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`
                    w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 font-medium
                    ${isActive 
                      ? 'bg-primary text-white shadow-md shadow-primary/25' 
                      : 'text-slate-500 hover:bg-slate-100 hover:text-slate-800'}
                  `}
                >
                  <Icon size={20} />
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* User Profile Snippet */}
          <div className="mt-auto pt-6 border-t border-slate-100">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-10 w-10 rounded-full bg-slate-200 flex items-center justify-center text-slate-500">
                <UserCircle size={24} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold truncate">Candidate User</p>
                <p className="text-xs text-secondary truncate">Warehouse Specialist</p>
              </div>
            </div>
            <button className="flex items-center gap-2 text-slate-400 hover:text-danger text-sm font-medium transition-colors">
              <LogOut size={16} />
              Log Out
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;