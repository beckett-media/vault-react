import React from 'react';
import { Link } from 'react-router-dom';
import './nav.scss';

const Nav = () => {
  return (
    <nav>
      <ul class="nav">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/submission">Submission</Link>
        </li>
        <li>
          <Link to="/gallery">Gallery</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
