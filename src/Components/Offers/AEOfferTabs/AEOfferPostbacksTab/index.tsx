import classNames from "classnames";
import { useState } from "react";
import { Form, Button, Collapse } from "react-bootstrap";
import { ITag } from "Types";

import { InputComp, InputTags, CreatebleTags } from "Components/MiniComponents";
import AEOfferFooter from "Components/Offers/OffersMiniComponents/AEOfferFooter";

import { IPostbacks } from "./types";

import { useEffect } from "react";

import OptionIntegrationPixel from "Data/Static/Offers/offerIntegrationPixel.json";
import OptionPostBackStatus from "Data/Static/Offers/postbackStatus.json";
import { generateCode, getObjectOfArray } from "Helpers/CustomFunc";

import { useAppDispatch, useAppSelector, useAsyncSave } from "Hooks";
import { OffersApi } from "Helpers/api";

import styles from "../Styles/index.module.css";

export default function AEOfferPostbacksTab({
  draft = false,
  id,
}: {
  draft?: boolean;
  id: string;
}) {
  const [showForbit, setShowForbit] = useState(false);

  const [postback, setPostback] = useState<IPostbacks>({
    postback_allowed_ip: [],
    postback_secure_code: "",
    integration_pixel: "",
    integration_pixel_text: "",
    conversion_hold_period: "",
    forbid_conversion_status: [],
    conversion_unique_ip: false,
    conversion_reject_not_unique_ip: false,
  });
  const [loading, setLoading] = useState(true);

  const onCheckedForbitStatus = (e: React.ChangeEvent<HTMLInputElement>) => {
    setShowForbit(e.target.checked);
    if (e.target.checked === false) {
      setPostback({ ...postback, forbid_conversion_status: [] });
    }
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>, key?: string) => {
    setPostback({ ...postback, [key || e.target.name]: e.target.value });
  };

  const onSelect = (tag: ITag, key: string) => {
    setPostback({ ...postback, [key]: tag.value });
  };

  const onSelectMulti = (tags: ITag[], key: string) => {
    setPostback({ ...postback, [key]: tags.map((tag) => tag.value) });
  };

  const onChecked = (e: React.ChangeEvent<HTMLInputElement>, key?: string) => {
    setPostback({ ...postback, [key || e.target.name]: e.target.checked });
  };

  const onClickGenerateCode = () => {
    setPostback({ ...postback, postback_secure_code: generateCode(32, false) });
  };

  const onChangeHold = (value: string) => {
    setPostback({ ...postback, conversion_hold_period: value });
  };

  const onSelectCreatebleTag = (tag: ITag | ITag[], name: string) => {
    if (tag) {
      if (Array.isArray(tag)) {
        return setPostback({
          ...postback,
          [name]: tag.map((item) => item.value),
        });
      } else {
        return setPostback({ ...postback, [name]: tag.value });
      }
    }

    return setPostback({ ...postback, [name]: tag });
  };

  useEffect(() => {
    OffersApi.fetchOffersPostBacks(draft, id).then((data) => {
      setPostback({ ...postback, ...data });
      if (
        data.forbid_conversion_status &&
        data.forbid_conversion_status.length > 0
      ) {
        setShowForbit(true);
      }
      setLoading(false);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { disabled, execute } = useAsyncSave(
    OffersApi.saveOffersPostBack,
    true
  );
  const { fillErrorsOffers } = useAppDispatch();
  const errors = useAppSelector(
    (state) => state.Offers.errors.OfferPostbackTabType
  );

  const onClickSaveFunc = () => {
    fillErrorsOffers("OfferPostbackTabType", []);
    execute(postback, draft, id).catch((e) => {
      if (e.response) {
        fillErrorsOffers("OfferPostbackTabType", e.response.data.errors);
      }
    });
  };

  return (
    <div className={styles.ContentWrapperMain}>
      <InputComp
        title={"Allowed IPs"}
        name={"postback_allowed_ip"}
        errors={errors}
        loading={loading}
      >
        <CreatebleTags
          isMulti
          isClearable
          value={postback.postback_allowed_ip}
          onChange={onSelectCreatebleTag}
          name={"postback_allowed_ip"}
          isDisabled={disabled}
        />
      </InputComp>

      <InputComp
        title={"Secure postback code"}
        name={"postback_secure_code"}
        errors={errors}
        loading={loading}
      >
        <div className={styles.inputRow}>
          <Form.Control
            type="text"
            placeholder="Secure code"
            name="postback_secure_code"
            onChange={onChange}
            value={postback.postback_secure_code || ""}
            className={styles.securePostbackCodeInput}
            disabled={disabled}
          />
          <Button
            className={styles.securePostbackCodeBtn}
            onClick={onClickGenerateCode}
            disabled={disabled}
          >
            Generate code
          </Button>
        </div>
      </InputComp>

      <InputComp
        title={"Integration pixels"}
        name={"integration_pixel"}
        errors={errors}
        loading={loading}
      >
        <div className={styles.inputRow}>
          <InputTags
            isMulti={false}
            onChange={onSelect}
            name={"integration_pixel"}
            value={postback.integration_pixel}
            className={styles.integrationPixelSelect}
            options={OptionIntegrationPixel}
            disabled={disabled}
          />
          <Form.Control
            type="text"
            placeholder="Text"
            name="integration_pixel_text"
            onChange={onChange}
            value={postback.integration_pixel_text || ""}
            disabled={disabled}
          />
        </div>
      </InputComp>

      <InputComp
        title={"Hold period"}
        name={"conversion_hold_period"}
        errors={errors}
      >
        <div>
          <Form.Control
            type="number"
            placeholder=""
            onChange={(e) => {
              onChangeHold(e.target.value.replace(/\D/g, ""));
            }}
            value={postback.conversion_hold_period || ""}
            min={0}
            // max={24}
            isInvalid={getObjectOfArray(
              errors,
              "conversion_hold_period",
              "name"
            )}
            className={styles.hoursInput}
            disabled={loading || disabled}
          />
          <span
            className={classNames({
              errorMessage: getObjectOfArray(
                errors,
                "conversion_hold_period",
                "name"
              ),
            })}
          >
            Day
          </span>
        </div>
      </InputComp>

      <Form.Check
        type="checkbox"
        label="Forbid the affiliates from changing the postback status"
        checked={showForbit}
        onChange={onCheckedForbitStatus}
        id={"forbidChangingPostbackStatus"}
        className={classNames(styles.checkbox, "spaceBlock32")}
        disabled={loading || disabled}
      />

      <Collapse in={showForbit}>
        <div>
          <InputComp
            title={"Forbid changing postback status"}
            name={"forbid_conversion_status"}
            errors={errors}
            loading={loading}
          >
            <InputTags
              value={postback.forbid_conversion_status}
              name={"forbid_conversion_status"}
              options={OptionPostBackStatus}
              isClearable
              isMulti
              onChange={onSelectMulti}
              disabled={disabled}
            />
          </InputComp>
        </div>
      </Collapse>

      <Form.Check
        type="checkbox"
        label="Unique IP only"
        id={"conversion_unique_ip"}
        name={"conversion_unique_ip"}
        checked={postback.conversion_unique_ip}
        onChange={onChecked}
        className={classNames(styles.checkbox, "spaceBlock32")}
        disabled={loading || disabled}
      />
      <Form.Check
        type="checkbox"
        label="Reject not unique IP"
        checked={postback.conversion_reject_not_unique_ip}
        id={"conversion_reject_not_unique_ip"}
        name={"conversion_reject_not_unique_ip"}
        onChange={onChecked}
        className={classNames(styles.checkbox, "spaceBlock32")}
        disabled={loading || disabled}
      />

      <AEOfferFooter
        draft={draft}
        tab={"general"}
        onClickSaveFunc={onClickSaveFunc}
        disabled={disabled || loading}
      />
    </div>
  );
}
