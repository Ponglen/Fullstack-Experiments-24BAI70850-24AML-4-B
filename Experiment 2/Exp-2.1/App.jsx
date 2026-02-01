import { useState } from "react";
import "./App.css";

const MAX_CHARS = 200;

function App() {
  const [text, setText] = useState("");

  const handleChange = (e) => {
    const value = e.target.value;

    // HARD STOP
    if (value.length <= MAX_CHARS) {
      setText(value);
    }
  };

  const remaining = Math.max(0, MAX_CHARS - text.length);
  const isLimitReached = text.length === MAX_CHARS;

  return (
    <div className="app">
      <div className="card">
        <h1>Live Character Counter</h1>

        <textarea
          value={text}
          onChange={handleChange}
          className={isLimitReached ? "error" : ""}
          placeholder="Type your thoughts here..."
        />

        <div className="progress-bar">
          <div
            className={`progress ${isLimitReached ? "error-bar" : ""}`}
            style={{
              width: `${(text.length / MAX_CHARS) * 100}%`
            }}
          />
        </div>

        <div className={`counter ${isLimitReached ? "error-text" : ""}`}>
          {remaining} characters remaining
        </div>

        {isLimitReached && (
          <p className="warning">
            ⚠ You have reached the 200 character limit
          </p>
        )}
      </div>
    </div>
  );
}

export default App;
