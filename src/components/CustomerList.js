import React, { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import Addcustomer from "./AddCustomer";
import Editcustomer from "./EditCustomer";
import { CSVLink } from "react-csv";

export default function Customerslist() {
  const [customers, setCustomers] = useState([]);
  const [exportData, setExportData] = useState([]);

  useEffect(() => fetchData(), []);

  const fetchData = () => {
    fetch("http://traineeapp.azurewebsites.net/api/customers")
      .then((response) => response.json())
      .then((data) => {
        setCustomers(data.content);
        setExportData(customerExport(data.content));
      })
      .catch((err) => console.error(err));
  };

  const deleteCustomer = (link) => {
    if (window.confirm("Are you sure?")) {
      fetch(link, { method: "DELETE" })
        .then((res) => fetchData())
        .catch((err) => console.error(err));
    }
  };

  const saveCustomer = (customer) => {
    fetch("http://traineeapp.azurewebsites.net/api/customers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(customer),
    })
      .then((res) => fetchData())
      .catch((err) => console.error(err));
  };

  const updateCustomer = (customer, link) => {
    fetch(link, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(customer),
    })
      .then((res) => fetchData())
      .catch((err) => console.error(err));
  };
  const customerExport = (rowData) => {
    const filteredData = rowData.map(
      ({
        id,
        firstname,
        lastname,
        streetaddress,
        postcode,
        city,
        email,
        phone,
      }) => ({
        id,
        firstname,
        lastname,
        streetaddress,
        postcode,
        city,
        email,
        phone,
      })
    );
    return filteredData;
  };

  const csvHeaders = [
    { label: "First Name", key: "firstname" },
    { label: "Last Name", key: "lastname" },
    { label: "Street Address", key: "streetaddress" },
    { label: "Post Code", key: "postcode" },
    { label: "City", key: "city" },
    { label: "Email", key: "email" },
    { label: "Phone", key: "phone" },
  ];

  const columns = [
    {
      field: "firstname",
      headerName: "First Name",
      sortable: true,
      filter: true,
      editable: true,
      flex: 1,
      cellStyle: { textAlign: "left" },
    },
    {
      field: "lastname",
      headerName: "Last Name",
      sortable: true,
      filter: true,
      editable: true,
      flex: 1,
      cellStyle: { textAlign: "left" },
    },
    {
      field: "streetaddress",
      headerName: "Street Address",
      sortable: true,
      filter: true,
      editable: true,
      flex: 1,
      cellStyle: { textAlign: "left" },
    },
    {
      field: "postcode",
      headerName: "Post Code",
      sortable: true,
      filter: true,
      editable: true,
      flex: 1,
      cellStyle: { textAlign: "left" },
    },
    {
      field: "city",
      headerName: "City",
      sortable: true,
      filter: true,
      editable: true,
      flex: 1,
      cellStyle: { textAlign: "left" },
    },
    {
      field: "email",
      headerName: "Email",
      sortable: true,
      filter: true,
      editable: true,
      flex: 1,
      cellStyle: { textAlign: "left" },
    },
    {
      field: "phone",
      headerName: "Phone",
      sortable: true,
      filter: true,
      editable: true,
      flex: 1,
      cellStyle: { textAlign: "left" },
    },
    {
      cellRendererFramework: ({ data }) => (
        <Editcustomer updateCustomer={updateCustomer} customer={data} />
      ),
      sortable: false,
      filter: false,
      flex: 1,
      cellStyle: { textAlign: "right" },
    },
    {
      cellRendererFramework: (params) => (
        <Button
          variant="text"
          color="error"
          size="small"
          startIcon={<DeleteIcon />}
          onClick={() => deleteCustomer(params.data.links[0].href)}
        >
          Delete
        </Button>
      ),
      sortable: false,
      filter: false,
      flex: 1,
      cellStyle: { textAlign: "left" },
    },
  ];

  const rowHeight = 48;

  return (
    <div className="ag-theme-alpine" style={{ height: "500px", width: "100%" }}>
      <Addcustomer saveCustomer={saveCustomer} />
      <div style={{ margin: "10px 0" }}>
        <CSVLink
          data={exportData}
          headers={csvHeaders}
          filename={"customers.csv"}
        >
          <Button variant="outlined">Export to CSV</Button>
        </CSVLink>
      </div>
      <AgGridReact
        rowData={customers}
        columnDefs={columns}
        rowHeight={rowHeight}
        domLayout="autoHeight"
      />
    </div>
  );
}
