import { useContext, useState, useEffect } from "react";
import { QuizContext } from "../context/QuizContext";
import { useNavigate } from "react-router-dom";
import Logo from "../components/Logo";

function Quiz() {
  const {
    questions,
    currentIndex,
    setCurrentIndex,
    loading,
    score,
    setScore,
    username,
  } = useContext(QuizContext);

  const [userAnswer, setUserAnswer] = useState(null);
  const [timeLeft, setTimeLeft] = useState(15); // ⏱ 15s timer

  const navigate = useNavigate();

  // Redirect if no questions
  useEffect(() => {
    if (!loading && questions.length === 0) {
      navigate("/");
    }
  }, [questions, loading, navigate]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-slate-700 to-gray-800">
        <p className="text-white text-lg">Loading questions...</p>
      </div>
    );
  }

  if (questions.length === 0) {
    return null; // Prevents rendering before redirect
  }

  const curQuestion = questions[currentIndex];

  // Timer logic
  useEffect(() => {
    setTimeLeft(15); // reset timer each time question changes

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev === 1) {
          clearInterval(timer);
          handleNextQuestion(); // auto move when time runs out
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer); // cleanup
  }, [currentIndex]);

  const handleNextQuestion = () => {
    setUserAnswer(null);
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      navigate("/result");
    }
  };

  const handleAnswer = (answer) => {
    setUserAnswer(answer);
    if (curQuestion.correct_answer === answer) {
      setScore((prev) => prev + 10); // safer update
    }
  };

  return (
    <>
      {/* Header bar */}
      <div className="fixed top-0 left-0 w-full flex justify-between items-center bg-gradient-to-r from-slate-700 to-gray-800 text-white p-6 shadow-md">
        <span className="text-lg">
          Good Luck, <span className="font-bold">{username}</span>
        </span>
        <span className="text-sm">
          Score: {score} / {questions.length * 10}
        </span>
      </div>

      {/* Quiz body */}
      <div className="flex flex-col items-center justify-center p-4 min-h-screen gap-4 bg-gradient-to-r from-slate-700 to-gray-800 text-white">
        <Logo />
        <div className="bg-white/10 p-6 rounded-xl shadow-lg max-w-xl w-full">
          {/* Top row: Question count + Timer */}
          <div className="flex justify-between items-center leading-none mb-5">
            <h1 className="text-xl font-semibold">
              Question {currentIndex + 1} of {questions.length}
            </h1>
            <span className="text-lg font-bold text-yellow-400">
              ⏱ {timeLeft}s
            </span>
          </div>

          {/* Question */}
          <p
            className="mb-4"
            dangerouslySetInnerHTML={{ __html: curQuestion.question }}
          />

          {/* Answers */}
          <ul className="space-y-2">
            {curQuestion.answers.map((answer, idx) => {
              const isCorrect = answer === curQuestion.correct_answer;
              const isSelected = userAnswer === answer;

              let btnClass = "bg-gray-200 hover:bg-gray-300";

              if (userAnswer) {
                if (isSelected) {
                  btnClass = isCorrect
                    ? "bg-green-500 text-white translate-x-3"
                    : "bg-red-500 text-white";
                } else if (isCorrect) {
                  btnClass = "bg-green-500 text-white translate-x-3";
                } else {
                  btnClass = "bg-gray-200";
                }
              }

              return (
                <li key={idx}>
                  <button
                    disabled={!!userAnswer}
                    className={`w-full text-slate-700 text-left px-4 py-2 rounded-lg transition-colors ${btnClass}`}
                    onClick={() => handleAnswer(answer)}
                    dangerouslySetInnerHTML={{ __html: answer }}
                  />
                </li>
              );
            })}
          </ul>

          {/* Next button (only after answering) */}
          {userAnswer && (
            <div className="mt-4 text-center">
              <button
                className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                onClick={handleNextQuestion}
              >
                {currentIndex < questions.length - 1
                  ? "Next Question"
                  : "Finish Quiz"}
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Quiz;
