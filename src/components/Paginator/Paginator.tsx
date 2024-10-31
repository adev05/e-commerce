import React from 'react';
import Button from '../Button';
import './Paginator.scss';
interface PaginatorProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (pageNumber: number) => void;
  maxVisiblePages?: number;
}

const Paginator: React.FC<PaginatorProps> = ({ currentPage, totalPages, onPageChange, maxVisiblePages = 5 }) => {
  const pageNumbers: (number | string)[] = [];

  if (totalPages <= maxVisiblePages) {
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }
  } else {
    const leftBound = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    const rightBound = Math.min(totalPages, leftBound + maxVisiblePages - 1);

    if (leftBound > 1) {
      pageNumbers.push(1, '...');
    }

    for (let i = leftBound; i <= rightBound; i++) {
      pageNumbers.push(i);
    }

    if (rightBound < totalPages) {
      pageNumbers.push('...', totalPages);
    }
  }

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <nav>
      <ul className="pagination">
        <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
          <Button onClick={handlePreviousPage} disabled={currentPage === 1}>
            &laquo;
          </Button>
        </li>
        {pageNumbers.map((number, index) => (
          <li
            key={index}
            className={`page-item ${typeof number === 'number' && currentPage === number ? 'active' : ''}`}
          >
            {typeof number === 'number' ? (
              <Button onClick={() => onPageChange(number)}>{number}</Button>
            ) : (
              <span className="page-link">...</span>
            )}
          </li>
        ))}
        <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
          <Button onClick={handleNextPage} disabled={currentPage === totalPages}>
            &raquo;
          </Button>
        </li>
      </ul>
    </nav>
  );
};

export default Paginator;
