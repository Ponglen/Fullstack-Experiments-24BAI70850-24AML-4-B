import { useState } from "react";
import "./App.css";

function App() {
  const maxChars = 200;
  const [text, setText] = useState("");

  const handleChange = (e) => {
    const value = e.target.value;

    // HARD STOP at 200
    if (value.length <= maxChars) {
      setText(value);
    }
  };

  const remaining = Math.max(0, maxChars - text.length);
  const isLimitReached = text.length === maxChars;
  const progress = Math.min((text.length / maxChars) * 100, 100);

  return (
    <div className="app">
      <div className="card">
        <h1>Live Character Counter</h1>

        <textarea
          value={text}
          onChange={handleChange}
          placeholder="Type your thoughts here..."
          className={isLimitReached ? "error" : ""}
        />

        <div className="progress-bar">
          <div
            className={`progress ${isLimitReached ? "error-bar" : ""}`}
            style={{ width: `${progress}%` }}
          />
        </div>

        <p className={`counter ${isLimitReached ? "error-text" : ""}`}>
          {remaining} characters remaining
        </p>

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
