import { Radio } from "@mui/material";
// const getMagmaGrid = () => {
//   const data =
//     {
//       type: "DataGrid",
//       spacing: 12,
//       columns: [
//         { field: "ClaimNo", headerName: "Claim Number", width: 200 },
//         { field: "Status", headerName: "Status", width: 200 },
//       ],
//       rows: [],
//       rowId: "ClaimNo",
//       visible: true,
//       // onRowClick:
//     };
//   return data;
// };

const getGridDataonProduct = (productCode) => {
  let grid = {};
  const onRowClick = (e, param) => {
    console.log(param, "param");
    localStorage.setItem("claimNumber", param.row.claimNumber);
  };
  switch (productCode) {
    case "MagmaHospiCash01":
      grid = {
        type: "DataGrid",
        spacing: 12,
        columns: [
          {
            field: "select",
            headerName: "Select Row",
            width: 100,
            renderCell: (param) => <Radio onClick={(e) => onRowClick(e, param)} />,
          },
          { field: "claimNumber", headerName: "Claim Number", width: 200 },
          // { field: "", headerName: "Status", width: 200 },
        ],
        rows: [],
        rowId: "claimNumber",
        visible: true,
        // onRowClick:
      };
      break;
    case "AsiaPacific":
      grid = {
        type: "DataGrid",
        spacing: 12,
        columns: [
          {
            field: "select",
            headerName: "Select Row",
            width: 100,
            renderCell: (param) => <Radio onClick={(e) => onRowClick(e, param)} />,
          },
          { field: "claimNumber", headerName: "Claim Number", width: 200 },
          { field: "transactionNo", headerName: "Transaction Number", width: 200 },
        ],
        rows: [],
        rowId: "claimNumber",
        visible: true,
        // onRowClick:
      };
      break;
    case "Motor_PrivateCar":
      grid = {
        type: "DataGrid",
        spacing: 12,
        columns: [
          {
            field: "select",
            headerName: "Select Row",
            width: 100,
            renderCell: (param) => <Radio onClick={(e) => onRowClick(e, param)} />,
          },
          { field: "claimNumber", headerName: "Master Claim Number", width: 200 },
          { field: "transactionNo", headerName: "Transaction Number", width: 200 },
        ],
        rows: [],
        rowId: "claimNumber",
        visible: true,
      };
      break;
    default:
      grid = {
        type: "DataGrid",
        spacing: 12,
        columns: [
          {
            field: "select",
            headerName: "Select Row",
            width: 100,
            renderCell: (param) => <Radio onClick={(e) => onRowClick(e, param)} />,
          },
          { field: "claimNumber", headerName: "Master Claim Number", width: 200 },
          // { field: "transactionNo", headerName: "Transaction Number", width: 200 },
        ],
        rows: [],
        rowId: "claimNumber",
        visible: true,
      };
      break;
  }
  return grid;
};

const getGridData = (productCode) => {
  try {
    const gridData = getGridDataonProduct(productCode);
    return gridData;
  } catch (error) {
    console.log(error);
  }
  return null;
};

export default getGridData;
