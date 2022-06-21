import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import AdvertItem from "Components/Advertisers/AdvertItem";
import { SpinnerLogo } from "Components/MiniComponents";
import { URL_ADVERTISERS } from "Constants/URLConstants/URLCabinet";
import { useAppDispatch, useAppSelector } from "Hooks";

import stylesTable from "Styles/table.module.css";

export default function TableAdvertisers() {
  const { fetchAdvertList } = useAppDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAdvertList(setLoading);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const advetList = useAppSelector((state) => state.Advert.advertList);

  return (
    <section>
      filter
      <div>
        <Link to={URL_ADVERTISERS.URL_ADVERTISERS_NEW}>
          <Button>Add new Advertiser</Button>
        </Link>
      </div>
      {loading ? (
        <SpinnerLogo />
      ) : (
        <table className={stylesTable["table"]}>
          <thead className={stylesTable.headerTable}>
            <tr>
              <th>Id</th>
              <th>Company</th>
              <th>Contact person</th>
              <th>Messanger</th>
              <th>Email</th>
              <th>Manager</th>
              <th>Offers</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {advetList?.map((item, index) => (
              <AdvertItem {...item} key={"advertItem" + index} />
            ))}
          </tbody>
        </table>
      )}
    </section>
  );
}
