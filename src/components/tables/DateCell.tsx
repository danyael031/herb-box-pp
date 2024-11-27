import React from 'react';
import { Cell } from "../App";

type DateCellProps = {
  cell: Cell;
};

const DateCell = ({ cell }: DateCellProps) => {
  return (
    <span>
      {typeof cell.d === "string"
        ? new Intl.DateTimeFormat("en-US").format(new Date(cell.d))
        : ""}
    </span>
  );
};

export default DateCell;
