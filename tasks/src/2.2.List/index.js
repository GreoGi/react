import React from 'react';
import ReactDom from 'react-dom';
import './styles.css';

/**
     1. Разбери ручные переборы массивов в верстке.
        Для постов используй map без циклов, для авторов цикл for без map.
    
     2. Посмотри ошибки в Chrome DevTools: React должен требовать наличия атрибутов key.
        Добавь в post поле id и присвой каждому полю уникальный строковый идентификатор.
        Используй id в качестве значения key в основном тэге поста и основном тэге автора.
 */

const posts = [
  {
    author: 'Парень не промах',
    time: '2 часа назад',
    message: 'Попробую с удовольствием ;)',
    id: "abc1"
  },
  {
    author: 'Милая девушка',
    time: '3 часа назад',
    message: 'Можно использовать для выпекания чизкейков :)',
    id: "abc2"
  },
  {
    author: 'Скупец',
    time: 'вчера',
    message: 'Цену-то загнули!',
    id: "abc3"
  }
];

function renderPost(post) {
  return (
    <div key={post.id} className="post">
      <div className="postHeader">
        <span className="postAuthor">{post.author}</span>
        <br />
        <span className="postTime">{post.time}</span>
      </div>
      <div className="postMessage">{post.message}</div>
    </div>
  );
}

function renderAuthors(posts) {
  let authors = [];
  for (const post of posts) {
    authors.push(<span key={post.id}>{post.author}</span>)
  }
  return (
    <div className="authors">
      {authors}
    </div>
  );
}

ReactDom.render(
  <div className="page">
    <div className="posts">
      {posts.map(post => renderPost(post))}
    </div>
    {renderAuthors(posts)}
  </div>,
  document.getElementById('app')
);

/**
     Подсказки:
     - Отображение массива в другой массив записывается так:
       const values = items.map(item => item.field);
     - В конец массивов можно добавлять значения методом push:
       const numbers = [];
       numbers.push(1);
     - Выбери подходящий цикл for:
       - for (let i = 0; i < items.length; i++) {}
       - for (let key in items) {}
       - for (const item of items) {}
 */
