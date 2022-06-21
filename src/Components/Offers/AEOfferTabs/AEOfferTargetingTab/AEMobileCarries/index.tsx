import { Form, Button } from "react-bootstrap";
// import { ITag } from "Types";
import { ButtonComp } from "Components/MiniComponents";
import { IMobileCaries } from "../types";

// import OptionsCountry from "Data/Static/country.json";

import styles from "../../Styles/index.module.css";
import Immer from "immer";

interface AEMobileCarriesProps {
  setMobileCarries: any;
  mobileCarriers: IMobileCaries[];

  disabled: boolean;
}

export default function AEMobileCarries({
  setMobileCarries,
  mobileCarriers,

  disabled,
}: AEMobileCarriesProps) {
  // const onSelect = (tags: ITag[], key: keyof IMobileCaries, index: number) => {
  //   setMobileCarries(
  //     Immer(mobileCarriers, (mobileCarriersDraft) => {
  //       mobileCarriersDraft[index][key] = tags.map((tag) => tag.value);
  //     })
  //   );
  // };

  const onChangeMobileCarier = (value: string, index: number) => {
    setMobileCarries(
      Immer(mobileCarriers, (mobileCarriersDraft) => {
        mobileCarriersDraft[index].mobileCarier = value;
      })
    );
  };

  const onClickDeleteMC = (index: number) => {
    setMobileCarries(
      Immer(mobileCarriers, (mobileCarriersDraft) => {
        mobileCarriersDraft.splice(index, 1);
      })
    );
  };

  const onClickAddMC = () => {
    setMobileCarries([...mobileCarriers, { country: [] }]);
  };

  return (
    <div>
      {mobileCarriers?.map((value, index) => (
        <div
          className={"spaceBlock20 " + styles.rowMobileCarriers}
          key={"mb" + index}
        >
          {/* <InputTags
              isMulti={true}
              isClearable={true}
              name={"country"}
              options={OptionsCountry}
              value={value.country}
              onChange={onSelect}
              index={index}
              className={styles.inputMobileCarriers}
            /> */}

          <Form.Control
            // disabled={!value?.country}
            // className={styles.inputMobileCarriers}
            value={value.mobileCarier}
            onChange={(e) => {
              onChangeMobileCarier(e.target.value, index);
            }}
            disabled={disabled}
          />

          <ButtonComp
            intent="close-light"
            icon="close-fill"
            onClick={() => {
              onClickDeleteMC(index);
            }}
            loading={disabled}
          />
        </div>
      ))}

      <Button onClick={onClickAddMC} disabled={disabled}>
        Add Mobile carrier
      </Button>
    </div>
  );
}
