import { useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import logo from "../assets/JF logo.png";
import { useState } from "react";
function Navbar() {
    const [selectedIndex, setSelectedIndex] = useState(0)
    const nav_menu = [
        {path: "", name: "Home"},
        {path: "", name: "About"},
        {path: "", name: "Contact"},
        {path: "/login", name: "Sign in"},
    ]
    const changeRoute=(index)=>{
        setSelectedIndex(index)
    }
  return (
    <Container>
      <nav
        className={`navbar navbar-expand-sm navbar-light bg_navy px-lg-4`}
      >
        <div className="container-fluid">
          <Link to="" className="navbar-brand" href="#">
            <img src={logo} alt="logo" className="logo border rounded-circle" />
            <p className="my-auto">FIXCHAT</p>
          </Link>
          <button
            className="navbar-toggler text-white"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon text-ligh"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                {
                    nav_menu.map((menu, index)=>{
                        return <li className={`nav-item rounded-pill px-2 ${selectedIndex == index && 'selected bg-danger'}`} key={index} onClick={()=>changeRoute(index)}>
                        <Link to={menu.path} className={`nav-link ${selectedIndex == index && 'selected bg-danger'}`}>
                         {menu.name}
                        </Link>
                      </li>
                    })
                }
              
            </ul>
          </div>
        </div>
      </nav>
    </Container>
  );
}

export default Navbar;
const Container = styled.div`
.navbar{
    position: fixed;
    top: 0;
    width: 100%;
}
.nav-item{
    &:hover{
        background: rgb(225, 58, 58);
        transition: 0.5s linear;
    }
    .nav-link {
      color: white !important;
      &:hover{
        background: rgb(225, 58, 58);
        transition: 0.5s linear;
    }
    }
}
  .navbar-brand {
    color: white !important;
    display: flex;
    gap: 0.5rem;
    .logo{
        height: 3rem;
        width: 3rem;
    }
  }
  .navbar-toggler-icon{
    color: white !important;
  }
  .navbar-nav{
    display: flex;
    gap: 1rem;
    .selected{
       transition: all 0.5s ease;
    }
  }
 
`;
