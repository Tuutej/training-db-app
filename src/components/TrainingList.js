import React, { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import Addtraining from "./AddTraining";

export default function Traininglist() {
  const [trainings, setTrainings] = useState([]);

  useEffect(() => fetchData(), []);

  const fetchData = () => {
    fetch("https://traineeapp.azurewebsites.net/gettrainings")
      .then((response) => response.json())
      .then((data) => setTrainings(data))
      .catch((err) => console.error(err));
  };

  const deleteTraining = (id) => {
    if (window.confirm("Are you sure?")) {
      fetch(`https://traineeapp.azurewebsites.net/api/trainings/${id}`, {
        method: "DELETE",
      })
        .then((res) => fetchData())
        .catch((err) => console.error(err));
    }
  };

  const saveTraining = (training) => {
    fetch("http://traineeapp.azurewebsites.net/api/trainings", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(training),
    })
      .then((res) => fetchData())
      .catch((err) => console.error(err));
  };

  const columns = [
    {
      field: "date",
      headerName: "Date",
      sortable: true,
      filter: true,
      editable: true,
      flex: 1,
      cellStyle: { textAlign: "left" },
      valueFormatter: (params) =>
        new Date(params.value).toLocaleString("en-US", {
          month: "2-digit",
          day: "2-digit",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        }),
    },
    {
      field: "duration",
      headerName: "Duration (min)",
      sortable: true,
      filter: true,
      flex: 1,
      cellStyle: { textAlign: "left" },
    },
    {
      field: "activity",
      headerName: "Activity",
      sortable: true,
      filter: true,
      flex: 1,
      cellStyle: { textAlign: "left" },
    },
    {
      field: "customer.firstname",
      headerName: "First Name",
      sortable: true,
      filter: true,
      flex: 1,
      cellStyle: { textAlign: "left" },
    },
    {
      field: "customer.lastname",
      headerName: "Last Name",
      sortable: true,
      filter: true,
      flex: 1,
      cellStyle: { textAlign: "left" },
    },
    {
      field: "customer.id",
      headerName: "Id",
      sortable: true,
      filter: true,
      flex: 1,
      cellStyle: { textAlign: "left" },
    },

    {
      cellRendererFramework: (params) => (
        <Button
          variant="text"
          color="error"
          size="small"
          startIcon={<DeleteIcon />}
          onClick={() => deleteTraining(params.data.id)}
        >
          Delete
        </Button>
      ),
      sortable: false,
      filter: false,
      cellStyle: { textAlign: "left" },
    },
  ];

  const rowHeight = 48;

  return (
    <div className="ag-theme-alpine" style={{ height: "500px", width: "100%" }}>
      <Addtraining saveTraining={saveTraining} />
      <AgGridReact
        rowData={trainings}
        columnDefs={columns}
        rowHeight={rowHeight}
        domLayout="autoHeight"
      />
    </div>
  );
}
