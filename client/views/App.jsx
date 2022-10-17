import React from 'react';

import "../resources/reset.css"
import "../resources/main.css"
import "../resources/responsive.css"
import AppRoute from "./AppRoute.jsx";

import Header from "./layout/Header.jsx";
import Nav from './layout/Nav.jsx';
import Footer from "./layout/Footer.jsx";


function App() {
 
  return (
    <div className="App">
      <Header />
      <Nav />
      <AppRoute />
      <Footer />
    </div>
  );
  
}

export default App;
