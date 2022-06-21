import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import stylesTable from "Styles/table.module.css";

import { URL_PARTNERS } from "Constants/URLConstants/URLCabinet";
import { useAppDispatch, useAppSelector } from "Hooks";
import { IFilterRequestCard, IRequestsItem } from "./types";

import { Button } from "react-bootstrap";
import {
  PaginationComp,
  InputComp,
  AsyncInputTags,
} from "Components/MiniComponents";

import Skeleton from "react-loading-skeleton";

import styles from "./index.module.css";

import { fetchAutocompleteAffiliates } from "Helpers/AutocompleteAPIFunc";
import { ITag } from "Types";
import { OffersApi } from "Helpers/api";

interface OfferCardRequestsParams {
  offerId: string;
}

export default function OfferCardRequests({
  offerId,
}: OfferCardRequestsParams) {
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState<IFilterRequestCard>({});

  const data = useAppSelector((state) => state.Offers.offerCard.requests);

  const { fetchOffersCardRequests } = useAppDispatch();

  const onChangePage = (page: string) => {
    setFilter({ ...filter, page });
  };

  const onChangeAffiliate = (affiliate?: ITag) => {
    setFilter({ page: 1, affiliate });
  };

  useEffect(() => {
    fetchOffersCardRequests(
      offerId,
      filter?.affiliate
        ? { ...filter, affiliate: filter.affiliate.value }
        : filter,
      setLoading
    );

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter, offerId]);

  return (
    <div>
      <h1 className={styles["titleTable"]}>Requests</h1>
      <div className="contnent-50p">
        <InputComp errors={[]} title="Affiliate">
          <AsyncInputTags
            loadAction={fetchAutocompleteAffiliates}
            name="affiliate"
            onChange={onChangeAffiliate}
            isMulti={false}
            isClearable={true}
            value={filter.affiliate}
          />
        </InputComp>
      </div>
      <table className={stylesTable.table}>
        <thead className={stylesTable.headerTable}>
          <tr>
            <th>ID</th>
            <th>Date</th>
            <th>Affiliate</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data?.requests.map((item, index) => (
            <RequestsItem
              item={item}
              key={index + "requestItem"}
              offerId={offerId}
              loading={loading}
            />
          ))}
        </tbody>
      </table>
      <div className={styles["rowPages"]}>
        <div>
          <PaginationComp
            page={data?.page}
            loading={loading}
            totalCountPages={data ? data.totalCount / data.countPerPage : 1}
            onChangePage={onChangePage}
          />
        </div>
      </div>
    </div>
  );
}

interface IRequestsItemProps {
  offerId: string;
  item?: IRequestsItem;
  loading?: boolean;
}

function RequestsItem({ item, offerId, loading }: IRequestsItemProps) {
  const { fetchOffersCardRequests } = useAppDispatch();
  const [disabled, setDisabled] = useState(false);

  const onClickChangeAccept = () => {
    if (item?.id) {
      setDisabled(true);
      OffersApi.offerRequestsChangeStatus(offerId, item.id, "accept").then(
        () => {
          setDisabled(false);
          fetchOffersCardRequests(offerId);
        }
      );
    }
  };

  const onClickChangeStatusReject = () => {
    if (item?.id) {
      setDisabled(true);
      OffersApi.offerRequestsChangeStatus(offerId, item.id, "reject").then(
        () => {
          setDisabled(false);
          fetchOffersCardRequests(offerId);
        }
      );
    }
  };

  return (
    <tr className={stylesTable.trTable}>
      <td>{!loading ? item?.id : <Skeleton />}</td>
      <td>{!loading ? item?.created_at : <Skeleton />}</td>
      <td>
        {!loading ? (
          <Link
            to={URL_PARTNERS.URL_PARTNERS_MANAGMENT_AFFILIATES(
              item?.affiliate.id
            )}
          >
            {item?.affiliate.id} {item?.affiliate.title}
          </Link>
        ) : (
          <Skeleton />
        )}
      </td>
      <td>{!loading ? item?.status : <Skeleton />} </td>
      <td className={styles["btnRow"]}>
        {!loading ? (
          <>
            {(item?.status === "pending" || item?.status === "reject") && (
              <Button onClick={onClickChangeAccept} disabled={disabled}>
                Accept
              </Button>
            )}
            {(item?.status === "pending" || item?.status === "accept") && (
              <Button
                disabled={disabled}
                variant="danger"
                onClick={onClickChangeStatusReject}
              >
                Reject
              </Button>
            )}
          </>
        ) : (
          <Skeleton />
        )}
      </td>
    </tr>
  );
}
