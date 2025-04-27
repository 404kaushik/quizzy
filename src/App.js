import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, X, RefreshCw, ChevronRight, Award, HelpCircle } from 'lucide-react';
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

  const currentQuestion = quizData[currentQuestionIndex];

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

    if (currentQuestionIndex < quizData.length - 1) {
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

  // Calculate percentage score
  const percentage = Math.round((score / quizData.length) * 100);

  // Get feedback based on score percentage
  const getFeedback = () => {
    if (percentage >= 80) return "Excellent! You're a quiz master!";
    if (percentage >= 60) return "Good job! You know your stuff!";
    if (percentage >= 40) return "Not bad! Keep learning!";
    return "Keep practicing! You'll get better!";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-primary-100 flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-2xl bg-white rounded-2xl shadow-xl overflow-hidden"
      >
        {!quizCompleted ? (
          <div className="p-6 md:p-8">
            {/* Header with progress */}
            <div className="flex justify-between items-center mb-6">
              <div className="text-sm font-medium text-gray-500">
                Question {currentQuestionIndex + 1} of {quizData.length}
              </div>
              <div className="text-sm font-medium text-primary-600">
                Score: {score}
              </div>
            </div>

            {/* Progress bar */}
            <div className="w-full bg-gray-200 rounded-full h-2.5 mb-8">
              <motion.div 
                className="bg-primary-600 h-2.5 rounded-full" 
                initial={{ width: `${(currentQuestionIndex / quizData.length) * 100}%` }}
                animate={{ width: `${((currentQuestionIndex + 1) / quizData.length) * 100}%` }}
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
              <p className="text-gray-600">You scored {score} out of {quizData.length}</p>
            </motion.div>
            
            <motion.button
              onClick={restartQuiz}
              className="w-full py-3 px-6 bg-primary-600 hover:bg-primary-700 text-white rounded-xl font-medium flex items-center justify-center"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <RefreshCw size={20} className="mr-2" />
              Restart Quiz
            </motion.button>
          </div>
        )}
      </motion.div>
    </div>
  );
}

export default App;
