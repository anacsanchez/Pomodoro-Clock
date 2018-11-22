import React, { Component } from 'react';
import { Option, Timer } from './index'

let timer;
const defaultBreak = 5;
const defaultSession = 25;

class Clock extends Component {
  constructor(props){
    super(props);
    this.state = {
      break: defaultBreak,
      session: defaultSession,
      current: 'Session',
      timeLeft: defaultSession * 60
    }
  }

  incrementBreak = () => {
    if(!timer) {
      if(this.state.break < 60) {
        if(this.state.current == 'Break') {
          this.setState({
            timeLeft: (this.state.break + 1) * 60,
            break: this.state.break + 1
          })
        }
        else {
          this.setState({
            break: this.state.break + 1
          })
        }
      }
    }
  }
  decrementBreak = () => {
    if(!timer) {
      if (this.state.break > 1) {
        if(this.state.current == 'Break') {
          this.setState({
            timeLeft: (this.state.break - 1) * 60,
            break: this.state.break - 1
          })
        }
        else {
          this.setState({
            break: this.state.break - 1
          })
        }
      }
    }
  }
  incrementSession = () => {
    if(!timer) {
      if(this.state.session < 60) {
        if(this.state.current == 'Session') {
          this.setState({
            timeLeft: (this.state.session + 1) * 60,
            session: this.state.session + 1
          })
        }
        else {
          this.setState({
            session: this.state.session + 1
          })
        }
      }
    }
  }
  decrementSession = () => {
    if(!timer) {
      if (this.state.session > 1) {
        if(this.state.current == 'Session') {
          this.setState({
            timeLeft: (this.state.session - 1) * 60,
            session: this.state.session - 1
          })
        }
        else {
          this.setState({
            session: this.state.session - 1
          })
        }
      }
    }
  }
  resetClock = () => {
    if (timer) {
      clearInterval(timer);
      timer = null;
    }
    let audio = document.getElementById("beep");
    audio.pause();
    audio.currentTime = 0;

    this.setState({
      break: defaultBreak,
      session: defaultSession,
      current: 'Session',
      timeLeft: defaultSession * 60
    })

  }
  toggleTimer = () => {
    if (timer) {
      clearInterval(timer)
      timer = null;
    }
    else {
      timer = setInterval(this.updateTimer, 1000)
    }
  }
  updateTimer = () => {
    this.setState({
      timeLeft: this.state.timeLeft - 1
    })
    if(this.state.timeLeft == 0) {
      document.getElementById("beep").play()
    }
  }

  componentDidUpdate(prevProps,prevState) {
    if (prevState.timeLeft == 0 && this.state.current == 'Session') {
      this.setState({ timeLeft: this.state.break * 60, current: 'Break'})
    }
    else if(prevState.timeLeft == 0 && this.state.current == 'Break') {
      this.setState({ timeLeft: this.state.session * 60, current: 'Session'})
      document.getElementById("beep").play()
    }
  }

  componentWillUnmount() {
    clearInterval(timer)
  }

  render() {
    return (
      <div id="clock">
        <div id="title">Pomodoro Clock</div>
        <div id="options">
          <Option id="break" length={this.state.break} decrement={this.decrementBreak} increment={this.incrementBreak} />
          <Option id="session" length={this.state.session} decrement={this.decrementSession} increment={this.incrementSession} />
        </div>
        <Timer reset={this.resetClock} toggle={this.toggleTimer} name={this.state.current} timeLeft={this.state.timeLeft} />
      </div>
    )
  }
}

export default Clock;
