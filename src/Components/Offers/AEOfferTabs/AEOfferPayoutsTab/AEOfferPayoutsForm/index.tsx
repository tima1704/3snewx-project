import classNames from "classnames";
import { Form, Button, Row, Col } from "react-bootstrap";
import { fetchAutocompleteAffiliates } from "Helpers/AutocompleteAPIFunc";
import { ITag, IValidError } from "Types";
import {
  ErrorInputMessage,
  InputTags,
  AsyncInputTags,
  CreatebleTags,
} from "Components/MiniComponents";

import { IPayout } from "../types";

import styles from "./AEOfferPayoutForm.module.css";

import OptionDevices from "Data/Static/Offers/device.json";
import OptionOS from "Data/Static/os.json";
import OptionCurrency from "Data/Static/currency.json";
import OptionPaymentType from "Data/Static/Offers/offerPayoutPaymentType.json";
import OptionsCountry from "Data/Static/country.json";

import { useMemo, useState } from "react";

import { useAppSelector } from "Hooks";

import { SUB_ACCOUNT } from "../../AEOfferTargetingTab/AETargetingTab/constants";

interface AEOfferPayoutsFormProps {
  value: IPayout;
  index: number;
  personal: boolean;
  errors: IValidError[];
  setData: any;
  onDelete: any;
  disabled: boolean;
}

export default function AEOfferPayoutsForm({
  value,
  index,
  personal,
  errors,
  onDelete,
  setData,
  disabled,
}: AEOfferPayoutsFormProps) {
  const goalTemplates = useAppSelector(
    (state) => state.Offers.mainInfo.goalTemplates
  );
  const goalOptions = useMemo(() => {
    if (goalTemplates) {
      return goalTemplates.map((goal) => ({
        label: goal.title,
        value: goal.id,
      }));
    }
    return [];
  }, [goalTemplates]);

  const [subShow, setSubShow] = useState(false);

  const onChangeSubShow = (value: boolean) => {
    setSubShow(value);
  };

  const [showURL, setShowURL] = useState(false);

  const onClickShowTrackingURL = () => {
    setShowURL(!showURL);
  };

  const onSelectAsyncMulti = (tags: ITag[], name: string) => {
    setData({ ...value, [name]: tags }, index);
  };

  const onSelectMulti = (tags: ITag[], name: string) => {
    setData({ ...value, [name]: tags.map((tag) => tag.value) }, index);
  };

  const onChecked = (valueCheck: boolean, name: string) => {
    setData({ ...value, [name]: valueCheck }, index);
  };

  const onSelectCreatebleTag = (tag: ITag | ITag[], name: string) => {
    if (tag) {
      if (Array.isArray(tag)) {
        return setData(
          {
            ...value,
            [name]: tag.map((item) => item.value),
          },
          index
        );
      } else {
        return setData({ ...value, [name]: tag.value }, index);
      }
    }

    return setData({ ...value, [name]: tag }, index);
  };

  const onChange = (changeValue: string, name: string) => {
    setData({ ...value, [name]: changeValue }, index);
  };

  const onSelect = (tag: ITag | undefined, name: string) => {
    if (tag) {
      setData({ ...value, [name]: tag.value }, index);
    } else {
      setData({ ...value, [name]: "" }, index);
    }
  };

  const onChangeSub = (valueSub: string, indexSub: number) => {
    setData({ ...value, sub: { ...value.sub, [indexSub]: valueSub } }, index);
  };

  return (
    <div>
      {/* {+index !== 0 && <Line className={"spaceBlock32"} />} */}
      <h4>
        {personal ? "Personal" : "General"} payout #{+index + 1}
      </h4>

      <div className={classNames("spaceBlock32", styles.rowTitleBtn)}>
        <div>
          {/* <Button variant="outline-primary">Copy to General payout</Button>
          <Button variant="outline-primary">Copy to Personal payout</Button> */}
        </div>
        <Button
          variant="danger"
          onClick={() => {
            onDelete(index);
          }}
          disabled={disabled}
        >
          Delete
        </Button>
      </div>

      {personal && (
        <Form.Group as={Row} className={"spaceBlock32"}>
          <Form.Label column sm={6}>
            Affiliates
            <AsyncInputTags
              isMulti
              isClearable
              loadAction={fetchAutocompleteAffiliates}
              onChange={onSelectAsyncMulti}
              value={value.affiliates || []}
              name={"affiliates"}
              disabled={disabled}
            />
            <ErrorInputMessage inputName={"affiliates"} errors={errors} />
          </Form.Label>
        </Form.Group>
      )}

      <Form.Group as={Row} className={"spaceBlock32"}>
        <Form.Label column sm="3">
          Country
          <InputTags
            isMulti
            isClearable
            onChange={onSelectMulti}
            value={value.country}
            name={"country"}
            options={OptionsCountry}
            disabled={disabled}
          />
          <Form.Check
            type="checkbox"
            label="Exclude"
            onChange={(e) => {
              onChecked(e.target.checked, "country_exclude");
            }}
            checked={value.country_exclude}
            id={"countrys" + index + personal}
            className={"checkbox"}
            disabled={disabled}
          />
          <ErrorInputMessage inputName={"country"} errors={errors} />
        </Form.Label>

        <Form.Label column sm="3">
          Cities
          <CreatebleTags
            isMulti
            isClearable
            value={value.city}
            onChange={onSelectCreatebleTag}
            name={"city"}
            isDisabled={disabled}
          />
          <Form.Check
            type="checkbox"
            label="With regions"
            onChange={(e) => {
              onChecked(e.target.checked, "city_exclude");
            }}
            checked={value.city_exclude}
            id={"citys" + index + personal}
            className={"checkbox"}
            disabled={disabled}
          />
          <ErrorInputMessage inputName={"city"} errors={errors} />
        </Form.Label>

        <Form.Label column sm="3">
          Devices
          <InputTags
            isMulti
            isClearable
            onChange={onSelectMulti}
            name={"device"}
            value={value.device}
            options={OptionDevices}
            disabled={disabled}
          />
          <ErrorInputMessage inputName={"devices"} errors={errors} />
        </Form.Label>

        <Form.Label column sm="3">
          OS
          <InputTags
            isMulti
            isClearable
            options={OptionOS}
            name={"os"}
            value={value.os}
            onChange={onSelectMulti}
            disabled={disabled}
          />
          <ErrorInputMessage inputName={"os"} errors={errors} />
        </Form.Label>
      </Form.Group>

      <Form.Group as={Row} className={"spaceBlock32"}>
        <Form.Label column>
          Total
          <Form.Control
            type="number"
            placeholder=""
            onChange={(e) => {
              onChange(e.target.value.replace(/\D/g, ""), "total");
            }}
            value={value.total || ""}
            min={0}
            disabled={disabled}
          />
          <ErrorInputMessage inputName={"total"} errors={errors} />
        </Form.Label>

        <Form.Label column>
          Payouts
          <Form.Control
            type="number"
            placeholder=""
            onChange={(e) => {
              onChange(e.target.value.replace(/\D/g, ""), "payouts");
            }}
            value={value.payouts || ""}
            min={0}
            disabled={disabled}
          />
          <ErrorInputMessage inputName={"payouts"} errors={errors} />
        </Form.Label>

        <Form.Label column>
          Currency
          <InputTags
            isMulti={false}
            isClearable
            onChange={onSelect}
            name={"currency"}
            value={value.currency}
            options={OptionCurrency}
            disabled={disabled}
          />
          <ErrorInputMessage inputName={"currency"} errors={errors} />
        </Form.Label>

        <Form.Label column>
          Goal Value
          <Form.Control
            placeholder=""
            onChange={(e) => {
              onChange(e.target.value, "goal_value");
            }}
            value={value.goal_value || ""}
            min={0}
            disabled={disabled}
          />
          <ErrorInputMessage inputName={"goal_value"} errors={errors} />
        </Form.Label>

        <Form.Label column>
          Goal Title
          {/* <Form.Control
            type="text"
            placeholder="Text"
            value={value?.goal_title || ""}
            onChange={(e) => {
              onChange(e.target.value, "goal_title");
            }}
            disabled={disabled}
          /> */}
          <InputTags
            onChange={onSelect}
            isMulti={false}
            isClearable={false}
            options={goalOptions}
            name="goal_title"
            disabled={disabled}
            value={value?.goal_title || ""}
          />
          <ErrorInputMessage inputName={"goal_title"} errors={errors} />
        </Form.Label>

        <Form.Label column>
          Payment type
          <InputTags
            isMulti={false}
            isClearable
            onChange={onSelect}
            name={"payment_type"}
            value={value.payment_type}
            options={OptionPaymentType}
            disabled={disabled}
          />
          <ErrorInputMessage inputName={"payment_type"} errors={errors} />
        </Form.Label>
      </Form.Group>

      <Form.Check
        type="checkbox"
        label="Subaccounts"
        onChange={(e) => {
          onChangeSubShow(e.target.checked);
        }}
        checked={subShow}
        className={"spaceBlock32 checkbox"}
        id={"Subaccountss" + index + personal}
        disabled={disabled}
      />

      {subShow && (
        <Form.Group as={Row} className={"spaceBlock32"}>
          {SUB_ACCOUNT.map((valueSub, indexSub) => {
            return (
              <Form.Label column sm="3">
                Sub account {indexSub + 1}
                <Form.Control
                  type="text"
                  placeholder="Text"
                  value={value.sub[indexSub] || ""}
                  onChange={(e) => {
                    onChangeSub(e.target.value, indexSub);
                  }}
                  disabled={disabled}
                />
              </Form.Label>
            );
          })}
        </Form.Group>
      )}

      <Row className={classNames(styles.trackingURLRow, "spaceBlock32")}>
        <Col sm={2}>
          <Button
            variant="outline-primary"
            onClick={onClickShowTrackingURL}
            disabled={disabled}
          >
            Tracking URL
          </Button>
        </Col>
        <Col>
          {showURL && (
            <Form.Control
              type="text"
              placeholder="Url"
              value={value.tracking_url || ""}
              onChange={(e) => {
                onChange(e.target.value, "tracking_url");
              }}
              disabled={disabled}
            />
          )}
        </Col>
      </Row>
    </div>
  );
}
