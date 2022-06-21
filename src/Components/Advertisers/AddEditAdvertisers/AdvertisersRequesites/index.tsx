import { Button, FormControl } from "react-bootstrap";
import { ITag } from "Types";
import { InputComp, InputTags } from "Components/MiniComponents";

import OptionsCountry from "Data/Static/country.json";
import OptionsCurrency from "Data/Static/currency.json";
import { useAppDispatch, useAppSelector, useAsyncSave } from "Hooks";
import { useMemo } from "react";
import Skeleton from "react-loading-skeleton";
import { saveAdvertRequisites } from "Helpers/api/Advert";

export default function AdvertisersRequesites() {
  const data = useAppSelector((state) => state.Advert.activeAdvert);

  const loading = useMemo(() => {
    if (data) {
      return false;
    } else {
      return true;
    }
  }, [data]);

  const { onChangeAdvert, fetchAdvert } = useAppDispatch();

  const onChange = (e: React.ChangeEvent<HTMLInputElement>, key?: string) => {
    onChangeAdvert(e.target.value, key || e.target.id);
  };

  const onSelect = (tag: ITag, key: string) => {
    onChangeAdvert(tag.value, key);
  };

  const { execute, errors, disabled } = useAsyncSave(
    saveAdvertRequisites,
    true
  );

  const onClickSave = () => {
    if (data) {
      execute(data).then(() => {
        fetchAdvert(data.id);
      });
    }
  };

  return (
    <div>
      <InputComp
        errors={errors}
        title="Payment method"
        name="payment_method"
        loading={loading}
        value={data?.payment_method}
        onChange={onChange}
        disabled={disabled}
      />
      <InputComp
        errors={errors}
        title="Currency"
        name="currency"
        loading={loading}
      >
        <InputTags
          onChange={onSelect}
          name="currency"
          options={OptionsCurrency}
          isMulti={false}
          isClearable={false}
          value={data?.currency}
          disabled={disabled}
        />
      </InputComp>
      <InputComp errors={errors} title="Bank info" name="bank_info">
        {loading ? (
          <Skeleton className="skeleton-textarea" />
        ) : (
          <FormControl
            as={"textarea"}
            value={data?.bank_info}
            id={"bank_info"}
            onChange={onChange}
            disabled={disabled}
          />
        )}
      </InputComp>
      <InputComp
        errors={errors}
        title="VAT code"
        name="vat_code"
        loading={loading}
        value={data?.vat_code}
        onChange={onChange}
        disabled={disabled}
      />
      <InputComp
        errors={errors}
        title="Registration Number"
        name="registration_number"
        loading={loading}
        value={data?.registration_number}
        onChange={onChange}
        disabled={disabled}
      />
      <InputComp
        errors={errors}
        title="Address 1"
        name="address1"
        loading={loading}
        value={data?.address1}
        onChange={onChange}
        disabled={disabled}
      />
      <InputComp
        errors={errors}
        title="Address 2"
        name="address2"
        loading={loading}
        value={data?.address2}
        onChange={onChange}
        disabled={disabled}
      />
      <InputComp
        errors={errors}
        title="City"
        name="city"
        loading={loading}
        value={data?.city}
        onChange={onChange}
        disabled={disabled}
      />
      <InputComp
        errors={errors}
        title="Country"
        name="country"
        loading={loading}
      >
        <InputTags
          onChange={onSelect}
          name="country"
          options={OptionsCountry}
          isMulti={false}
          isClearable={false}
          value={data?.country}
          disabled={disabled}
        />
      </InputComp>
      <InputComp
        errors={errors}
        title="Zip code"
        name="zip_code"
        loading={loading}
        value={data?.zip_code}
        onChange={onChange}
        disabled={disabled}
      />
      <div>
        <Button disabled={loading || disabled} onClick={onClickSave}>
          Save
        </Button>
      </div>
    </div>
  );
}
