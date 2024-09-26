import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAddressBook, faBarChart, faCalendarMinus, faChartBar } from '@fortawesome/free-regular-svg-icons'
import { faBraveReverse, faBuyNLarge, faMendeley } from '@fortawesome/free-brands-svg-icons'
import { faBars, faClose } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom';
import SignIn from './SignIn';
import SignUp from './SignUp';
import { useDispatch, useSelector } from 'react-redux';
import { setOpenSignIn, setUser, setUserType } from '../redux/userSlice';
import axios from 'axios';
import { URL } from '../ultils';
import toast from 'react-hot-toast';

const Navbar = () => {

    const { openSignIn, openSignUp, user, userType } = useSelector(store => store.user);
    const dispatch = useDispatch();

    const navigate = useNavigate();
    const openNav = () => {
        document.getElementById("mySidenav").style.width = "200px";
    }

    function closeNav() {
        document.getElementById("mySidenav").style.width = "0";
    }

    const logoutNow=async()=>{
        try {
            const res=await axios.get(`${URL}/auth/logout`,{withCredentials:true});
        if(res?.data?.success)
        {
            dispatch(setUser(null));
            dispatch(setUserType(''));
            navigate('/');
            toast.success(res?.data?.message);
        }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <nav>
                <img src="/img/LOGO.jpeg" alt="LOGO" />
                <div className='nav'>
                    <h4 onClick={() => navigate('/')}>Home</h4>
                    <h4 onClick={() => navigate('/main-menu')}>Main Menu</h4>
                    <h4 onClick={() => navigate('/contact')}>Contact Us</h4>
                    <h4 onClick={() => navigate('/about')}>About Us</h4>
                    {user ? <div onClick={()=>navigate('/profile')} className='pdiv'><img className='ppic' src={user.image} alt="profile" /><span>{user.username}</span></div>
                        : <button onClick={() => dispatch(setOpenSignIn(!openSignIn))}>Sign in</button>
                    }

                    <FontAwesomeIcon icon={faBars} onClick={openNav} className='menuicon' />

                </div>
            </nav>
            <div id="mySidenav" className="sidenav">
                <div className="closebtn" onClick={closeNav}><FontAwesomeIcon icon={faClose} /></div>
                <div onClick={() => navigate('/')}>Home</div>
                <div onClick={() => navigate('/main-menu')}>Main Menu</div>
                <div onClick={() => navigate('/contact')}>Contact Us</div>
                <div onClick={() => navigate('/about')}>About Us</div>
                {user ? <button onClick={() =>{
                    closeNav();
                    logoutNow();}
                }>logout</button> : <button onClick={() => {
                    dispatch(setOpenSignIn(!openSignIn));
                    closeNav();
                }}>Sign in</button>}



            </div >
            {
                openSignIn && <SignIn />
            }
            {
                openSignUp && <SignUp />
            }

        </>
    )
}

export default Navbar
