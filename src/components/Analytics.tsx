import React from 'react';
import { 
  TrendingUp, 
  BarChart3, 
  PieChart,
  Calendar,
  Clock,
  Target,
  Award,
  BookOpen,
  Brain,
  Zap
} from 'lucide-react';

interface AnalyticsProps {
  user: any;
}

const Analytics: React.FC<AnalyticsProps> = ({ user }) => {
  const weeklyProgress = [
    { day: 'Mon', hours: 2.5, score: 85 },
    { day: 'Tue', hours: 3.2, score: 92 },
    { day: 'Wed', hours: 1.8, score: 78 },
    { day: 'Thu', hours: 4.1, score: 94 },
    { day: 'Fri', hours: 2.9, score: 88 },
    { day: 'Sat', hours: 3.5, score: 91 },
    { day: 'Sun', hours: 2.1, score: 87 }
  ];

  const subjectPerformance = [
    { subject: 'Mathematics', progress: 92, time: 15, color: 'from-blue-500 to-cyan-500' },
    { subject: 'Physics', progress: 78, time: 12, color: 'from-purple-500 to-pink-500' },
    { subject: 'Chemistry', progress: 85, time: 10, color: 'from-green-500 to-emerald-500' },
    { subject: 'Biology', progress: 90, time: 8, color: 'from-orange-500 to-red-500' },
  ];

  const learningPatterns = [
    { time: '6-8 AM', productivity: 85, sessions: 12 },
    { time: '2-4 PM', productivity: 92, sessions: 18 },
    { time: '7-9 PM', productivity: 78, sessions: 15 },
    { time: '10-12 PM', productivity: 65, sessions: 8 },
  ];

  const achievements = [
    { title: 'Study Streak Master', description: '15+ day streak', icon: '🔥', unlocked: true },
    { title: 'Quiz Champion', description: '10 perfect scores', icon: '🏆', unlocked: true },
    { title: 'Speed Learner', description: 'Complete 5 courses in a week', icon: '⚡', unlocked: false },
    { title: 'Knowledge Explorer', description: 'Study 10 different subjects', icon: '🧠', unlocked: false },
  ];

  const maxHours = Math.max(...weeklyProgress.map(d => d.hours));
  const maxScore = Math.max(...weeklyProgress.map(d => d.score));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Learning Analytics</h1>
          <p className="text-gray-600">Track your progress and discover learning patterns</p>
        </div>
        <div className="flex gap-3">
          <button className="bg-white/80 backdrop-blur-sm px-4 py-2 rounded-xl border border-gray-200 hover:shadow-md transition-all flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            This Week
          </button>
          <button className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-4 py-2 rounded-xl hover:shadow-lg transition-all">
            Export Report
          </button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { 
            label: 'Weekly Study Time', 
            value: '22.1h', 
            change: '+15%', 
            icon: Clock, 
            color: 'from-blue-500 to-cyan-500',
            trend: 'up'
          },
          { 
            label: 'Average Score', 
            value: '87%', 
            change: '+5%', 
            icon: Target, 
            color: 'from-green-500 to-emerald-500',
            trend: 'up'
          },
          { 
            label: 'Subjects Mastered', 
            value: '3', 
            change: '+1', 
            icon: BookOpen, 
            color: 'from-purple-500 to-pink-500',
            trend: 'up'
          },
          { 
            label: 'Learning Efficiency', 
            value: '92%', 
            change: '+8%', 
            icon: Brain, 
            color: 'from-orange-500 to-red-500',
            trend: 'up'
          }
        ].map((metric, index) => {
          const Icon = metric.icon;
          return (
            <div key={index} className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50 hover:shadow-lg transition-all">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 bg-gradient-to-r ${metric.color} rounded-xl flex items-center justify-center`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-gray-900">{metric.value}</div>
                  <div className={`text-sm flex items-center gap-1 ${
                    metric.trend === 'up' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    <TrendingUp className="w-3 h-3" />
                    {metric.change}
                  </div>
                </div>
              </div>
              <div className="text-sm text-gray-600">{metric.label}</div>
            </div>
          );
        })}
      </div>

      {/* Weekly Progress Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg flex items-center justify-center">
              <BarChart3 className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-xl font-bold text-gray-900">Weekly Study Hours</h2>
          </div>
          <div className="space-y-4">
            {weeklyProgress.map((day, index) => (
              <div key={index} className="flex items-center gap-4">
                <div className="w-8 text-sm font-medium text-gray-600">{day.day}</div>
                <div className="flex-1 bg-gray-100 rounded-full h-3 relative">
                  <div 
                    className="bg-gradient-to-r from-blue-500 to-indigo-500 h-3 rounded-full transition-all duration-500"
                    style={{ width: `${(day.hours / maxHours) * 100}%` }}
                  />
                </div>
                <div className="w-12 text-sm font-semibold text-gray-900 text-right">
                  {day.hours}h
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center">
              <Target className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-xl font-bold text-gray-900">Daily Performance</h2>
          </div>
          <div className="space-y-4">
            {weeklyProgress.map((day, index) => (
              <div key={index} className="flex items-center gap-4">
                <div className="w-8 text-sm font-medium text-gray-600">{day.day}</div>
                <div className="flex-1 bg-gray-100 rounded-full h-3 relative">
                  <div 
                    className={`h-3 rounded-full transition-all duration-500 ${
                      day.score >= 90 ? 'bg-gradient-to-r from-green-500 to-emerald-500' :
                      day.score >= 80 ? 'bg-gradient-to-r from-yellow-500 to-orange-500' :
                      'bg-gradient-to-r from-red-500 to-pink-500'
                    }`}
                    style={{ width: `${(day.score / 100) * 100}%` }}
                  />
                </div>
                <div className="w-12 text-sm font-semibold text-gray-900 text-right">
                  {day.score}%
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Subject Performance */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
            <PieChart className="w-5 h-5 text-white" />
          </div>
          <h2 className="text-xl font-bold text-gray-900">Subject Performance</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {subjectPerformance.map((subject, index) => (
            <div key={index} className="p-4 bg-gray-50/50 rounded-xl">
              <div className="flex items-center gap-3 mb-3">
                <div className={`w-10 h-10 bg-gradient-to-r ${subject.color} rounded-lg flex items-center justify-center text-white font-bold`}>
                  {subject.subject[0]}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 text-sm">{subject.subject}</h3>
                  <p className="text-gray-500 text-xs">{subject.time}h studied</p>
                </div>
              </div>
              <div className="mb-2">
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600">Progress</span>
                  <span className="font-semibold text-gray-900">{subject.progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className={`bg-gradient-to-r ${subject.color} h-2 rounded-full transition-all duration-500`}
                    style={{ width: `${subject.progress}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Learning Patterns & Achievements */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
              <Clock className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-xl font-bold text-gray-900">Optimal Learning Times</h2>
          </div>
          <div className="space-y-4">
            {learningPatterns.map((pattern, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50/50 rounded-lg">
                <div>
                  <div className="font-semibold text-gray-900">{pattern.time}</div>
                  <div className="text-sm text-gray-600">{pattern.sessions} sessions</div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-lg text-gray-900">{pattern.productivity}%</div>
                  <div className="text-xs text-gray-500">productivity</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-lg flex items-center justify-center">
              <Award className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-xl font-bold text-gray-900">Achievements</h2>
          </div>
          <div className="space-y-3">
            {achievements.map((achievement, index) => (
              <div key={index} className={`flex items-center gap-4 p-3 rounded-lg ${
                achievement.unlocked ? 'bg-yellow-50 border border-yellow-200' : 'bg-gray-50/50'
              }`}>
                <div className="text-2xl">{achievement.icon}</div>
                <div className="flex-1">
                  <h3 className={`font-semibold ${
                    achievement.unlocked ? 'text-yellow-800' : 'text-gray-500'
                  }`}>
                    {achievement.title}
                  </h3>
                  <p className={`text-sm ${
                    achievement.unlocked ? 'text-yellow-600' : 'text-gray-400'
                  }`}>
                    {achievement.description}
                  </p>
                </div>
                {achievement.unlocked && (
                  <div className="w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center">
                    <Zap className="w-4 h-4 text-white" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;