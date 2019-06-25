import React from 'react';
import './App.css';

function App() {
  let input;
  return (
    <div className="App">
      <div style={{height: '700px'}}>
      </div>
      <form>
        <input
          ref={node => {
            input = node;
          }}
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}

export default App;
