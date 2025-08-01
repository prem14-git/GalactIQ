// import { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';

// function isAuthenticated() {
//   const token = localStorage.getItem('userToken');
//   return !!token;
// }

// export default function Quiz() {
//   const [questions, setQuestions] = useState([]);
//   const [answers, setAnswers] = useState([]);
//   const [submitted, setSubmitted] = useState(false);
//   const [score, setScore] = useState(0);
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (!isAuthenticated()) {
//       navigate('/'); // Redirect to home or login if not authenticated
//       return;
//     }
//     axios.get('/api/quiz/random?count=5')
//       .then(res => {
//         setQuestions(res.data);
//         setAnswers(Array(res.data.length).fill(null));
//         setLoading(false);
//       })
//       .catch(() => setLoading(false));
//   }, [navigate]);

//   const handleSelect = (qIdx, optIdx) => {
//     if (submitted) return;
//     setAnswers(prev => prev.map((a, i) => i === qIdx ? optIdx : a));
//   };

//   const handleSubmit = () => {
//     let sc = 0;
//     questions.forEach((q, i) => {
//       if (answers[i] === q.correctIndex) sc++;
//     });
//     setScore(sc);
//     setSubmitted(true);
//   };

//   if (loading) return <div className="p-8 text-center text-lg">Loading quiz...</div>;
//   if (!isAuthenticated()) return <div className="p-8 text-center text-lg">Please log in to take the quiz.</div>;

//   return (
//     <div className="max-w-2xl mx-auto p-6">
//       <h1 className="text-3xl font-bold mb-6 text-purple-600">GalactIQ Quiz</h1>
//       {questions.map((q, i) => (
//         <div key={q._id || i} className="mb-8 p-4 rounded-lg bg-gradient-to-r from-blue-50 to-purple-50 shadow">
//           <div className="font-semibold mb-2">Q{i+1}: {q.question}</div>
//           <div className="space-y-2">
//             {q.options.map((opt, j) => (
//               <label key={j} className={`block px-4 py-2 rounded cursor-pointer border transition-all ${answers[i] === j ? 'bg-purple-200 border-purple-400' : 'bg-white border-gray-300 hover:bg-purple-50'}`}
//                 style={{pointerEvents: submitted ? 'none' : 'auto'}}>
//                 <input
//                   type="radio"
//                   name={`q${i}`}
//                   checked={answers[i] === j}
//                   onChange={() => handleSelect(i, j)}
//                   className="mr-2"
//                   disabled={submitted}
//                 />
//                 {opt}
//               </label>
//             ))}
//           </div>
//           {submitted && (
//             <div className={`mt-2 text-sm ${answers[i] === q.correctIndex ? 'text-green-600' : 'text-red-500'}`}>
//               {answers[i] === q.correctIndex ? 'Correct!' : `Correct answer: ${q.options[q.correctIndex]}`}
//             </div>
//           )}
//         </div>
//       ))}
//       {!submitted ? (
//         <button
//           className="bg-purple-600 text-white px-6 py-2 rounded font-semibold hover:bg-purple-700 transition"
//           onClick={handleSubmit}
//           disabled={answers.some(a => a === null)}
//         >
//           Submit Quiz
//         </button>
//       ) : (
//         <>
//           <div className="text-xl font-bold text-green-600 mt-4">Your Score: {score} / {questions.length}</div>
//           <button
//             className="mt-6 bg-cyan-500 text-white px-6 py-2 rounded font-semibold hover:bg-cyan-600 transition"
//             onClick={() => navigate('/')}
//           >
//             Back to Home
//           </button>
//         </>
//       )}
//     </div>
//   );
// } 










import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ChevronRight, Star, Rocket, Globe, Award, Home, Brain, Space, University, EarthIcon } from 'lucide-react';

function isAuthenticated() {
  const token = localStorage.getItem('userToken');
  return !!token;
}

export default function Quiz() {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(true);
  const [animating, setAnimating] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated()) {
      navigate('/');
      return;
    }
    
    axios.get('/api/quiz/random?count=5')
      .then(res => {
        setQuestions(res.data);
        setAnswers(Array(res.data.length).fill(null));
        setLoading(false);
      })
      .catch((error) => {
        console.error('Failed to load quiz:', error);
        setLoading(false);
      });
  }, [navigate]);

  const handleOptionSelect = (optionIndex) => {
    if (animating) return;
    setSelectedAnswer(optionIndex);
  };

  const handleSubmit = () => {
    if (selectedAnswer === null || animating) return;
    
    setAnimating(true);
    
    // Update answers array
    const newAnswers = [...answers];
    newAnswers[currentQuestionIndex] = selectedAnswer;
    setAnswers(newAnswers);
    
    setTimeout(() => {
      if (currentQuestionIndex < questions.length - 1) {
        // Move to next question
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setSelectedAnswer(null);
        setAnimating(false);
      } else {
        // Calculate final score and show results
        let finalScore = 0;
        questions.forEach((q, i) => {
          if (newAnswers[i] === q.correctIndex) finalScore++;
        });
        setScore(finalScore);
        setShowResults(true);
        setAnimating(false);
      }
    }, 600);
  };

  const resetQuiz = () => {
    setCurrentQuestionIndex(0);
    setAnswers(Array(questions.length).fill(null));
    setSelectedAnswer(null);
    setShowResults(false);
    setScore(0);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-cyan-400 mx-auto mb-4"></div>
          <div className="text-white text-xl font-light">Loading cosmic quiz...</div>
          <div className="flex justify-center mt-4 space-x-1">
            <Star className="w-4 h-4 text-yellow-400 animate-pulse" />
            <Star className="w-4 h-4 text-yellow-400 animate-pulse delay-100" />
            <Star className="w-4 h-4 text-yellow-400 animate-pulse delay-200" />
          </div>
        </div>
      </div>
    );
  }

  if (!isAuthenticated()) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 flex items-center justify-center">
        <div className="text-center text-white">
          <Rocket className="w-16 h-16 mx-auto mb-4 text-cyan-400" />
          <div className="text-xl font-light">Please log in to explore the cosmos</div>
        </div>
      </div>
    );
  }

  if (showResults) {
    const percentage = (score / questions.length) * 100;
    let message = "";
    let color = "";
    
    if (percentage >= 80) {
      message = "Cosmic Master! 🚀";
      color = "text-green-400";
    } else if (percentage >= 60) {
      message = "Space Explorer! 🌟";
      color = "text-yellow-400";
    } else if (percentage >= 40) {
      message = "Galactic Learner! 🌙";
      color = "text-blue-400";
    } else {
      message = "Future Astronaut! ⭐";
      color = "text-purple-400";
    }

    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 relative overflow-hidden">
        {/* Animated background stars */}
        <div className="absolute inset-0">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 2}s`
              }}
            />
          ))}
        </div>

        <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
          <div className="max-w-md w-full">
            <div className="bg-black/30 backdrop-blur-lg rounded-3xl p-8 border border-white/10 text-center">
              <Award className="w-20 h-20 mx-auto mb-6 text-yellow-400" />
              
              <h1 className="text-3xl font-bold text-white mb-2">Mission Complete!</h1>
              <p className={`text-xl font-semibold mb-6 ${color}`}>{message}</p>
              
              <div className="bg-white/10 rounded-2xl p-6 mb-6">
                <div className="text-4xl font-bold text-white mb-2">
                  {score} / {questions.length}
                </div>
                <div className="text-cyan-400 font-medium">
                  {percentage.toFixed(0)}% Accuracy
                </div>
              </div>

              <div className="space-y-3">
                <button
                  onClick={resetQuiz}
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105"
                >
                  <Rocket className="w-5 h-5 inline mr-2" />
                  Launch New Mission
                </button>
                
                <button
                  onClick={() => navigate('/home')}
                  className="w-full bg-white/10 hover:bg-white/20 text-white font-medium py-3 px-6 rounded-xl transition-all duration-300 border border-white/20"
                >
                  <Home className="w-5 h-5 inline mr-2" />
                  Return to Base
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex) / questions.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 relative overflow-hidden">
      {/* Animated background stars */}
      <div className="absolute inset-0">
        {[...Array(100)].map((_, i) => (
          <div
            key={i}
            className="absolute w-px h-px bg-white rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      {/* Progress bar */}
      <div className="relative z-10 w-full bg-black/20 h-2">
        <div 
          className="h-full bg-gradient-to-r from-cyan-400 to-purple-500 transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
        <div className="max-w-2xl w-full">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <Globe className="w-8 h-8 text-cyan-400 mr-3 animate-spin" style={{ animationDuration: '10s' }} />
              <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                GalactIQ Quiz
              </h1>
              <Brain className="w-8 h-8 text-yellow-400 ml-3 animate-pulse" />
            </div>
            <p className="text-white/70 text-lg">
              Question {currentQuestionIndex + 1} of {questions.length}
            </p>
          </div>

          {/* Question Card */}
          <div className={`bg-black/30 backdrop-blur-lg rounded-3xl p-8 border border-white/10 transition-all duration-600 ${animating ? 'opacity-0 transform translate-x-full' : 'opacity-100 transform translate-x-0'}`}>
            {currentQuestion && (
              <>
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-white leading-relaxed">
                    {currentQuestion.question}
                  </h2>
                </div>

                <div className="space-y-4 mb-8">
                  {currentQuestion.options?.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => handleOptionSelect(index)}
                      className={`w-full text-left p-4 rounded-2xl transition-all duration-300 transform hover:scale-105 ${
                        selectedAnswer === index
                          ? 'bg-gradient-to-r from-purple-600/50 to-pink-600/50 border-2 border-purple-400 shadow-lg shadow-purple-500/25'
                          : 'bg-white/10 hover:bg-white/20 border-2 border-white/20 hover:border-white/40'
                      }`}
                      disabled={animating}
                    >
                      <div className="flex items-center">
                        <div className={`w-6 h-6 rounded-full border-2 mr-4 flex items-center justify-center ${
                          selectedAnswer === index 
                            ? 'border-purple-400 bg-purple-400' 
                            : 'border-white/40'
                        }`}>
                          {selectedAnswer === index && (
                            <div className="w-2 h-2 bg-white rounded-full" />
                          )}
                        </div>
                        <span className="text-white font-medium text-lg">{option}</span>
                      </div>
                    </button>
                  ))}
                </div>

                <div className="flex justify-between items-center">
                  <div className="text-white/60">
                    Progress: {currentQuestionIndex} / {questions.length}
                  </div>
                  
                  <button
                    onClick={handleSubmit}
                    disabled={selectedAnswer === null || animating}
                    className={`flex items-center px-8 py-3 rounded-xl font-semibold transition-all duration-300 transform ${
                      selectedAnswer !== null && !animating
                        ? 'bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white hover:scale-105 shadow-lg shadow-cyan-500/25'
                        : 'bg-gray-600/50 text-gray-400 cursor-not-allowed'
                    }`}
                  >
                    {currentQuestionIndex === questions.length - 1 ? (
                      <>
                        Complete Mission
                        <Award className="w-5 h-5 ml-2" />
                      </>
                    ) : (
                      <>
                        Next Question
                        <ChevronRight className="w-5 h-5 ml-2" />
                      </>
                    )}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}