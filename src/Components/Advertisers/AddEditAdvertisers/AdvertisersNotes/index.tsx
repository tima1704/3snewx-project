import React, {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";

import { Link, useParams } from "react-router-dom";
import { URL_USERS } from "Constants/URLConstants/URLCabinet";
import { AdvertApi } from "Helpers/api";
import { useAsyncSave } from "Hooks";

import { Button, Collapse, FormControl } from "react-bootstrap";
import {
  ButtonComp,
  ErrorInputMessage,
  Icon,
  SpinnerLogo,
} from "Components/MiniComponents";

import styles from "./index.module.css";
import { IAdvertNotes, IEditAdvertNotes } from "./types";

interface IParams {
  id: string;
}

export default function AdvertisetsNotes() {
  const id = useParams<IParams>().id;

  const [data, setData] = useState<IAdvertNotes[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(() => {
    setLoading(true);
    AdvertApi.fetchAdvertNotes(id).then((res) => {
      if (res.data.data) {
        setData(res.data.data.notes);
        setLoading(false);
      }
    });
  }, [id]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const [editData, setEditData] = useState<IEditAdvertNotes | undefined>();

  const onClickEditNotes = (note: IEditAdvertNotes) => {
    setEditData(note);
  };

  return (
    <div>
      <AddEditNotes
        editData={editData}
        setEditData={setEditData}
        advertId={id}
        fetchData={fetchData}
      />
      <div>
        {loading ? (
          <SpinnerLogo />
        ) : (
          <div>
            <div className={styles["item_main"]}>
              <div className={styles["item_header_card"]}>Notes</div>
              <div className={styles["item_header_options"]}>Options</div>
            </div>
            {data.map((item, index) => (
              <NotesItem
                {...item}
                key={"notes" + index}
                onClickEditNotes={onClickEditNotes}
                fetchData={fetchData}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

interface AddEditNotesProps {
  setEditData: Dispatch<SetStateAction<IEditAdvertNotes | undefined>>;
  editData?: IEditAdvertNotes;
  advertId: string | number;
  fetchData: () => void;
}

function AddEditNotes({
  editData,
  setEditData,
  advertId,
  fetchData,
}: AddEditNotesProps) {
  const onClickNewNotes = () => {
    setEditData({ id: "new", text: "", advertId });
  };

  const onChangeText = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (editData) {
      setEditData({ ...editData, text: e.target.value });
    }
  };

  const onClickCansel = () => {
    setEditData(undefined);
  };

  const { execute, disabled, errors } = useAsyncSave(
    AdvertApi.saveAdvertNotes,
    editData?.id !== "new"
  );

  const onClickSave = () => {
    execute(editData).then(() => {
      fetchData();
      onClickCansel();
    });
  };

  return (
    <div>
      <div className={styles["btn_form"]}>
        <Button onClick={onClickNewNotes} disabled={editData ? true : false}>
          <Icon icon={"plus"} mr /> Add new note
        </Button>
      </div>
      <Collapse in={editData ? true : false}>
        <div className={styles["item_main"]}>
          <div className={styles["item_form"]}>
            <div>
              <FormControl
                as={"textarea"}
                onChange={onChangeText}
                value={editData?.text}
                disabled={disabled}
              />
              <ErrorInputMessage errors={errors} inputName="text" />
            </div>
          </div>
          <div className={styles["item_options"]}>
            <ButtonComp
              icon={"check"}
              intent={"close-light-notML"}
              disabled={disabled}
              onClick={onClickSave}
            />
            <ButtonComp
              icon={"close-fill"}
              intent={"close-light"}
              onClick={onClickCansel}
              disabled={disabled}
            />
          </div>
        </div>
      </Collapse>
    </div>
  );
}

interface NotesItemProps extends IAdvertNotes {
  onClickEditNotes: (note: IEditAdvertNotes) => void;
  fetchData: () => void;
}

function NotesItem({
  text,
  adminId,
  adminName,
  createdAt,
  updatedAt,
  id,
  advertId,
  onClickEditNotes,
  fetchData,
}: NotesItemProps) {
  const onClickEdit = () => {
    onClickEditNotes({ id, text, advertId });
  };

  const [disabled, setDisabled] = useState(false);

  const onClickDeliteNotes = () => {
    setDisabled(true);
    AdvertApi.deleteAdvertNotes(advertId, id).then(() => {
      fetchData();
      setDisabled(false);
    });
  };

  return (
    <div className={styles["item_main"]}>
      <div className={styles["item_card"]}>
        <div className={styles["item_card__text"]}>{text}</div>
        <div>
          <Link to={URL_USERS.URL_USER_ID_EDIT_GENERAL(adminId)}>
            {adminName}
          </Link>
          ,{" "}
          <span className={styles["item_card__date"]}>
            {updatedAt || createdAt}
          </span>
        </div>
      </div>
      <div className={styles["item_options"]}>
        <div>
          <ButtonComp
            icon={"pencil"}
            intent={"close-light-notML"}
            onClick={onClickEdit}
            disabled={disabled}
          />
          <ButtonComp
            icon={"trash"}
            intent={"close-light"}
            disabled={disabled}
            onClick={onClickDeliteNotes}
          />
        </div>
      </div>
    </div>
  );
}
