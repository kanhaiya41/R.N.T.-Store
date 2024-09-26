import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setOpenSignIn, setOpenSignUp } from '../redux/userSlice';
import axios from 'axios';
import { URL } from '../ultils';
import toast from 'react-hot-toast';

const SignUp = () => {


    const { openSignIn, openSignUp } = useSelector(store => store.user);
    const dispatch = useDispatch();

    const [input, setInput] = useState({
        username: '',
        email: '',
        mobile: '',
        password: ''
    });
    const [loading, setLoading] = useState(false);

    const [image, setImage] = useState(null);

    const changeEventHandler = (e) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
    }

    const signUpHandler = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const formdata = new FormData();
            formdata.append('username', input.username);
            formdata.append('email', input.email);
            formdata.append('mobile', input.mobile);
            formdata.append('password', input.password);
            formdata.append('image', image);
            const res = await axios.post(`${URL}/auth/signin`, formdata, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                withCredentials: true
            });
            if (res?.data?.success) {
                toast.success(res?.data?.message);
                dispatch(setOpenSignUp(!openSignUp))
            }
        } catch (error) {
            console.log(error)
            toast.error(error?.response?.data?.message);
        }
        finally {
            setLoading(false);
        }
    }

    return (
        <>
            <div id="signInBox" className="sign-in-box">
                <h2>Sign Up</h2>
                <form>
                    <label >Username:</label>
                    <input type="text" id="email" name="username" required onChange={changeEventHandler} value={input.username} />

                    <label >Email:</label>
                    <input type="email" id="email" name="email" required onChange={changeEventHandler} value={input.email} />

                    <label >Mobile:</label>
                    <input type="number" id="email" name="mobile" required onChange={changeEventHandler} value={input.mobile} />

                    <label >Password:</label>
                    <input type="password" id="password" name="password" required onChange={changeEventHandler} value={input.password} />

                    <label >Profile Pic:</label>
                    <input type="file" id="file" name="file" style={{ display: 'none' }} required onChange={(e) => setImage(e.target.files[0])} />
                    <label className='fillbl' htmlFor="file">{image ? image?.name : 'choose from device...'}</label>
                    {
                        loading ? <button>
                            <img src="/img/loader.png" className='Loader' alt="loader" />
                        </button>
                            :
                            <button type="submit" onClick={signUpHandler}>Sign Up</button>
                    }
                </form>
                <span className="close-signin" onClick={() => dispatch(setOpenSignUp(!openSignUp))}>X</span>
                <p>Already have an account?<span style={{ color: 'green', cursor: 'pointer' }} onClick={() => {
                    dispatch(setOpenSignUp(!openSignUp));
                    dispatch(setOpenSignIn(!openSignIn));
                }}> Sign In</span>  </p>
            </div>
        </>
    )
}

export default SignUp
