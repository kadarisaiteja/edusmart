import React from 'react';
import { 
  Home, 
  FileText, 
  ClipboardList, 
  BarChart3, 
  Lightbulb,
  Trophy,
  User,
  Flame
} from 'lucide-react';

interface NavigationProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  user: any;
}

const Navigation: React.FC<NavigationProps> = ({ activeTab, setActiveTab, user }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'documents', label: 'Documents', icon: FileText },
    { id: 'assessments', label: 'Assessments', icon: ClipboardList },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'recommendations', label: 'Study Plan', icon: Lightbulb },
  ];

  return (
    <nav className="fixed left-0 top-0 h-full w-64 bg-white/90 backdrop-blur-lg border-r border-gray-200 shadow-xl z-50">
      <div className="p-6">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl flex items-center justify-center">
            <Trophy className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              EduSmart
            </h1>
            <p className="text-sm text-gray-500">Adaptive Learning</p>
          </div>
        </div>

        <div className="bg-gradient-to-r from-purple-500 to-blue-500 rounded-2xl p-4 mb-6 text-white">
          <div className="flex items-center gap-3 mb-2">
            <User className="w-8 h-8" />
            <div>
              <h3 className="font-semibold">{user.name}</h3>
              <p className="text-purple-100 text-sm">{user.level} Level</p>
            </div>
          </div>
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-1">
              <Flame className="w-4 h-4" />
              <span>{user.streak} day streak</span>
            </div>
            <div className="bg-white/20 px-2 py-1 rounded-lg">
              {user.totalPoints} XP
            </div>
          </div>
        </div>

        <ul className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            
            return (
              <li key={item.id}>
                <button
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                    isActive
                      ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
};

export default Navigation;