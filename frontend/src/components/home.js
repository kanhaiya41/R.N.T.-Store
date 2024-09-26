import React from 'react'
import '../App.css'

import Navbar from './Navbar';
import { useNavigate } from 'react-router-dom';


const Home = () => {

    const navigate=useNavigate();

    return (
        <>
            <div className="home">
                <Navbar />
                <div className="background">

                </div>
                <div className='content'>
                    <h1>RNT College Your Next Step To Success</h1>
                    <h4>Welcome To RNT Group of Colleges </h4>
                    <h6>Store Management</h6>
                    <button className='strbtn' onClick={()=>navigate('/main-menu')}>Go to Store</button>
                </div>
            </div>
        </>
    )
}

export default Home
