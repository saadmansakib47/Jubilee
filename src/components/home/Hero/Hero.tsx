import React from "react"
import "./Hero.css"

const Hero = () => {
    return (
        <section className="hero">
            <div className="hero-overlay" />

            <div className="hero-content">
                <div className="hero-text">
                    <h1>Personal Virtual Medical Chamber</h1>
                    <p>
                        Compassionate care, clinical insight, and thoughtful medical
                        practice — all in one place.
                    </p>

                    <button className="hero-cta">Book Appointment</button>
                </div>

                <div className="hero-image">
                    <img src="/hero-doctor.jpg" alt="Doctor portrait" />
                </div>
            </div>
        </section>
    )
}

export default Hero
