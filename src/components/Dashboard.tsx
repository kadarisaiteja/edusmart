import React from 'react';
import { 
  BookOpen, 
  Target, 
  Clock, 
  TrendingUp,
  Award,
  Calendar,
  Play,
  Users
} from 'lucide-react';

interface DashboardProps {
  user: any;
}

const Dashboard: React.FC<DashboardProps> = ({ user }) => {
  const recentActivities = [
    { subject: 'Mathematics', activity: 'Completed Calculus Quiz', score: 92, time: '2 hours ago', color: 'from-blue-500 to-cyan-500' },
    { subject: 'Physics', activity: 'Studied Quantum Mechanics', progress: 75, time: 'Yesterday', color: 'from-purple-500 to-pink-500' },
    { subject: 'Chemistry', activity: 'Organic Chemistry Test', score: 88, time: '2 days ago', color: 'from-green-500 to-emerald-500' },
  ];

  const upcomingTasks = [
    { title: 'Linear Algebra Assignment', due: 'Today, 6:00 PM', priority: 'high' },
    { title: 'Biology Chapter Review', due: 'Tomorrow, 2:00 PM', priority: 'medium' },
    { title: 'History Essay Draft', due: 'Friday, 11:59 PM', priority: 'low' },
  ];

  const stats = [
    { label: 'Study Hours', value: user.studyTime, icon: Clock, color: 'from-orange-400 to-red-400' },
    { label: 'Completed Courses', value: user.completedCourses, icon: BookOpen, color: 'from-green-400 to-emerald-400' },
    { label: 'Average Score', value: '89%', icon: Target, color: 'from-blue-400 to-indigo-400' },
    { label: 'Learning Streak', value: `${user.streak} days`, icon: TrendingUp, color: 'from-purple-400 to-pink-400' },
  ];

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Welcome back, {user.name.split(' ')[0]}! 👋
          </h1>
          <p className="text-gray-600 text-lg">Ready to continue your learning journey?</p>
        </div>
        <button className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-6 py-3 rounded-xl hover:shadow-lg transition-all duration-200 flex items-center gap-2">
          <Play className="w-5 h-5" />
          Start Studying
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50 hover:shadow-lg transition-all duration-200">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 bg-gradient-to-r ${stat.color} rounded-xl flex items-center justify-center`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-xl font-bold text-gray-900">Recent Activities</h2>
          </div>
          <div className="space-y-4">
            {recentActivities.map((activity, index) => (
              <div key={index} className="flex items-center gap-4 p-4 bg-gray-50/50 rounded-xl hover:bg-gray-50 transition-colors">
                <div className={`w-12 h-12 bg-gradient-to-r ${activity.color} rounded-xl flex items-center justify-center text-white font-bold text-lg`}>
                  {activity.subject[0]}
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">{activity.subject}</h3>
                  <p className="text-gray-600 text-sm">{activity.activity}</p>
                </div>
                <div className="text-right">
                  {activity.score && (
                    <div className="text-lg font-bold text-green-600">{activity.score}%</div>
                  )}
                  {activity.progress && (
                    <div className="text-lg font-bold text-blue-600">{activity.progress}%</div>
                  )}
                  <div className="text-xs text-gray-500">{activity.time}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
              <Calendar className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-xl font-bold text-gray-900">Upcoming Tasks</h2>
          </div>
          <div className="space-y-3">
            {upcomingTasks.map((task, index) => (
              <div key={index} className="p-3 bg-gray-50/50 rounded-lg border-l-4 border-orange-400">
                <h3 className="font-medium text-gray-900 text-sm">{task.title}</h3>
                <p className="text-gray-600 text-xs">{task.due}</p>
                <div className="mt-2">
                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    task.priority === 'high' ? 'bg-red-100 text-red-700' :
                    task.priority === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-green-100 text-green-700'
                  }`}>
                    {task.priority} priority
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-r from-purple-500 via-blue-500 to-indigo-600 rounded-2xl p-8 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-2">Achievement Unlocked! 🎉</h2>
            <p className="text-purple-100 mb-4">You've maintained a 12-day study streak!</p>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5" />
                <span>Consistency Master</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                <span>Top 10% of learners</span>
              </div>
            </div>
          </div>
          <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center">
            <Award className="w-12 h-12" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;