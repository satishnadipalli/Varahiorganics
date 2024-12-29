import React, { useEffect, useState } from 'react';
import './Header.css';
import { Bag, Hamberger, IntoMark } from '../../../Heroicons';
import { FaGithub, FaInstagram, FaFacebook } from 'react-icons/fa';
import ShoppingCartPopup from '../Cart';
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, ShoppingBag, X } from 'lucide-react';

const Header = () => {
    const [width, setWidth] = useState(window.innerWidth);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const handleResize = () => setWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    //   useEffect(() => {
    //     // Prevent scrolling when the popup is open
    //     document.body.style.overflow = "hidden";
    //     return () => {
    //       // Re-enable scrolling when the popup closes
    //       document.body.style.overflow = "auto";
    //     };
    //   }, []);

    const menuItems = [
        { title: "Home", href: "/" },
        { title: "About Us", href: "#about" },
        { title: "Platforms", href: "#platforms" },
        { title: "Contact Us", href: "#contact" },
    ];

    return (
        <>
            <header className="headerrr">
                <div className="header-wrapperrr">
                    {/* Logo Section */}
                    <div className="logo-container">
                        <img src="./logo.png" alt="Logo" className="logos" />
                    </div>

                    {/* Navigation Links */}
                    {width > 728 && (
                        <nav className="nav-links">
                            {menuItems.map((item) => (
                                <a key={item.title} href={item.href} className="nav-link">
                                    {item.title}
                                </a>
                            ))}
                        </nav>
                    )}

                    {/* Cart and Social Links */}
                    <div className="action-links">
                        <div className="cart-icon" onClick={() => setIsCartOpen(true)}>
                            <Bag />
                            <span className="cart-count">{JSON.parse(localStorage.getItem('cart'))?.length || 0}</span>
                        </div>
                        {width <= 728 && (
                            <div className="hamburger" onClick={() => setIsOpen(!isOpen)}>
                                {isOpen ? <IntoMark /> : <Hamberger />}
                            </div>
                        )}
                    </div>
                </div>

                {/* Mobile Dropdown Menu */}
                <AnimatePresence>
                    {width <= 728 && isOpen && (
                        <>
                            <motion.div
                                className="backdrop"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                onClick={() => setIsOpen(false)}
                            />
                            <motion.div
                                className="mobile-menu"
                                initial={{ x: "-100%" }}
                                animate={{ x: 0 }}
                                exit={{ x: "-100%" }}
                                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            >
                                {menuItems.map((item) => (
                                    <a
                                        key={item.title}
                                        href={item.href}
                                        className="mobile-link"
                                        onClick={() => setIsOpen(false)}
                                    >
                                        {item.title}
                                    </a>
                                ))}
                                <div className="mobile-social-links">
                                    <FaGithub className="social-icon" />
                                    <FaInstagram className="social-icon" />
                                    <FaFacebook className="social-icon" />
                                </div>
                            </motion.div>
                        </>
                    )}
                </AnimatePresence>
            </header>
            {isCartOpen && <ShoppingCartPopup setIsCartOpen={setIsCartOpen} />}
        </>
    );
};

export default Header;

