import React, { useState, useEffect } from "react";

function TextFile() {
  const [fileContent, setFileContent] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        "https://doc-0s-bc-docs.googleusercontent.com/docs/securesc/vuat0cti9fevooiamo10e3tahnc9bhbr/mjnh1cg2ivih97or10ok2c96tj27m7bq/1677031200000/01553613078216254360/05222290332650255426Z/1MsKI22E5KlYJQUGOMmEKSFAOmaN9s2gp?e=download&uuid=77c9567c-f1c3-4be2-9bae-a68d8c0144a0&nonce=evi2ttlk5804q&user=05222290332650255426Z&hash=tr2lph8uid5g8inqoes6ng0crnpo69ir"
      );
      const text = await response.text();
      setFileContent(text);
    };
    fetchData();
  }, []);

  return (
    <div>
      <h2>Archivo de texto:</h2>
      <pre>{fileContent}</pre>
    </div>
  );
}

export default TextFile;