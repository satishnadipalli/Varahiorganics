import React, { useEffect, useState } from 'react';
import './Header.css';
// import logo from './logo.png';
import { Hamberger,IntoMark } from '../../../Heroicons';
import { FaGithub, FaInstagram, FaFacebook } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import ShoppingCartPopup from '../Cart';

const Header = () => {
    const [width, setWidth] = useState(window.innerWidth);
    const [isCartOpen,setIsCartOpen]= useState(false);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const handleWidth = () => {
            setWidth(window.innerWidth);
        };

        window.addEventListener('resize', handleWidth);

        // Cleanup listener on unmount
        return () => window.removeEventListener('resize', handleWidth);
    }, []);

    return (
        <>
            <header>
                {width > 728 ? (
                    <div className='head_wraper'>
                        <div className='logo_container'>
                            <img
                                src={"./logo.png"}
                                alt='Logo not found'
                                className='company_logo'
                            />
                        </div>
                        <div className='route_container'>
                            <span className='route_names'>Home</span>
                              <span className='route_names'>Aboutus</span>
                            {/* <span className='route_names'>Services</span> */}
                            {/* <span className='route_names'>Blogs</span> */}
                            <span className='route_names'>Platforms</span>
                            <span className='route_names'>Contact Us</span>
                        </div>
                        <div className='route_links'>
                            <a href="https://github.com/your-username" target="_blank" rel="noopener noreferrer">
                                <FaGithub size={21} color='black' className='linku'/>
                            </a>
                            <a href="https://instagram.com/your-username" target="_blank" rel="noopener noreferrer">
                                <FaInstagram size={21} color='black' className='linku'/>
                            </a>
                            <a onClick={()=>setIsCartOpen(true)}>
                                <FaFacebook size={21} color='black' className='linku'/>
                            </a>
                        </div>
                    </div>
                ) : (
                    <div className='head_wraper'>
                        <div className='logo_container'>
                            <img
                                src={"./logo.png"}
                                alt='Logo not found'
                                className='company_logo'
                            />
                        </div>
                        <div>
                            <div className='route_links' style={{margin:"auto"}}>
                                <a href="https://github.com/your-username" target="_blank" rel="noopener noreferrer">
                                    <FaGithub size={22} color='rgb(7 ,107 ,178)' className='linku'/>
                                </a>
                                <a href="https://instagram.com/your-username" target="_blank" rel="noopener noreferrer">
                                    <FaInstagram size={22} color='rgb( 27 ,173 ,153)' className='linku'/>
                                </a>
                                <a href="https://facebook.com/your-username" target="_blank" rel="noopener noreferrer">
                                    <FaFacebook size={23} color='rgb(75, 80 ,88)' className='linku'/>
                                </a>
                            </div>
                        </div>
                        <div className='hamberger_div' onClick={() => setIsOpen(prev => !prev)}>
                            {isOpen ? <IntoMark /> : <Hamberger />}
                        </div>
                    </div>
                )}
            </header>
            {isCartOpen && <ShoppingCartPopup setIsCartOpen={setIsCartOpen}/>}
            {width <= 728 && (
                <div className={`drop_down_menu ${isOpen ? 'open' : ''}`}>
                    <a href='#' className='anchor'>About</a>
                    <a href='#' className='anchor'>Products</a>
                    <a href='#' className='anchor'>Contact Us</a> 
                    <a href='#' className='anchor'>Solutions</a> 
                    <a href='#' className='anchor'>Insights</a> 
                </div>
            )}
        </>
    );
};

export default Header;