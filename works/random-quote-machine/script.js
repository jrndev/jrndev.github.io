const quotes = [
  ['Technology is anything that wasn’t around when you were born.', 'Alan Kay'],
  [
    'Any sufficiently advanced technology is equivalent to magic.',
    'Arthur C. Clarke'
  ],
  [
    'Just because something doesn’t do what you planned it to do doesn’t mean it’s useless.',
    'Thomas Edison'
  ],
  [
    'It has become appallingly obvious that our technology has exceeded our humanity.',
    'Albert Einstein'
  ],
  ['Computers are useless.  They can only give you answers.', 'Pablo Picasso'],
  [
    'One machine can do the work of fifty ordinary men.  No machine can do the work of one extraordinary man.',
    'Elbert Hubbard'
  ],
  [
    'Technology is a word that describes something that doesn’t work yet.',
    'Douglas Adams'
  ],
  ['The human spirit must prevail over technology.', 'Albert Einstein '],
  [
    'The great myth of our times is that technology is communication.',
    'Libby Larsen'
  ],
  [
    'We are stuck with technology when what we really want is just stuff that works.',
    'Douglas Adams'
  ],
  [
    'Technology made large populations possible. Large populations now make technology indispensable.',
    'Joseph Krutch'
  ],
  [
    'The real danger is not that computers will begin to think like men, but that men will begin to think like computers.',
    'Sydney Harris'
  ],
  [
    'The art challenges the technology, and the technology inspires the art.',
    'John Lasseter'
  ],
  [
    'Science and technology revolutionize our lives, but memory, tradition and myth frame our response.',
    'Arthur Schlesinger '
  ],
  [
    'If we continue to develop our technology without wisdom or prudence, our servant may prove to be our executioner.',
    'Omar Bradley'
  ],
  [
    'I have not failed. I’ve just found 10,000 ways that won’t work.',
    'Thomas Edison'
  ],
  [
    'Let’s go invent tomorrow instead of worrying about what happened yesterday.',
    'Steve Jobs'
  ],
  ['It’s not that we use technology, we live technology.', 'Godfrey Reggio'],
  [
    'Once a new technology rolls over you, if you’re not part of the steamroller, you’re part of the road.',
    'Stewart Brand'
  ],
  ['Innovation is the outcome of a habit, not a random act.', 'Sukant Ratnakar']
]

const colors = [
  '#16A085',
  '#27AE60',
  '#2980B9',
  '#2C3E50',
  '#CA2C68',
  '#8E44AD',
  '#F39C12',
  '#C0392B'
]

let quote, color

class RandomQuote extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      quote: '',
      author: '',
      bgColor: ''
    }

    this.newQuote = this.newQuote.bind(this)
  }

  componentDidMount () {
    quote = this.getRandomQuote()
    color = this.getRandomColor()
    this.setState({
      quote: quotes[quote][0],
      author: quotes[quote][1],
      bgColor: colors[color]
    })
  }

  getRandomQuote () {
    return Math.floor(Math.random() * quotes.length)
  }

  getRandomColor () {
    return Math.floor(Math.random() * colors.length)
  }

  newQuote () {
    quote = this.getRandomQuote()
    color = this.getRandomColor()
    while (
      quotes[quote][0] == this.state.quote ||
      colors[color] == this.state.bgColor
    ) {
      quote = this.getRandomQuote()
      color = this.getRandomColor()
    }
    this.setState({
      quote: quotes[quote][0],
      author: quotes[quote][1],
      bgColor: colors[color]
    })
  }

  render () {
    return React.createElement(
      'div',
      {
        className: 'container-fluid',
        id: 'quote-box',
        style: { backgroundColor: this.state.bgColor }
      },
      React.createElement(
        'div',
        {
          className: 'row align-items-center justify-content-center',
          id: 'quote-box-row'
        },

        React.createElement(Quote, {
          quote: this.state.quote,
          author: this.state.author
        })
      ),

      React.createElement(
        'div',
        { className: 'row align-items-center alapalkki-row', id: 'alapalkki' },
        React.createElement(
          'div',
          { className: 'col-sm' },

          React.createElement(Tweet, {
            quote: this.state.quote,
            author: this.state.author
          }),

          React.createElement(NewQuote, { newQuote: this.newQuote })
        )
      )
    )
  }
}

class Quote extends React.Component {
  constructor (props) {
    super(props)
  }

  render () {
    return React.createElement(
      'div',
      { className: 'col-sm-8', id: 'quote-box-col' },
      React.createElement(
        'h1',
        { id: 'text', class: 'animated fadeInUp' },
        this.props.quote
      ),
      React.createElement(
        'p',
        { id: 'author', class: 'animated fadeInUp' },
        '\u2014 ',
        this.props.author
      )
    )
  }
}

class Tweet extends React.Component {
  constructor (props) {
    super(props)
  }

  render () {
    let tweet =
      'https://twitter.com/intent/tweet?hashtags=quote&text=' +
      this.props.quote +
      ' — ' +
      this.props.author
    return React.createElement(
      'a',
      {
        href: tweet,
        className: 'twitter-share-button',
        id: 'tweet-quote',
        target: '_blank'
      },
      React.createElement('i', { className: 'fab fa-twitter' }),
      ' tweet'
    )
  }
}

class NewQuote extends React.Component {
  constructor (props) {
    super(props)
  }

  render () {
    return React.createElement(
      'a',
      { href: '#', id: 'new-quote', onClick: this.props.newQuote },
      React.createElement('i', { className: 'fas fa-redo-alt' }),
      ' new quote'
    )
  }
}

ReactDOM.render(
  React.createElement(RandomQuote, null),
  document.getElementById('app')
)

$('#new-quote').mousedown(function () {
  $(this)
    .addClass('spin')
    .one('webkitAnimationEnd...', function () {
      $(this).removeClass('spin')
    })
})

$('.twitter-share-button').click(function (e) {
  e.preventDefault()
  let href = $(this).attr('href')
  let left = (screen.width - 550) / 2
  let top = (screen.height - 320) / 4
  window.open(
    href,
    'Twitter',
    'height=320,width=550,resizable=1,left=' + left + ',top=' + top + ''
  )
})
