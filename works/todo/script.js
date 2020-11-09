class ToDo extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      input: '',
      items: []
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleEnter = this.handleEnter.bind(this)
    this.deleteTask = this.deleteTask.bind(this)
  }

  componentDidMount () {
    this.getStorage()
    console.log(localStorage.getItem('todos'))
  }

  handleChange (e) {
    this.setState({
      input: e.target.value
    })
  }

  handleEnter (e) {
    if (e.key === 'Enter') {
      if (this.state.input !== '') {
        this.state.input == '' ? '' : this.addTask()
        document.getElementById('new-task').value = ''
      }
    }
  }

  getStorage () {
    let getTodos =
      localStorage.getItem('todos') === null ||
      localStorage.getItem('todos') === '[]'
        ? ['haga', 'algo', 'genial', 'hoy']
        : JSON.parse(localStorage.getItem('todos'))
    this.setState({
      items: getTodos
    })
  }

  addTask (e) {
    let todos = this.state.items
    todos.push(this.state.input)
    localStorage.setItem('todos', JSON.stringify(todos))
    this.setState({
      items: todos
    })
  }

  deleteTask (e) {
    let todos = this.state.items
    todos.splice(e.target.id, 1)
    localStorage.setItem('todos', JSON.stringify(todos))
    this.setState({
      items: todos
    })
  }

  render () {
    return React.createElement(
      'div',
      { id: 'container' },
      React.createElement(
        'div',
        { id: 'info' },
        React.createElement('h1', null, 'Create your Todo List'),
        React.createElement(
          'div',
          { id: 'add-item' },
          React.createElement('input', {
            type: 'text',
            id: 'new-task',
            placeholder: 'what are you going to do?',
            autoComplete: 'off',
            onChange: this.handleChange,
            onKeyPress: this.handleEnter
          })
        )
      ),

      React.createElement(
        'div',
        { id: 'list' },
        React.createElement(
          'ul',
          null,
          this.state.items.map((item, key) => {
            return this.state.items == 0
              ? ''
              : React.createElement(Task, {
                  key: key,
                  id: key,
                  items: this.state.items[key],
                  deleteTask: this.deleteTask
                })
          })
        )
      )
    )
  }
}

const Task = props => {
  return React.createElement(
    'li',
    null,
    props.items,
    React.createElement(
      'a',
      {
        href: '#',
        id: props.id,
        className: 'delete',
        onClick: props.deleteTask
      },
      'delete'
    )
  )
}

ReactDOM.render(React.createElement(ToDo, null), document.getElementById('app'))
