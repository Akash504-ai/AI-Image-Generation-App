import React, { useRef, useState } from 'react';
import image from './assets/image.webp';
import './App.css';

const App = () => {
  const [image_url, setImage_url] = useState("/");
  const inputRef = useRef(null);

  const imageGenerator = async () => {
    if (inputRef.current.value === "") return;

    await fetch("https://api.openai.com/v1/images/generations", {
      method: 'POST',
      headers: {
        'Authorization': `Bearer XXXXXXXXXXXXXXX`, // 🔒 Replace with your real API key in development
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        prompt: inputRef.current.value,
        n: 1,
        size: "512x512"
      })
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        setImage_url(data.data[0].url);
      })
      .catch(err => console.error(err));
  };

  return (
    <div className="container">
      <h1>AI Image Generator</h1>
      <img src={image_url === "/" ? image : image_url} alt="Generated" />
      <div className="write">
        <input type="text" ref={inputRef} placeholder="Describe What You Want To See" />
        <button onClick={imageGenerator}>Generate</button>
      </div>
    </div>
  );
};

export default App;
