import React from 'react';

const Timer = ({name, timeLeft, toggle, reset}) => {
  let hours = Math.floor(timeLeft / 60).toString();
  let minutes = timeLeft % 60;
  return(
    <div id="timer">
      <div id="timer-label">{name}</div>
      <div id="time-left">{hours < 10 ? '0' + hours : hours}:{minutes < 10 ? '0' + minutes : minutes}</div>
      <button id="start_stop" onClick={toggle}>Start/Stop</button>
      <button id="reset" onClick={reset}>Reset</button>
      <audio id="beep" src="beep-1.wav"></audio>
    </div>
  )
}

export default Timer;
