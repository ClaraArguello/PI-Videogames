import React from 'react';
import s from '../styles/Pagination.module.css';

function Pagination({ gamesPerPage, totalGames, paginate, currentPage }) {
  const pageNumber = [];

  for (let i = 1; i <= Math.ceil(totalGames / gamesPerPage); i++) {
    pageNumber.push(i);
  }

  return (
    <nav className={s.pagin}>
      {pageNumber.map((number) => (
        <div className={s.pageNumber} key={number}>
          <button className={currentPage === number? `${s.numberActive}`: `${s.number}` } onClick={() => paginate(number)} >{number}</button>
        </div>
      ))}
    </nav>
  );
}

export default Pagination;