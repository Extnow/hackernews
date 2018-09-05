import React from 'react';
import articlesData from './articlesData';
import Search from './Search';
import Table from './Table';
import './App.css';

export default class App extends React.Component {
  state = {
    articles: articlesData,
    searchTerm: '',
  };

  onDismiss = (id) => {
    const { articles } = this.state;

    const isNotId = item => item.id !== id;
    const updateArticles = articles.filter(isNotId);
    this.setState({ articles: updateArticles });
  };

  onSearchChange = (event) => {
    this.setState({ searchTerm: event.target.value });
  };

  render() {
    const { articles, searchTerm } = this.state;
    return (
      <div className="page">
        <div className="interactions">
          <Search value={searchTerm} onChange={this.onSearchChange}>
            Поиск
          </Search>
        </div>
        <Table articles={articles} pattern={searchTerm} onDismiss={this.onDismiss} />
      </div>
    );
  }
}
