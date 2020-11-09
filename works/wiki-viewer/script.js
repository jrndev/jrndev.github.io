class Wikiviewer extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      input: '',
      results: '',
      active: false
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleEnter = this.handleEnter.bind(this)
    this.searchResults = this.searchResults.bind(this)
  }

  handleChange (e) {
    this.setState({
      input: e.target.value
    })
  }

  handleEnter (e) {
    if (e.key === 'Enter') {
      this.searchResults()
    }
  }

  async searchResults () {
    this.setState({
      active: true
    })

    let endpoint =
      'https://fi.wikipedia.org/w/api.php?action=query&format=json&list=search&origin=*&srsearch=' +
      this.state.input

    try {
      const res = await axios.get(endpoint)
      let results = ''
      await res.data.query.search.map((result, key) => {
        results +=
          '<a href="https://fi.wikipedia.org/?curid=' +
          result.pageid +
          '" target="_blank" key="' +
          key +
          '"><div class="result animated fadeInUp" style="animation-delay:' +
          key / 10 +
          's"><h2>' +
          result.title +
          '</h2><p>' +
          result.snippet +
          '...</p></div></a>'
      })
      this.setState({
        results:
          results != ''
            ? results
            : '<p class="animated fadeInUp">Valitettavasti yhtään hakusanaasi vastaavaa tulosta ei löytynyt. Yritä uudelleen toisella hakusanalla.</p>'
      })

      console.log(results)
    } catch (error) {
      console.log(error)
    }
  }

  render () {
    return React.createElement(
      'div',
      { id: 'container' },
      React.createElement(Search, {
        searchResults: this.searchResults,
        handleChange: this.handleChange,
        handleEnter: this.handleEnter,
        active: this.state.active
      }),
      React.createElement(Results, {
        results: this.state.results,
        active: this.state.active
      })
    )
  }
}

class Search extends React.Component {
  constructor (props) {
    super(props)
  }

  render () {
    return React.createElement(
      'div',
      {
        id: 'search-area',
        className: this.props.active == false ? 'centered' : ''
      },
      React.createElement('h1', null, 'Etsi artikkelia Wikipediasta'),
      React.createElement(
        'div',
        { id: 'search' },
        React.createElement(
          'button',
          { id: 'searchButton', onClick: this.props.searchResults },
          React.createElement('i', { className: 'fas fa-search' })
        ),
        React.createElement('input', {
          id: 'searchInput',
          onChange: this.props.handleChange,
          onKeyPress: this.props.handleEnter,
          type: 'text',
          placeholder: 'Kirjoita hakusanasi t\xE4h\xE4n',
          autocomplete: 'off'
        })
      ),

      React.createElement(
        'a',
        {
          href: 'https://fi.wikipedia.org/wiki/Special:Random',
          target: '_blank',
          className: 'random'
        },
        'Tai hae satunnainen artikkeli'
      )
    )
  }
}

class Results extends React.Component {
  constructor (props) {
    super(props)
  }

  createMarkup () {
    return { __html: this.props.results }
  }

  render () {
    return React.createElement(
      'div',
      { id: 'result-area' },
      this.props.active
        ? React.createElement(
            'h1',
            { className: 'animated fadeInUp' },
            'N\xE4m\xE4 l\xF6ytyi:'
          )
        : '',
      React.createElement('div', {
        dangerouslySetInnerHTML: this.createMarkup()
      })
    )
  }
}

ReactDOM.render(
  React.createElement(Wikiviewer, null),
  document.getElementById('app')
)
