import { createContext, useState } from "react";
import { loadQuestions } from "../hooks/useQuizApi";
import { useNavigate } from "react-router-dom";

// eslint-disable-next-line react-refresh/only-export-components
export const QuizContext = createContext();

export const QuizProvider = ({ children }) => {
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState("");

  const navigate = useNavigate();

  const fetchQuestions = async (amount, category, difficulty) => {
    setLoading(true);
    try {
      const questions = await loadQuestions(amount, category, difficulty);
      setQuestions(questions);
    } catch (error) {
      console.error("Error fetching questions:", error);
    } finally {
      setLoading(false);
    }
  };

  const resetQuiz = () => {
    setQuestions([]);
    setCurrentIndex(0);
    setScore(0);
    setLoading(false);
    navigate("/");
  };

  return (
    <QuizContext.Provider
      value={{
        questions,
        setQuestions,
        currentIndex,
        setCurrentIndex,
        score,
        setScore,
        loading,
        setLoading,
        fetchQuestions,
        resetQuiz,
        username,
        setUsername,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
};
