import React, { useState, useEffect } from 'react';
import './App.css';
import Sentiment from 'sentiment';

const App = () => {
  const sentiment = new Sentiment();
  const [inputText, setInputText] = useState('');
  const [result, setResult] = useState();

  useEffect(() => {
    const tempResult = sentiment.analyze(inputText);
    setResult(tempResult);
    console.log(tempResult);
  }, [inputText]);

  const getSentimentEmoji = () => {
    const score = result?.score || 0;

    if (score === 0) {
      return '😐';
    } else if (score < 0) {
      return '😞';
    } else {
      return '🙂';
    }
  };

  return (
    <div className='App-header'>
      <p className='icon'>{getSentimentEmoji()}</p>
      <input
        type='text'
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        placeholder='Enter text here'
      />
      <div className='result'>
        {result?.negative.map((item, index) => (
          <span className='negative' key={`negative-${index}`}>
            {item}
          </span>
        ))}
        {result?.positive.map((item, index) => (
          <span className='positive' key={`positive-${index}`}>
            {item}
          </span>
        ))}
      </div>
    </div>
  );
};

export default App;
// emoji