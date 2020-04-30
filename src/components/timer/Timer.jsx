import React, { Component } from 'react'
import Timer from 'react-compound-timer'
import moment from 'moment'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay, faPause, faStop } from '@fortawesome/free-solid-svg-icons'

class CustomTimer extends Component {
  state = {
    isRunning: false
  }

  render() {
    const { isRunning } = this.state;

    return (
      <Timer
        startImmediately={false}
        timeToUpdate={20}
        onStart={() => this.setState({ isRunning: true })}
        onStop={() => this.setState({ isRunning: false })}
        onReset={() => this.setState({ isRunning: false })}
      >
        {({ start, stop, reset, getTime }) => (
          <div className="m-5 d-flex flex-column align-items-center justify-content-center">
            <code className="display-1 mb-4 text-dark timer-value" onClick={isRunning ? stop : start}>
              {moment(getTime()).format('mm:ss.SSS')}
            </code>
            <div className="d-flex justify-content-center">
              <button className="btn btn-dark btn-lg mr-4" style={{ fontSize: '24px' }} onClick={isRunning ? stop : start}>
                <FontAwesomeIcon icon={isRunning ? faPause : faPlay} />
              </button>
              <button className="btn btn-dark btn-lg ml-4" style={{ fontSize: '24px' }} onClick={() => { stop(); reset(); }}>
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