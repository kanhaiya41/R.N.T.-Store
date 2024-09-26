import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setOpenSignIn } from '../../redux/userSlice';

const NoUser = () => {

    const dispatch=useDispatch();
    const {openSignIn}=useSelector(store=>store.user);

    return (
        <div className='bgn'>
            <button onClick={() => dispatch(setOpenSignIn(!openSignIn))}>Sign in</button>


        </div>
    )
}

export default NoUser
