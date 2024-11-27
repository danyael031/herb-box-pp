'use client'
import TableRow from "../tables/TableRow";
import EChart from "../EChart";

export type Cell = {
  k: string;
  d: string | { action: string; d: string }[];
  url?: string;
  action?: string;
};

type Row = Cell[];
interface ISeries {
  name: string;
  type: "line" | "bar";
  data: number[];
  stack?: string;
}

const App = () => {
  const tableHeaders = [
    { d: "Code", v: "code" },
    { d: "Name", v: "name" },
    { d: "Humidity", v: "humidity" },
    { d: "Pin", v: "pin" },
    { d: "Interval", v: "interval" },
    { d: "Irrigate", v: "irrigate" },
    { d: "Pump", v: "pump" },
    { d: "Chart Color", v: "chartColor" },
    { d: "Heartbeat", v: "heartbeat" },
    { d: "Actions", v: "actions" },
  ];
  let tableRows = [
    [
      { d: "LEFT", k: "code", url: "#" },
      { d: "Mint Mentha", k: "name", url: "#" },
      { d: "470", k: "humidity" },
      { d: "A1", k: "pin", url: "#" },
      { d: "300000", k: "interval", url: "#" },
      { d: "off", k: "irrigate", url: "#" },
      { d: "LEFT", k: "pump", url: "#" },
      { d: "#3498DB", k: "chartColor" },
      { d: "10.02.2024 09:15:12", k: "heartbeat", url: "#" },
      {
        d: [
          { action: "irrigate", d: "Irrigate" },
          { action: "other", d: "Other" },
        ],
        k: "actions",
      },
    ],
    [
      { d: "RIGHT", k: "code", url: "#" },
      { d: "Rosemary Rosmarinus", k: "name", url: "#" },
      { d: "520", k: "humidity" },
      { d: "A2", k: "pin", url: "#" },
      { d: "450000", k: "interval", url: "#" },
      { d: "on", k: "irrigate", url: "#" },
      { d: "RIGHT", k: "pump", url: "#" },
      { d: "#2ECC71", k: "chartColor" },
      { d: "11.02.2024 11:45:10", k: "heartbeat", url: "#" },
      {
        d: [
          { action: "irrigate", d: "Irrigate" },
          { action: "other", d: "Other" },
        ],
        k: "actions",
      },
    ],
    [
      { d: "LEFT", k: "code", url: "#" },
      { d: "Thyme Thymus", k: "name", url: "#" },
      { d: "560", k: "humidity" },
      { d: "A3", k: "pin", url: "#" },
      { d: "350000", k: "interval", url: "#" },
      { d: "off", k: "irrigate", url: "#" },
      { d: "LEFT", k: "pump", url: "#" },
      { d: "#9B59B6", k: "chartColor" },
      { d: "12.02.2024 07:30:05", k: "heartbeat", url: "#" },
      {
        d: [
          { action: "irrigate", d: "Irrigate" },
          { action: "other", d: "Other" },
        ],
        k: "actions",
      },
    ],
    [
      { d: "RIGHT", k: "code", url: "#" },
      { d: "Sage Salvia", k: "name", url: "#" },
      { d: "510", k: "humidity" },
      { d: "A4", k: "pin", url: "#" },
      { d: "200000", k: "interval", url: "#" },
      { d: "on", k: "irrigate", url: "#" },
      { d: "RIGHT", k: "pump", url: "#" },
      { d: "#F1C40F", k: "chartColor" },
      { d: "13.02.2024 18:52:19", k: "heartbeat", url: "#" },
      {
        d: [
          { action: "irrigate", d: "Irrigate" },
          { action: "other", d: "Other" },
        ],
        k: "actions",
      },
    ],
    [
      { d: "LEFT", k: "code", url: "#" },
      { d: "Oregano Origanum", k: "name", url: "#" },
      { d: "490", k: "humidity" },
      { d: "A5", k: "pin", url: "#" },
      { d: "250000", k: "interval", url: "#" },
      { d: "off", k: "irrigate", url: "#" },
      { d: "LEFT", k: "pump", url: "#" },
      { d: "#E74C3C", k: "chartColor" },
      { d: "14.02.2024 20:21:35", k: "heartbeat", url: "#" },
      {
        d: [
          { action: "irrigate", d: "Irrigate" },
          { action: "other", d: "Other" },
        ],
        k: "actions",
      },
    ],
    [
      { d: "RIGHT", k: "code", url: "#" },
      { d: "Lavender Lavandula", k: "name", url: "#" },
      { d: "460", k: "humidity" },
      { d: "A6", k: "pin", url: "#" },
      { d: "300000", k: "interval", url: "#" },
      { d: "on", k: "irrigate", url: "#" },
      { d: "RIGHT", k: "pump", url: "#" },
      { d: "#3498DB", k: "chartColor" },
      { d: "15.02.2024 14:13:55", k: "heartbeat", url: "#" },
      {
        d: [
          { action: "irrigate", d: "Irrigate" },
          { action: "other", d: "Other" },
        ],
        k: "actions",
      },
    ],
    [
      { d: "LEFT", k: "code", url: "#" },
      { d: "Lemon Balm Melissa", k: "name", url: "#" },
      { d: "530", k: "humidity" },
      { d: "A7", k: "pin", url: "#" },
      { d: "400000", k: "interval", url: "#" },
      { d: "off", k: "irrigate", url: "#" },
      { d: "LEFT", k: "pump", url: "#" },
      { d: "#1ABC9C", k: "chartColor" },
      { d: "16.02.2024 08:55:20", k: "heartbeat", url: "#" },
      {
        d: [
          { action: "irrigate", d: "Irrigate" },
          { action: "other", d: "Other" },
        ],
        k: "actions",
      },
    ],
    [
      { d: "RIGHT", k: "code", url: "#" },
      { d: "Dill Anethum", k: "name", url: "#" },
      { d: "550", k: "humidity" },
      { d: "A8", k: "pin", url: "#" },
      { d: "600000", k: "interval", url: "#" },
      { d: "on", k: "irrigate", url: "#" },
      { d: "RIGHT", k: "pump", url: "#" },
      { d: "#16A085", k: "chartColor" },
      { d: "17.02.2024 16:40:45", k: "heartbeat", url: "#" },
      {
        d: [
          { action: "irrigate", d: "Irrigate" },
          { action: "other", d: "Other" },
        ],
        k: "actions",
      },
    ],
    [
      { d: "LEFT", k: "code", url: "#" },
      { d: "Parsley Petroselinum", k: "name", url: "#" },
      { d: "600", k: "humidity" },
      { d: "A9", k: "pin", url: "#" },
      { d: "550000", k: "interval", url: "#" },
      { d: "off", k: "irrigate", url: "#" },
      { d: "LEFT", k: "pump", url: "#" },
      { d: "#27AE60", k: "chartColor" },
      { d: "18.02.2024 12:33:27", k: "heartbeat", url: "#" },
      {
        d: [
          { action: "irrigate", d: "Irrigate" },
          { action: "other", d: "Other" },
        ],
        k: "actions",
      },
    ],
    [
      { d: "RIGHT", k: "code", url: "#" },
      { d: "Cilantro Coriandrum", k: "name", url: "#" },
      { d: "580", k: "humidity" },
      { d: "A10", k: "pin", url: "#" },
      { d: "250000", k: "interval", url: "#" },
      { d: "on", k: "irrigate", url: "#" },
      { d: "RIGHT", k: "pump", url: "#" },
      { d: "#8E44AD", k: "chartColor" },
      { d: "19.02.2024 15:10:58", k: "heartbeat", url: "#" },
      {
        d: [
          { action: "irrigate", d: "Irrigate" },
          { action: "other", d: "Other" },
        ],
        k: "actions",
      },
    ],
  ];

  const pinsTableHeaders = [
    { d: "Pin 01", v: "pin01" },
    { d: "Pin 02", v: "pin02" },
    { d: "Pin 03", v: "pin03" },
    { d: "Pin 04", v: "pin04" },
    { d: "Pin 05", v: "pin05" },
    { d: "Pin 06", v: "pin06" },
    { d: "Pin 07", v: "pin07" },
    { d: "Pin 08", v: "pin08" },
    { d: "Pin 09", v: "pin09" },
    { d: "Pin 10", v: "pin10" },
    { d: "Pin 11", v: "pin11" },
    { d: "Pin 12", v: "pin12" },
    { d: "Pin 13", v: "pin13" },
  ];

  const pinsTableRows: Row[] = [
    [
      { k: "pin01", d: "0" },
      { k: "pin02", d: "0" },
      { k: "pin03", d: "0" },
      { k: "pin04", d: "0" },
      { k: "pin05", d: "0" },
      { k: "pin06", d: "0" },
      { k: "pin07", d: "0" },
      { k: "pin08", d: "0" },
      { k: "pin09", d: "0" },
      { k: "pin10", d: "0" },
      { k: "pin11", d: "0" },
      { k: "pin12", d: "0" },
      { k: "pin13", d: "0" },
    ],
  ];

  const pumpsTableHeaders = [
    { d: "Code", v: "code" },
    { d: "VCC Pin", v: "vccPin" },
    { d: "Humidity", v: "humidity" },
    { d: "Duration", v: "duration" },
    { d: "Actions", v: "actions" },
  ];

  const pumpsTableRows: Row[] = [
    [
      { k: "code", d: "RIGHT" },
      { k: "vccPin", d: "Pin 11", url: "#" },
      { k: "humidity", d: "350" },
      { k: "duration", d: "4000" },
      {
        k: "actions",
        d: [
          { action: "irrigate", d: "Irrigate" },
          { action: "stop", d: "Stop" },
        ],
      },
    ],
    [
      { k: "code", d: "LEFT" },
      { k: "vccPin", d: "Pin 10", url: "#" },
      { k: "humidity", d: "350" },
      { k: "duration", d: "1000" },
      {
        k: "actions",
        d: [
          { action: "irrigate", d: "Irrigate" },
          { action: "stop", d: "Stop" },
        ],
      },
    ],
  ];

  const switchesTableHeaders = [
    { d: "Code", v: "code" },
    { d: "Name", v: "name" },
    { d: "VCC Pin", v: "vccPin" },
    { d: "Actions", v: "actions" },
  ];

  const switchesTableRows: Row[] = [
    [
      { k: "code", d: "LAMP" },
      { k: "name", d: "Tageslichtlampe" },
      { k: "vccPin", d: "Pin 07", url: "#" },
      {
        k: "actions",
        d: [
          { action: "on", d: "On" },
          { action: "off", d: "Off" },
        ],
      },
    ],
  ];

  const actionStackTableHeaders = [
    { d: "Entry No.", v: "entryNo" },
    { d: "Action", v: "action" },
    { d: "Name", v: "name" },
    { d: "Pin", v: "pin" },
    { d: "Value", v: "value" },
    { d: "Enum", v: "enum" },
    { d: "Created", v: "created" },
    { d: "Processed", v: "processed" },
  ];

  const actionStackTableRows: Row[] = [
    [
      { k: "entryNo", d: "22" },
      { k: "action", d: "Switch Off" },
      { k: "name", d: "Tageslichtlampe" },
      { k: "pin", d: "7" },
      { k: "value", d: "0" },
      { k: "enum", d: "3" },
      { k: "created", d: "09.02.2018 03:42:04" },
      { k: "processed", d: "09.02.2018 03:42:04" },
    ],
    [
      { k: "entryNo", d: "21" },
      { k: "action", d: "Switch On" },
      { k: "name", d: "LAMP" },
      { k: "pin", d: "7" },
      { k: "value", d: "0" },
      { k: "enum", d: "2" },
      { k: "created", d: "08.02.2018 18:46:22" },
      { k: "processed", d: "08.02.2018 18:46:23" },
    ],
    [
      { k: "entryNo", d: "20" },
      { k: "action", d: "Switch Off" },
      { k: "name", d: "Tageslichtlampe" },
      { k: "pin", d: "7" },
      { k: "value", d: "0" },
      { k: "enum", d: "3" },
      { k: "created", d: "08.02.2018 03:57:59" },
      { k: "processed", d: "08.02.2018 03:58:00" },
    ],
    [
      { k: "entryNo", d: "19" },
      { k: "action", d: "Switch On" },
      { k: "name", d: "Tageslichtlampe" },
      { k: "pin", d: "7" },
      { k: "value", d: "0" },
      { k: "enum", d: "2" },
      { k: "created", d: "07.02.2018 18:12:35" },
      { k: "processed", d: "07.02.2018 18:12:36" },
    ],
    [
      { k: "entryNo", d: "18" },
      { k: "action", d: "Switch Off" },
      { k: "name", d: "LAMP" },
      { k: "pin", d: "7" },
      { k: "value", d: "0" },
      { k: "enum", d: "3" },
      { k: "created", d: "07.02.2018 09:38:32" },
      { k: "processed", d: "07.02.2018 09:38:33" },
    ],
  ];

  const tables = [
    {
      title: "Pins",
      headers: pinsTableHeaders,
      rows: pinsTableRows,
    },
    {
      title: "Pumps",
      headers: pumpsTableHeaders,
      rows: pumpsTableRows,
    },
    {
      title: "Switches",
      headers: switchesTableHeaders,
      rows: switchesTableRows,
    },
    {
      title: "Action Stack",
      headers: actionStackTableHeaders,
      rows: actionStackTableRows,
    },
  ];

  function generateRandomNumbers(min: number, max: number, numItems: number) {
    const randomNumbers = [];

    for (let i = 0; i < numItems; i++) {
      const randomNum = Math.floor(Math.random() * (max - min + 1)) + min;
      randomNumbers.push(randomNum);
    }

    return randomNumbers;
  }

  const plantHumidityData = {
    mentha: generateRandomNumbers(0, 1000, 4),
    rosmarinus: generateRandomNumbers(0, 1000, 4),
    thymus: generateRandomNumbers(0, 1000, 4),
    salvia: generateRandomNumbers(0, 1000, 4),
    oreganum: generateRandomNumbers(0, 1000, 4),
    lavandula: generateRandomNumbers(0, 1000, 4),
    melissa: generateRandomNumbers(0, 1000, 4),
    anethum: generateRandomNumbers(0, 1000, 4),
    petroselinum: generateRandomNumbers(0, 1000, 4),
    coriandrum: generateRandomNumbers(0, 1000, 4),
  };

  const time = ["Week 1", "Week 2", "Week 3", "Week 4"];

  const series: ISeries[] = [
    {
      name: "Minth",
      type: "line",
      data: plantHumidityData.mentha,
    },
    {
      name: "Rosemary",
      type: "line",
      data: plantHumidityData.rosmarinus,
    },
    {
      name: "Thyme",
      type: "line",
      data: plantHumidityData.thymus,
    },
    {
      name: "Sage",
      type: "line",
      data: plantHumidityData.salvia,
    },
    {
      name: "Oregano",
      type: "line",
      data: plantHumidityData.oreganum,
    },
    {
      name: "Lavender",
      type: "line",
      data: plantHumidityData.lavandula,
    },
    {
      name: "Lemon",
      type: "line",
      data: plantHumidityData.melissa,
    },
    {
      name: "Dill",
      type: "line",
      data: plantHumidityData.anethum,
    },
    {
      name: "Parsley",
      type: "line",
      data: plantHumidityData.petroselinum,
    },
    {
      name: "Cilantro",
      type: "line",
      data: plantHumidityData.coriandrum,
    },
  ];

  const handleColorChange = (color: string) => {
    console.log("Selected Color (rgba):", color);
  };

  return (
    <div>
      <header className="flex text-center bg-black/80 backdrop-blur shadow-2xl">
        <div className="container mx-auto py-4">
          <h1>Herb Box Eco System</h1>
          <nav>
            <ul>
              <li>
                <a className="underline font-semibold text-white">Example Link</a>
              </li>
            </ul>
          </nav>
        </div>
      </header>
      <main className="flex flex-col gap-8">
        <header className="flex gap-4">
          <h2>Plants:</h2>
          <button>Refresh</button>
        </header>
        <section>
          <table>
            <thead>
              <tr>
                {tableHeaders.map((header, index) => <th key={index}>{header.d}</th>)}
              </tr>
            </thead>
            <tbody>
              {tableRows.map((row: Row, index) => <TableRow key={index} row={row} />)}
            </tbody>
          </table>
        </section>

        <section>
          <EChart
            title="Plant Humidity Over Time"
            xAxisData={time}
            series={series}
            width="800px"
            height="300px"
            colors={tableRows
              .map((row) => row[7].d)
              .filter((color): color is string => typeof color === "string")}
          />
        </section>
        <article>
          <header className="flex gap-4">
            <h2>{tables[0].title}</h2>
            <button>Refresh</button>
          </header>
          <section>
            <table>
              <thead>
                <tr>
                  {tables[0].headers.map((header, index) => <th key={index}>{header.d}</th>)}
                </tr>
              </thead>
              <tbody>
                {tables[0].rows.map((row: Row, index) => <TableRow key={index} row={row} />)}
              </tbody>
            </table>
          </section>
        </article>
        <div className="flex w-full gap-4 justify-between">
          <article>
            <header className="flex gap-4">
              <h2>{tables[1].title}</h2>
              <button>Refresh</button>
            </header>
            <section>
              <table>
                <thead>
                  <tr>
                    {tables[1].headers.map((header, index) => <th key={index}>{header.d}</th>)}
                  </tr>
                </thead>
                <tbody>
                  {tables[1].rows.map((row: Row, index) => <TableRow key={index} row={row} />)}
                </tbody>
              </table>
            </section>
          </article>
          <article>
            <header className="flex gap-4">
              <h2>{tables[2].title}</h2>
              <button>Refresh</button>
            </header>
            <section>
              <table>
                <thead>
                  <tr>
                    {tables[2].headers.map((header, index) => <th key={index}>{header.d}</th>)}
                  </tr>
                </thead>
                <tbody>
                  {tables[2].rows.map((row: Row, index) => <TableRow key={index} row={row} />)}
                </tbody>
              </table>
            </section>
          </article>
        </div>
        <article>
          <header className="flex gap-4">
            <h2>{tables[3].title}</h2>
            <button>Refresh</button>
          </header>
          <section>
            <table>
              <thead>
                <tr>
                  {tables[3].headers.map((header, index) => <th key={index}>{header.d}</th>)}
                </tr>
              </thead>
              <tbody>
                {tables[3].rows.map((row: Row, index) => <TableRow key={index} row={row} />)}
              </tbody>
            </table>
          </section>
        </article>
      </main>
    </div>
  );
};

export default App;
