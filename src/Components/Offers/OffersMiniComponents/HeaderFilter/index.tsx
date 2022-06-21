import React, { useMemo, useState } from "react";

import styles from "./HeaderFilter.module.css";

import { Form, Col, Button } from "react-bootstrap";
import {
  fetchAutocompleteAdverticer,
  fetchAutocompleteCategories,
  fetchAutocompleteTags,
} from "Helpers/AutocompleteAPIFunc";

import {
  InputSearch,
  AsyncInputTags,
  InputTags,
} from "Components/MiniComponents";

// import OptionOS from "Data/Static/os.json";
import OptionsPrivacyLevel from "Data/Static/Offers/offerPrivacyLevel.json";
import OptionsStatus from "Data/Static/Offers/offerStatus.json";
import OptionsCountry from "Data/Static/country.json";

import { useAppDispatch, useAppSelector } from "Hooks";
import { IFilterOffers, initialFilterOffers } from "./types";

import { ITag } from "Types";

export default function HeaderFilter() {
  const [filter, setFilter] = useState<IFilterOffers>(initialFilterOffers);

  const trafficSources = useAppSelector(
    (state) => state.Offers.mainInfo.trafficSources
  );
  const { onSetFilterOffers } = useAppDispatch();

  const OptionsTrafficSources = useMemo(() => {
    if (trafficSources) {
      return trafficSources.map((tr) => ({
        value: tr.id,
        label: tr.text,
      }));
    }
    return [];
  }, [trafficSources]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>, key: string) => {
    setFilter({ ...filter, [key]: e.target.value });
  };

  const onSelect = (tags: ITag[], key: string) => {
    setFilter({ ...filter, [key]: tags.map((tag) => tag.value) });
  };

  const onSelectAsync = (tags: ITag[] | ITag, key: string) => {
    setFilter({ ...filter, [key]: tags });
  };

  const onChangeSize = (value: string) => {
    setFilter({ ...filter, size: value });
  };

  const onClickShowResult = () => {
    onSetFilterOffers(filter);
  };

  return (
    <section className="filter mb-3">
      <div className="d-flex">
        <div className={styles["filterMain"]}>
          <Col xs="auto">
            <InputSearch
              name="offer_filter[title]"
              placeholder="Search by Name/ID"
              mb20={false}
              onChange={(e) => {
                onChange(e, "title");
              }}
              value={filter.title}
            />
          </Col>
          <Col xs="auto">
            <InputTags
              options={OptionsStatus}
              onChange={onSelect}
              name={"status"}
              value={filter.status}
              isMulti={true}
              placeholder="Status"
            />
          </Col>
          <Col xs="auto">
            <AsyncInputTags
              value={filter.category}
              // onDispatchTags={onSelectTags}
              name={"category"}
              loadAction={fetchAutocompleteCategories}
              onChange={onSelectAsync}
              placeholder="Category"
            />
          </Col>
          <Col xs="auto">
            <InputTags
              isMulti={true}
              isClearable={true}
              name={"traffic_sources"}
              value={filter.traffic_sources}
              onChange={onSelect}
              placeholder="Traffic sources"
              options={OptionsTrafficSources}
            />
          </Col>
          <Col xs="auto">
            <InputTags
              isMulti={true}
              isClearable={true}
              name={"country"}
              value={filter.country}
              onChange={onSelect}
              placeholder="Country"
              options={OptionsCountry}
            />
          </Col>
          <Col xs="auto">
            <AsyncInputTags
              isMulti={false}
              onChange={onSelectAsync}
              name={"advert_id"}
              isClearable
              value={filter.advert_id}
              loadAction={fetchAutocompleteAdverticer}
              placeholder="Advertiser"
            />
          </Col>
          {/* <Col xs="auto">
            <InputTags
              isMulti={false}
              isClearable={true}
              options={OptionOS}
              name={"osSelect"}
              onChange={onChange}
              // tags={value?.osSelect}
              // onDispatchTags={onChangeArrayAEOfferOS}
              // index={index}
              
              placeholder="OS"
            />
          </Col> */}
          <Col xs="auto">
            <InputTags
              value={filter.privacy_level}
              options={OptionsPrivacyLevel}
              isMulti={true}
              onChange={onSelect}
              name={"privacy_level"}
              placeholder="Privacy level"
            />
          </Col>
          <Col xs="auto">
            <AsyncInputTags
              value={filter.tags}
              name={"tags"}
              loadAction={fetchAutocompleteTags}
              onChange={onSelectAsync}
              placeholder="Tags"
            />
          </Col>
        </div>

        <div>
          <Form.Control
            name="size"
            type="text"
            className="d-inline mr-3"
            style={{ width: "auto" }}
            onChange={(e) => {
              onChangeSize(e.target.value);
            }}
            value={filter.size}
          />
          <Button
            className="d-inline"
            variant="primary"
            onClick={onClickShowResult}
          >
            Show Results
          </Button>
        </div>
      </div>
    </section>
  );
}
