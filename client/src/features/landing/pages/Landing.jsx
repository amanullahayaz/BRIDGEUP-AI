import React from 'react';
import { Link } from 'react-router';
import '../style/landing.scss';
import Navbar from '../../../components/Navbar';

const Landing = () => {
    return (
        <div className="landing-page">
            <Navbar />

            {/* Hero Section */}
            <main className="hero-section">
                <h1>
                    Ace Your Next Interview with <br />
                    <span className="highlight">Personalized AI Strategies</span>
                </h1>
                <p>
                    Don't go into your job interviews unprepared. Simply upload your resume and the target job description, and our AI will build a tailored preparation plan complete with technical and behavioral questions specifically aimed at your profile.
                </p>
                <Link to="/register" className="cta-button">
                    Get Started for Free
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                        <polyline points="12 5 19 12 12 19"></polyline>
                    </svg>
                </Link>
            </main>
        </div>
    );
};

export default Landing;
