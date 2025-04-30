import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, X, RefreshCw, ChevronRight, Award, HelpCircle, Play, Brain, Globe, Leaf, Dumbbell, Code, Music, Film, BookOpen } from 'lucide-react';
import quizData from './data/quizData';
import './App.css';

function App() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [answered, setAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [showHomepage, setShowHomepage] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [quizActive, setQuizActive] = useState(false);
  const [filteredQuizData, setFilteredQuizData] = useState([]);

  // Filter quiz data based on selected category
  const currentQuestion = filteredQuizData[currentQuestionIndex];

  // Quiz categories
  const categories = [
    { id: 'general', name: 'General', icon: <Brain size={24} />, color: 'from-blue-500 to-blue-600' },
    { id: 'geography', name: 'Geography', icon: <Globe size={24} />, color: 'from-green-500 to-green-600' },
    { id: 'animals', name: 'Animals', icon: <Leaf size={24} />, color: 'from-emerald-500 to-emerald-600' },
    { id: 'sports', name: 'Sports', icon: <Dumbbell size={24} />, color: 'from-red-500 to-red-600' },
    { id: 'tech', name: 'Technology', icon: <Code size={24} />, color: 'from-purple-500 to-purple-600' },
    { id: 'music', name: 'Music', icon: <Music size={24} />, color: 'from-pink-500 to-pink-600' },
    { id: 'movies', name: 'Movies', icon: <Film size={24} />, color: 'from-amber-500 to-amber-600' },
    { id: 'literature', name: 'Literature', icon: <BookOpen size={24} />, color: 'from-indigo-500 to-indigo-600' },
  ];

  const handleOptionSelect = (option) => {
    if (answered) return;
    setSelectedOption(option);
  };

  const handleNextQuestion = () => {
    if (!answered && selectedOption === null) return;

    if (!answered) {
      // Check if answer is correct
      const correct = selectedOption === currentQuestion.correctAnswer;
      setIsCorrect(correct);
      if (correct) {
        setScore(score + 1);
      }
      setAnswered(true);
      setShowResult(true);
      return;
    }

    // Move to next question
    setShowExplanation(false);
    setShowResult(false);
    setAnswered(false);
    setSelectedOption(null);

    if (currentQuestionIndex < filteredQuizData.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setQuizCompleted(true);
    }
  };

  const restartQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setScore(0);
    setShowResult(false);
    setAnswered(false);
    setQuizCompleted(false);
    setShowExplanation(false);
  };

  const toggleExplanation = () => {
    setShowExplanation(!showExplanation);
  };

  const startQuiz = (category) => {
    // Filter quiz data based on selected category
    const filtered = quizData.filter(question => question.category === category.id);
    setFilteredQuizData(filtered);
    setSelectedCategory(category);
    setShowHomepage(false);
    setQuizActive(true);
    restartQuiz();
  };

  const stopQuiz = () => {
    setQuizActive(false);
    setShowHomepage(true);
    setQuizCompleted(false);
  };

  // Calculate percentage score
  const percentage = Math.round((score / filteredQuizData.length) * 100);

  // Get feedback based on score percentage
  const getFeedback = () => {
    if (percentage >= 80) return "Excellent! You're a quiz master!";
    if (percentage >= 60) return "Good job! You know your stuff!";
    if (percentage >= 40) return "Not bad! Keep learning!";
    return "Keep practicing! You'll get better!";
  };

  // Homepage component
  const Homepage = () => (
    <div className="p-6 md:p-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <motion.h1 
          className="text-4xl md:text-5xl font-bold text-gray-800 mb-4"
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ 
            type: "spring",
            stiffness: 260,
            damping: 20 
          }}
        >
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary-500 to-primary-700">
            Quizzy
          </span>
        </motion.h1>
        <motion.p 
          className="text-lg text-gray-600 max-w-md mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          Test your knowledge with our fun and interactive quizzes across various topics!
        </motion.p>
      </motion.div>

      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, staggerChildren: 0.1 }}
      >
        {categories.map((category, index) => (
          <motion.div
            key={category.id}
            className={`bg-gradient-to-br ${category.color} rounded-xl p-6 text-white shadow-lg hover:shadow-xl transition-all cursor-pointer`}
            whileHover={{ 
              scale: 1.03,
              boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
            }}
            whileTap={{ scale: 0.98 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ 
              opacity: 1, 
              y: 0,
              transition: { delay: 0.1 * index }
            }}
            onClick={() => startQuiz(category)}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-white/20 rounded-lg">
                {category.icon}
              </div>
              <motion.div 
                className="bg-white/20 rounded-full p-2"
                whileHover={{ rotate: 180 }}
                transition={{ duration: 0.3 }}
              >
                <Play size={16} fill="white" />
              </motion.div>
            </div>
            <h3 className="text-xl font-bold">{category.name}</h3>
            <p className="text-sm text-white/80 mt-2">10 questions</p>
          </motion.div>
        ))}
      </motion.div>

      <motion.div 
        className="mt-12 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        <p className="text-sm text-gray-500">
          Choose a category above to start your quiz adventure!
        </p>
      </motion.div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-primary-100 flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-2xl bg-white rounded-2xl shadow-xl overflow-hidden"
      >
        {showHomepage ? (
          <Homepage />
        ) : !quizCompleted ? (
          <div className="p-6 md:p-8">
            {/* Quiz header with category and stop button */}
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center">
                <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${categories.find(c => c.id === selectedCategory?.id)?.color || 'from-primary-500 to-primary-600'} flex items-center justify-center mr-2`}>
                  {selectedCategory?.icon || <Brain size={16} className="text-white" />}
                </div>
                <span className="font-medium text-gray-700">{selectedCategory?.name || 'Quiz'}</span>
              </div>
              <motion.button
                onClick={stopQuiz}
                className="text-gray-500 hover:text-gray-700 p-2 rounded-full hover:bg-gray-100"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <X size={20} />
              </motion.button>
            </div>
            
            {/* Header with progress */}
            <div className="flex justify-between items-center mb-6">
              <div className="text-sm font-medium text-gray-500">
                Question {currentQuestionIndex + 1} of {filteredQuizData.length}
              </div>
              <div className="text-sm font-medium text-primary-600">
                Score: {score}
              </div>
            </div>

            {/* Progress bar */}
            <div className="w-full bg-gray-200 rounded-full h-2.5 mb-8">
              <motion.div 
                className="bg-primary-600 h-2.5 rounded-full" 
                initial={{ width: `${(currentQuestionIndex / filteredQuizData.length) * 100}%` }}
                animate={{ width: `${((currentQuestionIndex + 1) / filteredQuizData.length) * 100}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>

            {/* Question */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentQuestionIndex}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
              >
                <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-6">
                  {currentQuestion.question}
                </h2>

                {/* Options */}
                <div className="space-y-3">
                  {currentQuestion.options.map((option, index) => (
                    <motion.button
                      key={index}
                      onClick={() => handleOptionSelect(option)}
                      className={`w-full p-4 text-left rounded-xl border-2 transition-all ${selectedOption === option
                        ? answered
                          ? isCorrect && selectedOption === currentQuestion.correctAnswer
                            ? 'border-green-500 bg-green-50'
                            : 'border-red-500 bg-red-50'
                          : 'border-primary-500 bg-primary-50'
                        : 'border-gray-200 hover:border-primary-300 hover:bg-primary-50'
                      }`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      disabled={answered}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-gray-800">{option}</span>
                        {answered && option === currentQuestion.correctAnswer && (
                          <motion.span
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="text-green-500"
                          >
                            <Check size={20} />
                          </motion.span>
                        )}
                        {answered && option === selectedOption && option !== currentQuestion.correctAnswer && (
                          <motion.span
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="text-red-500"
                          >
                            <X size={20} />
                          </motion.span>
                        )}
                      </div>
                    </motion.button>
                  ))}
                </div>

                {/* Result feedback */}
                <AnimatePresence>
                  {showResult && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className={`mt-6 p-4 rounded-lg ${isCorrect ? 'bg-green-100' : 'bg-red-100'}`}
                    >
                      <div className="flex items-center">
                        {isCorrect ? (
                          <Check className="text-green-500 mr-2" size={20} />
                        ) : (
                          <X className="text-red-500 mr-2" size={20} />
                        )}
                        <p className={`font-medium ${isCorrect ? 'text-green-700' : 'text-red-700'}`}>
                          {isCorrect ? 'Correct!' : 'Incorrect!'}
                        </p>
                      </div>
                      
                      {/* Explanation toggle button */}
                      <button 
                        onClick={toggleExplanation}
                        className="mt-2 flex items-center text-sm text-gray-600 hover:text-gray-900"
                      >
                        <HelpCircle size={16} className="mr-1" />
                        {showExplanation ? 'Hide explanation' : 'Show explanation'}
                      </button>
                      
                      {/* Explanation */}
                      <AnimatePresence>
                        {showExplanation && (
                          <motion.p 
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="mt-2 text-sm text-gray-600"
                          >
                            {currentQuestion.explanation}
                          </motion.p>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </AnimatePresence>

            {/* Next button */}
            <motion.button
              onClick={handleNextQuestion}
              className={`mt-8 w-full py-3 px-6 rounded-xl font-medium flex items-center justify-center ${answered ? 'bg-primary-600 hover:bg-primary-700 text-white' : selectedOption ? 'bg-primary-500 text-white' : 'bg-gray-200 text-gray-400 cursor-not-allowed'}`}
              whileHover={answered || selectedOption ? { scale: 1.02 } : {}}
              whileTap={answered || selectedOption ? { scale: 0.98 } : {}}
              disabled={!answered && selectedOption === null}
            >
              {answered ? 'Next Question' : 'Check Answer'}
              <ChevronRight size={20} className="ml-1" />
            </motion.button>
          </div>
        ) : (
          <div className="p-6 md:p-8 text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 200, damping: 15 }}
            >
              <div className="inline-flex items-center justify-center w-24 h-24 bg-primary-100 rounded-full mb-6">
                <Award size={48} className="text-primary-600" />
              </div>
            </motion.div>
            
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-2xl md:text-3xl font-bold text-gray-800 mb-2"
            >
              Quiz Completed!
            </motion.h2>
            
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-gray-600 mb-6"
            >
              {getFeedback()}
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="mb-8"
            >
              <div className="text-5xl font-bold text-primary-600 mb-2">{percentage}%</div>
              <p className="text-gray-600">You scored {score} out of {filteredQuizData.length}</p>
            </motion.div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <motion.button
                onClick={restartQuiz}
                className="w-full py-3 px-6 bg-primary-600 hover:bg-primary-700 text-white rounded-xl font-medium flex items-center justify-center"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <RefreshCw size={20} className="mr-2" />
                Restart Quiz
              </motion.button>
              
              <motion.button
                onClick={stopQuiz}
                className="w-full py-3 px-6 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-xl font-medium flex items-center justify-center"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <ChevronRight size={20} className="mr-2" />
                Back to Home
              </motion.button>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}

export default App;