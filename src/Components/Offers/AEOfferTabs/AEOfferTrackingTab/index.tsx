import { useEffect, useMemo, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import { ITag } from "Types";

import { InputComp, InputTags, Line } from "Components/MiniComponents";

import styles from "../Styles/index.module.css";
import { ITrackingTab } from "./types";

import OptionsRedictType from "Data/Static/Offers/offerRedirectType.json";
import AEOfferLandings from "./AEOfferLandings";

import { useAppDispatch, useAppSelector, useAsyncSave } from "Hooks";

import { OffersApi } from "Helpers/api";

import AEOfferFooter from "Components/Offers/OffersMiniComponents/AEOfferFooter";

export default function AEOfferTrackingTab({
  draft = false,
  id,
}: {
  draft?: boolean;
  id: string;
}) {
  const { mainInfo } = useAppSelector((state) => state.Offers);

  const [tracking, setTracking] = useState<ITrackingTab>({
    tracking_url: "",
    preview_url: "",
    additional_macro: "",
    landing_page: [{ title: "", tracking_url: "", type: "", preview_url: "" }],
    trafficback_url: "",
    tracking_domain_url: "",
    redirect_type: "",
    allow_deeplinks: false,
    allow_impressions: false,
  });

  const onChange = (e: React.ChangeEvent<HTMLInputElement>, key?: string) => {
    setTracking({ ...tracking, [key || e.target.name]: e.target.value });
  };

  const onSelect = (tag: ITag, key: string) => {
    setTracking({ ...tracking, [key]: tag.value });
  };

  const onChecked = (e: React.ChangeEvent<HTMLInputElement>, key?: string) => {
    setTracking({ ...tracking, [key || e.target.name]: e.target.checked });
  };

  const optionsDomain = useMemo(() => {
    if (!mainInfo.trackingDomain) {
      return [];
    }
    return mainInfo.trackingDomain.map((item) => ({
      value: item.id?.toString() || "",
      label: item.domain,
    }));
  }, [mainInfo]);

  const { disabled, execute } = useAsyncSave(OffersApi.saveOfferTracking, true);

  const { fillErrorsOffers } = useAppDispatch();

  const errors = useAppSelector(
    (state) => state.Offers.errors.OfferTrackingTabType
  );

  const onClickSave = () => {
    fillErrorsOffers("OfferTrackingTabType", []);
    execute(tracking, draft, id).catch((e) => {
      if (e.response) {
        fillErrorsOffers("OfferTrackingTabType", e.response.data.errors);
      }
    });
  };

  const [loading, setLoading] = useState(true);
  useEffect(() => {
    OffersApi.fetchOfferTracking(draft, id).then((data) => {
      setTracking(data);
      setLoading(false);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return (
    <div className={styles.ContentWrapperMain}>
      <InputComp
        title={"Tracking URL"}
        placeholder="Text"
        name="tracking_url"
        onChange={onChange}
        value={tracking.tracking_url}
        errors={errors}
        disabled={disabled}
        loading={loading}
      />

      <InputComp
        title={"Preview URL"}
        placeholder="Text"
        name="preview_url"
        onChange={onChange}
        value={tracking.preview_url}
        errors={errors}
        disabled={disabled}
        loading={loading}
      />

      <InputComp
        errors={errors}
        title={"Additional macro"}
        placeholder="Text"
        name="additional_macro"
        onChange={onChange}
        value={tracking.additional_macro}
        disabled={disabled}
        loading={loading}
      />

      {/* <InputComp
        errors={errors}
        title={"Title"}
        placeholder="Text"
        name="titleTracking"
        onChange={onChangeOffer}
        value={tracking.titleTracking || ""}
      /> */}

      <Line className={"spaceBlock32"} />

      <AEOfferLandings
        tracking={tracking}
        setTracking={setTracking}
        errors={errors}
        disabled={disabled}
        loading={loading}
      />

      <Line className={"spaceBlock32"} />

      <InputComp
        errors={errors}
        title={"Trafficback URL"}
        placeholder="Text"
        name="trafficback_url"
        onChange={onChange}
        value={tracking.trafficback_url || ""}
        disabled={disabled}
        loading={loading}
      />

      <InputComp
        errors={errors}
        title={"Tracking domain URL"}
        name={"tracking_domain_url"}
        loading={loading}
      >
        <InputTags
          isMulti={false}
          name={"tracking_domain_url"}
          onChange={onSelect}
          value={tracking.tracking_domain_url}
          options={optionsDomain}
          disabled={disabled}
        />
      </InputComp>

      <InputComp
        errors={errors}
        title={"Redirect type"}
        name={"redirect_type"}
        loading={loading}
      >
        <InputTags
          name={"redirect_type"}
          onChange={onSelect}
          value={tracking.redirect_type}
          isMulti={false}
          options={OptionsRedictType}
          disabled={disabled}
        />
      </InputComp>

      <Form.Group as={Row} className={"spaceBlock32"}>
        <Col>
          <Form.Check
            type="checkbox"
            label="Allow deeplinks"
            className={styles.checkbox}
            checked={tracking.allow_deeplinks}
            onChange={(e) => {
              onChecked(e, "allow_deeplinks");
            }}
            id={"allowDeeplinks"}
            disabled={disabled || loading}
          />
          <Form.Check
            type="checkbox"
            label="Allow impressions"
            className={styles.checkbox}
            checked={tracking.allow_impressions}
            onChange={(e) => {
              onChecked(e, "allow_impressions");
            }}
            id={"allowImpressions"}
            disabled={disabled || loading}
          />
        </Col>
      </Form.Group>

      <AEOfferFooter
        onClickSaveFunc={onClickSave}
        draft={draft}
        tab="tracking"
        disabled={disabled || loading}
      />
    </div>
  );
}
