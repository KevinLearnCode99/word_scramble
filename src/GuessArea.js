import Guess from "./Guess";

function GuessArea({ sentence, setScore }) {
  return (
    <div className="guess_area">
      {sentence.map((word, index) => {
        return (
          <Guess
            key={index}
            word={word}
            row={index}
            sentence={sentence}
            setScore={setScore}
          />
        );
      })}

      
    </div>
  );
}
export default GuessArea;
