import { Cell } from "../App";

type LinkCellProps = {
  cell: Cell;
};

const LinkCell = ({ cell }: LinkCellProps) => {
  return (
    <a href={cell.url}>
      {typeof cell.d === "string" ? cell.d : JSON.stringify(cell.d)}
    </a>
  );
};

export default LinkCell;
