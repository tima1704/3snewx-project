import { ITag, IValidError } from "Types";

import {
  CreatebleTags,
  InputTags,
  InputComp,
  Line,
  AsyncInputTags,
  Icon,
} from "Components/MiniComponents";

import styles from "../../Styles/index.module.css";

import OptionsCountry from "Data/Static/country.json";
import OptionDevices from "Data/Static/Offers/device.json";
import OptionConnectionType from "Data/Static/Offers/offerConnectionType.json";
import OptionCSL from "Data/Static/Offers/offerClickTTL.json";
import OptionBrowser from "Data/Static/browse.json";

import {
  IMobileCaries,
  IOs,
  ISubAccaunt,
  ITargetingOfferPersonal,
} from "../types";

import AEOfferOs from "../AEOfferOs";

import {
  fetchAutocompleteAffiliates,
  fetchAutocompleteVendor,
} from "Helpers/AutocompleteAPIFunc";
import {
  Col,
  Row,
  InputGroup,
  OverlayTrigger,
  Popover,
  Form,
  Button,
} from "react-bootstrap";

import AEOfferInformationPopover from "../AEOfferInformationPopover/AEOfferInformationPopover";
import AEMobileCarries from "../AEMobileCarries";
import AESubAccounts from "../AESubAccounts";
import { SUB_ACCOUNT } from "./constants";
import classNames from "classnames";

interface AETargetingTabProps {
  errors: IValidError[];
  targeting: ITargetingOfferPersonal;
  setTargeting: any;
  index?: number;
  personalTargeting?: boolean;
  onClickDeletePersonalTargeting?: any;
  loading: boolean;
  disabled: boolean;
}

export default function AETargetingTab({
  errors,
  targeting,
  setTargeting,
  index,
  personalTargeting,
  onClickDeletePersonalTargeting,
  loading,
  disabled,
}: AETargetingTabProps) {
  const onSelectMulti = (tags: ITag[], key: string) => {
    setTargeting({ ...targeting, [key]: tags.map((tag) => tag.value) }, index);
  };

  const onSelectCreatebleTag = (tag: ITag | ITag[], name: string) => {
    if (tag) {
      if (Array.isArray(tag)) {
        return setTargeting(
          {
            ...targeting,
            [name]: tag.map((item) => item.value),
          },
          index
        );
      } else {
        return setTargeting({ ...targeting, [name]: tag.value }, index);
      }
    }

    return setTargeting({ ...targeting, [name]: tag }, index);
  };

  const setOs = (os: IOs[]) => {
    setTargeting({ ...targeting, os }, index);
  };

  const setMC = (mobile_carrier: IMobileCaries[]) => {
    setTargeting({ ...targeting, mobile_carrier }, index);
  };

  const setSubAccount = (sub: ISubAccaunt[]) => {
    setTargeting({ ...targeting, sub }, index);
  };

  const onSelectAsync = (tag: ITag[], key: string) => {
    setTargeting({ ...targeting, [key]: tag }, index);
  };

  const onSelect = (tag: ITag | undefined, key: string) => {
    if (tag) {
      setTargeting({ ...targeting, [key]: tag.value }, index);
    } else {
      setTargeting({ ...targeting, [key]: "" }, index);
    }
  };

  const onChange = (value: string, key: string) => {
    setTargeting({ ...targeting, [key]: value }, index);
  };

  const onSelectAsyncAffiliates = (tags: ITag[]) => {
    setTargeting({ ...targeting, affiliate: tags }, index);
  };

  const onChecked = (e: React.ChangeEvent<HTMLInputElement>, key?: string) => {
    setTargeting(
      { ...targeting, [key || e.target.name]: e.target.checked },
      index
    );
  };

  return (
    <div className={"spaceBlock32"}>
      {personalTargeting && (
        <div style={{ marginTop: 30 }}>
          <div className={styles.redirectTypeRow}>
            <h1>
              Personal Targeting #{typeof index === "number" ? +index + 1 : ""}
            </h1>
            <Button
              variant={"danger"}
              onClick={() => {
                onClickDeletePersonalTargeting(index);
              }}
              disabled={loading || disabled}
            >
              Delete
            </Button>
          </div>
          <InputComp
            title={"Affiliate"}
            name={"affiliate"}
            errors={errors}
            loading={loading}
          >
            <AsyncInputTags
              isMulti={true}
              isClearable={true}
              onChange={onSelectAsyncAffiliates}
              name={"affiliate"}
              value={targeting.affiliate || []}
              loadAction={fetchAutocompleteAffiliates}
              disabled={disabled}
            />
          </InputComp>
        </div>
      )}

      <InputComp
        title={"Country"}
        name={"country"}
        errors={errors}
        loading={loading}
      >
        <div>
          <InputTags
            isMulti={true}
            isClearable={true}
            onChange={onSelectMulti}
            name={"country"}
            value={targeting.country}
            options={OptionsCountry}
            disabled={disabled}
          />
          <Form.Check
            type="checkbox"
            label="Country exclude"
            className={classNames(styles.checkbox, styles.checkboxMargin)}
            checked={targeting.country_exclude}
            onChange={onChecked}
            id={"country_exclude"}
            name={"country_exclude"}
            disabled={loading || disabled}
          />
        </div>
      </InputComp>

      <InputComp
        title={"Region"}
        name={"region"}
        errors={errors}
        loading={loading}
      >
        <div>
          <CreatebleTags
            isMulti
            isClearable
            value={targeting.region}
            onChange={onSelectCreatebleTag}
            name={"region"}
            isDisabled={disabled}
          />
          <Form.Check
            type="checkbox"
            label="Region exclude"
            className={classNames(styles.checkbox, styles.checkboxMargin)}
            checked={targeting.region_exclude}
            onChange={onChecked}
            id={"region_exclude"}
            name={"region_exclude"}
            disabled={loading || disabled}
          />
        </div>
      </InputComp>

      <InputComp
        title={"Cities"}
        name={"city"}
        errors={errors}
        loading={loading}
      >
        <div>
          <CreatebleTags
            isMulti
            isClearable
            value={targeting.city}
            onChange={onSelectCreatebleTag}
            name={"city"}
            isDisabled={disabled}
          />
          <Form.Check
            type="checkbox"
            label="City exclude"
            className={classNames(styles.checkbox, styles.checkboxMargin)}
            checked={targeting.city_exclude}
            onChange={onChecked}
            id={"city_exclude"}
            name={"city_exclude"}
            disabled={loading || disabled}
          />
        </div>
      </InputComp>

      <InputComp title={"OS"} name={"os"} errors={errors} loading={loading}>
        <div>
          <AEOfferOs os={targeting.os} setOs={setOs} disabled={disabled} />
          <Form.Check
            type="checkbox"
            label="OS exclude"
            className={classNames(styles.checkbox, styles.checkboxMargin)}
            checked={targeting.os_exclude}
            onChange={onChecked}
            id={"os_exclude"}
            name={"os_exclude"}
            disabled={loading || disabled}
          />
        </div>
      </InputComp>

      <InputComp
        title={"Devices"}
        name={"device"}
        errors={errors}
        loading={loading}
      >
        <div>
          <InputTags
            isMulti
            isClearable
            onChange={onSelectMulti}
            name={"device"}
            value={targeting.device}
            options={OptionDevices}
            disabled={disabled}
          />
          <Form.Check
            type="checkbox"
            label="Device exclude"
            className={classNames(styles.checkbox, styles.checkboxMargin)}
            checked={targeting.device_exclude}
            onChange={onChecked}
            id={"device_exclude"}
            name={"device_exclude"}
            disabled={loading || disabled}
          />
        </div>
      </InputComp>

      <InputComp
        title={"Mobile carriers"}
        name={"mobileCarriers"}
        errors={errors}
        loading={loading}
      >
        <div>
          <AEMobileCarries
            setMobileCarries={setMC}
            mobileCarriers={targeting.mobile_carrier}
            disabled={disabled}
          />

          <Form.Check
            type="checkbox"
            label="Mobile Carrier exclude"
            className={classNames(styles.checkbox, styles.checkboxMargin)}
            checked={targeting.mobile_carrier_exclude}
            onChange={onChecked}
            id={"mobile_carrier_exclude"}
            name={"mobile_carrier_exclude"}
            disabled={loading || disabled}
          />
        </div>
      </InputComp>

      <InputComp
        title={"Connection type"}
        name={"connection_type"}
        errors={errors}
        loading={loading}
      >
        <InputTags
          isClearable
          isMulti
          name={"connection_type"}
          onChange={onSelectMulti}
          value={targeting.connection_type}
          options={OptionConnectionType}
          disabled={disabled}
        />
      </InputComp>

      <InputComp
        title={"Vendors"}
        name={"vendors"}
        errors={errors}
        loading={loading}
      >
        <AsyncInputTags
          value={targeting.vendors}
          onChange={onSelectAsync}
          name={"vendors"}
          loadAction={fetchAutocompleteVendor}
          disabled={disabled}
        />
      </InputComp>

      <InputComp
        title={"Browser"}
        name={"browser"}
        errors={errors}
        loading={loading}
      >
        <InputTags
          isClearable
          isMulti
          name={"browser"}
          onChange={onSelectMulti}
          value={targeting.browser}
          options={OptionBrowser}
          disabled={disabled}
        />
      </InputComp>

      <InputComp title={"IP"} name={"ip"} errors={errors} loading={loading}>
        <CreatebleTags
          isMulti
          isClearable
          value={targeting.ip}
          onChange={onSelectCreatebleTag}
          name={"ip"}
          isDisabled={disabled}
        />
      </InputComp>

      <Line className={"spaceBlock32"} />

      <AESubAccounts
        setSubAccaunt={setSubAccount}
        subAccaunt={targeting.sub}
        loading={loading}
        disabled={disabled}
      />

      <InputComp
        title={"Block traffic if"}
        name={"block_by_empty_sub"}
        errors={errors}
        loading={loading}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <InputTags
            isMulti={false}
            value={targeting.block_by_empty_sub}
            className={styles.operatorInput}
            onChange={onSelect}
            name={"block_by_empty_sub"}
            options={SUB_ACCOUNT}
            isClearable
            disabled={disabled}
          />
          <p className={styles.isEmputyTarg}>is empty</p>
        </div>
      </InputComp>

      <Line className={"spaceBlock32"} />

      <InputComp
        title={"Click Session Lifespan"}
        name={"CSL"}
        errors={errors}
        loading={loading}
      >
        <Row>
          <Col sm="4">
            <InputTags
              isMulti={false}
              onChange={onSelect}
              name={"CSL"}
              value={targeting.CSL}
              options={OptionCSL}
              // className={styles.operatorInput}
              disabled={disabled}
            />
          </Col>
          {targeting.CSL === "custom" && (
            <Col>
              <InputGroup>
                <OverlayTrigger
                  trigger={["hover", "focus"]}
                  placement="top"
                  overlay={
                    <Popover id="popover-basic">
                      <AEOfferInformationPopover informationType="customDate" />
                    </Popover>
                  }
                >
                  <InputGroup.Text>
                    <Icon icon={"info"} />
                  </InputGroup.Text>
                </OverlayTrigger>

                <Form.Control
                  type="text"
                  placeholder="Text"
                  value={targeting?.CSLcustom || ""}
                  onChange={(e) => onChange(e.target.value, "CSLcustom")}
                  name={"CSLcustom"}
                  disabled={disabled}
                />
              </InputGroup>
            </Col>
          )}
        </Row>
      </InputComp>

      <InputComp
        title={"Minimal click session lifespan"}
        name={"minimal_click_ttl"}
        errors={errors}
        loading={loading}
      >
        <Row>
          <Col sm="4">
            <InputTags
              isMulti={false}
              onChange={onSelect}
              name={"minimal_click_ttl"}
              value={targeting.minimal_click_ttl}
              options={OptionCSL}
              disabled={disabled}
              // className={styles.operatorInput}
            />
          </Col>
          {targeting.minimal_click_ttl === "custom" && (
            <Col>
              <InputGroup>
                <OverlayTrigger
                  trigger={["hover", "focus"]}
                  placement="top"
                  overlay={
                    <Popover id="popover-basic">
                      <AEOfferInformationPopover informationType="customDate" />
                    </Popover>
                  }
                >
                  <InputGroup.Text>
                    <Icon icon={"info"} />
                  </InputGroup.Text>
                </OverlayTrigger>
                <Form.Control
                  type="text"
                  placeholder="1y1m1d1h1i1s"
                  value={targeting?.click_minimal_click_ttl || ""}
                  onChange={(e) =>
                    onChange(e.target.value, "click_minimal_click_ttl")
                  }
                  name={"click_minimal_click_ttl"}
                  disabled={disabled}
                />
              </InputGroup>
            </Col>
          )}
        </Row>
      </InputComp>

      <Line />
    </div>
  );
}
