import React from "react";
import './App.css';
import MyRoutes from "./Routes";
import NavigationPanel from "./components/nav-panel/NavigationPanel";



const App = () => {

    return (
        <div className="appContainer">
            <NavigationPanel/>
            <MyRoutes />
        </div>
    );
}

export default App;
