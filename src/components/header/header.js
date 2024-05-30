import React from 'react';
import './header.css';
import HeaderImg from '../headerImg.svg'; 
import { Link } from "react-router-dom";
import linksData from '../links.json';

function Header() {
  return (
    <header>
      <div className='top'>
        <div className="topleft">
          <Link to="/homepage">
            <img src={HeaderImg} alt='Header Logo' />
          </Link>
        </div>
        <div className="topcenter">
          <ul className='toplist'>
            <li>
              <Link to="/homepage" className="fa-solid fa-house"></Link>
            </li>
            {linksData.links2.map(link => (
              <li key={link.id} className='toplistItems'>
                <Link to={link.url}>{link.title}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="topright">
          <i className="fa-solid fa-magnifying-glass"></i>
        </div>
      </div>
    </header>
  );
}

export default Header;
