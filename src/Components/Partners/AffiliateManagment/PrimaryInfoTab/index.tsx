import classNames from "classnames";
import React, { useEffect, useMemo, useState } from "react";
import { ITag } from "Types";
import {
  InputComp,
  InputTags,
  Line,
  AsyncInputTags,
} from "Components/MiniComponents";
import { Button } from "react-bootstrap";

import { IAffiliatePrimaryInfo, initialAffiliatePrimaryInfo } from "./types";

import OptionsStatusAffiliate from "Data/Static/Partners/statusAffiliate.json";
import OptionsCountry from "Data/Static/country.json";

import {
  fetchAutocompleteCategories,
  fetchAutocompleteTags,
} from "Helpers/AutocompleteAPIFunc";
import { SUB_ACCOUNT } from "Components/Offers/AEOfferTabs/AEOfferTargetingTab/AETargetingTab/constants";

import { AffiliateApi } from "Helpers/api";
import { useAppSelector, useAsyncSave } from "Hooks";
import { FormCheck } from "react-bootstrap";

import styles from "../Styles/AffiliateAddEdit.module.css";

export default function PrimaryInfoAffiliate({ id }: { id: string }) {
  const [data, setData] = useState<IAffiliatePrimaryInfo>(
    initialAffiliatePrimaryInfo
  );

  const mainInfo = useAppSelector((state) => state.Affiliate.mainInfo);

  const reduxData = useAppSelector(
    (state) => state.Affiliate.activeAffiliate[id]?.primaryInfo
  );

  const onChange = (e: React.ChangeEvent<HTMLInputElement>, key: string) => {
    setData({ ...data, [key]: e.target.value });
  };

  const onSelect = (tag: ITag | undefined, key: string) => {
    setData({ ...data, [key]: tag?.value });
  };
  const onSelectMulti = (tags: ITag[], key: string) => {
    setData({ ...data, [key]: tags.map((tag) => tag.value) });
  };

  const onSelectAsync = (tags: ITag | ITag[], key: string) => {
    setData({ ...data, [key]: tags });
  };

  const onChecked = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, [e.target.id]: e.target.checked });
  };

  const { execute, errors, disabled } = useAsyncSave(
    AffiliateApi.saveAffiliatePrimaryInfo,
    id === "new" ? false : true
  );

  const onClickSave = () => {
    execute(id, data);
  };

  useEffect(() => {
    if (reduxData) {
      setData(reduxData);
    }
  }, [reduxData]);

  const loading = useMemo(() => {
    if (reduxData || id === "new") {
      return false;
    }
    return true;
  }, [reduxData, id]);

  return (
    <div className={classNames(styles["main"], "contnent-60p")}>
      {/* <InputComp
        errors={errors}
        name={I_PART_CONNECT_WIDTH}
        title={"Connect with"}
        onChange={onChangeInfoText}
        value={state[I_PART_CONNECT_WIDTH]}
      /> */}

      <InputComp
        errors={errors}
        name={"email"}
        title={"E-mail"}
        onChange={onChange}
        value={data.email}
        disabled={disabled}
        loading={loading}
      />

      {id === "new" && (
        <InputComp
          errors={errors}
          name={"plain_password"}
          title={"Password"}
          onChange={onChange}
          value={data.plain_password}
          disabled={disabled}
        />
      )}

      <InputComp
        errors={errors}
        name={"manager_id"}
        title={"Manager"}
        loading={loading}
      >
        <InputTags
          name="manager_id"
          options={mainInfo?.managers}
          value={data.manager_id}
          onChange={onSelect}
          isMulti={false}
          isClearable={false}
          disabled={disabled}
        />
      </InputComp>

      <InputComp
        errors={errors}
        name={"status"}
        title={"Status"}
        loading={loading}
      >
        <InputTags
          options={OptionsStatusAffiliate}
          onChange={onSelect}
          value={data.status}
          name="status"
          isClearable={false}
          isMulti={false}
          disabled={disabled}
        />
      </InputComp>

      <InputComp
        errors={errors}
        name={"category"}
        title={"Categories"}
        loading={loading}
      >
        <AsyncInputTags
          isMulti={true}
          isClearable={true}
          onChange={onSelectAsync}
          loadAction={fetchAutocompleteCategories}
          name={"category"}
          value={data.category}
          disabled={disabled}
        />
      </InputComp>

      <Line className={"spaceBlock32"} />

      <InputComp
        errors={errors}
        name={"address1"}
        title={"Address 1"}
        onChange={onChange}
        value={data.address1}
        disabled={disabled}
        loading={loading}
      />

      <InputComp
        errors={errors}
        name={"address2"}
        title={"Address 2"}
        onChange={onChange}
        value={data.address2}
        disabled={disabled}
        loading={loading}
      />

      <InputComp
        errors={errors}
        name={"city"}
        title={"Сity"}
        onChange={onChange}
        value={data.city}
        disabled={disabled}
        loading={loading}
      />

      <InputComp
        errors={errors}
        name={"country"}
        title={"Country"}
        loading={loading}
      >
        <InputTags
          isMulti={false}
          isClearable={true}
          onChange={onSelect}
          name="country"
          value={data.country}
          options={OptionsCountry}
          disabled={disabled}
        />
      </InputComp>

      <InputComp
        errors={errors}
        name={"zip_code"}
        title={"Zip code"}
        onChange={onChange}
        value={data.zip_code}
        disabled={disabled}
        loading={loading}
      />

      <Line className={"spaceBlock32"} />

      <InputComp errors={errors} name={"tag"} title={"Tags"} loading={loading}>
        <AsyncInputTags
          isMulti={true}
          isClearable={true}
          onChange={onSelectAsync}
          loadAction={fetchAutocompleteTags}
          name="tag"
          value={data.tag}
          disabled={disabled}
        />
      </InputComp>

      {/* <InputComp errors={errors} name={"messenger"} title={"Messenger"}>
         <InputTags /> 
      </InputComp> */}

      {/* <InputComp
        errors={errors}
        name={"descTraffic"}
        title={"Describe your traffic sources"}
        onChange={onChangeInfoText}
        value={state["descTraffic"]}
      /> */}

      <InputComp
        errors={errors}
        name={"traffic_source"}
        title={"Describe your traffic sources"}
        loading={loading}
      >
        <InputTags
          isMulti={true}
          isClearable={true}
          onChange={onSelectMulti}
          value={data.traffic_source}
          name={"traffic_source"}
          disabled={disabled}
          options={mainInfo?.trafficSources}
        />
      </InputComp>

      <InputComp
        errors={errors}
        name={"traffic_geo"}
        title={"Specify your geos you work with"}
        loading={loading}
      >
        <InputTags
          isMulti={true}
          isClearable={true}
          onChange={onSelectMulti}
          name="traffic_geo"
          value={data.traffic_geo}
          options={OptionsCountry}
          disabled={disabled}
        />
      </InputComp>

      <InputComp
        errors={errors}
        name={"note"}
        title={"How did you know about us?"}
        onChange={onChange}
        value={data.note}
        disabled={disabled}
        loading={loading}
      />

      <InputComp
        errors={errors}
        name={"allowed_sub_account"}
        title={"Allowed sub account"}
        loading={loading}
      >
        <InputTags
          options={SUB_ACCOUNT}
          onChange={onSelectMulti}
          value={data.allowed_sub_account}
          name="allowed_sub_account"
          isClearable={false}
          isMulti={true}
          disabled={disabled}
        />
      </InputComp>

      <InputComp
        errors={errors}
        name={"disallowed_sub_account"}
        title={"Disallowed sub account"}
        loading={loading}
      >
        <InputTags
          options={SUB_ACCOUNT}
          onChange={onSelectMulti}
          value={data.disallowed_sub_account}
          name="disallowed_sub_account"
          isClearable={false}
          isMulti={true}
          disabled={disabled}
        />
      </InputComp>

      {/* <InputComp
        errors={errors}
        name={I_PART_PLAIN_ALLOWED_SUB}
        title={"Enabled offers"}
      >
        <AsyncInputTags
          isMulti={true}
          isClearable={true}
          onDispatchTags={onChangeInfo}
          loadAction={fetchAutocompleteOffers}
          keyInput={I_PART_PLAIN_ALLOWED_SUB}
          tags={state[I_PART_PLAIN_ALLOWED_SUB]}
        />
      </InputComp> */}

      <InputComp
        errors={errors}
        name={"referer_desc"}
        title={"Referer description"}
        onChange={onChange}
        value={data.referer_desc}
        disabled={disabled}
        loading={loading}
      />

      <InputComp
        errors={errors}
        name={"referral_percent"}
        title={"Referral percent"}
        onChange={onChange}
        value={data.referral_percent}
        disabled={disabled}
        loading={loading}
        type={"number"}
        min={0}
      />

      <InputComp errors={errors} name={"hide_conversion_percent"}>
        <FormCheck
          label={"Hide conversion percent"}
          className="checkbox"
          onChange={onChecked}
          id={"hide_conversion_percent"}
          disabled={disabled || loading}
        />
      </InputComp>

      <div className={styles["saveBtnRow"]}>
        <Button onClick={onClickSave} disabled={disabled || loading}>
          Save
        </Button>
      </div>
    </div>
  );
}
