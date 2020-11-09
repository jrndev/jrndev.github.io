// TRY: 0.1 + 0.2 OR anything ÷ 0

const isOperator = /[\+\-\*\/]/
const isDecimal = /\./

class Calculator extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      currentValue: '0',
      formula: '0',
      lastClicked: ''
    }

    console.log(this.state.currentValue)

    this.handleNumber = this.handleNumber.bind(this)
    this.handleOperator = this.handleOperator.bind(this)
    this.handleDecimal = this.handleDecimal.bind(this)
    this.handleClear = this.handleClear.bind(this)
    this.handleCalculate = this.handleCalculate.bind(this)
  }

  handleNumber (e) {
    this.setState({
      lastClicked: e.target.value
    })

    if (
      this.state.formula === '0' ||
      this.state.currentValue === 'U MAD BRO?' ||
      this.state.lastClicked === '=' ||
      this.state.currentValue === 'Digit limit met'
    ) {
      this.setState({
        currentValue: e.target.value,
        formula: e.target.value
      })
    } else if (this.state.currentValue == '0') {
      this.setState({
        currentValue: this.state.currentValue
      })
    } else if (isOperator.test(this.state.lastClicked)) {
      this.setState({
        currentValue: e.target.value,
        formula: this.state.formula + e.target.value
      })
    } else {
      this.setState({
        currentValue: this.state.currentValue + e.target.value,
        formula: this.state.formula + e.target.value
      })
    }
  }

  handleOperator (e) {
    this.setState({
      lastClicked: e.target.value
    })

    if (
      this.state.currentValue === 'U MAD BRO?' ||
      this.state.currentValue == 'Infinity' ||
      this.state.currentValue === 'Digit limit met'
    ) {
      this.setState({
        currentValue: e.target.value,
        formula: '0' + e.target.value
      })
    } else if (this.state.lastClicked === '=') {
      this.setState({
        currentValue: e.target.value,
        formula: this.state.currentValue + e.target.value
      })
    } else if (
      isOperator.test(this.state.lastClicked) ||
      isDecimal.test(this.state.lastClicked)
    ) {
      this.setState({
        currentValue: e.target.value,
        formula: this.state.formula.slice(0, -1) + e.target.value
      })
    } else {
      this.setState({
        currentValue: e.target.value,
        formula: this.state.formula + e.target.value
      })
    }
  }

  handleDecimal (e) {
    this.setState({
      lastClicked: e.target.value
    })

    if (
      this.state.currentValue === 'U MAD BRO?' ||
      this.state.currentValue == 'Infinity' ||
      this.state.currentValue === 'Digit limit met'
    ) {
      this.setState({
        currentValue: '0' + e.target.value,
        formula: '0' + e.target.value
      })
    } else if (isDecimal.test(this.state.lastClicked)) {
      this.setState({
        currentValue: this.state.currentValue,
        formula: this.state.formula
      })
    } else if (
      isOperator.test(this.state.lastClicked) &&
      this.state.formula !== '0'
    ) {
      this.setState({
        currentValue: '0' + e.target.value,
        formula: this.state.formula + '0' + e.target.value
      })
    } else if (isDecimal.test(this.state.currentValue)) {
      this.setState({
        currentValue: this.state.currentValue,
        formula: this.state.formula
      })
    } else if (this.state.lastClicked === '=') {
      this.setState({
        currentValue: this.state.currentValue + e.target.value,
        formula: this.state.currentValue + e.target.value
      })
    } else {
      this.setState({
        currentValue: this.state.currentValue + e.target.value,
        formula: this.state.formula + e.target.value
      })
    }
  }

  handleClear (e) {
    this.setState({
      currentValue: '0',
      prevValue: '0',
      formula: '0',
      lastClicked: ''
    })
  }

  handleCalculate (e) {
    let answerr = eval(this.state.formula)
    let answer = +answerr.toFixed(8) // desimaalit max 8, jos niitä on
    console.log(this.state.currentValue)
    this.setState({
      lastClicked: e.target.value
    })

    if (
      isOperator.test(this.state.lastClicked) ||
      isDecimal.test(this.state.lastClicked)
    ) {
      this.setState({
        currentValue: answer,
        formula: this.state.formula.slice(0, -1) + e.target.value + answer
      })
    } else if (this.state.formula === '0.1+0.2') {
      this.setState({
        currentValue: 'U MAD BRO?',
        formula: this.state.formula + e.target.value + answerr
      })
    } else {
      this.setState({
        currentValue: answer,
        formula: this.state.formula + e.target.value + answer
      })
    }
  }

  render () {
    if (this.state.currentValue.length > 30) {
      this.setState({
        currentValue: 'Digit limit met',
        formula: 'Error Error Error'
      })
    }
    return React.createElement(
      'div',
      {
        id: 'calculator',
        className:
          (!isOperator.test(this.state.currentValue) &&
            isNaN(this.state.currentValue)) ||
          this.state.currentValue == 'Infinity'
            ? 'error'
            : ''
      },
      React.createElement(
        'div',
        { id: 'screen' },
        React.createElement(Formula, { formula: this.state.formula }),
        React.createElement(Display, { currentValue: this.state.currentValue })
      ),

      React.createElement(Buttons, {
        handleNumber: this.handleNumber,
        handleOperator: this.handleOperator,
        handleDecimal: this.handleDecimal,
        handleClear: this.handleClear,
        handleCalculate: this.handleCalculate
      })
    )
  }
}

class Formula extends React.Component {
  constructor (props) {
    super(props)
  }

  render () {
    return React.createElement('p', { id: 'formula' }, this.props.formula)
  }
}

class Display extends React.Component {
  constructor (props) {
    super(props)
  }

  render () {
    let inputStyle = {}
    if (this.props.currentValue.length > 20) {
      inputStyle = { fontSize: '1.7rem', paddingTop: 28, paddingBottom: 3 }
    } else if (this.props.currentValue.length > 14) {
      inputStyle = { fontSize: '2.7rem', paddingTop: 15, paddingBottom: 2 }
    } else {
      inputStyle
    }
    return React.createElement(
      'p',
      { id: 'display', style: inputStyle },
      this.props.currentValue
    )
  }
}

class Buttons extends React.Component {
  constructor (props) {
    super(props)
  }
  render () {
    return React.createElement(
      'div',
      { id: 'buttons' },
      React.createElement(
        'button',
        {
          id: 'add',
          className: 'operator',
          value: '+',
          onClick: this.props.handleOperator
        },
        '+'
      ),
      React.createElement(
        'button',
        {
          id: 'subtract',
          className: 'operator',
          value: '-',
          onClick: this.props.handleOperator
        },
        '-'
      ),
      React.createElement(
        'button',
        {
          id: 'multiply',
          className: 'operator',
          value: '*',
          onClick: this.props.handleOperator
        },
        '\xD7'
      ),
      React.createElement(
        'button',
        {
          id: 'divide',
          className: 'operator',
          value: '/',
          onClick: this.props.handleOperator
        },
        '\xF7'
      ),
      React.createElement(
        'button',
        {
          id: 'seven',
          className: 'number',
          value: '7',
          onClick: this.props.handleNumber
        },
        '7'
      ),
      React.createElement(
        'button',
        {
          id: 'eight',
          className: 'number',
          value: '8',
          onClick: this.props.handleNumber
        },
        '8'
      ),
      React.createElement(
        'button',
        {
          id: 'nine',
          className: 'number',
          value: '9',
          onClick: this.props.handleNumber
        },
        '9'
      ),
      React.createElement(
        'button',
        {
          id: 'four',
          className: 'number',
          value: '4',
          onClick: this.props.handleNumber
        },
        '4'
      ),
      React.createElement(
        'button',
        {
          id: 'five',
          className: 'number',
          value: '5',
          onClick: this.props.handleNumber
        },
        '5'
      ),
      React.createElement(
        'button',
        {
          id: 'six',
          className: 'number',
          value: '6',
          onClick: this.props.handleNumber
        },
        '6'
      ),
      React.createElement(
        'button',
        {
          id: 'one',
          className: 'number',
          value: '1',
          onClick: this.props.handleNumber
        },
        '1'
      ),
      React.createElement(
        'button',
        {
          id: 'two',
          className: 'number',
          value: '2',
          onClick: this.props.handleNumber
        },
        '2'
      ),
      React.createElement(
        'button',
        {
          id: 'three',
          className: 'number',
          value: '3',
          onClick: this.props.handleNumber
        },
        '3'
      ),
      React.createElement(
        'button',
        {
          id: 'zero',
          className: 'number',
          value: '0',
          onClick: this.props.handleNumber
        },
        '0'
      ),
      React.createElement(
        'button',
        { id: 'decimal', value: '.', onClick: this.props.handleDecimal },
        '.'
      ),
      React.createElement(
        'button',
        { id: 'clear', value: 'clear', onClick: this.props.handleClear },
        'AC'
      ),
      React.createElement(
        'button',
        { id: 'equals', value: '=', onClick: this.props.handleCalculate },
        '='
      )
    )
  }
}

ReactDOM.render(
  React.createElement(Calculator, null),
  document.getElementById('app')
)
