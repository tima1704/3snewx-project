import { Collapse, Button } from "react-bootstrap";
import { Icon, InputComp, Line } from "Components/MiniComponents";

import { IPaymentAffiliate } from "../types";

import styles from "../index.module.css";
import { useMemo, useState } from "react";
import classNames from "classnames";
import { useAppDispatch, useAppSelector } from "Hooks";

import OptionsCurrency from "Data/Static/currency.json";
import { AffiliateApi } from "Helpers/api";

interface IPaymentAffiliateItemProps extends IPaymentAffiliate {
  onClickEdit?: any;
  index: number;
  idAffiliate: string;
}

export default function PaymentTabItem({
  currency,
  requisites,
  index,
  payment,
  id,
  idAffiliate,
}: IPaymentAffiliateItemProps) {
  const [open, setOpen] = useState(false);

  const onClickOpen = () => {
    setOpen(!open);
  };

  const requisitesList = useAppSelector(
    (state) => state.Affiliate.availablePayment
  );

  const { fetchAffiliatePayment, addAppToastSuccess } = useAppDispatch();

  const title = useMemo(() => {
    return requisitesList
      ?.find((requisit) => requisit.id === payment)
      ?.title.replace("_", " ");
  }, [requisitesList, payment]);

  const onClickDelete = () => {
    AffiliateApi.deleteAffiliatePayment(idAffiliate, id)
      .then(() => {
        fetchAffiliatePayment(idAffiliate);
      })
      .then(() => {
        addAppToastSuccess("Success delete");
      });
  };

  return (
    <div>
      <div className={styles["rowItem"]}>
        <div onClick={onClickOpen} className={styles["rowTitle"]}>
          <Icon
            icon="right-chevron"
            className={classNames({
              [styles["icon"]]: true,
              [styles["iconOpen"]]: open,
            })}
          />
          {title}
        </div>
        <div>
          <Button onClick={onClickDelete} variant={"danger"}>
            Delete
          </Button>
        </div>
      </div>
      <div>
        <Collapse in={open}>
          <div className={styles["itemMain"]}>
            <InputComp errors={[]} title="Currency">
              <div>
                {OptionsCurrency.find((item) => item.value === currency)?.label}
              </div>
            </InputComp>
            {Object.entries(requisites).map(([title, value], indexField) => (
              <InputComp
                errors={[]}
                title={title.replace("_", " ")}
                classNameTitle={styles["titleInput"]}
                key={indexField + "psField" + index}
              >
                <div>{value}</div>
              </InputComp>
            ))}
          </div>
        </Collapse>
      </div>
      <Line />
    </div>
  );
}
