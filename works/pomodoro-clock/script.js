class Pomodoro extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      breakLength: 5,
      breakSeconds: 300,
      sessionLength: 25,
      sessionSeconds: 1500,
      type: 'Session',
      start: 'Start',
      isPaused: true
    }

    this.handleBreak = this.handleBreak.bind(this)
    this.handleSession = this.handleSession.bind(this)
    this.reset = this.reset.bind(this)
    this.start_pause = this.start_pause.bind(this)
  }

  handleBreak (e) {
    if (e.currentTarget.id === 'break-decrement') {
      if (this.state.breakLength > 1) {
        this.setState({
          breakLength: this.state.breakLength - 1,
          breakSeconds: this.state.breakSeconds - 60
        })
      }
    } else if (e.currentTarget.id === 'break-increment') {
      if (this.state.breakLength < 60) {
        this.setState({
          breakLength: this.state.breakLength + 1,
          breakSeconds: this.state.breakSeconds + 60
        })
      }
    }
  }

  handleSession (e) {
    if (e.currentTarget.id === 'session-decrement') {
      if (this.state.sessionLength > 1) {
        this.setState({
          sessionLength: this.state.sessionLength - 1,
          sessionSeconds: this.state.sessionSeconds - 60
        })
      }
    } else if (e.currentTarget.id === 'session-increment') {
      if (this.state.sessionLength < 60) {
        this.setState({
          sessionLength: this.state.sessionLength + 1,
          sessionSeconds: this.state.sessionSeconds + 60
        })
      }
    }
  }

  start_pause () {
    if (this.state.isPaused) {
      this.setState({
        start: 'Pause',
        isPaused: false
      })

      this.countdown = setInterval(() => {
        if (this.state.type == 'Session') {
          if (this.state.sessionSeconds > 0) {
            this.setState({
              sessionSeconds: this.state.sessionSeconds - 1
            })
          } else {
            document.getElementById('beep').play()
            this.setState({
              breakSeconds: this.state.breakLength * 60,
              type: 'Break'
            })
          }
        } else {
          if (this.state.breakSeconds > 0) {
            this.setState({
              breakSeconds: this.state.breakSeconds - 1
            })
          } else {
            document.getElementById('beep').play()
            this.setState({
              sessionSeconds: this.state.sessionLength * 60,
              type: 'Session'
            })
          }
        }
      }, 1000)
    } else {
      this.setState({
        sessionSeconds: this.state.sessionSeconds,
        breakSeconds: this.state.breakSeconds,
        start: 'Start',
        isPaused: true
      })

      clearInterval(this.countdown)
    }
  }

  reset () {
    clearInterval(this.countdown)
    this.setState({
      breakLength: 5,
      breakSeconds: 300,
      sessionLength: 25,
      sessionSeconds: 1500,
      type: 'Session',
      start: 'Start',
      isPaused: true
    })

    document.getElementById('beep').pause()
    document.getElementById('beep').currentTime = 0
  }

  render () {
    return React.createElement(
      'div',
      { id: 'toCenter' },
      React.createElement(
        'div',
        { id: 'container' },
        React.createElement('span', { className: 'tomaatti' }, '\uD83C\uDF45'),
        React.createElement('h1', null, ' Pomodoro Clock'),
        React.createElement(
          'div',
          { id: 'labels' },
          React.createElement(Break, {
            breakLength: this.state.breakLength,
            handleBreak: this.handleBreak
          }),

          React.createElement(Session, {
            sessionLength: this.state.sessionLength,
            handleSession: this.handleSession
          })
        ),

        React.createElement(Time, {
          breakLength: this.state.breakLength,
          breakSeconds: this.state.breakSeconds,
          sessionLength: this.state.sessionLength,
          sessionSeconds: this.state.sessionSeconds,
          type: this.state.type
        }),

        React.createElement(Buttons, {
          start: this.state.start,
          start_pause: this.start_pause,
          reset: this.reset
        }),
        React.createElement(
          'audio',
          {
            id: 'beep',
            className: 'clip',
            src:
              'http://soundbible.com/mp3/Temple%20Bell-SoundBible.com-756181215.mp3',
            type: 'audio/mpeg'
          },
          'Your browser does not support the audio element.'
        )
      )
    )
  }
}

class Break extends React.Component {
  render () {
    let breakLength = this.props.breakLength < 10 ? '0' : ''

    return React.createElement(
      'div',
      { id: 'break-label' },
      React.createElement('p', null, 'Break Length'),
      React.createElement(
        'button',
        { id: 'break-decrement', onClick: this.props.handleBreak },
        React.createElement('i', { className: 'fas fa-angle-down' })
      ),
      React.createElement('span', { className: 'margin-left' }, breakLength),
      React.createElement(
        'span',
        { id: 'break-length', className: 'margin-right' },
        this.props.breakLength
      ),
      React.createElement(
        'button',
        { id: 'break-increment', onClick: this.props.handleBreak },
        React.createElement('i', { className: 'fas fa-angle-up' })
      )
    )
  }
}

class Session extends React.Component {
  render () {
    let sessionLength = this.props.sessionLength < 10 ? '0' : ''
    return React.createElement(
      'div',
      { id: 'session-label' },
      React.createElement('p', null, 'Session Length'),
      React.createElement(
        'button',
        { id: 'session-decrement', onClick: this.props.handleSession },
        React.createElement('i', { className: 'fas fa-angle-down' })
      ),
      React.createElement('span', { className: 'margin-left' }, sessionLength),
      React.createElement(
        'span',
        { id: 'session-length', className: 'margin-right' },
        this.props.sessionLength
      ),
      React.createElement(
        'button',
        { id: 'session-increment', onClick: this.props.handleSession },
        React.createElement('i', { className: 'fas fa-angle-up' })
      )
    )
  }
}

class Time extends React.Component {
  render () {
    let totalSeconds, minutes, seconds

    if (this.props.type === 'Session') {
      totalSeconds = this.props.sessionSeconds
      minutes =
        Math.floor(totalSeconds / 60) < 10
          ? '0' + Math.floor(totalSeconds / 60)
          : Math.floor(totalSeconds / 60)
      seconds =
        totalSeconds % 60 < 10 ? '0' + (totalSeconds % 60) : totalSeconds % 60
    } else {
      totalSeconds = this.props.breakSeconds
      minutes =
        Math.floor(totalSeconds / 60) < 10
          ? '0' + Math.floor(totalSeconds / 60)
          : Math.floor(totalSeconds / 60)
      seconds =
        totalSeconds % 60 < 10 ? '0' + (totalSeconds % 60) : totalSeconds % 60
    }

    return React.createElement(
      'div',
      { id: 'time' },
      React.createElement(
        'div',
        { id: 'timer-label' },
        React.createElement('span', null, this.props.type)
      ),

      React.createElement(
        'div',
        { id: 'time-left' },
        totalSeconds < 60
          ? React.createElement(
              'h3',
              { className: 'red' },
              minutes,
              ':',
              seconds
            )
          : React.createElement('h3', null, minutes, ':', seconds)
      )
    )
  }
}

class Buttons extends React.Component {
  render () {
    let className = this.props.start == 'Pause' ? 'pause' : ''
    return React.createElement(
      'div',
      { id: 'buttons' },
      React.createElement(
        'button',
        {
          id: 'start_stop',
          className: className,
          onClick: this.props.start_pause
        },
        this.props.start
      ),
      React.createElement(
        'button',
        { id: 'reset', onClick: this.props.reset },
        'Reset'
      )
    )
  }
}

ReactDOM.render(
  React.createElement(Pomodoro, null),
  document.getElementById('root')
)
