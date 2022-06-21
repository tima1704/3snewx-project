import { useState, useEffect } from "react";

import classNames from "classnames";
import {
  InputComp,
  Line,
  InputTags,
  AsyncInputTags,
} from "Components/MiniComponents";
import { Button, Form } from "react-bootstrap";

import styles from "../Styles/index.module.css";

import { ITag } from "Types";
import { fetchAutocompleteAffiliates } from "Helpers/AutocompleteAPIFunc";

import {
  ECap,
  ECapBoolean,
  ICapsOffer,
  initialStateCap,
  initialStateCaps,
} from "./types";

import AEOfferFooter from "Components/Offers/OffersMiniComponents/AEOfferFooter";

import OptionTimeframe from "Data/Static/Offers/offerCapsTimeframe.json";
import OptionCapsType from "Data/Static/Offers/offerCapsType.json";
import OptionGoal from "Data/Static/Offers/offerCapsGoal.json";
import OptionAffiliateType from "Data/Static/Offers/offerCapsAffiliateType.json";
import OptionTimeZone from "Data/Static/timezoneUTC.json";
import OptionConversionStatus from "Data/Static/conversionStatus.json";
import Immer from "immer";

import { useAppDispatch, useAppSelector, useAsyncSave } from "Hooks";

import { OffersApi } from "Helpers/api";

export default function AEOfferCapsTab({
  id,
  draft = false,
}: {
  id: string;
  draft?: boolean;
}) {
  const [cap, setCap] = useState<ICapsOffer>(initialStateCaps);

  const onChecked = (
    e: React.ChangeEvent<HTMLInputElement>,
    key: ECapBoolean,
    index: number
  ) => {
    setCap(
      Immer(cap, (draftData) => {
        draftData.cap[index][key] = e.target.checked;
      })
    );
  };

  const onSelectMulti = (tags: ITag[], key: string, index: number) => {
    setCap(
      Immer(cap, (draftData) => {
        draftData.cap[index]["conversion_status"] = tags.map(
          (tag) => tag.value
        );
      })
    );
  };

  const deleteCaps = (index: number) => {
    setCap(
      Immer(cap, (draftData) => {
        draftData.cap.splice(index, 1);
      })
    );
  };

  const addCaps = () => {
    setCap({ ...cap, cap: [...cap.cap, initialStateCap] });
  };

  const onChangeCaps = (
    e: React.ChangeEvent<HTMLInputElement>,
    key: ECap,
    index: number
  ) => {
    setCap(
      Immer(cap, (draftData) => {
        draftData.cap[index][key] = e.target.value;
      })
    );
  };

  const onSelectCaps = (tag: ITag, key: ECap, index: number) => {
    setCap(
      Immer(cap, (draftData) => {
        draftData.cap[index][key] = tag.value;
      })
    );
  };

  const onSelectAsyncMultiCaps = (
    tags: ITag[],
    key: "affiliate",
    index: number
  ) => {
    setCap(
      Immer(cap, (draftData) => {
        draftData.cap[index][key] = tags;
      })
    );
  };

  const [loading, setLoading] = useState(true);

  const { disabled, execute } = useAsyncSave(OffersApi.saveOffersCaps, true);
  const { fillErrorsOffers } = useAppDispatch();
  const errors = useAppSelector((state) => state.Offers.errors.OfferCapTabType);

  const onClickSave = () => {
    fillErrorsOffers("OfferCapTabType", []);
    execute(cap, draft, id).catch((e) => {
      if (e.response) {
        fillErrorsOffers("OfferCapTabType", e.response.data.errors);
      }
    });
  };

  useEffect(() => {
    OffersApi.fetchOffersCaps(draft, id).then((data) => {
      setCap(data);
      setLoading(false);
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={styles.ContentWrapperMain}>
      {cap.cap.map((value, index) => {
        return (
          <div className={"spaceBlock32"} key={"caps" + index}>
            <div className={classNames(styles.inputRow, "spaceBlock32")}>
              <div>Cap #{index + 1}</div>
              <Button
                variant="danger"
                onClick={() => {
                  deleteCaps(index);
                }}
                disabled={loading || disabled}
              >
                Delete
              </Button>
            </div>

            <InputComp
              title={"Timeframe"}
              name={"timeframe"}
              errors={errors}
              loading={loading}
            >
              <InputTags
                options={OptionTimeframe}
                value={value.timeframe}
                index={index}
                name={"timeframe"}
                onChange={onSelectCaps}
                isMulti={false}
                disabled={disabled}
              />
            </InputComp>

            <InputComp
              title={"Type"}
              name={"type"}
              errors={errors}
              loading={loading}
            >
              <InputTags
                options={OptionCapsType}
                value={value.type}
                index={index}
                name={"type"}
                onChange={onSelectCaps}
                isMulti={false}
                disabled={disabled}
              />
            </InputComp>

            <InputComp
              title={"Value"}
              name={"value"}
              errors={errors}
              onChange={onChangeCaps}
              value={value.value}
              index={index}
              loading={loading}
              disabled={disabled}
              id={"value" + index}
            />

            <InputComp
              title={"Goal"}
              name={"goal"}
              errors={errors}
              loading={loading}
            >
              <InputTags
                options={OptionGoal}
                value={value.goal}
                index={index}
                name={"goal"}
                onChange={onSelectCaps}
                isMulti={false}
                disabled={disabled}
              />
            </InputComp>

            <InputComp
              title={"Affiliate type"}
              name={"affiliate_type"}
              errors={errors}
              loading={loading}
            >
              <InputTags
                options={OptionAffiliateType}
                value={value.affiliate_type}
                index={index}
                name={"affiliate_type"}
                onChange={onSelectCaps}
                isMulti={false}
                disabled={disabled}
              />
            </InputComp>

            <InputComp
              title={"Select Affiliate"}
              name={"affiliate"}
              errors={errors}
              loading={loading}
            >
              <AsyncInputTags
                isMulti
                isClearable
                loadAction={fetchAutocompleteAffiliates}
                onChange={onSelectAsyncMultiCaps}
                value={value.affiliate_type !== "select" ? [] : value.affiliate}
                name={"affiliate"}
                index={index}
                disabled={value.affiliate_type !== "select" || disabled}
              />
            </InputComp>
            <Form.Check
              type="checkbox"
              label="OverCap"
              className={classNames(styles.checkbox, "spaceBlock32")}
              onChange={(e) => {
                onChecked(e, ECapBoolean.over_cap, index);
              }}
              checked={value.over_cap}
              id={"over_cap" + index}
              name={"over_cap"}
              disabled={loading || disabled}
            />
            <Form.Check
              type="checkbox"
              label="Hide caps in partner interface"
              className={classNames(styles.checkbox, "spaceBlock32")}
              onChange={(e) => onChecked(e, ECapBoolean.hide, index)}
              checked={value.hide}
              id={"hide" + index}
              name={"hide"}
              disabled={loading || disabled}
            />

            <InputComp
              title={"Timezone"}
              name={"timezone"}
              errors={errors}
              loading={loading}
            >
              <InputTags
                isMulti={false}
                onChange={onSelectCaps}
                name={"timezone"}
                value={value.timezone}
                options={OptionTimeZone}
                disabled={disabled}
                index={index}
              />
            </InputComp>

            <InputComp
              title={"Conversion status for caps count"}
              name={"conversion_status"}
              errors={errors}
              loading={loading}
            >
              <InputTags
                isMulti
                isClearable
                value={value.conversion_status}
                onChange={onSelectMulti}
                name={"conversion_status"}
                options={OptionConversionStatus}
                disabled={disabled}
                index={index}
              />
            </InputComp>
            <Line className={"spaceBlock32"} />
          </div>
        );
      })}

      <Button
        className={"spaceBlock32"}
        onClick={addCaps}
        disabled={loading || disabled}
      >
        Add New Cap
      </Button>

      <AEOfferFooter
        disabled={disabled || loading}
        onClickSaveFunc={onClickSave}
        draft={draft}
        tab={"cap"}
      />
    </div>
  );
}
