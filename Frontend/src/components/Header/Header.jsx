import React, { useEffect, useState } from 'react';
import './Header.css';
import { Bag, Hamberger, IntoMark } from '../../../Heroicons';
import { FaGithub, FaInstagram, FaFacebook } from 'react-icons/fa';
import ShoppingCartPopup from '../Cart';

const Header = () => {
    const [width, setWidth] = useState(window.innerWidth);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const handleResize = () => setWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <>
            <header className="header">
                <div className="header-wrapper">
                    {/* Logo Section */}
                    <div className="logo-container">
                        <img src="./logo.png" alt="Logo" className="logo" />
                    </div>

                    {/* Navigation Links */}
                    {width > 728 && (
                        <nav className="nav-links">
                            <a href="/" className="nav-link">Home</a>
                            <a href="#about" className="nav-link">About Us</a>
                            <a href="#platforms" className="nav-link">Platforms</a>
                            <a href="#contact" className="nav-link">Contact Us</a>
                        </nav>
                    )}

                    {/* Cart and Social Links */}
                    <div className="action-links">
                        <div className="cart-icon" onClick={() => setIsCartOpen(true)}>
                            <Bag />
                            <span className="cart-count">0</span>
                        </div>
                        {width <= 728 && (
                            <div className="hamburger" onClick={() => setIsOpen(!isOpen)}>
                                {isOpen ? <IntoMark /> : <Hamberger />}
                            </div>
                        )}
                    </div>
                </div>

                {/* Mobile Dropdown Menu */}
                {width <= 728 && isOpen && (
                    <nav className="mobile-menu">
                        <a href="/" className="mobile-link">Home</a>
                        <a href="#about" className="mobile-link">About Us</a>
                        <a href="#platforms" className="mobile-link">Platforms</a>
                        <a href="#contact" className="mobile-link">Contact Us</a>
                    </nav>
                )}
            </header>
            {isCartOpen && <ShoppingCartPopup setIsCartOpen={setIsCartOpen} />}
        </>
    );
};

export default Header;
