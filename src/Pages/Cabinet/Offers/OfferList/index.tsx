import React, { useEffect, useMemo, useState } from "react";

import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { PaginationComp } from "Components/MiniComponents";
import DataTableOffers from "Components/Offers/DataTableOffers/DataTableOffers";
import HeaderFilter from "Components/Offers/OffersMiniComponents/HeaderFilter";

import { initialFilterOffers } from "Components/Offers/OffersMiniComponents/HeaderFilter/types";
import { URL_OFFERS_DRAFT_NEW_GENERAL } from "Constants/URLConstants/URLCabinet/URLOffers";

import { useAppDispatch, useAppSelector } from "Hooks";

export default function OffersList({ draft = false }) {
  const onChangePage = (pageNumber: string) => {
    onSetFilterOffers({ ...initialFilterOffers, ...filter, page: pageNumber });
  };

  const [loading, setLoading] = useState(true);

  const {
    fetchOffersListDispatch,
    onSetFilterOffers,
    resetFilterOffers,
  } = useAppDispatch();

  const { filter, pageMeta } = useAppSelector((state) => state.Offers);

  useEffect(() => {
    fetchOffersListDispatch(draft, setLoading);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter]);

  useEffect(() => {
    return () => {
      resetFilterOffers();
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const totalCountPages = useMemo(() => {
    if (pageMeta) {
      return pageMeta.totalCount / pageMeta.countPerPage;
    }

    return 1;
  }, [pageMeta]);

  return (
    <section className="wrapper">
      <HeaderFilter />
      <section className="settings d-flex mb-3">
        <div className="flex-1">
          <Link to={URL_OFFERS_DRAFT_NEW_GENERAL}>
            <Button>Add New Offer {draft ? "Draft" : ""}</Button>
          </Link>

          <Button className="ml-3" variant="outline-primary">
            <svg
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M17 11.4615V14.5385C17 15.8979 15.8979 17 14.5385 17H3.46154C2.10207 17 1 15.8979 1 14.5385V11.4615M9 13.3077V1M9 1L5.30769 4.69231M9 1L12.6923 4.69231"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Button>
        </div>
        <div className="m-auto">
          <PaginationComp
            page={filter?.page || pageMeta?.page}
            totalCountPages={totalCountPages}
            onChangePage={onChangePage}
            loading={loading}
          />
        </div>
      </section>

      <section className="content">
        <DataTableOffers loading={loading} draft={draft} />
      </section>
      <section className="d-flex justify-content-between">
        <div className="total-counter">{pageMeta?.totalCount} Offers found</div>
        <div>
          <PaginationComp
            page={filter?.page || pageMeta?.page}
            totalCountPages={totalCountPages}
            onChangePage={onChangePage}
            loading={loading}
          />
        </div>
      </section>
    </section>
  );
}
