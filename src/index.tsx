import React from 'react';
import ReactDOM from 'react-dom';
// tslint:disable-next-line:no-submodule-imports
import lt_LT from 'antd/lib/locale-provider/lt_LT';
import { ConfigProvider, message } from 'antd';

import { App } from 'app/app';
import 'app/leaflet-config';

import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';
// tslint:disable-next-line:import-group-ordering
import moment from 'moment';
// tslint:disable-next-line:no-submodule-imports import-group-ordering
import 'moment/locale/lt';  // important!

// Allowing 1 Antd pop up at a time
message.config({
  maxCount: 1,
});

// Fixing calendar locale (start week on Monday):
// https://github.com/ant-design/ant-design/issues/5605#issuecomment-547326165
moment.locale('lt');  // important!
ReactDOM.render(
  (
    <React.StrictMode>
      <ConfigProvider locale={lt_LT}>
        <App />
      </ConfigProvider>
    </React.StrictMode>
  ),
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
