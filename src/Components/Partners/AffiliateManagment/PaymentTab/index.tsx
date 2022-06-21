import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "Hooks";
import AddEditPaymentTab from "./AddEditPaymentTab";
import { IPaymentEdit } from "./types";

import PaymentTabItem from "./PaymentTabItem";

import { SpinnerLogo } from "Components/MiniComponents";

export default function PaymentTabAffiliate({ id }: { id: string }) {
  const {
    fetchAvailablePaymentAffiliate,
    fetchAffiliatePayment,
  } = useAppDispatch();

  const listPayments = useAppSelector(
    (state) => state.Affiliate.activeAffiliate[id]?.paymentInfo
  );

  const [editData, setEditData] = useState<IPaymentEdit | undefined>();

  useEffect(() => {
    Promise.all([fetchAvailablePaymentAffiliate(), fetchAffiliatePayment(id)]);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!listPayments) {
    return (
      <div>
        <SpinnerLogo />
      </div>
    );
  }

  return (
    <div>
      <AddEditPaymentTab
        setEditData={setEditData}
        editData={editData}
        idAffiliate={id}
      />

      <div>
        {listPayments?.map((paymentItem, index) => (
          <PaymentTabItem
            {...paymentItem}
            index={index}
            key={index + "paymentList"}
            idAffiliate={id}
          />
        ))}
      </div>
    </div>
  );
}
