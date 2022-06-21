import React, { Dispatch, SetStateAction, useMemo } from "react";
import { Button, Collapse } from "react-bootstrap";
import { useAppDispatch, useAppSelector, useAsyncSave } from "Hooks";
import { Icon, InputComp, InputTags, Line } from "Components/MiniComponents";

import { initialDataPaymentAffiliate, IPaymentEdit } from "../types";

import { ITag } from "Types";

import OptionsCurrency from "Data/Static/currency.json";
import { saveAffiliatePayment } from "Helpers/api/Affiliates";

import styles from "../index.module.css";

interface AddEditPaymentTabProps {
  setEditData: Dispatch<SetStateAction<IPaymentEdit | undefined>>;
  editData: IPaymentEdit | undefined;
  idAffiliate: string;
}

export default function AddEditPaymentTab({
  setEditData,
  editData,
  idAffiliate,
}: AddEditPaymentTabProps) {
  const { fetchAffiliatePayment } = useAppDispatch();

  const requisitesList = useAppSelector(
    (state) => state.Affiliate.availablePayment
  );

  const onClickAddPaymentMethod = () => {
    setEditData(initialDataPaymentAffiliate);
  };

  const onClickCanselEdit = () => {
    setEditData(undefined);
  };

  const onChangeRequisites = (
    e: React.ChangeEvent<HTMLInputElement>,
    key: string
  ) => {
    if (editData) {
      setEditData({
        ...editData,
        requisites: { ...editData.requisites, [key]: e.target.value },
      });
    }
  };

  const onSelectPaymentMethod = (tag: ITag, key: keyof IPaymentEdit) => {
    if (editData) {
      setEditData({
        ...editData,
        [key]: tag.value,
        requisites: {},
        currency: "",
      });
    }
  };

  const onSelect = (tag: ITag, key: keyof IPaymentEdit) => {
    if (editData) {
      setEditData({
        ...editData,
        [key]: tag.value,
      });
    }
  };

  const availablePaymentOptions = useMemo<ITag[]>(() => {
    if (requisitesList) {
      return requisitesList.map((requisite) => ({
        label: requisite.title.replace("_", " "),
        value: requisite.id,
      }));
    }

    return [];
  }, [requisitesList]);

  const activePaymentMethod = useMemo(() => {
    return requisitesList?.find(
      (requisit) => requisit.id === editData?.payment_system_id
    );
  }, [requisitesList, editData?.payment_system_id]);

  const curriencyOptionsFilter = useMemo<ITag[] | undefined>(() => {
    if (activePaymentMethod) {
      const tags: ITag[] = [];

      activePaymentMethod?.currencie.forEach((activeCurrency) => {
        const tag = OptionsCurrency.find(
          (currency) => currency.value === activeCurrency
        );
        if (tag) {
          tags.push(tag);
        }
      });

      return tags;
    }
  }, [activePaymentMethod]);

  const { execute, errors } = useAsyncSave(
    saveAffiliatePayment,
    idAffiliate ? true : false
  );

  const onClickSave = () => {
    if (editData) {
      execute(idAffiliate, editData).then(() => {
        fetchAffiliatePayment(idAffiliate);
        setEditData(undefined);
      });
    }
  };

  return (
    <div className="contnent-50p">
      <div className="spaceBlock32">
        <Button
          onClick={onClickAddPaymentMethod}
          disabled={editData ? true : false}
        >
          <Icon icon={"plus"} mr /> Add Payment Method
        </Button>
      </div>
      <div>
        <Collapse in={editData ? true : false}>
          <div className="spaceBlock32">
            <InputComp
              errors={errors}
              title={"Payment method"}
              name="payment_system_id"
            >
              <InputTags
                onChange={onSelectPaymentMethod}
                options={availablePaymentOptions}
                name={"payment_system_id"}
                isMulti={false}
                isClearable={false}
              />
            </InputComp>

            <InputComp errors={errors} title={"Currency"} name="currency">
              <InputTags
                onChange={onSelect}
                options={curriencyOptionsFilter}
                name={"currency"}
                isMulti={false}
                isClearable={false}
              />
            </InputComp>

            <div>
              {activePaymentMethod?.fields?.map((field, index) => (
                <InputComp
                  errors={errors}
                  name={field.name}
                  title={field.name.replace("_", " ")}
                  key={index + "field"}
                  onChange={onChangeRequisites}
                  value={editData?.requisites?.[field.name]}
                  classNameTitle={styles["titleInput"]}
                />
              ))}
            </div>

            <div className="spaceBlock32">
              <Button variant={"danger"} onClick={onClickCanselEdit}>
                Cansel
              </Button>
              <Button
                onClick={onClickSave}
                disabled={activePaymentMethod ? false : true}
              >
                Save
              </Button>
            </div>
            <Line />
          </div>
        </Collapse>
      </div>
    </div>
  );
}
