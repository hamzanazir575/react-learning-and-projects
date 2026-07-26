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
  const [step, setStep] = useState(1);
  const [count, setCount] = useState(0);

  const date = new Date();

  date.setDate(date.getDate() + count);

  function stepPlus() {
    setStep((s) => {
      return s + 1;
    });
  }

  function stepMinus() {
    if (step > 1) {
      setStep((s) => {
        return s - 1;
      });
    }
  }

  function countPlus() {
    setCount((c) => {
      return c + step;
    });
  }

  function countMinus() {
    setCount((c) => {
      return c - step;
    });
  }

  function handleReset() {
    setStep(1);
    setCount(0);
  }

  return (
    <div>
      <div>
        <button onClick={stepMinus}>-</button>
        <span> Step: {step} </span>
        <button onClick={stepPlus}>+</button>
      </div>

      <br />

      <div>
        <button onClick={countMinus}>-</button>
        <span> Count: {count} </span>
        <button onClick={countPlus}>+</button>
      </div>

      <h3>
        {count === 0
          ? "Today is "
          : count > 0
          ? `${count} day(s) from today is `
          : `${Math.abs(count)} day(s) ago was `}
        {date.toDateString()}
      </h3>
      <button onClick={handleReset}>Reset</button>
    </div>
  );
}
