import { useContext, useState } from "react";
import { QuizContext } from "../context/QuizContext";
import { useNavigate } from "react-router-dom";
import Logo from "../components/Logo";

function Home() {
  const { loading, fetchQuestions, username, setUsername } =
    useContext(QuizContext);
  const navigate = useNavigate();
  const [start, setStart] = useState(false);

  const startQuiz = async () => {
    await fetchQuestions(10, 9, "medium"); // Example: Load 10 medium questions from category 9 (General Knowledge)
    navigate("/quiz"); // Navigate to the quiz page after loading questions
  };

  return (
    <div className="flex flex-col items-center justify-center p-4 min-h-screen gap-4 bg-gradient-to-r from-slate-700 to-gray-800">
      <Logo />

      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className={`bg-white/80 w-full max-w-lg text-center rounded-xl p-2 outline-none capitalize ease-in-out transform duration-700 transition-opacity ${
          start ? "opacity-100 mb-2 mt-6" : "opacity-0"
        }`}
        placeholder="Enter your name to begin"
      />

      <button
        onClick={!start ? () => setStart(true) : startQuiz}
        disabled={start ? username.length < 4 || loading : ""}
        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-400 disabled:text-white/60"
      >
        {loading
          ? "Loading"
          : start || username.length > 4
          ? "Load Question"
          : "Start Quiz"}
      </button>
    </div>
  );
}

export default Home;
