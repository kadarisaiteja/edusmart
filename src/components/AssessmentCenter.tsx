import React, { useState } from 'react';
import { 
  ClipboardList, 
  Clock, 
  CheckCircle,
  XCircle,
  Play,
  RotateCcw,
  Award,
  Target,
  Zap
} from 'lucide-react';

interface Question {
  id: number;
  type: 'mcq' | 'true-false' | 'short-answer';
  question: string;
  options?: string[];
  correctAnswer: string | number;
  userAnswer?: string | number;
  explanation: string;
}

const AssessmentCenter: React.FC = () => {
  const [currentAssessment, setCurrentAssessment] = useState<Question[] | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string | number>>({});
  const [isCompleted, setIsCompleted] = useState(false);
  const [score, setScore] = useState(0);

  const sampleQuestions: Question[] = [
    {
      id: 1,
      type: 'mcq',
      question: 'What is the derivative of x² + 3x + 2?',
      options: ['2x + 3', '2x + 2', 'x + 3', '2x'],
      correctAnswer: 0,
      explanation: 'Using the power rule: d/dx(x²) = 2x, d/dx(3x) = 3, d/dx(2) = 0, so the answer is 2x + 3.'
    },
    {
      id: 2,
      type: 'true-false',
      question: 'The speed of light in vacuum is approximately 3 × 10⁸ m/s.',
      correctAnswer: true,
      explanation: 'This is correct. The speed of light in vacuum is exactly 299,792,458 m/s, which is approximately 3 × 10⁸ m/s.'
    },
    {
      id: 3,
      type: 'mcq',
      question: 'Which of the following is an organic compound?',
      options: ['H₂O', 'NaCl', 'CH₄', 'CO₂'],
      correctAnswer: 2,
      explanation: 'CH₄ (methane) is an organic compound as it contains carbon-hydrogen bonds.'
    },
    {
      id: 4,
      type: 'short-answer',
      question: 'What is the capital of France?',
      correctAnswer: 'Paris',
      explanation: 'Paris is the capital and largest city of France.'
    }
  ];

  const assessmentTemplates = [
    {
      id: 1,
      title: 'Mathematics Assessment',
      subject: 'Mathematics',
      questions: 15,
      duration: '30 min',
      difficulty: 'Intermediate',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      id: 2,
      title: 'Physics Quiz',
      subject: 'Physics',
      questions: 20,
      duration: '45 min',
      difficulty: 'Advanced',
      color: 'from-purple-500 to-pink-500'
    },
    {
      id: 3,
      title: 'Chemistry Basics',
      subject: 'Chemistry',
      questions: 12,
      duration: '25 min',
      difficulty: 'Beginner',
      color: 'from-green-500 to-emerald-500'
    },
    {
      id: 4,
      title: 'Quick Review',
      subject: 'Mixed',
      questions: 10,
      duration: '15 min',
      difficulty: 'Mixed',
      color: 'from-orange-500 to-red-500'
    }
  ];

  const startAssessment = () => {
    setCurrentAssessment(sampleQuestions);
    setCurrentQuestionIndex(0);
    setAnswers({});
    setIsCompleted(false);
    setScore(0);
  };

  const handleAnswer = (answer: string | number) => {
    setAnswers(prev => ({ ...prev, [currentQuestionIndex]: answer }));
  };

  const nextQuestion = () => {
    if (currentQuestionIndex < (currentAssessment?.length || 0) - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      completeAssessment();
    }
  };

  const completeAssessment = () => {
    if (!currentAssessment) return;
    
    let correctAnswers = 0;
    currentAssessment.forEach((question, index) => {
      if (answers[index] === question.correctAnswer) {
        correctAnswers++;
      }
    });
    
    setScore(Math.round((correctAnswers / currentAssessment.length) * 100));
    setIsCompleted(true);
  };

  const resetAssessment = () => {
    setCurrentAssessment(null);
    setCurrentQuestionIndex(0);
    setAnswers({});
    setIsCompleted(false);
    setScore(0);
  };

  if (currentAssessment && !isCompleted) {
    const currentQuestion = currentAssessment[currentQuestionIndex];
    const progress = ((currentQuestionIndex + 1) / currentAssessment.length) * 100;

    return (
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold text-gray-900">Assessment in Progress</h1>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-gray-600">
                <Clock className="w-5 h-5" />
                <span>25:30</span>
              </div>
              <button 
                onClick={resetAssessment}
                className="text-red-600 hover:text-red-800 transition-colors"
              >
                <XCircle className="w-6 h-6" />
              </button>
            </div>
          </div>

          <div className="mb-6">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>Question {currentQuestionIndex + 1} of {currentAssessment.length}</span>
              <span>{Math.round(progress)}% Complete</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-purple-500 to-blue-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-gray-200/50">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">
            {currentQuestion.question}
          </h2>

          {currentQuestion.type === 'mcq' && (
            <div className="space-y-3">
              {currentQuestion.options?.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswer(index)}
                  className={`w-full p-4 text-left border rounded-xl transition-all ${
                    answers[currentQuestionIndex] === index
                      ? 'border-purple-500 bg-purple-50 text-purple-700'
                      : 'border-gray-300 hover:border-gray-400 hover:bg-gray-50'
                  }`}
                >
                  <span className="font-medium mr-3">{String.fromCharCode(65 + index)}.</span>
                  {option}
                </button>
              ))}
            </div>
          )}

          {currentQuestion.type === 'true-false' && (
            <div className="space-y-3">
              <button
                onClick={() => handleAnswer(true)}
                className={`w-full p-4 text-left border rounded-xl transition-all ${
                  answers[currentQuestionIndex] === true
                    ? 'border-green-500 bg-green-50 text-green-700'
                    : 'border-gray-300 hover:border-gray-400 hover:bg-gray-50'
                }`}
              >
                <CheckCircle className="inline w-5 h-5 mr-3" />
                True
              </button>
              <button
                onClick={() => handleAnswer(false)}
                className={`w-full p-4 text-left border rounded-xl transition-all ${
                  answers[currentQuestionIndex] === false
                    ? 'border-red-500 bg-red-50 text-red-700'
                    : 'border-gray-300 hover:border-gray-400 hover:bg-gray-50'
                }`}
              >
                <XCircle className="inline w-5 h-5 mr-3" />
                False
              </button>
            </div>
          )}

          {currentQuestion.type === 'short-answer' && (
            <div>
              <input
                type="text"
                placeholder="Type your answer here..."
                value={answers[currentQuestionIndex] as string || ''}
                onChange={(e) => handleAnswer(e.target.value)}
                className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
          )}

          <div className="flex justify-end mt-8">
            <button
              onClick={nextQuestion}
              disabled={answers[currentQuestionIndex] === undefined}
              className={`px-6 py-3 rounded-xl font-medium transition-all ${
                answers[currentQuestionIndex] !== undefined
                  ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white hover:shadow-lg'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              {currentQuestionIndex < currentAssessment.length - 1 ? 'Next Question' : 'Complete Assessment'}
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (isCompleted) {
    return (
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="bg-gradient-to-r from-purple-500 via-blue-500 to-indigo-600 rounded-2xl p-8 text-white text-center">
          <div className="w-20 h-20 mx-auto mb-4 bg-white/20 rounded-full flex items-center justify-center">
            <Award className="w-10 h-10" />
          </div>
          <h1 className="text-3xl font-bold mb-2">Assessment Completed!</h1>
          <p className="text-purple-100 mb-6">Great job on completing the assessment</p>
          
          <div className="text-6xl font-bold mb-2">{score}%</div>
          <p className="text-xl">Your Score</p>
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Results Summary</h2>
          
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="text-center p-4 bg-green-50 rounded-xl">
              <div className="text-2xl font-bold text-green-600">
                {currentAssessment?.filter((_, index) => answers[index] === currentAssessment[index].correctAnswer).length}
              </div>
              <div className="text-sm text-green-700">Correct</div>
            </div>
            <div className="text-center p-4 bg-red-50 rounded-xl">
              <div className="text-2xl font-bold text-red-600">
                {currentAssessment?.filter((_, index) => answers[index] !== currentAssessment[index].correctAnswer).length}
              </div>
              <div className="text-sm text-red-700">Incorrect</div>
            </div>
            <div className="text-center p-4 bg-blue-50 rounded-xl">
              <div className="text-2xl font-bold text-blue-600">{currentAssessment?.length}</div>
              <div className="text-sm text-blue-700">Total</div>
            </div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={resetAssessment}
              className="flex-1 bg-gradient-to-r from-purple-500 to-blue-500 text-white py-3 px-6 rounded-xl hover:shadow-lg transition-all flex items-center justify-center gap-2"
            >
              <RotateCcw className="w-5 h-5" />
              Take Another Assessment
            </button>
            <button className="flex-1 bg-gradient-to-r from-green-500 to-emerald-500 text-white py-3 px-6 rounded-xl hover:shadow-lg transition-all">
              View Detailed Results
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Assessment Center</h1>
          <p className="text-gray-600">Test your knowledge with adaptive assessments</p>
        </div>
        <button
          onClick={startAssessment}
          className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-6 py-3 rounded-xl hover:shadow-lg transition-all duration-200 flex items-center gap-2"
        >
          <Zap className="w-5 h-5" />
          Quick Assessment
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {assessmentTemplates.map((template) => (
          <div key={template.id} className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50 hover:shadow-lg transition-all duration-200">
            <div className="flex items-center gap-4 mb-4">
              <div className={`w-12 h-12 bg-gradient-to-r ${template.color} rounded-xl flex items-center justify-center`}>
                <ClipboardList className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900">{template.title}</h3>
                <p className="text-gray-600 text-sm">{template.subject}</p>
              </div>
            </div>

            <div className="space-y-2 mb-6">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Questions:</span>
                <span className="font-medium text-gray-900">{template.questions}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Duration:</span>
                <span className="font-medium text-gray-900">{template.duration}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Difficulty:</span>
                <span className={`font-medium ${
                  template.difficulty === 'Beginner' ? 'text-green-600' :
                  template.difficulty === 'Intermediate' ? 'text-yellow-600' :
                  template.difficulty === 'Advanced' ? 'text-red-600' : 'text-blue-600'
                }`}>
                  {template.difficulty}
                </span>
              </div>
            </div>

            <button
              onClick={startAssessment}
              className={`w-full bg-gradient-to-r ${template.color} text-white py-3 px-4 rounded-xl hover:shadow-lg transition-all font-medium flex items-center justify-center gap-2`}
            >
              <Play className="w-5 h-5" />
              Start Assessment
            </button>
          </div>
        ))}
      </div>

      <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Recent Assessment Results</h2>
        <div className="space-y-3">
          {[
            { subject: 'Mathematics', score: 92, date: '2024-01-15', questions: 15 },
            { subject: 'Physics', score: 88, date: '2024-01-14', questions: 20 },
            { subject: 'Chemistry', score: 95, date: '2024-01-13', questions: 12 }
          ].map((result, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-gray-50/50 rounded-xl">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg flex items-center justify-center text-white font-bold">
                  {result.subject[0]}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{result.subject}</h3>
                  <p className="text-gray-600 text-sm">{result.questions} questions • {result.date}</p>
                </div>
              </div>
              <div className="text-right">
                <div className={`text-lg font-bold ${
                  result.score >= 90 ? 'text-green-600' :
                  result.score >= 80 ? 'text-yellow-600' : 'text-red-600'
                }`}>
                  {result.score}%
                </div>
                <div className="flex items-center gap-1">
                  <Target className="w-4 h-4 text-gray-400" />
                  <span className="text-xs text-gray-500">Score</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AssessmentCenter;