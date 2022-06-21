import React, { useEffect, useMemo, useState } from "react";
import { FormControl, InputGroup } from "react-bootstrap";

import { useDebouncedCallback } from "use-debounce";

import styles from "./Pagination.module.css";

interface IPaginationCompProps {
  page?: number | string;
  totalCountPages?: number;
  onChangePage?: (page: string) => any;
  loading?: boolean;
}

export default function PaginationComp({
  page,
  onChangePage,
  totalCountPages,
  loading,
}: IPaginationCompProps) {
  const [currentPage, setCurrentPage] = useState("1");

  useEffect(() => {
    if (page) {
      setCurrentPage(page.toString() || "1");
    }
  }, [page]);

  const totalCount = useMemo(() => {
    if (totalCountPages) {
      return Math.ceil(totalCountPages);
    }

    return 1;
  }, [totalCountPages]);

  const changePage = useDebouncedCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (onChangePage) {
        onChangePage(e.target.value);
      }
    },
    500
  );

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (+e.target.value <= totalCount) {
      setCurrentPage(e.target.value);

      changePage(e);
    }
  };

  return (
    <InputGroup>
      <FormControl
        value={currentPage || 1}
        onChange={onChange}
        className={styles["input"]}
        type={"number"}
        max={totalCount}
        min={1}
        disabled={loading}
      />
      <InputGroup.Text>/ {totalCount}</InputGroup.Text>
    </InputGroup>
  );
}
