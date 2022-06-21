export interface IHeaderConstract {
  title: string;
  items?: IHeaderConstract[];
  type: "title" | "miniTitle" | "sort";
}

export interface IHeaderItem {
  title: string;
  col: number;
  row?: number;
  type?: "title" | "miniTitle" | "sort";
}

interface IContentItem {
  col?: number;
  value: string;
}

interface IContentItemLink extends IContentItem {
  type: "link";
  link: string;
}

interface IContentItemBreakLine extends IContentItem {
  type: "breakLine";
  url: string;
}

interface IContentItemLinkText extends IContentItem {
  type: "value";
}

export type TContentItem =
  | IContentItemLink
  | IContentItemBreakLine
  | IContentItemLinkText
  | string;

export interface ITableConstract {
  header: IHeaderConstract[];
  content: TContentItem[][];
}

// export const headerConstract: IHeaderConstract[] = [
//   { title: "Date", type: "sort" },
//   {
//     title: "Traffic",
//     type: "title",
//     items: [
//       { title: "Date", type: "sort" },
//       { title: "Date", type: "sort" },
//     ],
//   },
//   { title: "Impressions", type: "sort" },
//   {
//     title: "Conversions",
//     type: "title",
//     items: [
//       {
//         title: "Total",
//         type: "miniTitle",
//         items: [
//           { title: "Date", type: "sort" },
//           { title: "Date", type: "sort" },
//         ],
//       },
//       {
//         title: "Pending",
//         type: "miniTitle",
//         items: [
//           { title: "Date", type: "sort" },
//           { title: "Date", type: "sort" },
//         ],
//       },
//       {
//         title: "Declined",
//         type: "miniTitle",
//         items: [
//           { title: "Date", type: "sort" },
//           { title: "Date", type: "sort" },
//         ],
//       },
//       {
//         title: "Hold",
//         type: "miniTitle",
//         items: [
//           { title: "Date", type: "sort" },
//           { title: "Date", type: "sort" },
//         ],
//       },
//       {
//         title: "Approved",
//         type: "miniTitle",
//         items: [
//           {
//             title: "Date",
//             type: "sort",
//           },
//           { title: "Date", type: "sort" },
//         ],
//       },
//     ],
//   },
//   { title: "CR", type: "sort" },
//   { title: "EPC", type: "sort" },
//   {
//     title: "Total",
//     type: "title",
//     items: [
//       { title: "Qty", type: "sort" },
//       { title: "Null", type: "sort" },
//       { title: "Income", type: "sort" },
//     ],
//   },
//   { title: "Payouts", type: "sort" },
//   { title: "Earnings", type: "sort" },
// ];

// export const ContentStatistics: TContentItem[][] = [
//   [
//     { type: "breakLine", value: "2019-05-17", url: "" },
//     { type: "link", value: "93", link: "/1" },
//     "11369",
//     "5369",
//     "999",
//     "312",
//     "830",
//     "101",
//     "830",
//     "312",
//     "830",
//     "101",
//     "121",
//     "151",
//     "101",
//     "163",
//     "1231",
//     "11125",
//     "643",
//     "74",
//     "124",
//   ],
// ];
