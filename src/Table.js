import React from 'react';
import Button from './Button';

const largeColumn = {
  width: '40%',
};

const midColumn = {
  width: '30%',
};

const smallColumn = {
  width: '10%',
};

const isSearched = searchTerm => item => item.title.toLowerCase()
  .includes(searchTerm.toLowerCase());

export default ({ articles, pattern, onDismiss }) => (
  <div className="table">
    {articles.filter(isSearched(pattern)).map(item => (
      <div key={item.id} className="table-row">
        <span style={largeColumn}>
          <a href={item.url}>{item.title}</a>
        </span>
        <span style={midColumn}>{item.author}</span>
        <span style={smallColumn}>{item.num_comments}</span>
        <span style={smallColumn}>{item.points}</span>
        <span style={smallColumn}>
          <Button onClick={() => onDismiss(item.id)} className="button-inline">
            Отклонить
          </Button>
        </span>
      </div>
    ))}
  </div>
);
