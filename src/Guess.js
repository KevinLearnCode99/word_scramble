function Guess({ word, row, sentence, setScore }) {
  function handleKeyPress(e) {
    var key = e.key;
    var regex = /[a-zA-Z]/;
    var currentInputId = e.target.id;
    var lastInputId =
      sentence.length - 1 + "-" + sentence[sentence.length - 1].length;
    var nextInputId;
    console.log(key);
    if (
      key.toLowerCase() === key.toUpperCase() &&
      document.getElementById(currentInputId).className !== "space_input"
    ) {
      document.getElementById(currentInputId).value = "";
    } else if (
      key === " " &&
      document.getElementById(currentInputId).className === "space_input"
    ) {
      document.getElementById(currentInputId).classList.add("correct");
      if (currentInputId !== lastInputId) {
        nextInputId = parseInt(currentInputId.charAt(0)) + 1 + "-0";
        document.getElementById(nextInputId).focus();
      }
    } else if (!regex.test(key) || (key.length !== 1 && key !== "Backspace")) {
      e.preventDefault();
    } else if (key === "Backspace") {
      if (
        currentInputId !== "0-0" &&
        currentInputId.charAt(currentInputId.length - 1) === "0" &&
        currentInputId.length !== 4
      ) {
        nextInputId =
          parseInt(currentInputId.charAt(0)) -
          1 +
          "-" +
          sentence[parseInt(currentInputId.charAt(0)) - 1].length;
        document.getElementById(nextInputId).focus();
        document.getElementById(nextInputId).value = "";
        document.getElementById(nextInputId).classList.remove("correct");
      } else if (currentInputId !== "0-0") {
        if (currentInputId.length === 3) {
          nextInputId =
            currentInputId.substring(0, currentInputId.length - 1) +
            (parseInt(currentInputId.charAt(currentInputId.length - 1)) - 1);
        } else {
          nextInputId =
            currentInputId.charAt(0) +
            "-" +
            (parseInt(currentInputId.slice(-2)) - 1);
        }
        console.log("current " + currentInputId);
        console.log("next " + nextInputId);
        document.getElementById(nextInputId).focus();
        document.getElementById(nextInputId).value = "";
        document.getElementById(nextInputId).classList.remove("correct");
      }
    } else {
      if (currentInputId !== lastInputId) {
        try {
          nextInputId =
            currentInputId.substring(0, currentInputId.length - 1) +
            (parseInt(currentInputId.charAt(currentInputId.length - 1)) + 1);
          document.getElementById(nextInputId).focus();
        } catch (err) {
          nextInputId = parseInt(currentInputId.charAt(0)) + 1 + "-0";
          document.getElementById(nextInputId).focus();
        }
      }
      var answer = "";

      if (currentInputId.length === 3) {
        answer = sentence[currentInputId.charAt(0)].charAt(
          currentInputId.charAt(currentInputId.length - 1)
        );
      } else {
        var index = currentInputId.slice(-2);
        answer = sentence[currentInputId.charAt(0)].charAt(parseInt(index));
      }

      if (key.toLowerCase() === answer.toLowerCase()) {
        document.getElementById(currentInputId).classList.add("correct");
      } else {
        document.getElementById(currentInputId).classList.remove("correct");
      }
    }
    var count = document.getElementsByClassName("correct").length;
    var correctCount = sentence.join("").toString().length + sentence.length;
    if (count === correctCount) {
      setScore((preScore) => preScore + 1);
      var allInput = document.getElementsByTagName("input");
      for (var i = 0; i < allInput.length; i++) {
        allInput[i].disabled = true;
      }
      document.getElementById("next_btn").classList.remove("hidden");
      document.getElementById("next_btn").focus();
    }
  }

  return (
    <div className="one_word_guess">
      {word.split("").map((character, index) => {
        return (
          <input
            key={index}
            type="text"
            maxLength={1}
            className="character_input"
            id={row + `-` + index}
            onKeyUp={(e) => handleKeyPress(e)}
          />
        );
      })}
      <input
        type="text"
        className="space_input"
        id={row + `-` + word.length}
        onKeyUp={(e) => handleKeyPress(e)}
        maxLength={1}
      />
    </div>
  );
}

export default Guess;
