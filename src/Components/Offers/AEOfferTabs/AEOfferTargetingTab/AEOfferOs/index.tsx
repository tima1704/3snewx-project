import { Form, Button } from "react-bootstrap";
import { ButtonComp, InputTags } from "Components/MiniComponents";

import { IOs } from "../types";
import { ITag } from "Types";

import OptionOS from "Data/Static/os.json";
import OptionConversion from "Data/Static/Offers/offerConversion.json";

import Immer from "immer";

import styles from "../../Styles/index.module.css";

interface AEOfferOsProps {
  os: IOs[];
  setOs: any;
  disabled: boolean;
}

export default function AEOfferOs({ os, setOs, disabled }: AEOfferOsProps) {
  const onSelect = (tag: ITag, key: keyof IOs, index: number) => {
    setOs(
      Immer(os, (osDraft) => {
        osDraft[index][key] = tag.value;
      })
    );
  };

  const onChange = (value: string, key: keyof IOs, index: number) => {
    setOs(
      Immer(os, (osDraft) => {
        osDraft[index][key] = value;
      })
    );
  };

  const addOS = () => {
    setOs([...os, { name: "", condition: "", version: "" }]);
  };

  const deleteOs = (index: number) => {
    setOs(
      Immer(os, (osDraft) => {
        osDraft.splice(index, 1);
      })
    );
  };

  return (
    <div>
      {os?.map((value, index) => {
        return (
          <div
            key={index + "osInputs"}
            className={"spaceBlock20 " + styles.rowOs}
          >
            <InputTags
              isMulti={false}
              isClearable={false}
              options={OptionOS}
              name={"name"}
              value={value.name}
              onChange={onSelect}
              index={index}
              className={styles.inputOS}
              disabled={disabled}
            />
            <InputTags
              options={OptionConversion}
              value={value?.condition}
              className={styles.inputOS}
              index={index}
              name={"condition"}
              onChange={onSelect}
              placeholder={"Condition"}
              isMulti={false}
              isClearable={false}
              disabled={!value?.name || disabled}
            />
            <Form.Control
              type="text"
              placeholder={"Version"}
              disabled={!value?.name || disabled}
              onChange={(e) => onChange(e.target.value, "version", index)}
              value={value?.version || ""}
              className={styles.inputOS}
            />
            <ButtonComp
              intent="close-light-notML"
              icon="close-fill"
              onClick={() => {
                deleteOs(index);
              }}
              loading={disabled}
            />
          </div>
        );
      })}

      <Button onClick={addOS} disabled={disabled}>
        Add new OS
      </Button>
    </div>
  );
}
