import { useEffect } from "react";
import { Redirect, Route, Switch, useParams } from "react-router-dom";
import AdvertisersContactInfo from "Components/Advertisers/AddEditAdvertisers/AdvertisersContactInfo";
import AdvertisersDocument from "Components/Advertisers/AddEditAdvertisers/AdvertisersDocuments";
import AdvertisetsNotes from "Components/Advertisers/AddEditAdvertisers/AdvertisersNotes";
import AdvertisersPostbacks from "Components/Advertisers/AddEditAdvertisers/AdvertisersPostbacks";
import AdvertisersPrimaryInfo from "Components/Advertisers/AddEditAdvertisers/AdvertisersPrimaryInfo";
import AdvertisersRequesites from "Components/Advertisers/AddEditAdvertisers/AdvertisersRequesites";
import { NavigationTabs } from "Components/MiniComponents";
import { TabItemProps } from "Components/MiniComponents/NavigationTabs/TabItem";
import {
  URL_ADVERTISERS_EDIT,
  URL_ADVERTISERS_EDIT_$ID_CONTACTS,
  URL_ADVERTISERS_EDIT_$ID_DOCUMENTS,
  URL_ADVERTISERS_EDIT_$ID_NOTES,
  URL_ADVERTISERS_EDIT_$ID_POSTBACKS,
  URL_ADVERTISERS_EDIT_$ID_PRIMARY_INFO,
  URL_ADVERTISERS_EDIT_$ID_REQUISITES,
} from "Constants/URLConstants/URLCabinet/URLAdvertisers";
import { useAppDispatch } from "Hooks";

interface IParams {
  id: string;
}

export default function EditAdvertisersPages() {
  const id = useParams<IParams>().id;

  const navigationLinks: TabItemProps[] = [
    {
      to: URL_ADVERTISERS_EDIT(id, "primary-info"),
      title: "Primary Info",
      includes: URL_ADVERTISERS_EDIT(id, "primary-info"),
    },
    {
      to: URL_ADVERTISERS_EDIT(id, "contacts"),
      title: "Contacts",
      includes: URL_ADVERTISERS_EDIT(id, "contacts"),
    },
    {
      to: URL_ADVERTISERS_EDIT(id, "requisites"),
      title: "Requisites",
      includes: URL_ADVERTISERS_EDIT(id, "requisites"),
    },
    {
      to: URL_ADVERTISERS_EDIT(id, "postbacks"),
      title: "Postbacks",
      includes: URL_ADVERTISERS_EDIT(id, "postbacks"),
    },
    {
      to: URL_ADVERTISERS_EDIT(id, "documents"),
      title: "Documents",
      includes: URL_ADVERTISERS_EDIT(id, "documents"),
    },
    {
      to: URL_ADVERTISERS_EDIT(id, "notes"),
      title: "Notes",
      includes: URL_ADVERTISERS_EDIT(id, "notes"),
    },
  ];

  const {
    fetchAdvert,
    fetchAdvertFormInfo,
    removeAdvertInfo,
  } = useAppDispatch();

  useEffect(() => {
    fetchAdvertFormInfo();
    fetchAdvert(id);

    return () => {
      removeAdvertInfo();
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return (
    <div className="contnent-60p">
      <h1 className="title">Edit Advertiser {id}</h1>
      <NavigationTabs items={navigationLinks} />
      <Switch>
        <Route
          path={URL_ADVERTISERS_EDIT_$ID_PRIMARY_INFO}
          children={<AdvertisersPrimaryInfo isNew={false} />}
          exact
        />
        <Route
          path={URL_ADVERTISERS_EDIT_$ID_CONTACTS}
          component={AdvertisersContactInfo}
          exact
        />
        <Route
          path={URL_ADVERTISERS_EDIT_$ID_REQUISITES}
          component={AdvertisersRequesites}
          exact
        />
        <Route
          path={URL_ADVERTISERS_EDIT_$ID_POSTBACKS}
          component={AdvertisersPostbacks}
          exact
        />
        <Route
          path={URL_ADVERTISERS_EDIT_$ID_DOCUMENTS}
          component={AdvertisersDocument}
          exact
        />
        <Route
          path={URL_ADVERTISERS_EDIT_$ID_NOTES}
          component={AdvertisetsNotes}
          exact
        />
        <Redirect to={URL_ADVERTISERS_EDIT(id, "primary-info")} />
      </Switch>
    </div>
  );
}
