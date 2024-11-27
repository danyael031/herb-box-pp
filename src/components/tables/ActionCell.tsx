import { Cell } from "../App";

type ActionCellProps = {
  cell: Cell;
};

const toggleIrrigate = () => {
  alert("Irrigate");
};

const toggleOther = () => {
  alert("Other");
};

const ActionCell = (props: ActionCellProps) => {
  const d = props.cell.d as { action: string; d: string }[];

  return (
    <>
      {
        d.map((action) => {
          return (
            <button
              onClick={action.action === "irrigate" ? toggleIrrigate : toggleOther}
            >
              {action.d}
            </button>
          )
        })
      }
    </>
  )
}

export default ActionCell;
