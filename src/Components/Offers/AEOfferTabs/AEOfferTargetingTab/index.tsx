import { useEffect, useState } from "react";

import {
  initialStateTargeting,
  initialTargetingPersonal,
  ITargetingOffer,
} from "./types";
import { ITag } from "Types";

import AETargetingTab from "./AETargetingTab";
import { Col, Form, Row, Button } from "react-bootstrap";
import AEOfferFooter from "Components/Offers/OffersMiniComponents/AEOfferFooter";

import { useAppDispatch, useAppSelector, useAsyncSave } from "Hooks";
import { OffersApi } from "Helpers/api";

import Immer from "immer";
import classNames from "classnames";

import styles from "../Styles/index.module.css";

export default function AEOfferTargetingTab({
  draft = false,
  id,
}: {
  draft?: boolean;
  id: string;
}) {
  const [targeting, setTargeting] = useState<ITargetingOffer>(
    initialStateTargeting
  );

  const onChangePersonalData = (data: ITargetingOffer, index: number) => {
    if (
      targeting.personal_targeting &&
      targeting.personal_targeting.length > 0
    ) {
      setTargeting(
        Immer(targeting, (draftTargeting) => {
          draftTargeting.personal_targeting[index] = data;
        })
      );
    }
  };

  const onChecked = (e: React.ChangeEvent<HTMLInputElement>, key?: string) => {
    setTargeting({ ...targeting, [key || e.target.name]: e.target.checked });
  };

  const onClickAddNewPersonalTracking = () => {
    setTargeting({
      ...targeting,
      personal_targeting: [
        ...targeting.personal_targeting,
        initialTargetingPersonal,
      ],
    });
  };

  const onClickDeletePersonalTargeting = (index: number) => {
    setTargeting(
      Immer(targeting, (targetingDraft) => {
        targetingDraft.personal_targeting.splice(index, 1);
      })
    );
  };

  const { disabled, execute } = useAsyncSave(
    OffersApi.saveTargetingOffer,
    true
  );
  const { fillErrorsOffers } = useAppDispatch();
  const errors = useAppSelector(
    (state) => state.Offers.errors.OfferTargetingTabType
  );

  const onClickSave = () => {
    fillErrorsOffers("OfferTargetingTabType", []);
    execute(targeting, draft, id).catch((e) => {
      if (e.response) {
        fillErrorsOffers("OfferTargetingTabType", e.response.data.errors);
      }
    });
  };

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    OffersApi.fetchOfferTargeting(draft, id).then((data) => {
      setTargeting({
        ...targeting,
        ...data,
        country: data.country.map((countr: ITag) => countr.value),
        region: data.region.map((countr: ITag) => countr.value),
        city: data.city.map((countr: ITag) => countr.value),
        mobile_carrier: data.mobile_carrier.map((mb: string) => ({
          country: [],
          mobileCarier: mb,
        })),
        vendors: data.vendor,
        CSL: data.click_ttl,
        CSLcustom: data.click_ttl_custom,
      });
      setLoading(false);
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={classNames(styles.ContentWrapperMain, "spaceBlock32")}>
      <Form.Group
        as={Row}
        className={"spaceBlock32"}
        controlId="enableRestriction"
      >
        <Col>
          <Form.Check
            type="checkbox"
            label="Enable restrictions"
            className={styles.checkbox}
            checked={targeting.enable_restriction}
            onChange={onChecked}
            id={"enable_restriction"}
            name={"enable_restriction"}
            disabled={loading || disabled}
          />
        </Col>
      </Form.Group>

      <AETargetingTab
        targeting={targeting}
        errors={errors}
        setTargeting={setTargeting}
        loading={loading}
        disabled={disabled}
      />

      <div className={"spaceBlock32"}>
        <h1 className={"spaceBlock32"}> Personal Targeting</h1>

        {targeting.personal_targeting?.map((targetingItem, index) => (
          <AETargetingTab
            targeting={targetingItem}
            errors={errors}
            index={index}
            setTargeting={onChangePersonalData}
            key={"personalTatgeting" + index}
            personalTargeting={true}
            onClickDeletePersonalTargeting={onClickDeletePersonalTargeting}
            loading={loading}
            disabled={disabled}
          />
        ))}

        <Button
          onClick={onClickAddNewPersonalTracking}
          disabled={loading || disabled}
        >
          Add new Personal Targeting
        </Button>
      </div>

      <AEOfferFooter
        tab={"targeting"}
        draft={draft}
        onClickSaveFunc={onClickSave}
        disabled={loading || disabled}
      />
    </div>
  );
}
