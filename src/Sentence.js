import React from "react";

function Sentence({scramble}) {

  return (
    <>
      <div className="sentence">{scramble.toLowerCase()}</div>
    </>
  );
}
export default Sentence;
