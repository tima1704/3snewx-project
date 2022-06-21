import { useEffect, useState } from "react";

import { fetchAutocompleteAffiliates } from "Helpers/AutocompleteAPIFunc";

import { ITag } from "Types";

import { IAffiliatesOffer } from "./types";

import { Button } from "react-bootstrap";
import { InputComp, AsyncInputTags } from "Components/MiniComponents";
import Skeleton from "react-loading-skeleton";
import AEOfferFooter from "Components/Offers/OffersMiniComponents/AEOfferFooter";

import { useAppDispatch, useAppSelector, useAsyncSave } from "Hooks";

import { fetchOffersAffiliate, saveOffersAffiliate } from "Helpers/api/Offers";

import styles from "../Styles/index.module.css";

export default function AEOfferAffiliateTab({
  draft = false,
  id,
}: {
  draft?: boolean;
  id: string;
}) {
  const [affiliate, setAffiliate] = useState<IAffiliatesOffer>({
    enabled_affiliate: [],
    disabled_affiliate: [],
  });

  const onClickDisabledAllAffiliates = () => {
    setAffiliate({
      enabled_affiliate: [],
      disabled_affiliate: [
        ...affiliate.disabled_affiliate,
        ...affiliate.enabled_affiliate,
      ],
    });
  };

  const onClickEnabledAllAffiliates = () => {
    setAffiliate({
      disabled_affiliate: [],
      enabled_affiliate: [
        ...affiliate.enabled_affiliate,
        ...affiliate.disabled_affiliate,
      ],
    });
  };

  const onSelectTagsEnabbledAffiliates = (value: ITag[]) => {
    const filterValue = value.filter(
      (x) =>
        !affiliate.disabled_affiliate.some((y: ITag) => x.value === y.value)
    );
    setAffiliate({ ...affiliate, enabled_affiliate: filterValue });
  };

  const onSelectTagsDisabledAffiliates = (value: ITag[]) => {
    const filterValue = value.filter(
      (x) => !affiliate.enabled_affiliate.some((y: ITag) => x.value === y.value)
    );
    setAffiliate({ ...affiliate, disabled_affiliate: filterValue });
  };

  const { disabled, execute } = useAsyncSave(saveOffersAffiliate, true);

  const { fillErrorsOffers } = useAppDispatch();

  const errors = useAppSelector(
    (state) => state.Offers.errors.OfferAffiliateTabType
  );

  const onClickSave = () => {
    fillErrorsOffers("OfferAffiliateTabType", []);
    execute(affiliate, draft, id).catch((e) => {
      if (e.response) {
        fillErrorsOffers("OfferAffiliateTabType", e.response.data.errors);
      }
    });
  };

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOffersAffiliate(draft, id).then((data) => {
      setAffiliate(data);
      setLoading(false);
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={styles.ContentWrapperMain}>
      <InputComp
        title={"Enabled Affiliates"}
        errorKey={"enabled_affiliate"}
        errors={errors}
      >
        <div>
          {!loading ? (
            <AsyncInputTags
              isMulti
              isClearable
              loadAction={fetchAutocompleteAffiliates}
              onChange={onSelectTagsEnabbledAffiliates}
              value={affiliate.enabled_affiliate}
              name={"enabled_affiliate"}
              className={"spaceBlock20"}
              disabled={disabled}
            />
          ) : (
            <Skeleton className={"spaceBlock20 skeleton-input"} />
          )}
          <div className={styles.affiliateRowBtn}>
            {!loading ? (
              <Button
                variant="danger"
                onClick={onClickDisabledAllAffiliates}
                disabled={disabled}
              >
                Disable for all
              </Button>
            ) : (
              <Skeleton className={"skeleton-btn"} width={118} />
            )}
          </div>
        </div>
      </InputComp>

      {/* <Form.Group as={Row}>
      <Form.Label column sm="3"></Form.Label>
      <Col sm="9">
        <Button variant="outline-primary">-</Button>
        <Form.Control as="select">
          <option>Select affiliate</option>
        </Form.Control>
        <Button variant="outline-primary">Enable</Button>
      </Col>
    </Form.Group> */}

      <InputComp
        title={"Disabled Affiliates"}
        errorKey={"disabled_affiliate"}
        errors={errors}
      >
        <div>
          {!loading ? (
            <AsyncInputTags
              isMulti
              isClearable
              loadAction={fetchAutocompleteAffiliates}
              onChange={onSelectTagsDisabledAffiliates}
              value={affiliate.disabled_affiliate}
              name={"disabled_affiliate"}
              className={"spaceBlock20"}
              disabled={disabled}
            />
          ) : (
            <Skeleton className={"spaceBlock20 skeleton-input"} />
          )}
          <div className={styles.affiliateRowBtn}>
            {!loading ? (
              <Button onClick={onClickEnabledAllAffiliates} disabled={disabled}>
                Enable for all
              </Button>
            ) : (
              <Skeleton className={"skeleton-btn"} width={118} />
            )}
          </div>
        </div>
      </InputComp>
      <AEOfferFooter
        tab={"affiliate"}
        draft={draft}
        onClickSaveFunc={onClickSave}
        disabled={disabled || loading}
      />
    </div>
  );
}
