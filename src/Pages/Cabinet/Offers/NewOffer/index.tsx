import React from "react";
import AEOfferHeader from "Components/Offers/OffersMiniComponents/AEOfferHeader";
import AEOfferGeneralTab from "Components/Offers/AEOfferTabs/AEOfferGeneralTab";

import styles from "Components/Offers/AEOfferTabs/Styles/index.module.css";

export default function NewOffer({ draft = false }) {
  return (
    <section className={styles.ContentWrapper}>
      <AEOfferHeader className={styles.ContentWrapperMain} draft={draft} />
      <AEOfferGeneralTab newStatus draft={draft} />
    </section>
  );
}
