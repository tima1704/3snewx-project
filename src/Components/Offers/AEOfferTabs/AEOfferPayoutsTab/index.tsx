import Immer from "immer";
import { useEffect, useState } from "react";
import { Col, Row, Button } from "react-bootstrap";
import { fetchPayoutOffersApi, savePayoutOffers } from "Helpers/api/Offers";
import { useAppDispatch, useAppSelector, useAsyncSave } from "Hooks";
import { Line } from "Components/MiniComponents";
import AEOfferFooter from "Components/Offers/OffersMiniComponents/AEOfferFooter";
import AEOfferPayoutsForm from "./AEOfferPayoutsForm";
import { initialPayout, initialStatePayouts, IPayout, IPayouts } from "./types";

export default function AEOfferPayoutsTab({
  draft = false,
  id,
}: {
  draft?: boolean;
  id: string;
}) {
  const [data, setData] = useState<IPayouts>(initialStatePayouts);

  const addGeneralPayout = () => {
    setData({ ...data, general: [...data.general, initialPayout] });
  };

  const addPersonalPayout = () => {
    setData({ ...data, personal: [...data.personal, initialPayout] });
  };

  const onChangeGeneral = (dataGeneral: IPayout, index: number) => {
    setData(
      Immer(data, (draftData) => {
        draftData.general[index] = dataGeneral;
      })
    );
  };

  const onChangePersonal = (dataPersonal: IPayout, index: number) => {
    setData(
      Immer(data, (draftData) => {
        draftData.personal[index] = dataPersonal;
      })
    );
  };

  const deleteGeneral = (index: number) => {
    setData(
      Immer(data, (draftData) => {
        draftData.general.splice(index, 1);
      })
    );
  };

  const deletePersonal = (index: number) => {
    setData(
      Immer(data, (draftData) => {
        draftData.personal.splice(index, 1);
      })
    );
  };

  const { disabled, execute } = useAsyncSave(savePayoutOffers, true);
  const { fillErrorsOffers } = useAppDispatch();
  const errors = useAppSelector(
    (state) => state.Offers.errors.OfferPayoutTabType
  );

  const onClickSave = () => {
    fillErrorsOffers("OfferPayoutTabType", []);
    execute(data, draft, id).catch((e) => {
      if (e.response) {
        fillErrorsOffers("OfferPayoutTabType", e.response.data.errors);
      }
    });
  };

  useEffect(() => {
    fetchPayoutOffersApi(draft, id).then((dataPayout) => {
      setData(dataPayout);
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      {data.general?.map((value, index) => (
        <AEOfferPayoutsForm
          value={value}
          index={index}
          key={"PAYOUT_GENERAL" + index}
          errors={errors}
          personal={false}
          setData={onChangeGeneral}
          onDelete={deleteGeneral}
          disabled={disabled}
        />
      ))}

      <Row className={"spaceBlock32"}>
        <Col>
          <Button onClick={addGeneralPayout}>Add General Payout</Button>
        </Col>
      </Row>

      <Line className={"spaceBlock32"} />

      {data.personal?.map((value, index) => (
        <AEOfferPayoutsForm
          personal
          value={value}
          index={index}
          key={"PAYOUT_PERSONAL" + index}
          errors={errors}
          setData={onChangePersonal}
          onDelete={deletePersonal}
          disabled={disabled}
        />
      ))}

      <Row className={"spaceBlock32"}>
        <Col>
          <Button onClick={addPersonalPayout} disabled={disabled}>
            Add Personal Payout
          </Button>
        </Col>
      </Row>

      <AEOfferFooter
        onClickSaveFunc={onClickSave}
        draft={draft}
        tab={"payout"}
        disabled={disabled}
      />
    </div>
  );
}
