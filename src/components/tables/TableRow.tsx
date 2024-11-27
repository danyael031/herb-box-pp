import React from 'react';
import LinkCell from "./LinkCell";
import ActionCell from "./ActionCell";
import DateCell from "./DateCell";
import TextCell from "./TextCell";
import ColorPickerCell from "./ColorPickerCell";

type Cell = {
  k: string;
  d: string | { action: string; d: string }[];
  url?: string;
  action?: string;
};

type Row = Cell[];

type TableRowProps = {
  row: Row;
};

const TableRow = (props: TableRowProps) => {
  const handleColorChange = (color: string) => {
    console.log("Selected Color (rgba):", color);
  };
  return (
    <tr>
      {props.row.map((cell: Cell) => (
        <td>
          {(() => {
            if (cell.url)
              return <LinkCell cell={cell} />
            switch (cell.k) {
              case "actions":
                return (
                  <div className="flex gap-2 justify-center py-2">
                    <ActionCell cell={cell} />
                  </div>
                );
              case "heartbeat":
                return (<DateCell cell={cell} />)
              case "chartColor":
                return (
                  <ColorPickerCell
                    initialColor={cell.d as string}
                    onColorChange={handleColorChange}
                  />
                )
              default:
                return (<TextCell cell={cell} />)
            }
          })()
          }
        </td>
      ))}
    </tr>
  );
};

export default TableRow;
