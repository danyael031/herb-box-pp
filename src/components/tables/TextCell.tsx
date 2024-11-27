import React from 'react';
import { Cell } from "../App";

type TextCellProps = {
  cell: Cell;
};

const TextCell = ({ cell }: TextCellProps) => {
  return <span>{typeof cell.d === "string" ? cell.d : JSON.stringify(cell.d)}</span>;
};

export default TextCell;
