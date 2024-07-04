import React from "react";
import { useTranslation } from 'react-i18next';
import './App.css';
import MyRoutes from "./Routes"; // Correct import statement
import LanguageSelector from './components/languageSelector/LanguageSelector';

const App = () => {
  const { t } = useTranslation();

  return (
      <div>
        <LanguageSelector />
        <MyRoutes />
      </div>
  );
}

export default App;
