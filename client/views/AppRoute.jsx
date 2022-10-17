import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import PetList from "./pages/PetList.jsx";
import Register from "./pages/Register.jsx";
import PetRegister from "./pages/PetRegister.jsx";
import styled from "styled-components";

export default function Main() {
  return (
    <Padding>
        <Routes>
          <Route path="/" element={<PetList />}></Route>
          <Route path="/pages/petregister" element={<PetRegister />}></Route>
          <Route path="/pages/register" element={<Register />}></Route>
        </Routes>
    </Padding>
  );
}

const Padding = styled.div`
  padding: 2rem;
`