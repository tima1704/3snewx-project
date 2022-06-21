import { useEffect } from "react";

import { NavigationTabs } from "Components/MiniComponents";
import AdvertisersPrimaryInfo from "Components/Advertisers/AddEditAdvertisers/AdvertisersPrimaryInfo";

import { TabItemProps } from "Components/MiniComponents/NavigationTabs/TabItem";

import { URL_ADVERTISERS_NEW } from "Constants/URLConstants/URLCabinet/URLAdvertisers";

import { useAppDispatch } from "Hooks";

const links: TabItemProps[] = [
  {
    to: URL_ADVERTISERS_NEW,
    title: "Primary Info",
    includes: URL_ADVERTISERS_NEW,
  },
  {
    to: URL_ADVERTISERS_NEW,
    title: "Contacts",
    includes: "URL_ADVERTISERS_NEW",
  },
  {
    to: URL_ADVERTISERS_NEW,
    title: "Requisites",
    includes: "URL_ADVERTISERS_NEW",
  },
  {
    to: URL_ADVERTISERS_NEW,
    title: "Postbacks",
    includes: "URL_ADVERTISERS_NEW",
  },
  {
    to: URL_ADVERTISERS_NEW,
    title: "Documents",
    includes: "URL_ADVERTISERS_NEW",
  },
  {
    to: URL_ADVERTISERS_NEW,
    title: "Notes",
    includes: "URL_ADVERTISERS_NEW",
  },
];
export default function AddAdvertisersPage() {
  const { fetchAdvertFormInfo, removeAdvertInfo } = useAppDispatch();

  useEffect(() => {
    fetchAdvertFormInfo();

    return () => {
      removeAdvertInfo();
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="contnent-60p">
      <h1 className="title">New Advertiser</h1>
      <NavigationTabs items={links} />
      <AdvertisersPrimaryInfo isNew />
    </div>
  );
}
