
import './App.css';
import {Header} from "./shared/Header/Header";
import {Footer} from "./shared/Footer/Footer"
import { Outlet,useLocation } from 'react-router-dom';
import { useEffect, useRef, useState } from "react";
import { Login } from "./pages/auth/login/login";
import { Register } from "./pages/auth/register/register";

import axios from "axios";
function App() {


  return (
    
    <div className='background'>
    <Header/>
     <Outlet/>
     {/* <Footer/> */}
    </div>
  );
}

export default App;
