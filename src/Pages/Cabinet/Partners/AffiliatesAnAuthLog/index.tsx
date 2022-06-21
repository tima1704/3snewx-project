import AffiliatesAnAuthLogFilter from "Components/Partners/AffiliatesAnAuthLogFilter";
import stable from "Styles/table.module.css";

export default function AffiliatesAnAuthLog() {
  return (
    <div>
      <AffiliatesAnAuthLogFilter />
      <table className={stable["table"]}>
        <thead className={stable["headerTable"]}>
          <tr>
            <th>ID</th>
            <th>Affiliate</th>
            <th>IP</th>
            <th>Logs</th>
            <th>date</th>
          </tr>
        </thead>
        <tbody>
          {/* {affiliateList.affiliate?.map((item, index) => {
                return (
                  <tr
                    className={stable.trTable}
                    key={item.id + index}
                  >
                    <td>{item.id}</td>
                    <td>{item.email}</td>
                    <td>{item.status}</td>
                    <td>{item.manager.name?.["1"]?.name}</td>
                    <td>{item.connectOffer}</td>
                    <td>{item.registered} </td>
                    <td>{item.isDoubled ? "yes" : "no"}</td>
                    <td>Inf icon</td>
                    <td>actions</td>
                  </tr>
                );
              })} */}
        </tbody>
      </table>
    </div>
  );
}
