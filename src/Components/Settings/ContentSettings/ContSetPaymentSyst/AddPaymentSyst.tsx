import { Dispatch, SetStateAction } from "react";

import {
  InputComp,
  InputTags,
  ErrorInputMessage,
  Line,
  ButtonComp,
} from "Components/MiniComponents";
import { Collapse, Form, Button } from "react-bootstrap";

import OptionsCirriences from "Data/Static/currency.json";
import { IFields, IPaymentSyst } from "./types";
import { ITag } from "Types";

import produce from "immer";
import { SettingsApi } from "Helpers/api";
import { useAppDispatch, useAsyncSave } from "Hooks";

import styles from "./PaymentSyst.module.css";

interface AddPaymentSystProps {
  editData?: IPaymentSyst;
  setEditData: Dispatch<SetStateAction<IPaymentSyst | undefined>>;
}

const initialStateFields: IFields = {
  title: "",
  required: false,
};

export default function AddPaymentSyst({
  editData,
  setEditData,
}: AddPaymentSystProps) {
  const { disabled, errors, execute } = useAsyncSave(
    SettingsApi.saveSettingsPaymentSystem,
    true
  );
  const { fetchSetPaymentSettings } = useAppDispatch();

  const clickCanselEdit = () => {
    setEditData(undefined);
  };

  const onClickAddField = () => {
    if (editData) {
      setEditData({
        ...editData,
        fields: [...editData.fields, initialStateFields],
      });
    }
  };

  const onChangeFields = (value: string | boolean, index: number) => {
    if (editData) {
      if (typeof value === "string") {
        setEditData(
          produce(editData, (draftData) => {
            draftData.fields[index].title = value;
          })
        );
      } else {
        setEditData(
          produce(editData, (draftData) => {
            draftData.fields[index].required = value;
          })
        );
      }
    }
  };

  const onClickDeleteField = (index: number) => {
    setEditData(
      produce(editData, (draftData) => {
        draftData?.fields.splice(index, 1);
      })
    );
  };

  const onSelectAdd = (tag: ITag[]) => {
    if (editData) {
      const tagString = tag.map(({ value }) => value);
      setEditData({ ...editData, currencie: tagString });
    }
  };

  const onChangeAdd = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (editData) {
      setEditData({ ...editData, title: e.target.value });
    }
  };

  const onClickSavePaymentSystem = () => {
    execute(editData).then(() => {
      fetchSetPaymentSettings();
      setEditData(undefined);
    });
  };

  return (
    <Collapse in={editData ? true : false}>
      <div className={"spaceBlock32"}>
        <ErrorInputMessage errors={errors} inputName={"tag"} />
        <InputComp
          errors={errors}
          name={"title"}
          value={editData?.title}
          title={"Title"}
          onChange={onChangeAdd}
          disabled={disabled}
        />
        <InputComp errors={errors} name={"currencies"} title={"Currencies"}>
          <InputTags
            options={OptionsCirriences}
            onChange={onSelectAdd}
            name={"currencies"}
            value={editData?.currencie}
            disabled={disabled}
          />
        </InputComp>
        <InputComp errors={errors} name={"Fields"} title={"Fields"}>
          <div>
            <div className={styles["form_field_header"]}>
              <div className={styles["form_field_title"]}>Title</div>
              <div className={styles["form_field_requare"]}>Required</div>
              <div className={styles["form_field_action"]}>{/* Action */}</div>
            </div>
            <div>
              {editData?.fields?.map((field, index) => {
                return (
                  <div
                    className={styles["form_field_row"]}
                    key={index + "fieldPS"}
                  >
                    <div className={styles["form_field_title"]}>
                      <Form.Control
                        value={field.title}
                        onChange={(e) => {
                          onChangeFields(e.target.value, index);
                        }}
                      />
                    </div>
                    <div className={styles["form_field_requare"]}>
                      <Form.Check
                        type="checkbox"
                        checked={field.required}
                        className={"checkbox"}
                        onChange={(e) => {
                          onChangeFields(e.target.checked, index);
                        }}
                      />
                    </div>
                    <div className={styles["form_field_action"]}>
                      <ButtonComp
                        icon={"trash"}
                        intent={"close-light-notML"}
                        className={"trashBtn"}
                        onClick={() => {
                          onClickDeleteField(index);
                        }}
                      />
                    </div>
                  </div>
                );
              })}
              <div>
                <ButtonComp
                  intent={"light"}
                  onClick={onClickAddField}
                  text={"Add New Field"}
                />
              </div>
            </div>
          </div>
        </InputComp>
        <div className={"btnRowFlexEnd spaceBlock32"}>
          <Button
            variant={"danger"}
            onClick={clickCanselEdit}
            className={"btn-close"}
          >
            Cansel
          </Button>
          <Button onClick={onClickSavePaymentSystem}>Save</Button>
        </div>
        <Line className={"cpaseBlock32"} />
      </div>
    </Collapse>
  );
}
