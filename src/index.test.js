import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import App from './App';
import Search from './Search';
import Button from './Button';
import Table from './Table';

describe('App', () => {
  it('отрисовывает без ошибки', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  test('есть корректный снимок', () => {
    const component = renderer.create(<App />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});

describe('Search', () => {
  it('отрисовывает без ошибки', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Search>Поиск</Search>, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  test('есть корректный снимок', () => {
    const component = renderer.create(<Search>Поиск</Search>);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});

describe('Button', () => {
  it('отрисовывает без ошибки', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Button>Больше историй</Button>, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  test('есть корректный снимок', () => {
    const tree = renderer
      .create(<Button>Больше историй</Button>)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});

// describe('Table', () => {

//   const props = {
//     list: [
//       { title: '1', author: '1', num_comments: 1, points: 2, objectID: 'y' },
//       { title: '2', author: '2', num_comments: 1, points: 2, objectID: 'z' },
//     ],
//   };

//   it('отрисовывает без ошибки', () => {
//     const div = document.createElement('div');
//     ReactDOM.render(<Table { ...props } />, div);
//   });

//   test('есть корректный снимок', () => {
//     const component = renderer.create(<Table { ...props } />);
//     const tree = component.toJSON();
//     expect(tree).toMatchSnapshot();
//   });
// });
