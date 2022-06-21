import { useEffect, useState } from "react";
import { SpinnerLogo, TableConstract } from "Components/MiniComponents";

import { ITableConstract } from "Components/MiniComponents/TableConstract/types";
import { TTabsStatistics } from "Components/Statisticks/types";

import { StatisticsApi } from "Helpers/api";

interface PageItemStatisticsProps {
  tab: TTabsStatistics;
}

export default function PageItemStatistics({ tab }: PageItemStatisticsProps) {
  const [dataTable, setDataTable] = useState<ITableConstract | undefined>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    StatisticsApi.fetchStatistics(tab).then((res) => {
      setDataTable(res.data.data);
      setLoading(false);
    });
  }, [tab]);

  return (
    <div>
      <div>Filter</div>
      {loading ? (
        <SpinnerLogo />
      ) : (
        <TableConstract
          header={dataTable?.header || []}
          content={dataTable?.content || []}
        />
      )}
    </div>
  );
}
