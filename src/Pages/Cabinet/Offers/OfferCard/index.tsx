import React, { useEffect, useState } from "react";

import { Link, useParams } from "react-router-dom";
import { InputComp, SpinnerLogo } from "Components/MiniComponents";

import OfferAffiliatesCard from "Components/Offers/OffersCard/Affiliates";
import OfferCardLanguage from "Components/Offers/OffersCard/LanguageComp";
// import OfferCardRequests from "Components/Offers/OffersCard/Requests";
import { Button } from "react-bootstrap";

import { URL_ADVERTISERS_EDIT } from "Constants/URLConstants/URLCabinet/URLAdvertisers";
import { URL_OFFERS_EDIT_TAB } from "Constants/URLConstants/URLCabinet/URLOffers";

import { OffersApi } from "Helpers/api";

import { getObjectOfArray } from "Helpers/CustomFunc";
import { useAppDispatch } from "Hooks";
import { initialCardOffer, IOfferCard } from "./types";

import OptionsCLS from "Data/Static/Offers/offerClickTTL.json";

import styles from "Styles/pagesStyles/OfferCard.module.css";
import stylesTable from "Styles/table.module.css";

interface Iparams {
  id: string;
}

export default function OfferCard({ draft = false }) {
  const [data, setData] = useState<IOfferCard>(initialCardOffer);

  const [loading, setLoading] = useState(true);

  const id = useParams<Iparams>().id;

  const {
    fetchOffersAffiliatesEnebled,
    fetchOffersAffiliatesDisabled,
    fetchOffersCardRequests,
  } = useAppDispatch();

  useEffect(() => {
    OffersApi.fetchOfferCard(draft, id).then((res) => {
      const offer = res.data.offer;
      setData({
        ...data,
        ...offer,
      });
      setLoading(false);
    });

    fetchOffersAffiliatesEnebled(id, draft);
    fetchOffersAffiliatesDisabled(id, draft);

    if (!draft) {
      fetchOffersCardRequests(id);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // console.log(data);

  if (loading) {
    return (
      <div className={"wrapper"}>
        <SpinnerLogo />
      </div>
    );
  }

  return (
    <div className={"wrapper"}>
      <h1 className={styles["title"]}>{data.title}</h1>
      <div className={styles["affiliateRow"]}>
        <div className={styles["infoPlace"]}>
          <div className={styles["offerRowBtn"]}>
            <div>
              {/* <Button>Duplicate offer</Button> */}
              <Link to={URL_OFFERS_EDIT_TAB(draft, id)}>
                <Button
                // className={styles["editBtn"]}
                >
                  Edit Offer
                </Button>
              </Link>
            </div>

            <div>
              <Button>Statistics</Button>
            </div>
          </div>
          <div className={styles["offerLogo"]}></div>
          <InputComp
            title={"ID"}
            classNameTitle={styles["titleBtnCompInactive"]}
            errors={[]}
          >
            <div className={styles["textVerticalAlign"]}>{id}</div>
          </InputComp>
          {/* <InputComp
            errors={[]}
            title={"External offer ID"}
            classNameTitle={styles["titleBtnCompInactive"]}
          >
            <div className={styles["textVerticalAlign"]}>
               2298 (5ee0fcv76vd8xgb7) 
            </div>
          </InputComp> */}
          <InputComp
            errors={[]}
            title={"Advertiser"}
            classNameTitle={styles["titleBtnCompInactive"]}
          >
            <div className={styles["textVerticalAlign"]}>
              <Link to={URL_ADVERTISERS_EDIT(data.advert?.id || "")}>
                {data.advert?.title}
              </Link>
            </div>
          </InputComp>
          <InputComp
            errors={[]}
            title={"Tracking URL"}
            classNameTitle={styles["titleBtnCompInactive"]}
          >
            <div className={styles["textVerticalAlign"]}>
              {data.trackingUrl}
            </div>
          </InputComp>
          <InputComp
            errors={[]}
            title={"Preview URL"}
            classNameTitle={styles["titleBtnCompInactive"]}
          >
            <div className={styles["textVerticalAlign"]}>{data.previewUrl}</div>
          </InputComp>
          <InputComp
            errors={[]}
            title={"Click Session Lifespan"}
            classNameTitle={styles["titleBtnCompInactive"]}
          >
            <div className={styles["textVerticalAlign"]}>
              {data.clickTtl === "custom"
                ? data.clickTtlCustom
                : getObjectOfArray(OptionsCLS, data.clickTtl)?.label}
            </div>
          </InputComp>

          <OfferCardLanguage data={data} />
        </div>

        <div className={styles["affiliatePlace"]}>
          <OfferAffiliatesCard draft={draft} id={id} />
        </div>
      </div>
      <div>
        <h1 className={styles["titleTable"]}>Targeting groups</h1>
        <table className={stylesTable["table"]}>
          <thead className={stylesTable["headerTable"]}>
            <tr>
              <th>Affiliate</th>
              <th>Country</th>
              <th>City</th>
              <th>Region</th>
              <th>OS</th>
              <th>Devices</th>
              <th>Mobile carries</th>
              <th>Connection type</th>
            </tr>
          </thead>
          <tbody>
            {/* {list.map((user, index) => (
              <tr
                className={stylesTable["trTable"]}
                key={user.id + "user" + index}
              >
                <td>{user.status}</td>
                <td>{user.email}</td>
                <td>{user.first_name}</td>
                <td>{user.second_name}</td>
                <td>{user.skype}</td>
                <td>{user.roles.length > 0 ? user.roles[0] : ""}</td>
                <td>{user.last_login_dt}</td>
                <td className={stylesTable["actionsTwo"]}></td>
              </tr>
            ))} */}
          </tbody>
        </table>
      </div>
      <div className="contnent-60p">
        <h1 className={styles["titleTable"]}>Caps</h1>
        <table className={stylesTable["table"]}>
          <thead className={stylesTable["headerTable"]}>
            <tr>
              <th>Cap</th>
              <th>Timeframe</th>
              <th>Type</th>
              <th>Value</th>
              <th>Goal</th>
              <th>Affiliates</th>
            </tr>
          </thead>
          <tbody>
            {data.caps.map((cap, index) => (
              <tr
                className={stylesTable["trTable"]}
                key={cap.id + "cap" + index}
              >
                <td>{cap.id || index + 1}</td>
                <td>{cap.timeframe}</td>
                <td>{cap.type}</td>
                <td>{cap.value}</td>
                <td>{cap.goal}</td>
                <td>
                  {cap.affiliateType === "select"
                    ? cap.affiliate.length
                    : cap.affiliateType}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div>
        <h1 className={styles["titleTable"]}>Payments</h1>
        <table className={stylesTable["table"]}>
          <thead className={stylesTable["headerTable"]}>
            <tr>
              <th>Country</th>
              <th>City</th>
              <th>Payment type</th>
              <th>Total</th>
              <th>Payouts</th>
              <th>Goal value</th>
              <th>Goal title</th>
              <th>Devices</th>
              <th>OS</th>
            </tr>
          </thead>
          <tbody>
            {/* {list.map((user, index) => (
              <tr
                className={stylesTable["trTable"]}
                key={user.id + "user" + index}
              >
                <td>{user.status}</td>
                <td>{user.email}</td>
                <td>{user.first_name}</td>
                <td>{user.second_name}</td>
                <td>{user.skype}</td>
                <td>{user.roles.length > 0 ? user.roles[0] : ""}</td>
                <td>{user.last_login_dt}</td>
                <td className={stylesTable["actionsTwo"]}></td>
              </tr>
            ))} */}
          </tbody>
        </table>
      </div>
      <div>
        <h1 className={styles["titleTable"]}>Landing pages</h1>
        <table className={stylesTable["table"]}>
          <thead className={stylesTable["headerTable"]}>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Tracking URL</th>
              <th>Preview URL</th>
              <th>Prelanding</th>
            </tr>
          </thead>
          <tbody>
            {data.landingPages.map((lp, index) => (
              <tr className={stylesTable["trTable"]} key={lp.id + "lp" + index}>
                <td>{lp.id || index + 1}</td>
                <td>{lp.title}</td>
                <td>{lp.trackingUrl}</td>
                <td>{lp.previewUrl}</td>
                <td>{lp.type}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="contnent-40p">
        <h1 className={styles["titleTable"]}>Others</h1>
        <table className={stylesTable["table"]}>
          <tbody>
            <tr className={stylesTable["trTable"]}>
              <td>Hold period</td>
              <td>{data.conversionHoldPeriod}</td>
            </tr>
            <tr className={stylesTable["trTable"]}>
              <td>Categories</td>
              <td>
                {data.categories.map((category) => (
                  <>{category.title} </>
                ))}
              </td>
            </tr>
            <tr className={stylesTable["trTable"]}>
              <td>Allow deeplinks</td>
              <td>{data.allowDeeplinks ? "Yes" : "No"}</td>
            </tr>
            <tr className={stylesTable["trTable"]}>
              <td>CR</td>
              <td>{data.cr || "-"}</td>
            </tr>
            <tr className={stylesTable["trTable"]}>
              <td>EPC</td>
              <td>{data.epc || "-"}</td>
            </tr>
            <tr className={stylesTable["trTable"]}>
              <td>Restrict the OS</td>
              <td></td>
            </tr>
            <tr className={stylesTable["trTable"]}>
              <td>Internal notice</td>
              <td></td>
            </tr>
            <tr className={stylesTable["trTable"]}>
              <td>Created at</td>
              <td>{data.createdAt}</td>
            </tr>
            <tr className={stylesTable["trTable"]}>
              <td>Updated at</td>
              <td>{data.updatedAt}</td>
            </tr>
            <tr className={stylesTable["trTable"]}>
              <td>Released at</td>
              <td>{data.releaseDate}</td>
            </tr>
          </tbody>
        </table>
      </div>
      {/* {!draft && <OfferCardRequests offerId={id} />} */}
    </div>
  );
}
