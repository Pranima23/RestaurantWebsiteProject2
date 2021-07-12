import React, {useState, useEffect} from 'react'
import {Link, useHistory} from 'react-router-dom'
import {Button} from './Button';
import './Navbar.css';
import {FaBars, FaTimes, FaKeybase , FaCartPlus, FaRobot} from 'react-icons/fa';
import {IconContext} from 'react-icons/lib';
// import Chatbot from './Chatbot';

function Navbar() {
    const [click, setClick] = useState(false)
    const [button, setButton] =useState(true)
    const handleClick = () =>{
        setClick(!click)
    }

    const closeMobileMenu= () => setClick(false)

    const showButton = () =>{
        if (window.innerWidth <=960){
            setButton(false)
        } else{
            setButton(true);
        }
    };

    useEffect(() => {
        showButton();
        }, []);

    window.addEventListener('resize', showButton);
    const history=useHistory();

    let user= JSON.parse(localStorage.getItem('user-info'))

    function logout(){
        localStorage.clear();
        history.pushState('/register')
    }
    return (
        <>
        <IconContext.Provider value={{color:'#fff'}}>
           <div className="navbar">
               <div className="navbar-container container">
                   <Link className="navbar-logo">
                       <FaKeybase className="navbar-icon"/> 
                        Reserve N' Dine
                   </Link> {/* This is the place where the link is established using the word */}
                   <div className="menu-icon" onClick={handleClick}> {/* This is for the hamburger menu*/}
                       {click? <FaTimes/> : <FaBars/>}
                   </div>
                   <ul className={click? 'nav-menu active' : 'nav-menu'}>
                        <li className="nav-item">
                            <Link to='/' className='nav-links'>
                                Home
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to='/services' className='nav-links'>
                                Our Services
                            </Link>
                        </li>
                            <li className="nav-item">
                                <Link to='/menu' className='nav-links'>
                                    Menu
                                </Link>
                            </li>
                        <li className="nav-item">
                            <Link to='/contact' className='nav-links'>
                                Contact
                            </Link>
                        </li>
                        <Link
                             className='social-icon-link'
                              to='/cart'
                              aria-label='Cart'
                            >
                        <FaCartPlus/>
                        </Link>
                        
                        <li className="nav-btn">
                            { button ?(
                                <Link to='/register' className="btn-link">
                                    <Button onclick={logout} buttonStyle ='btn--outline'> SIGN UP </Button>
                                </Link>
                            ): 
                            (
                                <Link to='/register' className="btn-link">
                                    <Button  onclick={logout} buttonStyle='btn--outline' buttonSize='btn--mobile'> SIGN UP </Button>
                                </Link>
                            )
                            }
                        </li>
                        <li className="nav-btn">
                            { button ?(
                                <Link to='/log-in' className="btn-link">
                                    <Button buttonStyle='btn--outline'> LOG IN </Button>
                                </Link>
                            ): 
                            (
                                <Link to='/log-in' className="btn-link">
                                    <Button buttonStyle='btn--outline' buttonSize='btn--mobile'> LOG IN </Button>
                                </Link>
                            )
                            }
                        </li>
                        {localStorage.getItem('user-info')?  /* For the logout and the username option on the navbar */
                                <li className="nav-btn">
                                    { button ?(
                                            <Link to='/' className="btn-link">
                                                <Button buttonStyle='btn--outline'> LOG OUT </Button>
                                                <li className="nav-item" title={"user && user.name"}>
                                                </li>
                                            </Link>
                                        ): 
                                        (
                                            <Link to='/' className="btn-link">
                                                <Button buttonStyle='btn--outline' buttonSize='btn--mobile'> LOG OUT </Button>
                                                <li className="nav-item" title={"user && user.name"}>
                                                </li>  
                                            </Link>
                                        )
                                    }
                            </li>
                            :null
                        }

                        {/* <Link 
                             className='social-icon-link'
                              to='/Chatbot'
                              aria-label='Chatbot'
                            >
                                <Button onclick={Chatbot} buttonStyle='btn--outline' buttonSize='btn--mobile'> <FaRobot/></Button>
                       
                        </Link> */}
                   </ul>
               </div>
           </div>
           </IconContext.Provider>                    
        </>
    )
}

export default Navbar
