import React, { useMemo } from "react";

import { ITag } from "Types";
import { InputComp, InputTags, CreatebleTags } from "Components/MiniComponents";
import { Button, FormCheck } from "react-bootstrap";

import { useAppDispatch, useAppSelector, useAsyncSave } from "Hooks";
import { saveAdvertPrimaryInfo } from "Helpers/api/Advert";
import { useHistory } from "react-router-dom";
import { URL_ADVERTISERS } from "Constants/URLConstants/URLCabinet";

import { SUB_ACCOUNT } from "Components/Offers/AEOfferTabs/AEOfferTargetingTab/AETargetingTab/constants";

interface AdvertisersPrimaryInfoProps {
  isNew: boolean;
}

// SUB_ACCOUNT

export default function AdvertisersPrimaryInfo({
  isNew,
}: AdvertisersPrimaryInfoProps) {
  const data = useAppSelector((state) => state.Advert.activeAdvert);
  const formInfo = useAppSelector((state) => state.Advert.formInfo);

  const loading = useMemo(() => {
    if (isNew) {
      return false;
    }

    if (data) {
      return false;
    } else {
      return true;
    }
  }, [isNew, data]);

  const { onChangeAdvert, fetchAdvert } = useAppDispatch();

  const onChange = (e: React.ChangeEvent<HTMLInputElement>, key: string) => {
    onChangeAdvert(e.target.value, key);
  };

  const onSelect = (tag: ITag, key: string) => {
    onChangeAdvert(tag.value, key);
  };

  const onMultiSelect = (tags: ITag[], key: string) => {
    onChangeAdvert(
      tags.map((tag) => tag.value),
      key
    );
  };

  const onChecked = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChangeAdvert(e.target.checked, e.target.id);
  };

  const { errors, disabled, execute } = useAsyncSave(
    saveAdvertPrimaryInfo,
    !isNew
  );

  const history = useHistory();

  const onClickSave = () => {
    execute(isNew ? "new" : data?.id, data).then((res) => {
      if (res.data?.data?.advertId) {
        history.push(
          URL_ADVERTISERS.URL_ADVERTISERS_EDIT(res.data.data.advertId)
        );
      } else {
        if (data) {
          fetchAdvert(data.id);
        }
      }
    });
  };

  return (
    <div>
      <InputComp
        errors={errors}
        title="Company"
        name="company"
        loading={loading}
        value={data?.company}
        onChange={onChange}
        disabled={disabled}
      />
      <InputComp
        errors={errors}
        title="Manager"
        name="manager_id"
        loading={loading}
      >
        <InputTags
          onChange={onSelect}
          name="manager_id"
          isMulti={false}
          isClearable={false}
          options={formInfo?.managers || []}
          disabled={disabled}
          value={data?.manager_id}
        />
      </InputComp>
      <InputComp
        errors={errors}
        title="Allowed IPs"
        name="allowed_ip"
        loading={loading}
      >
        <CreatebleTags
          onChange={onMultiSelect}
          name="allowed_ip"
          value={data?.allowed_ip || []}
          isMulti
          isClearable
          isDisabled={disabled}
        />
      </InputComp>
      <InputComp
        errors={errors}
        title="Allowed sub account"
        name="allowed_sub_account"
        loading={loading}
      >
        <InputTags
          isClearable
          isMulti
          disabled={disabled}
          options={SUB_ACCOUNT}
          name={"allowed_sub_account"}
          onChange={onMultiSelect}
          value={data?.allowed_sub_account}
        />
      </InputComp>
      <InputComp
        errors={errors}
        title="Disallowed sub account"
        name="disallowed_sub_account"
        loading={loading}
      >
        <InputTags
          isClearable
          isMulti
          disabled={disabled}
          options={SUB_ACCOUNT}
          name={"disallowed_sub_account"}
          onChange={onMultiSelect}
          value={data?.disallowed_sub_account}
        />
      </InputComp>
      <FormCheck
        label="Forbid the affiliates from changing the postback status (for all the offers of this advertiser)"
        className="checkbox"
        id="forbid_change_postback_status"
        disabled={loading || disabled}
        checked={data?.forbid_change_postback_status}
        onChange={onChecked}
      />
      <div>
        <Button onClick={onClickSave} disabled={disabled}>
          {isNew ? "Create" : "Save"}
        </Button>
      </div>
    </div>
  );
}
