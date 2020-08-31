import "./firebase";
import React from "react";
import ReactDOM from "react-dom";
import { ConfigProvider } from "antd";
import locale from "antd/es/locale/ko_KR";
import "antd/dist/antd";

import App from "./App";

ReactDOM.render(
  <React.StrictMode>
    <ConfigProvider locale={locale}>
      <App />
    </ConfigProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
