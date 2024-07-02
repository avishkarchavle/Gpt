// App.js

import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
// At the top of your main application file (e.g., app.js or index.js)
require('dotenv').config(); // Load environment variables from .env file

function App() {
  const [input, setInput] = useState('');
  const [queries, setQueries] = useState([]);
  const [isSpeaking, setIsSpeaking] = useState(false); // State to track speech synthesis

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/chat', { input });
      const newQuery = { query: input, response: res.data.response };
      setQueries([...queries, newQuery]);
      setInput('');
    } catch (error) {
      console.error('Error fetching response:', error);
    }
  };

  const toggleSpeech = (text) => {
    if (isSpeaking) {
      stopSpeech();
    } else {
      speakResponse(text);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSubmit(event);
    }
  };

  const speakResponse = (text) => {
    const synthesis = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(text);
    synthesis.speak(utterance);
    setIsSpeaking(true); // Set speaking state to true
    utterance.onend = () => setIsSpeaking(false); // Reset speaking state when speech ends
  };

  const stopSpeech = () => {
    const synthesis = window.speechSynthesis;
    synthesis.cancel();
    setIsSpeaking(false); // Set speaking state to false
  };

  return (
    <div className="App">
      <div id='kd' className="menu-bar  text-white py-2">
        <div id='kd' className="menu-bar">
          <h1>
            <span className="animated-letter letter1">A</span>
            <span className="animated-letter letter2">v</span>
            <span className="animated-letter letter3">i</span>
            <span className="animated-letter letter1">B</span>
            <span className="animated-letter letter2">o</span>
            <span className="animated-letter letter3">t</span>
          </h1>
        </div>

      </div>
      <div className="chat-container container mt-4">
        <div className="response-container">
          {queries.map((q, index) => (
            <div key={index} className="query-response mb-3">

              <div className="card">
                <div id='clr' class="card-header">
                  You
                </div>
                <div className="card-body">

                  <p className="card-text">{q.query}</p>
                </div>
              </div>
              <div className="card mt-2">
                <div id='clr' class="card-header">
                  Avishkar
                </div>


                <p className="card-text">{q.response}</p>
                <button className="mic-icon btn btn-outline-secondary" onClick={() => toggleSpeech(q.response)}>
                  <img src={`${process.env.PUBLIC_URL}/microphone.png`} />
                </button>
                <br></br>
              </div>
            </div>
          ))}
        </div>
        <br />
        <form onSubmit={handleSubmit} className="chat-form text-white form-inline">
          <input
            id='avi'
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="I'm all ears, Ask me anything..."
            className="chat-input form-control mr-2"
          />
          <br></br>
          <button type="submit" id='b' className="chat-button ">Submit</button>
        </form>
      </div>
    </div>
  );
}

export default App;
