import React, { Component } from 'react'
import {Link} from 'react-router-dom'

export default class Navbar extends Component {
    render() {
        return (
            <nav className="navbar container-fluid navbar-expand-lg navbar-light bg-light">
        <div className="container">
            <Link className="navbar-brand " to="/">MERN Gallery</Link>
            
            
                <ul className="navbar-nav ml-auto">
                   
                    <li className="nav-item">
                        <Link className="nav-link" to="/images/add">Manage</Link>
                    </li>
                   
                </ul>
            
        </div>

    </nav>
        )
    }
}
