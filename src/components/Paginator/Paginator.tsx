import React, { useMemo, useCallback } from 'react';
import Button from '../Button';
import s from './Paginator.module.scss';
import cn from 'classnames';
import { useSearchParams } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { PAGE } from '@store/CatalogStore';
import PaginatorStore from '@store/PaginatorStore';

const maxVisiblePages = 3;

const Paginator: React.FC<{ paginatorStore: PaginatorStore }> = observer(({ paginatorStore }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  React.useEffect(() => {
    const page = searchParams.get(PAGE) ?? 1;
    if (!isNaN(Number(page))) {
      paginatorStore.setCurrentPage(Number(page));
    }
  }, [searchParams]);

  const pageNumbers = useMemo(() => {
    const numbers: (number | string)[] = [];

    if (paginatorStore.totalPages <= maxVisiblePages) {
      for (let i = 1; i <= paginatorStore.totalPages; i++) {
        numbers.push(i);
      }
    } else {
      const leftBound = Math.max(1, paginatorStore.currentPage - Math.floor(maxVisiblePages / 2));
      const rightBound = Math.min(paginatorStore.totalPages, leftBound + maxVisiblePages - 1);

      if (leftBound > 1) {
        numbers.push(1, '...');
      }

      for (let i = leftBound; i <= rightBound; i++) {
        numbers.push(i);
      }

      if (rightBound < paginatorStore.totalPages) {
        numbers.push('...', paginatorStore.totalPages);
      }
    }

    return numbers;
  }, [paginatorStore.currentPage, paginatorStore.totalPages, maxVisiblePages]);

  const handlePreviousPage = useCallback(() => {
    if (paginatorStore.currentPage > 1) {
      paginatorStore.setCurrentPage(paginatorStore.currentPage - 1);
      searchParams.set(PAGE, (paginatorStore.currentPage - 1).toString());
      setSearchParams(searchParams);
    }
  }, [paginatorStore.currentPage, searchParams]);

  const handleCurrentPage = useCallback(
    (page: number) => {
      paginatorStore.setCurrentPage(page);
      searchParams.set(PAGE, page.toString());
      setSearchParams(searchParams);
    },
    [paginatorStore.currentPage, searchParams],
  );

  const handleNextPage = useCallback(() => {
    if (paginatorStore.currentPage < paginatorStore.totalPages) {
      paginatorStore.setCurrentPage(paginatorStore.currentPage + 1);
      searchParams.set(PAGE, (paginatorStore.currentPage + 1).toString());
      setSearchParams(searchParams);
    }
  }, [paginatorStore.currentPage, paginatorStore.totalPages, searchParams]);

  if (paginatorStore.totalPages === 1) {
    return null;
  }

  return paginatorStore.totalPages > 1 ? (
    <nav>
      <ul className={s.paginator}>
        <li
          className={cn(
            s['paginator-item'],
            paginatorStore.currentPage === 1 && s['page-item_disabled'],
          )}
        >
          <Button onClick={handlePreviousPage} disabled={paginatorStore.currentPage === 1} variant="secondary">
            &laquo;
          </Button>
        </li>
        {pageNumbers.map((number, index) => (
          <li
            key={index}
            className={cn(
              s['paginator-item'],
              typeof number === 'number' && number === paginatorStore.currentPage && s['page-item_active'],
            )}
          >
            {typeof number === 'number' ? (
              <Button
                onClick={() => handleCurrentPage(number)}
                variant={number === paginatorStore.currentPage ? 'primary' : 'secondary'}
              >
                {number}
              </Button>
            ) : (
              <span className="page-link">...</span>
            )}
          </li>
        ))}
        <li className={cn(s['paginator-item'], paginatorStore.currentPage === paginatorStore.totalPages && s['page-item_disabled'])}>
          <Button onClick={handleNextPage} disabled={paginatorStore.currentPage === paginatorStore.totalPages} variant="secondary">
            &raquo;
          </Button>
        </li>
      </ul>
    </nav>
  ) : null;
});

export default Paginator;
