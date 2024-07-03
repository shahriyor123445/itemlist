import React from "react";

const C = ({ onIncrement, onDecrement, onReset }) => {
  return (
    <div>
      <button onClick={onIncrement}>Increment</button>
      <button onClick={onDecrement}>Decrement</button>
      <button onClick={onReset}>Reset</button>
    </div>
  );
};

export default C;
