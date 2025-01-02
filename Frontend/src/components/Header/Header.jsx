import React, { useEffect, useState } from 'react';
import './Header.css';
import { Bag, Hamberger, IntoMark } from '../../../Heroicons';
import { FaGithub, FaInstagram, FaFacebook } from 'react-icons/fa';
import ShoppingCartPopup from '../Cart';
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, ShoppingBag, X } from 'lucide-react';

const Header = ({openCart,setOpenCart}) => {
    const [width, setWidth] = useState(window.innerWidth);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [deferredPrompt, setDeferredPrompt] = useState(null);

    useEffect(() => {
        const handleResize = () => setWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        window.addEventListener('beforeinstallprompt', (e) => {
        e.preventDefault();
        setDeferredPrompt(e); // Store the event so we can trigger it later
        });
    }, []);

    useEffect(() => {
        const handleBeforeInstallPrompt = (e) => {
          e.preventDefault();  
          setDeferredPrompt(e); 
        };
    
        window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    
        return () => {
          window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
        };
      }, []);
    
        // Handle the click to trigger the install prompt
        const handleInstallClick = (e) => {
          e.preventDefault();  // Prevents default behavior
      
          if (deferredPrompt) {
            deferredPrompt.prompt();  // Show the install prompt
      
            deferredPrompt.userChoice.then((choiceResult) => {
              if (choiceResult.outcome === 'accepted') {
                console.log('User accepted the A2HS prompt');
              } else {
                console.log('User dismissed the A2HS prompt');
              }
              setDeferredPrompt(null);  // Reset the prompt after it is used
            });
          }
        };

        console.log(isOpen)
    const menuItems = [
        { title: "Home", href: "/" },
        { title: "About Us", href: "#about" },
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

                    {console.log(isCartOpen,isOpen)}
                    {/* Cart and Social Links */}
                    <div className="action-links">
                        <div className="cart-icon" onClick={() => {
                            setIsCartOpen(true)
                            setOpenCart(true)
                        }}>
                            <Bag />
                            <span className="cart-count">{JSON.parse(localStorage.getItem('cart'))?.length || 0}</span>
                        </div>
                        {width <= 728 && (
                            <div className="hamburger" onClick={() => setIsOpen(true)}>
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
            {(isCartOpen || openCart) && <ShoppingCartPopup setIsCartOpen={setIsCartOpen} setOpenCart={setOpenCart} />}
        </>
    );
};

export default Header;

