import React, { useMemo, useCallback } from 'react';
import Button from '../Button';
import s from './Paginator.module.scss';
import cn from 'classnames';
import { useSearchParams } from 'react-router-dom';

type PaginatorProps = {
  currentPage: number;
  totalPages: number;
  setCurrentPage: (page: number) => void;
};

const maxVisiblePages = 3;

const Paginator: React.FC<PaginatorProps> = ({ currentPage, totalPages, setCurrentPage }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  React.useEffect(() => {
    const page = searchParams.get('page') ?? 1;
    if (!isNaN(Number(page))) {
      setCurrentPage(Number(page));
    }
  }, [searchParams]);

  const pageNumbers = useMemo(() => {
    const numbers: (number | string)[] = [];

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        numbers.push(i);
      }
    } else {
      const leftBound = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
      const rightBound = Math.min(totalPages, leftBound + maxVisiblePages - 1);

      if (leftBound > 1) {
        numbers.push(1, '...');
      }

      for (let i = leftBound; i <= rightBound; i++) {
        numbers.push(i);
      }

      if (rightBound < totalPages) {
        numbers.push('...', totalPages);
      }
    }

    return numbers;
  }, [currentPage, totalPages, maxVisiblePages]);

  const handlePreviousPage = useCallback(() => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      searchParams.set('page', (currentPage - 1).toString());
      setSearchParams(searchParams);
    }
  }, [currentPage, setCurrentPage, searchParams]);

  const handleCurrentPage = useCallback(
    (page: number) => {
      setCurrentPage(page);
      searchParams.set('page', page.toString());
      setSearchParams(searchParams);
    },
    [currentPage, setCurrentPage, searchParams],
  );

  const handleNextPage = useCallback(() => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      searchParams.set('page', (currentPage + 1).toString());
      setSearchParams(searchParams);
    }
  }, [currentPage, totalPages, setCurrentPage, searchParams]);

  return (
    <nav>
      <ul className={s.paginator}>
        <li className={cn(s['paginator-item'], currentPage === 1 && s['page-item_disabled'])}>
          <Button onClick={handlePreviousPage} disabled={currentPage === 1}>
            &laquo;
          </Button>
        </li>
        {pageNumbers.map((number, index) => (
          <li
            key={index}
            className={cn(
              s['paginator-item'],
              typeof number === 'number' && number === currentPage && s['page-item_active'],
            )}
          >
            {typeof number === 'number' ? (
              <Button onClick={() => handleCurrentPage(number)}>{number}</Button>
            ) : (
              <span className="page-link">...</span>
            )}
          </li>
        ))}
        <li className={cn(s['paginator-item'], currentPage === totalPages && s['page-item_disabled'])}>
          <Button onClick={handleNextPage} disabled={currentPage === totalPages}>
            &raquo;
          </Button>
        </li>
      </ul>
    </nav>
  );
};

export default React.memo(Paginator);
