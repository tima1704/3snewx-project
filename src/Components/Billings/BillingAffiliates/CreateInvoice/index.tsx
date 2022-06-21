import React from "react";
import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { URL_BILLING } from "Constants/URLConstants/URLCabinet";
import {
  fetchAutocompleteAffiliates,
  fetchAutocompleteOffers,
} from "Helpers/AutocompleteAPIFunc";
import { ITag } from "Types";
import {
  DatePickerComp,
  InputComp,
  AsyncInputTags,
} from "Components/MiniComponents";

import styles from "./BillingAffiliatesCreateInvoice.module.css";
import BillingErrorComp from "./BillingErrorComp";
import { ICreateInvoice, IErrorbilling } from "./types";

const errorConstract: IErrorbilling[] = [
  {
    type: "collection",
    value: [
      {
        text:
          "For Affiliate (4502)fastnews21c@gmail.com Payout are 44. Min payment is 50. More conversions need to be included to the invoice",
      },
      {
        text:
          "Was not find payment system for the Invoice 00941 for Affiliate (4849) hananaev@mail.com. Do you want to notify Affiliate about it?”",
        btn: { text: "Notify" },
      },
    ],
    text: "4502 fastnews21c@gmail.com",
  },
  {
    type: "collection",
    value: [
      {
        text:
          "For Affiliate (4502)fastnews21c@gmail.com Payout are 44. Min payment is 50. More conversions need to be included to the invoice",
      },
      {
        text:
          "Was not find payment system for the Invoice 00941 for Affiliate (4849) hananaev@mail.com. Do you want to notify Affiliate about it?”",
        btn: { text: "Notify" },
      },
    ],
    text: "4502 fastnews21c@gmail.com",
  },
  {
    text: "Was not find payment system for the Invoice 00941",
    btn: {
      text: "Argens",
      link: "api.host.com/notify",
    },
  },
];

export default function BillingAffiliatesCreateInvoice() {
  const [data, setData] = useState<ICreateInvoice>({
    comment: "",
    affiliates: [],
    offers: [],
  });

  const onSelect = (tags: ITag[], key: string) => {
    setData({ ...data, [key]: tags });
  };

  const onChangeComment = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, comment: e.target.value });
  };

  const onChangeDate = (date: Date) => {
    setData({ ...data, date });
  };

  const router = useHistory();
  const onClickGenerateInvoice = () => {
    router.push(URL_BILLING.URL_BILLING_AFF_INVOICE_ID_PRIMARY_INFO(1));
  };

  return (
    <div className={"wrapper"}>
      <div className={styles["rowInvoice"]}>
        <div className={styles["formInvoice"]}>
          <h1 className={styles["title"]}>Generate invoice</h1>
          <InputComp title={"Date"} errors={[]}>
            <div className={styles["dateRow"]}>
              <div className={styles["dateInput"]}>
                <DatePickerComp
                  onChange={onChangeDate}
                  value={data?.date || new Date()}
                />
              </div>
              {data.date && (
                <Button className={styles["dateBtn"]}>
                  Fill Automatically
                </Button>
              )}
            </div>
          </InputComp>
          <InputComp title={"Affiliate"} errors={[]}>
            <AsyncInputTags
              isMulti
              isClearable
              loadAction={fetchAutocompleteAffiliates}
              onChange={onSelect}
              value={data.affiliates}
              name={"affiliates"}
            />
          </InputComp>
          <InputComp title={"Offers"} errors={[]}>
            <AsyncInputTags
              isMulti
              isClearable
              loadAction={fetchAutocompleteOffers}
              onChange={onSelect}
              value={data.offers}
              name={"offers"}
            />
          </InputComp>
          <InputComp title={"Comment"} errors={[]}>
            <Form.Control
              as="textarea"
              rows={3}
              onChange={onChangeComment}
              value={data.comment}
            />
          </InputComp>
          <div className={styles["btnRow"]}>
            <Button className={styles["btn"]} onClick={onClickGenerateInvoice}>
              Generate
            </Button>
          </div>
        </div>
        <div className={styles["errorInvoice"]}>
          {errorConstract.length > 0 && (
            <h2 className={styles["errorTitle"]}>Errors:</h2>
          )}
          <div>
            {errorConstract.map((error, index) => (
              <BillingErrorComp
                {...error}
                index={index}
                key={index + "accord"}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
