import React from 'react';
import './App.css';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './app/store';
import MyRoutes from './Routes';
import NavigationPanel from './components/nav-panel/NavigationPanel';

const App = () => {
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <div className="appContainer">
                    <NavigationPanel />
                    <MyRoutes />
                </div>
            </PersistGate>
        </Provider>
    );
};

export default App;
