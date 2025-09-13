import React from 'react';
import { 
  Lightbulb, 
  BookOpen, 
  Clock,
  TrendingUp,
  Target,
  Calendar,
  Star,
  Play,
  CheckCircle,
  AlertCircle,
  Zap,
  Brain
} from 'lucide-react';

interface StudyRecommendationsProps {
  user: any;
}

const StudyRecommendations: React.FC<StudyRecommendationsProps> = ({ user }) => {
  const personalizedRecommendations = [
    {
      id: 1,
      type: 'focus-area',
      title: 'Strengthen Physics Concepts',
      description: 'Your recent quiz results show room for improvement in quantum mechanics',
      priority: 'high',
      estimatedTime: '45 min',
      confidence: 92,
      icon: Target,
      color: 'from-red-500 to-pink-500',
      action: 'Review quantum mechanics basics'
    },
    {
      id: 2,
      type: 'optimal-time',
      title: 'Study During Peak Hours',
      description: 'You perform best between 2-4 PM. Schedule complex topics during this time',
      priority: 'medium',
      estimatedTime: '2 hours',
      confidence: 87,
      icon: Clock,
      color: 'from-blue-500 to-indigo-500',
      action: 'Schedule advanced calculus session'
    },
    {
      id: 3,
      type: 'revision',
      title: 'Review Chemistry Fundamentals',
      description: 'It\'s been 5 days since your last chemistry study session',
      priority: 'medium',
      estimatedTime: '30 min',
      confidence: 78,
      icon: BookOpen,
      color: 'from-green-500 to-emerald-500',
      action: 'Quick organic chemistry review'
    },
    {
      id: 4,
      type: 'new-topic',
      title: 'Explore Advanced Mathematics',
      description: 'Based on your calculus mastery, you\'re ready for differential equations',
      priority: 'low',
      estimatedTime: '60 min',
      confidence: 85,
      icon: TrendingUp,
      color: 'from-purple-500 to-blue-500',
      action: 'Start differential equations course'
    }
  ];

  const suggestedSchedule = [
    {
      time: '2:00 PM - 3:30 PM',
      activity: 'Advanced Calculus Practice',
      type: 'study',
      difficulty: 'high',
      color: 'blue'
    },
    {
      time: '3:45 PM - 4:15 PM',
      activity: 'Physics Quiz Review',
      type: 'review',
      difficulty: 'medium',
      color: 'purple'
    },
    {
      time: '7:00 PM - 7:30 PM',
      activity: 'Chemistry Flashcards',
      type: 'memorization',
      difficulty: 'low',
      color: 'green'
    },
    {
      time: '8:00 PM - 8:45 PM',
      activity: 'Biology Chapter Summary',
      type: 'reading',
      difficulty: 'medium',
      color: 'orange'
    }
  ];

  const studyMethods = [
    {
      method: 'Active Recall',
      effectiveness: 94,
      description: 'Test yourself without looking at notes',
      recommended: true,
      icon: '🧠',
      color: 'from-indigo-500 to-purple-500'
    },
    {
      method: 'Spaced Repetition',
      effectiveness: 89,
      description: 'Review material at increasing intervals',
      recommended: true,
      icon: '📅',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      method: 'Pomodoro Technique',
      effectiveness: 82,
      description: '25-minute focused study sessions',
      recommended: false,
      icon: '🍅',
      color: 'from-red-500 to-orange-500'
    },
    {
      method: 'Mind Mapping',
      effectiveness: 76,
      description: 'Visual representation of concepts',
      recommended: false,
      icon: '🗺️',
      color: 'from-green-500 to-emerald-500'
    }
  ];

  const learningGoals = [
    {
      goal: 'Master Calculus III',
      progress: 78,
      deadline: '2 weeks',
      status: 'on-track',
      tasks: 12,
      completed: 9
    },
    {
      goal: 'Physics Certification Prep',
      progress: 45,
      deadline: '1 month',
      status: 'behind',
      tasks: 20,
      completed: 9
    },
    {
      goal: 'Chemistry Lab Techniques',
      progress: 92,
      deadline: '3 days',
      status: 'ahead',
      tasks: 8,
      completed: 8
    }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-50 border-red-200';
      case 'medium': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'low': return 'text-green-600 bg-green-50 border-green-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Personalized Study Plan</h1>
          <p className="text-gray-600">AI-powered recommendations tailored to your learning patterns</p>
        </div>
        <div className="flex gap-3">
          <button className="bg-white/80 backdrop-blur-sm px-4 py-2 rounded-xl border border-gray-200 hover:shadow-md transition-all">
            Refresh Recommendations
          </button>
          <button className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-4 py-2 rounded-xl hover:shadow-lg transition-all">
            Generate Study Schedule
          </button>
        </div>
      </div>

      {/* AI Insights Banner */}
      <div className="bg-gradient-to-r from-purple-500 via-blue-500 to-indigo-600 rounded-2xl p-6 text-white">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
            <Brain className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold mb-1">AI Learning Insight</h2>
            <p className="text-purple-100">
              Your learning velocity has increased 23% this week! You're most productive during afternoon sessions 
              and show strong pattern recognition in mathematical concepts.
            </p>
          </div>
        </div>
      </div>

      {/* Personalized Recommendations */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
            <Lightbulb className="w-6 h-6 text-yellow-500" />
            Smart Recommendations
          </h2>
          
          {personalizedRecommendations.map((rec) => {
            const Icon = rec.icon;
            return (
              <div key={rec.id} className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50 hover:shadow-lg transition-all">
                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 bg-gradient-to-r ${rec.color} rounded-xl flex items-center justify-center flex-shrink-0`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-semibold text-gray-900">{rec.title}</h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getPriorityColor(rec.priority)}`}>
                        {rec.priority}
                      </span>
                    </div>
                    <p className="text-gray-600 text-sm mb-3">{rec.description}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {rec.estimatedTime}
                        </div>
                        <div className="flex items-center gap-1">
                          <Zap className="w-4 h-4" />
                          {rec.confidence}% confidence
                        </div>
                      </div>
                      <button className="text-blue-600 hover:text-blue-800 font-medium text-sm">
                        {rec.action} →
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="space-y-6">
          {/* Today's Schedule */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50">
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Calendar className="w-6 h-6 text-blue-500" />
              Suggested Schedule
            </h2>
            <div className="space-y-3">
              {suggestedSchedule.map((item, index) => (
                <div key={index} className="flex items-center gap-3 p-3 bg-gray-50/50 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className={`w-3 h-3 rounded-full bg-${item.color}-500`}></div>
                  <div className="flex-1">
                    <div className="font-medium text-gray-900 text-sm">{item.activity}</div>
                    <div className="text-xs text-gray-500">{item.time} • {item.type}</div>
                  </div>
                  <button className="p-1 hover:bg-gray-200 rounded">
                    <Play className="w-4 h-4 text-gray-400" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Learning Goals */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50">
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Target className="w-6 h-6 text-green-500" />
              Learning Goals
            </h2>
            <div className="space-y-4">
              {learningGoals.map((goal, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium text-gray-900 text-sm">{goal.goal}</h3>
                    <div className="flex items-center gap-2">
                      {goal.status === 'on-track' && <CheckCircle className="w-4 h-4 text-green-500" />}
                      {goal.status === 'behind' && <AlertCircle className="w-4 h-4 text-red-500" />}
                      {goal.status === 'ahead' && <Star className="w-4 h-4 text-yellow-500" />}
                      <span className="text-xs text-gray-500">{goal.deadline}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full transition-all duration-500 ${
                          goal.status === 'ahead' ? 'bg-green-500' :
                          goal.status === 'on-track' ? 'bg-blue-500' : 'bg-red-500'
                        }`}
                        style={{ width: `${goal.progress}%` }}
                      />
                    </div>
                    <span className="text-sm font-medium text-gray-900">{goal.progress}%</span>
                  </div>
                  <div className="text-xs text-gray-500">
                    {goal.completed}/{goal.tasks} tasks completed
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Study Methods Optimization */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50">
        <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
          <TrendingUp className="w-6 h-6 text-purple-500" />
          Optimized Study Methods
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {studyMethods.map((method, index) => (
            <div key={index} className={`p-4 rounded-xl border-2 transition-all ${
              method.recommended 
                ? 'border-green-200 bg-green-50' 
                : 'border-gray-200 bg-gray-50/50 hover:bg-gray-50'
            }`}>
              <div className="flex items-center justify-between mb-3">
                <div className="text-2xl">{method.icon}</div>
                {method.recommended && (
                  <div className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-medium">
                    Recommended
                  </div>
                )}
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">{method.method}</h3>
              <p className="text-gray-600 text-sm mb-3">{method.description}</p>
              <div className="flex items-center gap-2">
                <div className="flex-1 bg-gray-200 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full bg-gradient-to-r ${method.color} transition-all duration-500`}
                    style={{ width: `${method.effectiveness}%` }}
                  />
                </div>
                <span className="text-sm font-medium text-gray-900">{method.effectiveness}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StudyRecommendations;