import React, { useState } from "react";
import { Button, Collapse } from "react-bootstrap";

import { useHistory } from "react-router";

import { useAppDispatch, useAppSelector, useAsyncSave } from "Hooks";
import { OffersApi } from "Helpers/api";
import { URL_OFFER, URL_PARTNERS } from "Constants/URLConstants/URLCabinet";

import { AxiosError } from "axios";
import { resetErroresOffers } from "Redux/OffersRedux/types";

import styles from "./OfferAffiliatesCard.module.css";
import { PaginationComp, AsyncInputTags } from "Components/MiniComponents";
import { fetchAutocompleteAffiliates } from "Helpers/AutocompleteAPIFunc";
import { ITag } from "Types";
import { Link } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import classNames from "classnames";

interface IAffiliateProps {
  id: string;
  draft: boolean;
}

export default function OfferAffiliatesCard({ id, draft }: IAffiliateProps) {
  const enebledAffiliates = useAppSelector(
    (state) => state.Offers.offerCard.enableAffiliates
  );

  const disabledAffiliates = useAppSelector(
    (state) => state.Offers.offerCard.disableAffiliates
  );

  const {
    fetchOffersAffiliatesEnebled,
    fetchOffersAffiliatesDisabled,
  } = useAppDispatch();

  const [loading, setLoading] = useState(false);
  const onChangeEnebledPage = (page: string) => {
    fetchOffersAffiliatesEnebled(id, draft, { page }, setLoading);
  };

  const onChangeDisabledPage = (page: string) => {
    fetchOffersAffiliatesDisabled(id, draft, { page }, setLoading);
  };

  return (
    <div>
      <div className={styles["btnPublickRow"]}>
        {draft && <PublickOffer id={id} draft={draft} />}
      </div>
      <div className={styles["affiliateCard"]}>
        <FormAffiliate id={id} draft={draft} />

        <div className={styles["affilateInput"]}>
          <label>
            <div className={styles["affiliateLabel"]}>
              Enabled Affiliates: {enebledAffiliates?.totalCount || 0}
            </div>
          </label>
          <div className={styles["affiliateBlock"]}>
            {enebledAffiliates?.affiliates.map((item, index) => (
              <AffiliateItem
                key={"enebledAff" + index}
                data={item}
                loading={loading}
              />
            ))}
          </div>
          <div className={styles["affiliatePagination"]}>
            <div>
              <PaginationComp
                page={enebledAffiliates?.page}
                totalCountPages={
                  enebledAffiliates
                    ? enebledAffiliates.totalCount /
                      enebledAffiliates.countPerPage
                    : 1
                }
                onChangePage={onChangeEnebledPage}
                loading={loading}
              />
            </div>
          </div>
        </div>

        <div className={styles["affilateInput"]}>
          <label>
            <div className={styles["affiliateLabel"]}>
              Disabled Affiliates: {disabledAffiliates?.totalCount || 0}
            </div>
          </label>
          <div className={styles["affiliateBlock"]}>
            {disabledAffiliates?.affiliates.map((item, index) => (
              <AffiliateItem
                data={item}
                key={index + "affDis"}
                loading={loading}
              />
            ))}
          </div>
          <div className={styles["affiliatePagination"]}>
            <div>
              <PaginationComp
                page={disabledAffiliates?.page}
                totalCountPages={
                  disabledAffiliates
                    ? disabledAffiliates.totalCount /
                      disabledAffiliates.countPerPage
                    : 1
                }
                onChangePage={onChangeDisabledPage}
                loading={loading}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

interface AffiliateItemProps {
  data: { id: number; email: string };
  loading?: boolean;
}

function AffiliateItem({ data, loading }: AffiliateItemProps) {
  return (
    <div
      className={classNames(styles["affiliateItem"], {
        [styles["affiliateItemNotLoading"]]: !loading,
      })}
    >
      {loading ? (
        <Skeleton />
      ) : (
        <>
          <div>
            <Link to={URL_PARTNERS.URL_PARTNERS_MANAGMENT_AFFILIATES(data.id)}>
              {data.id}
            </Link>
          </div>{" "}
          {data.email}
        </>
      )}
    </div>
  );
}

function FormAffiliate({ id, draft }: IAffiliateProps) {
  const [selectedAffiliate, setSelectedAffiliate] = useState<
    ITag | undefined
  >();

  const onSelect = (tag?: ITag) => {
    setSelectedAffiliate(tag);
  };

  const [open, setOpen] = useState(false);

  const onClickOpenForm = () => {
    setOpen(!open);
    setSelectedAffiliate(undefined);
  };

  const {
    fetchOffersAffiliatesDisabled,
    fetchOffersAffiliatesEnebled,
  } = useAppDispatch();

  const { disabled, execute } = useAsyncSave(
    OffersApi.saveAffiliateOffer,
    true
  );

  const onClickMakeDisabled = () => {
    if (selectedAffiliate) {
      execute(id, draft, "disabled", selectedAffiliate.value).then(() => {
        onSelect(undefined);
        fetchOffersAffiliatesDisabled(id, draft);
        fetchOffersAffiliatesEnebled(id, draft);
      });
    }
  };

  const onClickMakeEnebled = () => {
    if (selectedAffiliate) {
      execute(id, draft, "enabled", selectedAffiliate.value).then(() => {
        onSelect(undefined);
        fetchOffersAffiliatesDisabled(id, draft);
        fetchOffersAffiliatesEnebled(id, draft);
      });
    }
  };

  return (
    <div>
      <div className={styles["addAffiliateRowBtn"]}>
        <Button variant={open ? "danger" : "primary"} onClick={onClickOpenForm}>
          {open ? "Cansel" : "Add Affiliate"}
        </Button>
      </div>
      <div>
        <Collapse in={open}>
          <div className={styles["affilateInput"]}>
            <label>
              <div className={styles["affiliateLabel"]}>Affiliate</div>
              <AsyncInputTags
                onChange={onSelect}
                name="affiliate"
                loadAction={fetchAutocompleteAffiliates}
                isMulti={false}
                isClearable
                value={selectedAffiliate}
                disabled={disabled}
              />
            </label>
            <div className={styles["affiliateBtns"]}>
              <Button
                variant={"danger"}
                onClick={onClickMakeDisabled}
                disabled={disabled}
              >
                Make disable
              </Button>
              <Button onClick={onClickMakeEnebled} disabled={disabled}>
                Make enable
              </Button>
            </div>
          </div>
        </Collapse>
      </div>
    </div>
  );
}

function PublickOffer({ id, draft }: { id: string; draft: boolean }) {
  const history = useHistory();

  const { fillFullErrorsOffers } = useAppDispatch();

  const { execute, disabled: disabledPublickBtn } = useAsyncSave(
    OffersApi.publickOfferDraftApi
  );
  const onClickPublicOffer = () => {
    execute(id)
      .then(() => {
        if (!draft) {
          history.push(URL_OFFER.URL_OFFERS);
        } else {
          history.push(URL_OFFER.URL_OFFERS_DRAFT);
        }
      })
      .catch((e: AxiosError) => {
        if (e.response?.data.status === "error" && e.response.data.error) {
          history.push(URL_OFFER.URL_OFFERS_EDIT_TAB(draft, id));
          fillFullErrorsOffers({
            ...resetErroresOffers,
            ...e.response.data.error,
          });
        }
      });
  };

  return (
    <Button onClick={onClickPublicOffer} disabled={disabledPublickBtn}>
      Public Offer
    </Button>
  );
}
