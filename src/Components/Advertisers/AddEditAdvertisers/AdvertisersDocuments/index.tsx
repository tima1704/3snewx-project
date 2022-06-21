import { useEffect, useState } from "react";

import { useParams } from "react-router-dom";
import { AdvertApi } from "Helpers/api";
import { IDocumentAdvert, IDocumnetsAdvert } from "./types";

import { Button, Collapse } from "react-bootstrap";
import {
  ButtonComp,
  SpinnerLogo,
  Icon,
  PaginationComp,
} from "Components/MiniComponents";
import { API_ADVERT } from "Constants/APIConstants";

import stylesTable from "Styles/table.module.css";
import styles from "./index.module.css";

interface IParams {
  id: string;
}

export default function AdvertisersDocument() {
  const id = useParams<IParams>().id;

  const [data, setData] = useState<IDocumnetsAdvert | undefined>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    AdvertApi.fetchAdvertDocuments(id).then((res) => {
      setData({ ...res.data.data, countPerPage: 20 });
      setLoading(false);
    });
  }, [id]);

  return (
    <div>
      <UploadDocument />
      {!loading ? (
        <div>
          <table className={stylesTable.table}>
            <thead className={stylesTable.headerTable}>
              <tr>
                <th>Date</th>
                <th>File name</th>
                <th>Description</th>
                <th>Uloaded</th>
                <th>Options</th>
              </tr>
            </thead>
            <tbody>
              {data?.documents.map((document, index) => (
                <DocumentItem
                  key={index + "document"}
                  data={document}
                  advertId={id}
                />
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <SpinnerLogo />
      )}
      <div className={styles["pageinationRow"]}>
        <div>{data?.totalCount || 0}</div>
        <div>
          <PaginationComp />
        </div>
      </div>
    </div>
  );
}

function UploadDocument() {
  return (
    <div>
      <Button>
        <Icon icon={"plus"} mr />
        Upload new document
      </Button>
      <div>
        <Collapse in>
          <div>
            <div>Input Input BTN</div>

            <Collapse in>
              <div>
                RANGE <div>Persent</div>
              </div>
            </Collapse>
          </div>
        </Collapse>
      </div>
    </div>
  );
}

interface DocumentItemProps {
  data?: IDocumentAdvert;
  loading?: boolean;
  advertId: string;
}

function DocumentItem({ data, loading, advertId }: DocumentItemProps) {
  if (loading) {
    <tr className={stylesTable.trTable}></tr>;
  }

  const onClickDownload = () => {
    if (data) {
      window.open(
        API_ADVERT.API_ADVERT_DOCUMENTS_DOWNLOAD(advertId, data.hash)
      );
    }
  };

  return (
    <tr className={stylesTable.trTable}>
      <td>{data?.created_at}</td>
      <td>{data?.title}</td>
      <td>{data?.name}</td>
      <td>userName</td>
      <td>
        <ButtonComp
          text="Download"
          intent="light"
          className={styles["btnDownload"]}
          onClick={onClickDownload}
        />
        <ButtonComp icon={"pencil"} intent={"close-light"} />
        <ButtonComp icon={"trash"} intent={"close-light"} />
      </td>
    </tr>
  );
}
