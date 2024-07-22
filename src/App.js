import React from "react";
import './App.css';
import MyRoutes from "./Routes";
import NavigationPanel from "./components/nav-panel/NavigationPanel";
// import Navbar from "./components/navbar/Navbar";


const App = () => {

    return (
        <div className="appContainer">
            {/*<Navbar/>*/}
            <NavigationPanel/>
            <MyRoutes />
        </div>
    );
}

export default App;
