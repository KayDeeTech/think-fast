export async function loadQuestions(
  amount = 3,
  category = "18",
  difficulty = "medium"
) {
  const url = `https://opentdb.com/api.php?amount=${amount}&category=${category}&difficulty=${difficulty}&type=multiple`;
  const response = await fetch(url);
  const data = await response.json();

  return data.results.map((question) => {
    const allAnswers = [...question.incorrect_answers, question.correct_answer];
    const shuffledAnswers = allAnswers.sort(() => Math.random() - 0.5);

    return {
      question: question.question,
      correct_answer: question.correct_answer,
      answers: shuffledAnswers,
    };
  });
}
