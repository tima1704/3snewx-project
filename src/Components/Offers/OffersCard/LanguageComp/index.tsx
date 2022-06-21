import { useLanguage } from "Hooks";
import { IOfferCard } from "Pages/Cabinet/Offers/OfferCard/types";

import { SelectLang, InputComp } from "Components/MiniComponents";
import ItemDataOffer from "./itemDataOffer";

import { getObjectOfArray } from "Helpers/CustomFunc";

import OptionsPrivacyLevel from "Data/Static/Offers/offerPrivacyLevel.json";

import styles from "./index.module.css";

export default function OfferCardLanguage({ data }: { data: IOfferCard }) {
  const { language, setLanguage, languagesNotGeneral } = useLanguage("eng");

  return (
    <div className={styles["languageSection"]}>
      <InputComp errors={[]}>
        <SelectLang
          languages={languagesNotGeneral}
          value={language}
          onSelect={setLanguage}
        />
      </InputComp>
      <div>
        <ItemDataOffer label="Description">
          <div
            dangerouslySetInnerHTML={{
              __html: data.description[language] || "",
            }}
          />
        </ItemDataOffer>
        <ItemDataOffer label="Geo">by</ItemDataOffer>
        <ItemDataOffer label="KPI">
          <div
            dangerouslySetInnerHTML={{
              __html: data.kpi[language] || "",
            }}
          />
        </ItemDataOffer>
        <ItemDataOffer label="Traffic sources">
          <div className={styles["trafficSources"]}>
            <div>
              <div className={styles["label"]}>Allowed:</div>
              <ul>
                {data.trafficSource.allow.map((item) => (
                  <li key={item.id + "allow"}>{item.title}</li>
                ))}
              </ul>
            </div>
            <div>
              <div className={styles["label"]}>Disallowed:</div>
              <ul>
                {data.trafficSource.disallow.map((item) => (
                  <li key={item.id + "dis"}>{item.title}</li>
                ))}
              </ul>
            </div>
          </div>
        </ItemDataOffer>
        <ItemDataOffer label="Status">{data.status}</ItemDataOffer>
        <ItemDataOffer label="Privacy level">
          {getObjectOfArray(OptionsPrivacyLevel, data.privacyLevel)?.label ||
            data.privacyLevel}
        </ItemDataOffer>
        <ItemDataOffer label="Top offer">
          {data.isTop ? "Yes" : "No"}
        </ItemDataOffer>
        <ItemDataOffer label="Connection type">
          <span>
            {data.connectionType.map((item, index) => (
              <span key={index + "type"}>{item} </span>
            ))}
          </span>
        </ItemDataOffer>
      </div>
    </div>
  );
}
