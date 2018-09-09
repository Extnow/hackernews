import React from 'react';
import Search from './Search';
import Table from './Table';
import Button from './Button';
import './App.css';

const DEFAULT_QUERY = 'redux';
const DEFAULT_HPP = '5';

const PATH_BASE = 'https://hn.algoli1a.com/api/v1';
const PATH_SEARCH = '/search';
const PARAM_SEARCH = 'query=';
const PARAM_PAGE = 'page=';
const PARAM_HPP = 'hitsPerPage=';

export default class App extends React.Component {
  state = {
    articles: null,
    searchTerm: DEFAULT_QUERY,
    error: null,
  };

  componentDidMount() {
    const { searchTerm } = this.state;

    this.fetchSearchTopStories(searchTerm);
  }

  fetchSearchTopStories = (searchTerm, page = 0) => {
    fetch(`${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}&${PARAM_PAGE}${page}&${PARAM_HPP}${DEFAULT_HPP}`)
      .then(response => response.json())
      .then(result => this.setSearchTopStories(result))
      .catch(error => this.setState({ error }));
  };

  setSearchTopStories = (articles) => {
    const { hits, page } = articles;

    const oldHits = page !== 0 ? hits : [];

    const updateHits = [...oldHits, ...hits];

    this.setState({
      articles: { hits: updateHits, page },
    });
  };

  onSearchSubmit = (event) => {
    const { searchTerm } = this.state;

    this.fetchSearchTopStories(searchTerm);
    event.preventDefault();
  };

  onDismiss = (id) => {
    const { articles } = this.state;

    const isNotId = item => item.objectID !== id;
    const updateHits = articles.hits.filter(isNotId);
    this.setState({
      articles: { ...articles, hits: updateHits },
    });
  };

  onSearchChange = (event) => {
    this.setState({ searchTerm: event.target.value });
  };

  render() {
    const { articles, searchTerm, error } = this.state;
    const page = (articles && articles.page) || 0;

    if (error) {
      return <p>{error.message}</p>;
    }

    if (!articles) {
      return null;
    }

    return (
      <div className="page">
        <div className="interactions">
          <Search value={searchTerm} onSubmit={this.onSearchSubmit} onChange={this.onSearchChange}>
            Поиск
          </Search>
        </div>
        <Table articles={articles.hits} onDismiss={this.onDismiss} />
        <div className="interaction">
          <Button onClick={() => this.fetchSearchTopStories(searchTerm, page + 1)}>
            Больше историй
          </Button>
        </div>
      </div>
    );
  }
}
