import React from "react";
import AppStyles from './App.module.css'
import AppHeader from "../AppHeader/AppHeader";
import Main from "../Main/Main";


const App = () => {
  return (
    <div className={AppStyles.page}>
      <AppHeader />
      <Main />
    </div>
  )
}

export default App