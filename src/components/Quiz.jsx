import { useEffect, useState } from 'react';
import Question from './Question';
import { shuffleArray } from '../helpers';

const Quiz = () => {
  const [questions, setQuestions] = useState([]);
  const [userAnswers, setUserAnswers] = useState({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);

  useEffect(() => {
    fetch('https://opentdb.com/api.php?amount=10&type=multiple')
      .then((res) => res.json())
      .then((data) => {
        console.log("Raw API response:", data); // ✅ Debug log

        // ✅ Final correct check
        if (!data || data.response_code !== 0 || !Array.isArray(data.results)) {
          throw new Error("Invalid API response structure");
        }

        const formatted = data.results.map((q) => ({
          question: q.question,
          correct_answer: q.correct_answer,
          options: shuffleArray([...q.incorrect_answers, q.correct_answer]),
        }));

        setQuestions(formatted);
      })
      .catch((err) => {
        console.error("Error fetching quiz data:", err);
      });
  }, []);

  const handleAnswer = (index, answer) => {
    if (userAnswers[index]) return;

    const isCorrect = questions[index].correct_answer === answer;
    const points = isCorrect ? 5 : -2;

    setUserAnswers((prev) => ({ ...prev, [index]: answer }));
    setScore((prev) => prev + points);
  };

  const next = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    }
  };

  const prev = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  };

  if (questions.length === 0) return <p>Loading quiz...</p>;

  return (
    <div className="quiz-container">
      <Question
        questionData={questions[currentQuestionIndex]}
        index={currentQuestionIndex}
        userAnswer={userAnswers[currentQuestionIndex]}
        handleAnswer={handleAnswer}
      />

      <div className="nav-buttons">
        <button onClick={prev} disabled={currentQuestionIndex === 0}>
          Previous
        </button>
        <button onClick={next} disabled={currentQuestionIndex === questions.length - 1}>
          Next
        </button>
      </div>

      <div className="score-display">
        <p>Score: {score}</p>
      </div>
    </div>
  );
};

export default Quiz;
