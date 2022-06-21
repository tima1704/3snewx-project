import { Col, Form, Row, Button } from "react-bootstrap";
import { ButtonComp, InputComp, InputTags } from "Components/MiniComponents";

import { ISubAccaunt } from "../types";

import classNames from "classnames";
import immer from "immer";

import { SUB_ACCOUNT } from "../AETargetingTab/constants";
import { ITag } from "Types";

import styles from "../../Styles/index.module.css";

interface AESubAccountsProps {
  setSubAccaunt: any;
  subAccaunt: ISubAccaunt[];
  loading: boolean;
  disabled: boolean;
}

export default function AESubAccounts({
  subAccaunt,
  setSubAccaunt,
  loading,
  disabled,
}: AESubAccountsProps) {
  const onSelectSubAccount = (
    tag: ITag | undefined,
    name: string,
    index: number
  ) => {
    setSubAccaunt(
      immer(subAccaunt, (draftSubAccount) => {
        draftSubAccount[index].name = tag ? tag.value : "";
      })
    );
  };

  const onChangeSubAccount = (value: string, index: number) => {
    setSubAccaunt(
      immer(subAccaunt, (draftSubAccount) => {
        draftSubAccount[index].value = value;
      })
    );
  };

  const onChecked = (value: boolean, index: number) => {
    setSubAccaunt(
      immer(subAccaunt, (draftSubAccount) => {
        draftSubAccount[index].equals = value;
      })
    );
  };

  const addSubAccount = () => {
    setSubAccaunt([...subAccaunt, { value: "", equals: false, name: "sub1" }]);
  };

  const deleteSubAccount = (index: number) => {
    setSubAccaunt(
      immer(subAccaunt, (draftSubAccount) => {
        draftSubAccount.splice(index, 1);
      })
    );
  };

  return (
    <div>
      <InputComp title={"Sub Account"} errors={[]}>
        <div />
      </InputComp>
      {subAccaunt?.map((account, index) => {
        return (
          <Row key={index + "sub"}>
            <Col sm="3">
              <InputTags
                options={SUB_ACCOUNT}
                onChange={onSelectSubAccount}
                name={"name"}
                index={index}
                value={account.name}
                isMulti={false}
                disabled={loading || disabled}
              />
            </Col>
            <Col sm="9">
              <div
                className={classNames(
                  styles.inputRow,
                  styles.rowAllowedSubAccount
                )}
              >
                <Form.Control
                  type="text"
                  placeholder="Text"
                  value={account?.value || ""}
                  onChange={(e) => {
                    onChangeSubAccount(e.target.value, index);
                  }}
                  disabled={loading || disabled}
                />
                <ButtonComp
                  intent="close-light"
                  icon="close-fill"
                  onClick={() => {
                    deleteSubAccount(index);
                  }}
                  loading={loading || disabled}
                />
              </div>
              <Form.Check
                type="checkbox"
                label="Block"
                className={styles.checkbox}
                id={"allowedSubAccount" + index}
                onChange={(e) => {
                  onChecked(e.target.checked, index);
                }}
                checked={account.equals}
                disabled={loading || disabled}
              />
            </Col>
          </Row>
        );
      })}

      <Row className={"spaceBlock32"}>
        <Col sm="3"></Col>
        <Col sm="9">
          <Button
            onClick={addSubAccount}
            disabled={loading || subAccaunt?.length >= 8 || disabled}
          >
            Add sub account
          </Button>
        </Col>
      </Row>
    </div>
  );
}
