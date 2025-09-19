import { useContext } from "react";
import { QuizContext } from "../context/QuizContext";
import Logo from "../components/Logo";

function Result() {
  const { resetQuiz, score, username, questions } = useContext(QuizContext);

  const totalQuestions = questions.length;
  const percentage = Math.round((score / (totalQuestions * 10)) * 100);

  // simple feedback messages
  const getMessage = () => {
    if (percentage === 100) return "🏆 Perfect Score! You're a genius!";
    if (percentage >= 80) return "🎉 Great job, you really know your stuff!";
    if (percentage >= 50) return "👍 Not bad, keep practicing!";
    return "😅 Don’t worry, you’ll get it next time!";
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-slate-700 to-gray-800 text-white p-6">
      <div className="bg-white/10 backdrop-blur-lg p-8 rounded-2xl shadow-xl w-full max-w-md text-center">
        <h1 className="text-3xl font-bold mb-4">Quiz Results</h1>
        <p className="text-lg mb-2">
          Well done, <span className="font-semibold">{username}</span> 👋
        </p>

        <p className="text-xl font-semibold mb-1">
          Score: <span className="text-blue-400">{score}</span> /{" "}
          {totalQuestions * 10}
        </p>
        <p className="text-lg text-gray-200 mb-6">({percentage}%)</p>

        <p className="text-xl mb-6">{getMessage()}</p>

        <button
          onClick={resetQuiz}
          className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-xl font-semibold transition-all duration-300"
        >
          🔄 Play Again
        </button>
      </div>
    </div>
  );
}

export default Result;
