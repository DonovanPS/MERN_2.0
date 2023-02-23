import React, { useState, useEffect } from "react";

function Txt() {
  const [text, setText] = useState("");

  useEffect(() => {
    fetch("./file.txt")
      .then((response) => response.text())
      .then((data) => setText(data));
  }, []);

  return (

    <div>

      <h2>Txt</h2>
      {console.log(text)}
      <p>{text}</p>
    </div>
  );
}

export default Txt;