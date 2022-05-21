import React, { useState, useEffect } from "react";
import Sentence from "./Sentence";
import GuessArea from "./GuessArea";
import Win from "./Win";
import "./style.css";
function App() {
  const [sentence, setSentence] = useState("");
  const [scramble, setScramble] = useState("");
  const [score, setScore] = useState(0);
  const [page, setPage] = useState(1);

  const scrambleWords = (sentence) => {
    var arrSentence = sentence.split(" ");
    var completeScrambleSentence = "";
    for (var i = 0; i < arrSentence.length; i++) {
      var arrWord = arrSentence[i].split("");
      var wordScramble = "";
      if (arrWord.length > 3) {
        wordScramble += arrWord[0];
        let count = 1;
        while (arrWord.length > 2) {
          let randomNumber = Math.floor(
            Math.random() * (arrWord.length - 2) + 1
          );
          if (randomNumber !== count) {
            wordScramble += arrWord[randomNumber];
            arrWord.splice(randomNumber, 1);
            count = count + 1;
          }
        }
        wordScramble += arrWord[arrWord.length - 1];
        completeScrambleSentence += wordScramble + " ";
      } else {
        completeScrambleSentence += arrSentence[i] + " ";
      }
    }

    return completeScrambleSentence;
  };
  const fetchSentence = async () => {
    const url = `https://api.hatchways.io/assessment/sentences/${page}`;
    const response = await fetch(url);
    const data = await response.json();
    
    setSentence(data.data.sentence);
    setScramble(scrambleWords(data.data.sentence));
  };
  useEffect(() => {
    fetchSentence();
  }, [page]);

  const nextPage = () => {
    var allInput = document.getElementsByTagName("input");
    for (var i = 0; i < allInput.length; i++) {
      allInput[i].classList.remove("correct");
      allInput[i].value = "";
      allInput[i].disabled = false;
      document.getElementById("0-0").focus();
      document.getElementById("next_btn").classList.add("hidden");
    }
  };
  if (score === 10) {
    return (
      <div className="wrapper">
        <div className="container">
          <Win />
        </div>
      </div>
    );
  }
  return (
    <div className="wrapper">
      <div className="container">
        <Sentence scramble={scramble} />
        <div className="instruction">
          <p>Guess the sentence! Start typing</p>
          <p>The yellow blocks are meant for spaces</p>
        </div>
        <div className="score">
          <p>Score: {score}</p>
        </div>
        <GuessArea sentence={sentence.split(" ")} setScore={setScore} />
        <div className="btn_area">
          <button
            id="next_btn"
            className="hidden"
            onClick={() => {
              setPage(page + 1);
              nextPage();
            }}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
