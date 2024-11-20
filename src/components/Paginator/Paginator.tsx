import React, { useMemo, useCallback } from 'react';
import Button from '../Button';
import s from './Paginator.module.scss';
import cn from 'classnames';
import { useSearchParams } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { CatalogContext } from '@pages/Catalog';
import { PAGE } from '@store/CatalogStore';

const maxVisiblePages = 3;

const Paginator: React.FC = observer(() => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { catalogStore } = React.useContext(CatalogContext);
  const { currentPage, totalPages, setCurrentPage } = catalogStore;

  React.useEffect(() => {
    const page = searchParams.get(PAGE) ?? 1;
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
      searchParams.set(PAGE, (currentPage - 1).toString());
      setSearchParams(searchParams);
    }
  }, [currentPage, setCurrentPage, searchParams]);

  const handleCurrentPage = useCallback(
    (page: number) => {
      setCurrentPage(page);
      searchParams.set(PAGE, page.toString());
      setSearchParams(searchParams);
    },
    [currentPage, setCurrentPage, searchParams],
  );

  const handleNextPage = useCallback(() => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      searchParams.set(PAGE, (currentPage + 1).toString());
      setSearchParams(searchParams);
    }
  }, [currentPage, totalPages, setCurrentPage, searchParams]);

  if (totalPages === 1) {
    return null;
  }

  return (
    <nav>
      <ul className={s.paginator}>
        <li className={cn(s['paginator-item'], currentPage === 1 && s['page-item_disabled'])}>
          <Button onClick={handlePreviousPage} disabled={currentPage === 1} variant="secondary">
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
              <Button
                onClick={() => handleCurrentPage(number)}
                variant={number === currentPage ? 'primary' : 'secondary'}
              >
                {number}
              </Button>
            ) : (
              <span className="page-link">...</span>
            )}
          </li>
        ))}
        <li className={cn(s['paginator-item'], currentPage === totalPages && s['page-item_disabled'])}>
          <Button onClick={handleNextPage} disabled={currentPage === totalPages} variant="secondary">
            &raquo;
          </Button>
        </li>
      </ul>
    </nav>
  );
});

export default Paginator;
