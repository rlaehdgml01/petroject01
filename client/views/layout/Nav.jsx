import React from "react";
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import PetsRoundedIcon from '@mui/icons-material/PetsRounded';
import { BrowserRouter, Link } from "react-router-dom";
import "../../resources/main.css"

export default function Nav() {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/"><HomeRoundedIcon className="icon"/><span className="menu"> Home</span></Link>
        </li>
        <li>
          <Link to="/pages/petregister"><PetsRoundedIcon className="icon" /><span className="menu">펫등록</span></Link>
        </li>
        <li>
          <Link to="/pages/register">회원가입</Link>
        </li>
        <li>
          <Link>서비스매칭</Link>
        </li>
      </ul>
    </nav>
  );
}
