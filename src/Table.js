import React from 'react';
import { sortBy } from 'lodash';
import Button from './Button';

const SORTS = {
  NONE: list => list,
  TITLE: list => sortBy(list, 'title'),
  AUTHOR: list => sortBy(list, 'author'),
  COMMENTS: list => sortBy(list, 'num_comments').reverse(),
  POINTS: list => sortBy(list, 'points').reverse(),
};

const largeColumn = {
  width: '40%',
};

const midColumn = {
  width: '30%',
};

const smallColumn = {
  width: '10%',
};

const Sort = ({
  sortKey, onSort, children, activeSortKey,
}) => {
  const sortClass = ['button-inline'];

  if (sortKey === activeSortKey) {
    sortClass.push('button-active');
  }

  return (
    <Button onClick={() => onSort(sortKey)} className={sortClass.join(' ')}>
      {children}
    </Button>
  );
};

export default class Table extends React.Component {
  state = {
    sortKey: 'NONE',
    isSortReverse: false,
  }

  /* eslint-disable */
  onSort = (sortKey) => {
    const isSortReverse = this.state.sortKey === sortKey && !this.state.isSortReverse;
    this.setState({ sortKey, isSortReverse });
  };
  /* eslint-enable */

  render() {
    const { articles, onDismiss } = this.props;
    const { sortKey, isSortReverse } = this.state;

    const sortedList = SORTS[sortKey](articles);
    const reverseSortedList = isSortReverse ? sortedList.reverse() : sortedList;

    return (
      <div className="table">
        <div className="table-row">
          <span style={largeColumn}>
            <Sort sortKey="TITLE" onSort={this.onSort} activeSortKey={sortKey}>
              Заголовок
            </Sort>
          </span>
          <span style={midColumn}>
            <Sort sortKey="AUTHOR" onSort={this.onSort} activeSortKey={sortKey}>
              Автор
            </Sort>
          </span>
          <span style={smallColumn}>
            <Sort sortKey="COMMENTS" onSort={this.onSort} activeSortKey={sortKey}>
              Комментарии
            </Sort>
          </span>
          <span style={smallColumn}>
            <Sort sortKey="POINTS" onSort={this.onSort} activeSortKey={sortKey}>
              Очки
            </Sort>
          </span>
          <span style={smallColumn}>Архив</span>
        </div>

        {reverseSortedList.map(item => (
          <div key={item.objectID} className="table-row">
            <span style={largeColumn}>
              <a href={item.url}>{item.title}</a>
            </span>
            <span style={midColumn}>{item.author}</span>
            <span style={smallColumn}>{item.num_comments}</span>
            <span style={smallColumn}>{item.points}</span>
            <span style={smallColumn}>
              <Button onClick={() => onDismiss(item.objectID)} className="button-inline">
                Отклонить
              </Button>
            </span>
          </div>
        ))}
      </div>
    );
  }
}
