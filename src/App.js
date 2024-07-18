import React from "react";
import './App.css';
import MyRoutes from "./Routes";
import Navbar from "./components/navbar/Navbar";


const App = () => {

    return (
        <div className="appContainer">
            <Navbar/>
            <MyRoutes />
        </div>
    );
}

export default App;
