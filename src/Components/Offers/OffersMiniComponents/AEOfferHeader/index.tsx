import { AxiosError } from "axios";
import React, { useMemo } from "react";

import { Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { URL_OFFER } from "Constants/URLConstants/URLCabinet";
import { publickOfferDraftApi } from "Helpers/api/Offers";
import { useAppDispatch, useAppSelector, useAsyncSave } from "Hooks";
import { resetErroresOffers } from "Redux/OffersRedux/types";

import { NavigationTabs } from "Components/MiniComponents";
import { TabItemProps } from "Components/MiniComponents/NavigationTabs/TabItem";
import { OFFER_TABS_URL } from "./Constants";

export default function AEOfferHeader({
  draft = false,
  className = "",
  id = "new",
}) {
  const errors = useAppSelector((state) => state.Offers.errors);

  const itemsNavigation = useMemo<TabItemProps[]>(() => {
    return OFFER_TABS_URL.map(({ title, includes, tab }) => {
      return {
        title,
        includes,
        to: URL_OFFER.URL_OFFERS_EDIT_TAB(draft, id, includes),
        badges: errors[tab].length,
      };
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [errors]);

  const history = useHistory();

  const { fillFullErrorsOffers } = useAppDispatch();

  const { execute, disabled } = useAsyncSave(publickOfferDraftApi);
  const onClickPublicOffer = () => {
    execute(id)
      .then(() => {
        if (!draft) {
          history.push(URL_OFFER.URL_OFFERS);
        } else {
          history.push(URL_OFFER.URL_OFFERS_DRAFT);
        }
      })
      .catch((e: AxiosError) => {
        if (e.response?.data.status === "error" && e.response.data.error) {
          history.push(URL_OFFER.URL_OFFERS_EDIT_TAB(draft, id));
          fillFullErrorsOffers({
            ...resetErroresOffers,
            ...e.response.data.error,
          });
        }
      });
  };

  return (
    <div className={className}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <h4>
          {id !== "new"
            ? `Edit Offer${draft ? "-draft" : ""} ${id}`
            : `Add new Offer${draft ? "-draft" : ""}`}
        </h4>
        {draft && id !== "new" && (
          <Button
            disabled={disabled}
            onClick={onClickPublicOffer}
            style={{ height: 38 }}
          >
            Public Offer
          </Button>
        )}
      </div>

      {/* <Form
      // onSubmit={this.submitData}
      >
        <Button>Duplicate offer</Button>
        <Form.Group as={Row} controlId="formPlaintextEmail">
          <Form.Label column sm="2" className="m-auto">
            Duplicate from
          </Form.Label>
          <Col sm="8" className="m-auto">
            <Form.Control
              as="select"
              placeholder="Select offer"
              className="m-auto"
            >
              <option>Select offer</option>
            </Form.Control>
          </Col>
          <Form.Label column sm="2" className="m-auto">
            <Button variant="outline-secondary" className="w-100" disabled>
              Apply
            </Button>
          </Form.Label>
        </Form.Group>
      </Form> */}

      <NavigationTabs items={itemsNavigation} />
    </div>
  );
}
