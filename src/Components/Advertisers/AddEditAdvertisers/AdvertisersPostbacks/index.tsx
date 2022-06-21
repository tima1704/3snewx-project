import { useMemo } from "react";
import { AdvertApi } from "Helpers/api";
import { generateCode } from "Helpers/CustomFunc";

import { useAppDispatch, useAppSelector, useAsyncSave } from "Hooks";

import { Button, FormControl } from "react-bootstrap";
import { InputComp } from "Components/MiniComponents";

import styles from "./index.module.css";

export default function AdvertisersPostbacks() {
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

  const onClickGenerateCoded = () => {
    onChangeAdvert(generateCode(32), "secure_postback_code");
  };

  const { disabled, execute, errors } = useAsyncSave(
    AdvertApi.saveAdvertPostbacks,
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
        loading={loading}
        title="Secure postback code"
        name="secure_postback_code"
      >
        <div className={styles["rowSecureCod"]}>
          <FormControl
            value={data?.secure_postback_code}
            maxLength={32}
            onChange={onChange}
            id={"secure_postback_code"}
            disabled={disabled}
          />
          <Button
            className={styles["btnGenerate"]}
            onClick={onClickGenerateCoded}
            disabled={disabled}
          >
            Generate Code
          </Button>
        </div>
      </InputComp>
      <InputComp
        errors={errors}
        loading={loading}
        value={data?.s2s}
        title="S2S (Postback)"
        name="s2s"
        onChange={onChange}
        disabled={disabled}
      >
        <div>{data?.s2s}</div>
      </InputComp>
      <div>
        <Button onClick={onClickSave} disabled={disabled}>
          Save
        </Button>
      </div>
    </div>
  );
}
