import React, {Component} from 'react';
import { Link } from 'react-router-dom';

export default class Header extends Component {
  render() {
    return (
      <div className='container box'>
        <nav className='navbar navbar-expand-lg navbar-light'>
          <ul className='navbar-nav mr-auto'>
            <li className='nav-item active'>
              <Link to='/users' className='nav-link'>Customers Manager</Link>
            </li>
          </ul>
        </nav>
      </div>
    )
  }
}
