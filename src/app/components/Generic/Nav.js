import React from 'react';
import { Link } from 'react-router-dom';
import './nav.scss';

const Nav = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">
            <img src="/images/beckett-logo.svg" />
          </Link>
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
