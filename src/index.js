import React from "react";
import ReactDOM from "react-dom/client";
import { PersistGate } from 'redux-persist/integration/react';
import App from "./App";
import { store, persistor } from "./app/store";  // Pārliecinies, ka ceļš uz 'store' ir pareizs
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import './i18n'; // Importējiet i18n konfigurāciju

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <BrowserRouter>
                    <App />
                </BrowserRouter>
            </PersistGate>
        </Provider>
    </React.StrictMode>
);
