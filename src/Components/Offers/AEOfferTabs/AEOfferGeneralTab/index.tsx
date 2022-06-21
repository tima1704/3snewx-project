import { useEffect, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import {
  fetchAutocompleteAdverticer,
  fetchAutocompleteCategories,
  fetchAutocompleteTags,
} from "Helpers/AutocompleteAPIFunc";

import { useAppSelector, useAsyncSave, useAppDispatch } from "Hooks";
import { ITag } from "Types";

import {
  ErrorInputMessage,
  InputComp,
  InputTags,
  AsyncInputTags,
  InputImage,
  DatePickerComp,
} from "Components/MiniComponents";
import SelectLangGeneral from "./SelectLang";
import AEOfferFooter from "Components/Offers/OffersMiniComponents/AEOfferFooter";

import { EOffersLang, IOffersTabGeneral } from "./types";

import OptionsStatus from "Data/Static/Offers/offerStatus.json";
import OptionsPrivacyLevel from "Data/Static/Offers/offerPrivacyLevel.json";

import { getObjectOfArray } from "Helpers/CustomFunc";
import classNames from "classnames";

import { OffersApi } from "Helpers/api";
import { useHistory } from "react-router";
import { URL_OFFER } from "Constants/URLConstants/URLCabinet";

import styles from "../Styles/index.module.css";

interface AEOfferGeneralTabProps {
  newStatus: boolean;
  draft?: boolean;
  id?: string;
}

export default function AEOfferGeneralTab({
  newStatus,
  draft = false,
  id,
}: AEOfferGeneralTabProps) {
  const history = useHistory();

  const { mainInfo } = useAppSelector((state) => state.Offers);

  const [general, setGeneral] = useState<IOffersTabGeneral>({
    title: "",
    status: "active",
    sendEmail: false,
    privacy_level: "public",
    is_top: false,
    release_date: new Date(),
    notes: "",
    reconciliation: "",
    payouts: "",
    traffic_source: [],
  });

  const onChange = (e: React.ChangeEvent<HTMLInputElement>, key?: string) => {
    setGeneral({ ...general, [key || e.target.name]: e.target.value });
  };

  const onSelectAsync = (tag: ITag, key: string) => {
    setGeneral({ ...general, [key]: tag });
  };

  const onSelect = (tag: ITag, key: string) => {
    setGeneral({ ...general, [key]: tag.value });
  };

  const onChecked = (e: React.ChangeEvent<HTMLInputElement>, key?: string) => {
    setGeneral({ ...general, [key || e.target.name]: e.target.checked });
  };

  const onChangeDate = (date: Date, key: string) => {
    setGeneral({ ...general, [key]: date });
  };

  const onCheckedArray = (checked: boolean, id: string) => {
    if (!checked) {
      const newValueDel = general?.traffic_source
        ? general.traffic_source.filter((value: any) => value !== id)
        : [];

      return setGeneral({ ...general, traffic_source: newValueDel });
    }

    const newValueAdd = general.traffic_source
      ? [...general.traffic_source, id]
      : [id];
    return setGeneral({ ...general, traffic_source: newValueAdd });
  };

  const onChangeLanguage = (
    value: string,
    language: string,
    key: EOffersLang
  ) => {
    setGeneral({ ...general, [key]: { ...general[key], [language]: value } });
  };

  const { disabled, execute } = useAsyncSave(
    OffersApi.saveOfferGeneral,
    !newStatus
  );
  const { fillErrorsOffers, addAppToastSuccess } = useAppDispatch();

  const errors = useAppSelector(
    (state) => state.Offers.errors.OfferGeneralTabType
  );

  const onClickSaveFunc = () => {
    fillErrorsOffers("OfferGeneralTabType", []);
    execute(general, draft, newStatus, id)
      .then((res) => {
        if (res.data.data?.offerId) {
          history.push(
            URL_OFFER.URL_OFFERS_EDIT_TAB(
              draft,
              res.data.data.offerId,
              "general"
            )
          );
        }
      })
      .catch((e) => {
        if (e.response) {
          fillErrorsOffers("OfferGeneralTabType", e.response.data.errors);
        }
      });
  };

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!newStatus && id) {
      OffersApi.fetchOffersGeneral(draft, id).then((data) => {
        setGeneral(data);
        setLoading(false);
      });
    } else {
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newStatus, id]);

  const onChangeLogo = (file: File) => {
    if (id) {
      OffersApi.uploadOfferLogoGeneral(file, id, draft).then(() => {
        addAppToastSuccess("Logo success upload");
        OffersApi.fetchOffersGeneral(draft, id).then((data) => {
          setGeneral(data);
        });
      });
    }
  };

  const onClickDeleteLogo = () => {
    if (id) {
      OffersApi.deleteOfferLogoGeneral(id, draft).then(() => {
        addAppToastSuccess("Logo success delete");
        OffersApi.fetchOffersGeneral(draft, id).then((data) => {
          setGeneral(data);
        });
      });
    }
  };

  return (
    <Form className={styles.ContentWrapperMain}>
      <InputComp
        title={"Main title"}
        name={"title"}
        placeholder="Text"
        onChange={onChange}
        value={general.title}
        errors={errors}
        disabled={disabled}
        loading={loading}
      />

      <InputComp
        title={"Advertiser"}
        errors={errors}
        name={"advert_id"}
        loading={loading}
      >
        <AsyncInputTags
          isMulti={false}
          onChange={onSelectAsync}
          name={"advert_id"}
          isClearable
          value={general.advert_id}
          loadAction={fetchAutocompleteAdverticer}
          disabled={disabled}
        />
      </InputComp>

      <InputComp title={"Paid Goal"} errors={errors} name={"paid_goal"}>
        <SelectLangGeneral
          value={general.paid_goal}
          name={"paid_goal"}
          onChange={onChangeLanguage}
          disabled={disabled}
          loading={loading}
        />
      </InputComp>

      <InputComp title={"KPI"} errors={errors} name={"kpi"}>
        <SelectLangGeneral
          value={general.kpi}
          name={"kpi"}
          onChange={onChangeLanguage}
          loading={loading}
          disabled={disabled}
        />
      </InputComp>

      <InputComp title={"Description"} errors={errors} name={"description"}>
        <SelectLangGeneral
          value={general.description}
          name={"description"}
          onChange={onChangeLanguage}
          loading={loading}
          disabled={disabled}
        />
      </InputComp>

      <InputComp
        title={"Traffic sources"}
        errors={errors}
        name={"traffic_source"}
        loading={loading}
      >
        <div className={styles.trafficSources}>
          {mainInfo.trafficSources?.map((item, index) => {
            return (
              <Form.Check
                type="checkbox"
                label={item.text}
                key={item.id}
                id={"traf" + item.id}
                checked={general?.traffic_source?.includes(item.id)}
                onChange={(e) => onCheckedArray(e.target.checked, item.id)}
                className={styles.checkbox}
                disabled={disabled}
              />
            );
          })}
        </div>
      </InputComp>

      {!newStatus && (
        <InputComp title={"Logo"} errorKey={"logo"} errors={[]}>
          <InputImage
            img={general?.logo}
            onChange={onChangeLogo}
            deleteImg={onClickDeleteLogo}
          />
        </InputComp>
      )}

      <InputComp
        title={"Status"}
        errors={errors}
        name={"status"}
        loading={loading}
      >
        <div>
          <InputTags
            options={OptionsStatus}
            onChange={onSelect}
            name="status"
            value={general?.status}
            className={styles.spaceBlock12}
            isMulti={false}
            disabled={disabled}
          />

          <Form.Check
            type="checkbox"
            label="Send email to active affiliates on offer status changing"
            checked={general.sendEmail}
            onChange={onChecked}
            className={styles.checkbox}
            id={"email"}
            name={"sendEmail"}
            disabled={disabled}
          />
        </div>
      </InputComp>

      <InputComp title={"Tags"} errors={errors} name={"tag"} loading={loading}>
        <AsyncInputTags
          value={general?.tag}
          onChange={onSelectAsync}
          name={"tag"}
          loadAction={fetchAutocompleteTags}
          disabled={disabled}
        />
      </InputComp>

      <InputComp
        title={"Privacy level"}
        errors={errors}
        name={"privacy_level"}
        loading={loading}
      >
        <InputTags
          onChange={onSelect}
          value={general.privacy_level}
          options={OptionsPrivacyLevel}
          isMulti={false}
          name={"privacy_level"}
          disabled={disabled}
        />
      </InputComp>

      <Form.Group as={Row} className={styles.spaceBlock12}>
        <Col>
          <Form.Check
            type="checkbox"
            label="TOP offer"
            checked={general.is_top}
            onChange={onChecked}
            className={styles.checkbox}
            id={"top"}
            name={"is_top"}
            disabled={disabled || loading}
          />
        </Col>
      </Form.Group>

      <Form.Group as={Row} className={"spaceBlock32"}>
        <Form.Label column sm="3">
          Release Date
        </Form.Label>
        <Col>
          <DatePickerComp
            value={general.release_date}
            onChange={(date: Date) => onChangeDate(date, "release_date")}
            minDate={new Date()}
            disabled={disabled || loading}
          />
        </Col>
        <Col>
          <DatePickerComp
            value={general.stop_date || general.release_date}
            onChange={(date: Date) => onChangeDate(date, "stop_date")}
            minDate={general.release_date || new Date()}
            disabled={disabled || loading}
          />
        </Col>
      </Form.Group>

      <Form.Group
        as={Row}
        className={"spaceBlock32"}
        controlId={"send_before_stoping"}
      >
        <Form.Label column sm="3">
          Send email to active webmasters before stopping
        </Form.Label>
        <Col>
          <Form.Control
            type="number"
            placeholder=""
            onChange={onChange}
            value={general?.send_before_stoping || ""}
            min={1}
            max={24}
            isInvalid={getObjectOfArray(errors, "send_before_stoping", "name")}
            className={styles.hoursInput}
            name={"send_before_stoping"}
            disabled={disabled || loading}
          />
          <span
            className={classNames({
              errorMessage: getObjectOfArray(
                errors,
                "send_before_stoping",
                "name"
              ),
            })}
          >
            Hours
          </span>
          <ErrorInputMessage
            errors={getObjectOfArray(errors, "send_before_stoping", "name")}
            inputName={"send_before_stoping"}
          />
        </Col>
      </Form.Group>

      <InputComp
        title={"Categories"}
        errors={errors}
        name={"categories"}
        loading={loading}
      >
        <AsyncInputTags
          value={general?.categories}
          onChange={onSelectAsync}
          name={"categories"}
          loadAction={fetchAutocompleteCategories}
          disabled={disabled}
        />
      </InputComp>

      <InputComp
        title={"Notes"}
        errors={errors}
        name={"notes"}
        loading={loading}
      >
        <Form.Control
          as="textarea"
          placeholder="Text"
          name="notes"
          onChange={onChange}
          value={general.notes}
          disabled={disabled}
        />
      </InputComp>

      <InputComp
        title={"Reconciliation"}
        errors={errors}
        name={"reconciliation"}
        loading={loading}
      >
        <Form.Control
          as="textarea"
          placeholder="Text"
          name="reconciliation"
          onChange={onChange}
          value={general.reconciliation}
          disabled={disabled}
        />
      </InputComp>

      <InputComp
        title={"Payouts"}
        errors={errors}
        name={"payouts"}
        loading={loading}
      >
        <Form.Control
          as="textarea"
          placeholder="Text"
          name="payouts"
          onChange={onChange}
          value={general.payouts}
          disabled={disabled}
        />
      </InputComp>

      <AEOfferFooter
        draft={draft}
        newStatus={newStatus}
        tab={"general"}
        onClickSaveFunc={onClickSaveFunc}
        disabled={disabled || loading}
      />
    </Form>
  );
}
