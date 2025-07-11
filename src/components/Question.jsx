import { decodeText } from '../helpers'; 

const Question = ({ questionData, index, userAnswer, handleAnswer }) => {
  if (
    !questionData ||
    typeof questionData !== 'object' ||
    !questionData.options ||
    !Array.isArray(questionData.options)
  ) {
    return <p>Loading question...</p>;
  }

  const { question, options, correct_answer } = questionData;

  const getButtonStyle = (option) => {
    if (!userAnswer) return 'option';
    if (option === correct_answer) return 'option correct';
    if (option === userAnswer) return 'option incorrect';
    return 'option disabled';
  };

  return (
    <div className="question-card">
      <h2>Question {index + 1}</h2>
      <p className="question-text">{decodeText(question)}</p>

      <div className="options-container">
        {options.map((option, i) => (
          <button
            key={i}
            className={getButtonStyle(option)}
            disabled={!!userAnswer}
            onClick={() => handleAnswer(index, option)}
          >
            {decodeText(option)}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Question;
