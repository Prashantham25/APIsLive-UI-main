import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";

const columns = [
  { field: "id", headerName: "Quote Number", width: 200 },
  { field: "title", headerName: "Customer Name", width: 200 },
  { field: "Status", headerName: "Status", width: 150 },
  { field: "Date", headerName: "Date", width: 150 },
  { field: "PolicyNumber", headerName: "Policy Number", width: 200 },
  { field: "body", headerName: "Body", width: 200 },
];

const DataGrid1 = () => {
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((data) => data.json())
      .then((data) => setTableData(data));
  }, []);

  console.log(tableData);

  return (
    <div style={{ height: 700, width: "100%" }}>
      <DataGrid rows={tableData} columns={columns} pageSize={12} />
    </div>
  );
};

export default DataGrid1;
