import React, { Component } from 'react'
import Timer from 'react-compound-timer'
import moment from 'moment'
import Tone from 'tone'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay, faPause, faStop, faVolumeUp, faVolumeMute } from '@fortawesome/free-solid-svg-icons'

const milliseconds = 1000;

class CustomTimer extends Component {
  state = {
    isRunning: false,
    areBeepsEnabled: true,
    getReadyBeeps: 3,
    timerFontSize: '5vw',
  }

  constructor(props) {
    super(props)
    this.timerTextElement = React.createRef();
    this.synth = new Tone.Synth().toMaster();
  }

  componentDidMount() {
    this.setState({
      timerFontSize: `${this.timerTextElement.current.clientWidth * 0.15}px`
    })
  }

  playGetReadyBeep = () => {
    if (this.state.areBeepsEnabled) {
      this.synth.triggerAttackRelease("F4", "8n");
    }
  }
  
  playIntervalBeep = () => {
    if (this.state.areBeepsEnabled) {
      this.synth.triggerAttackRelease("F5", "6n");
    }
  }

  toggleBeeps = () => {
    this.setState({
      areBeepsEnabled: !this.state.areBeepsEnabled
    })
  }

  calculateBeepCheckpoints = (initialTime, beepIntervals) => {
    const checkpoints = [];

    if (beepIntervals && beepIntervals.length > 0) {
      const { getReadyBeeps } = this.state;
      let previousInterval = initialTime ?? 0;

      // Add 'get ready' beeps before each interval beep.
      beepIntervals.forEach(interval => {
        for (let i = getReadyBeeps; i > 0; i--) {
          const getReadyBeepInterval = interval - i;

          if (getReadyBeepInterval > previousInterval) {
            checkpoints.push({
              time: getReadyBeepInterval * milliseconds,
              callback: this.playGetReadyBeep
            })
          }
        }

        checkpoints.push({
          time: interval * milliseconds,
          callback: this.playIntervalBeep
        })

        previousInterval = interval;
      })
    }

    return checkpoints;
  }

  render() {
    const { isRunning, areBeepsEnabled, timerFontSize } = this.state;
    const { initialTime, beepIntervals } = this.props;
    const beepCheckpoints = this.calculateBeepCheckpoints(initialTime, beepIntervals);

    return (
      <Timer
        initialTime={initialTime ? initialTime * milliseconds : 0}
        startImmediately={false}
        timeToUpdate={23}
        onStart={() => this.setState({ isRunning: true })}
        onStop={() => this.setState({ isRunning: false })}
        onReset={() => this.setState({ isRunning: false })}
        checkpoints={beepCheckpoints}
      >
        {({ start, stop, reset, getTime }) => (
          <div className="d-flex flex-column align-items-center justify-content-center">
            <code className="text-dark shadow py-4 px-5 w-100 text-center timer-value"
              ref={this.timerTextElement}
              style={{ fontSize: timerFontSize }}
              onClick={isRunning ? stop : start}>
              {moment(getTime()).format('mm:ss.SSS')}
            </code>
            <div className="d-flex justify-content-center py-4">
              <button className="btn btn-dark btn-lg mr-4 timer-button" onClick={this.toggleBeeps}>
                <FontAwesomeIcon icon={areBeepsEnabled ? faVolumeUp : faVolumeMute} />
              </button>
              <button className="btn btn-dark btn-lg mx-4 timer-button" onClick={isRunning ? stop : start}>
                <FontAwesomeIcon icon={isRunning ? faPause : faPlay} />
              </button>
              <button className="btn btn-dark btn-lg ml-4 timer-button" onClick={() => { stop(); reset(); }}>
                <FontAwesomeIcon icon={faStop} />
              </button>
            </div>
          </div>
        )}
      </Timer>
    )
  }
}
export default CustomTimer