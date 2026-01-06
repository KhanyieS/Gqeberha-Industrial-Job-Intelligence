import React from 'react';
import { 
  LayoutDashboard, 
  Briefcase, 
  ShieldAlert, 
  FileText, 
  Search,
  LogOut,
  UserCircle,
  Building2
} from 'lucide-react';
import { COMPANIES } from '../constants';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (open: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab, isMobileMenuOpen, setIsMobileMenuOpen }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'feed', label: 'Job Listings', icon: Briefcase },
    { id: 'cv-studio', label: 'CV Studio', icon: FileText },
    { id: 'safety', label: 'Senticity', icon: ShieldAlert },
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

      {/* Sidebar - Charcoal Dark Theme */}
      <aside className={`
        fixed top-0 left-0 z-30 h-full w-72 bg-charcoal text-textLight shadow-2xl transition-transform duration-300 ease-in-out
        lg:translate-x-0 lg:static lg:shadow-none
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="flex flex-col h-full p-6">
          {/* Logo / Header */}
          <div className="mb-8 flex items-center gap-3">
            <div className="h-10 w-10 bg-amber rounded-xl flex items-center justify-center text-charcoal font-black text-xl">
              C
            </div>
            <div>
              <h1 className="font-bold text-lg leading-tight tracking-tight">Crextio<span className="text-amber">.PE</span></h1>
              <p className="text-xs text-textGray">Job Intelligence</p>
            </div>
          </div>

          {/* Company Search Widget */}
          <div className="mb-8">
            <label className="text-xs font-semibold text-textGray uppercase tracking-wider mb-3 block">Target Company</label>
            <div className="bg-charcoalLight rounded-xl p-2 mb-4">
              <div className="flex items-center gap-2 px-2 pb-2 border-b border-gray-700">
                <Search size={14} className="text-textGray"/>
                <input 
                  type="text" 
                  placeholder="Search VW, Ford..." 
                  className="bg-transparent border-none text-sm text-white focus:outline-none w-full placeholder-gray-600"
                />
              </div>
              <div className="flex gap-2 mt-3 overflow-x-auto no-scrollbar">
                {COMPANIES.map((c) => (
                  <button key={c.name} className="flex-shrink-0 h-8 w-8 rounded-full bg-gray-700 hover:bg-amber hover:text-charcoal transition-colors flex items-center justify-center text-xs font-bold" title={c.name}>
                    {c.logo}
                  </button>
                ))}
              </div>
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
                    w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 font-medium text-sm
                    ${isActive 
                      ? 'bg-amber text-charcoal shadow-lg shadow-amber/20' 
                      : 'text-textGray hover:bg-charcoalLight hover:text-white'}
                  `}
                >
                  <Icon size={18} />
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Application Stats (Mini) */}
          <div className="mt-6 mb-6 p-4 bg-charcoalLight rounded-2xl">
             <div className="flex justify-between items-center mb-2">
               <span className="text-xs text-textGray">Application Goal</span>
               <span className="text-xs font-bold text-amber">65%</span>
             </div>
             <div className="h-2 w-full bg-gray-700 rounded-full overflow-hidden">
               <div className="h-full bg-amber w-[65%]"></div>
             </div>
          </div>

          {/* User Profile Snippet */}
          <div className="mt-auto pt-6 border-t border-gray-800">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-10 w-10 rounded-full bg-gray-700 flex items-center justify-center text-gray-400">
                <UserCircle size={24} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-white truncate">Khanyisile S.</p>
                <p className="text-xs text-textGray truncate">Logistics Pro</p>
              </div>
            </div>
            <button className="flex items-center gap-2 text-textGray hover:text-danger text-xs font-medium transition-colors w-full">
              <LogOut size={14} />
              Log Out
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;