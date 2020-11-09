const defaultText = `# Welcome to my React Markdown Previewer!

## This is a sub-heading...
### And here's some other cool stuff:
  
Heres some code, \`<div></div>\`, between 2 backticks.

\`\`\`
// this is multi-line code:

function anotherExample(firstLine, lastLine) {
  if (firstLine == '\`\`\`' && lastLine == '\`\`\`') {
    return multiLineCode;
  }
}
\`\`\`
  
You can also make text **bold**... whoa!
Or _italic_.
Or... wait for it... **_both!_**
And feel free to go crazy ~~crossing stuff out~~.

There's also [links](https://www.freecodecamp.com), and
> Block Quotes!

And if you want to get really crazy, even tables:

Wild Header | Crazy Header | Another Header?
------------ | ------------- | ------------- 
Your content can | be here, and it | can be here....
And here. | Okay. | I think we get it.

Unordered List
- And of course there are lists.
  - Some are bulleted.
     - With different indentation levels.
        - That look like this.

Ordered List
1. And there are numbererd lists too.
1. Use just 1s if you want! 
1. But the list goes on...
- Even if you use dashes or asterisks.
* And last but not least, let's not forget embedded images:

![React Logo w/ Text](https://goo.gl/Umyytc)
`

marked.setOptions({
  breaks: true
})

let renderer = new marked.Renderer()
renderer.link = function (href, title, text) {
  return '<a target="_blank" href="' + href + '">' + text + '</a>'
}

class MarkdownPreviewer extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      input: defaultText
    }

    this.handleChange = this.handleChange.bind(this)
  }

  handleChange (e) {
    this.setState({
      input: e.target.value
    })
  }

  render () {
    return React.createElement(
      'div',
      { id: 'container' },
      React.createElement(Editor, {
        value: this.state.input,
        onChange: this.handleChange
      }),
      React.createElement(
        'div',
        { id: 'previewer' },
        React.createElement(
          'div',
          { id: 'browser' },
          React.createElement(
            'div',
            { id: 'browser-header' },
            React.createElement(
              'div',
              { id: 'title' },
              React.createElement('div', { id: 'controls' }),
              React.createElement('p', null, 'Markdown Previewer')
            ),

            React.createElement(
              'div',
              { id: 'address' },
              React.createElement('i', { class: 'fas fa-lock a-lock' }),
              'https://',
              React.createElement('span', { class: 'darker' }, 'jrn.rf.gd'),
              '/work/markdown-previewer',
              React.createElement('i', { class: 'fas fa-star a-star' })
            )
          ),

          React.createElement(Preview, { value: this.state.input })
        )
      )
    )
  }
}

class Editor extends React.Component {
  constructor (props) {
    super(props)
  }
  render () {
    return React.createElement(
      'div',
      { id: 'editor-container' },
      React.createElement(
        'p',
        null,
        React.createElement('i', { class: 'fab fa-free-code-camp' }),
        ' Markdown Editor'
      ),
      React.createElement('textarea', {
        value: this.props.value,
        onChange: this.props.onChange,
        id: 'editor',
        type: 'text',
        spellcheck: 'false'
      })
    )
  }
}

class Preview extends React.Component {
  constructor (props) {
    super(props)
  }
  createMarkup () {
    return {
      __html: marked(this.props.value, { renderer: renderer, breaks: true })
    }
  }

  render () {
    return React.createElement('div', {
      id: 'preview',
      dangerouslySetInnerHTML: this.createMarkup()
    })
  }
}

ReactDOM.render(
  React.createElement(MarkdownPreviewer, null),
  document.getElementById('app')
)
