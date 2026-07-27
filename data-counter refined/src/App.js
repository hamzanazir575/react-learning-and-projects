import { useState } from "react";
import "./styles.css";

export default function App() {
  return (
    <div className="App">
      <Counter />
    </div>
  );
}

function Counter() {
  const [range, setRange] = useState(1);
  const [dateInput, setDateInput] = useState(0);
  const [count, setCount] = useState(0);

  const date = new Date();

  date.setDate(date.getDate() + count);

  function countPlus() {
    setCount((c) => {
      return c + range;
    });
  }

  function countMinus() {
    setCount((c) => {
      return c - range;
    });
  }

  function handleReset() {
    setRange(1);
    setCount(0);
  }

  return (
    <div>
      <div>
        <input
          type="range"
          min="1"
          max="10"
          value={range}
          onChange={(e) => {
            setRange(Number(e.target.value));
          }}
        />
        {range}
      </div>

      <br />

      <div>
        <button onClick={countMinus}>-</button>
        <span>
          {" "}
          <input
            type="text"
            value={count}
            onChange={(e) => {
              setCount(Number(e.target.value));
            }}
          />
        </span>
        <button onClick={countPlus}>+</button>
      </div>
      {(range > 1 || count !== 0) && (
        <button onClick={handleReset}>Reset</button>
      )}

      <h3>
        {count === 0
          ? "Today is "
          : count > 0
          ? `${count} day(s) from today is `
          : `${Math.abs(count)} day(s) ago was `}
        {date.toDateString()}
      </h3>
    </div>
  );
}
