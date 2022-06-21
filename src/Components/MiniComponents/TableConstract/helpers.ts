import { IHeaderItem, IHeaderConstract } from "./types";

export function headersOptimization(header: IHeaderConstract[]) {
  const arrayHeader: IHeaderItem[][] = [];

  header.forEach((el) => createHeader(el, arrayHeader));

  return arrayHeader;
}

function checkItems(tr: IHeaderConstract) {
  let number = 1;

  if (tr.items) {
    number = 0;
    tr.items.forEach((el) => {
      number += checkItems(el);
    });
  }

  return number;
}

function createHeader(
  el: IHeaderConstract,
  arrayHeader: IHeaderItem[][],
  level = 0
) {
  if (!arrayHeader[level]) {
    arrayHeader.push([]);
  }
  const col = checkItems(el);

  if (el.items) {
    el.items.forEach((elItem) => createHeader(elItem, arrayHeader, level + 1));
  }

  arrayHeader[level].push({
    title: el.title,
    type: el.type,
    col,
    row: el.items && 1,
  });

  return arrayHeader;
}
