import React from 'react';
import { Link } from 'react-router-dom';
const Header = () => (
        <nav>
            <div className="nav-wrapper  indigo lighten-2">
                <Link to={'/'} className ="brand-logo">CourseSearch</Link>
                <ul id="nav-mobile" className="right hide-on-med-and-down">
                    <li><Link to={'/shop'}>Shop</Link></li>
                    <li><Link to={'/about'}>About Us</Link></li>
                </ul>
            </div>

        </nav>
    );

export default Header;