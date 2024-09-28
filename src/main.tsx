import { MantineProvider, createTheme } from "@mantine/core";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";

import "./index.css";
import "@mantine/core/styles.css";
import "@mantine/charts/styles.css";

const theme = createTheme({});

// biome-ignore lint/style/noNonNullAssertion: Ifs safe in this case
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <MantineProvider defaultColorScheme="dark" theme={theme}>
      <App />
    </MantineProvider>
  </React.StrictMode>,
);
