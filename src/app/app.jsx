import React, { useEffect, useState } from "react";
import Chart from "./comps/chart";
import Table from "./comps/table";
import getData from "./getData";

export default function App() {
  const [apiData, setApiData] = useState([]);
  useEffect(() => {
    getData().then((processedData) => setApiData(processedData));
  }, []);
  return (
    <div className="container">
      <Table tableData={apiData} />
      <Chart chartData={apiData} />
    </div>
  );
}
