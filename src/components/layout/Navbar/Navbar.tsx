import React from "react"
import { Link } from "gatsby"
import "./Navbar.css"

const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="navbar-inner">
                <div className="nav-links">
                    <Link to="/">Home</Link>
                    <Link to="/about">About Me</Link>
                    <Link to="/journal">Journal</Link>
                    <Link to="/gallery">Gallery</Link>
                    <Link to="/testimonials">Testimonials</Link>
                    <Link to="/contact">Contact</Link>
                </div>

                <div className="nav-cta">
                    <a
                        href="/cv.pdf"
                        className="cv-button"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Download CV
                    </a>
                </div>
            </div>
        </nav>
    )
}

export default Navbar
