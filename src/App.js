import React, { useState } from "react";
import "./App.css";
import { AppBar, Toolbar, Typography, Stack, Button } from "@mui/material";
import Customerlist from "./components/CustomerList";
import Traininglist from "./components/TrainingList";

function App() {
  const [activeTab, setActiveTab] = useState("customers");

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="App">
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">Training App</Typography>
          <Stack direction="row" spacing={2}>
            <Button variant="h6" onClick={() => handleTabChange("customers")}>
              Customers
            </Button>
            <Button variant="h6" onClick={() => handleTabChange("trainings")}>
              Trainings
            </Button>
          </Stack>
        </Toolbar>
      </AppBar>
      {activeTab === "customers" ? <Customerlist /> : <Traininglist />}
    </div>
  );
}

export default App;
