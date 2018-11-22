import React from 'react';

const Option = ({id, length, decrement, increment}) => {
  return (
    <div id="option">
      <div id={`${id}-label`}>{id[0].toUpperCase() + id.slice(1)} Length</div>
      <button id={`${id}-decrement`} onClick={decrement}>-</button>
      <button id={`${id}-increment`} onClick={increment}>+</button>
      <div id={`${id}-length`}>{length}</div>
    </div>
  )
}

export default Option;
