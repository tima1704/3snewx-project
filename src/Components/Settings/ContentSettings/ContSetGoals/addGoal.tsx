import { Collapse, Button } from "react-bootstrap";
import { SettingsApi } from "Helpers/api";
import { useAppDispatch, useAsyncSave } from "Hooks";
import { ErrorInputMessage, InputComp } from "Components/MiniComponents";
import { EGoalSet, IGoalSet } from "./types";

interface AddGoalContentSettingsProps {
  editData?: IGoalSet;
  setEditData: any;
}

export default function AddGoalContentSettings({
  editData,
  setEditData,
}: AddGoalContentSettingsProps) {
  const clickCanselEditGoal = () => {
    setEditData(undefined);
  };

  const { fetchSetGoals } = useAppDispatch();

  const onChange = (e: React.ChangeEvent<HTMLInputElement>, key?: EGoalSet) => {
    setEditData({ ...editData, [key || e.target.name]: e.target.value });
  };

  const { errors, disabled, execute } = useAsyncSave(
    SettingsApi.saveSttingsGoals,
    true
  );

  const clickSave = () => {
    if (editData) {
      execute(editData, editData.id).then(() => {
        fetchSetGoals();
        setEditData();
      });
    }
  };

  return (
    <Collapse in={editData ? true : false}>
      <div className={"spaceBlock32"}>
        <ErrorInputMessage errors={errors} inputName={"goal"} />
        <InputComp
          errors={errors}
          name={EGoalSet.title}
          value={editData?.title}
          title={"Title"}
          onChange={onChange}
          disabled={disabled}
        />
        <div className={"btnRowFlexEnd"}>
          <Button
            variant={"danger"}
            onClick={clickCanselEditGoal}
            className={"btn-close"}
          >
            Cansel
          </Button>
          <Button onClick={clickSave} disabled={disabled}>
            Save
          </Button>
        </div>
      </div>
    </Collapse>
  );
}
