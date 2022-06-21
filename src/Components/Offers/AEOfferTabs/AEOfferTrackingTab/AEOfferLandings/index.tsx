import { ITag, IValidError } from "Types";
import { ELanding, ITrackingTab } from "../types";

import styles from "./AEOfferLandings.module.css";
import classNames from "classnames";
import { InputComp, InputTags } from "Components/MiniComponents";

import LPType from "Data/Static/Offers/offerLandingPageType.json";

import { Button } from "react-bootstrap";

import { Dispatch, SetStateAction } from "react";
import Immer from "immer";

interface AEOfferLandingsProps {
  errors: IValidError[];

  setTracking: Dispatch<SetStateAction<ITrackingTab>>;
  tracking: ITrackingTab;
  disabled?: boolean;
  loading?: boolean;
}

export default function AEOfferLandings({
  errors,
  tracking,
  setTracking,
  disabled,
  loading,
}: AEOfferLandingsProps) {
  const deleteLP = (index: number) => {
    setTracking(
      Immer(tracking, (draftData) => {
        draftData.landing_page.splice(index, 1);
      })
    );
  };

  const addLP = () => {
    setTracking({
      ...tracking,
      landing_page: [
        ...tracking.landing_page,
        { title: "", tracking_url: "", preview_url: "", type: "landing" },
      ],
    });
  };

  const onChangeLP = (
    e: React.ChangeEvent<HTMLInputElement>,
    key: ELanding,
    index: number
  ) => {
    setTracking(
      Immer(tracking, (draftData) => {
        draftData.landing_page[index][key] = e.target.value;
      })
    );
  };

  const onSelect = (tag: ITag, key: ELanding, index: number) => {
    setTracking(
      Immer(tracking, (draftData) => {
        draftData.landing_page[index][key] = tag.value;
      })
    );
  };

  return (
    <div className={"spaceBlock32"}>
      {tracking.landing_page.map((item, index) => {
        return (
          <div key={index + "landing"}>
            <div className={classNames("spaceBlock32", styles.row)}>
              <div className={styles.title}>Landing page #{+index + 1}</div>
              <Button
                variant="danger"
                className={styles.delete_btn}
                onClick={() => deleteLP(index)}
                disabled={disabled || loading}
              >
                Delete
              </Button>
            </div>
            <InputComp
              errors={errors}
              title={"Title"}
              placeholder="Text"
              name="title"
              onChange={onChangeLP}
              value={item.title}
              index={index}
              disabled={disabled}
              loading={loading}
              id={"title" + index}
            />

            <InputComp
              errors={errors}
              title={"Tracking URL"}
              placeholder="Text"
              name="tracking_url"
              onChange={onChangeLP}
              value={item.tracking_url || ""}
              index={index}
              disabled={disabled}
              loading={loading}
              id={"tracking_url" + index}
            />

            <InputComp
              errors={errors}
              title={"Preview URL"}
              placeholder="Text"
              name="preview_url"
              onChange={onChangeLP}
              value={item.preview_url || ""}
              index={index}
              disabled={disabled}
              loading={loading}
              id={"preview_url" + index}
            />

            <InputComp
              errors={errors}
              title={"Type"}
              name={"type"}
              loading={loading}
            >
              <InputTags
                options={LPType}
                onChange={onSelect}
                name={"type"}
                index={index}
                value={item.type}
                isMulti={false}
                disabled={disabled}
              />
            </InputComp>
          </div>
        );
      })}
      <Button onClick={addLP} disabled={disabled || loading}>
        Add New landing page
      </Button>
    </div>
  );
}
