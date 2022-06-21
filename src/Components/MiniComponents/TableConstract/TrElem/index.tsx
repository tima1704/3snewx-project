import { useState } from "react";
import { Collapse } from "react-bootstrap";
import TableConstract from "..";
import { fetchStatisticksBreakLine } from "Helpers/api/Statistics";
import { SpinnerLogo } from "Components/MiniComponents";
import TdElem from "../TdElem";
import { ITableConstract, TContentItem } from "../types";

interface TrElemProps {
  allCol: number;
  tdItems: TContentItem[];
}

export default function TrElem({ allCol, tdItems }: TrElemProps) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<ITableConstract | undefined>();

  const onClickOpenTable = (link: string) => {
    if (!open) {
      setOpen(true);
      setLoading(true);
      setData(undefined);

      fetchStatisticksBreakLine(link).then((res) => {
        setData(res.data.data);
        setLoading(false);
      });
    } else {
      setOpen(false);
    }
  };

  return (
    <>
      <tr>
        {tdItems?.map((td, indexTd) => (
          <TdElem key={indexTd + "td"} props={td} onClick={onClickOpenTable} />
        ))}
      </tr>
      <tr>
        <td colSpan={allCol}>
          <Collapse in={open} unmountOnExit={true}>
            <div style={{ marginBottom: 40, marginTop: 10 }}>
              {!loading ? (
                <TableConstract
                  header={data?.header || []}
                  content={data?.content || []}
                />
              ) : (
                <SpinnerLogo />
              )}
            </div>
          </Collapse>
        </td>
      </tr>
    </>
  );
}
