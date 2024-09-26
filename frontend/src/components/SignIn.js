import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setOpenSignIn, setOpenSignUp, setUser, setUserType } from '../redux/userSlice';
import axios from 'axios';
import { URL } from '../ultils';
import toast from 'react-hot-toast';
import { json } from 'react-router-dom';

const SignIn = () => {

    const { openSignIn, openSignUp, user, userType } = useSelector(store => store.user);
    const dispatch = useDispatch();

    const [input, setInput] = useState({
        email: '',
        password: ''
    });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        document.getElementById("signInBox").classList.add('animate');

    }, []);



    const signIn = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            console.log(input);
            const res = await axios.post(`${URL}/auth/login`, input, {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            });
            if (res?.data?.success) {
                dispatch(setUser(res?.data?.user));
                dispatch(setUserType(res?.data?.type));
                toast.success(res?.data?.message);
            }
            dispatch(setOpenSignIn(!openSignIn));

        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }
        finally {
            setLoading(false);
        }
    }

    const inputHandler = (e) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
    }

    return (
        <>
            <div id="signInBox" className="sign-in-box">
                <h2>Sign In</h2>
                <form>
                    <label for="email">Email:</label>
                    <input type="email" id="email" name="email" required value={input.email} onChange={(e) => inputHandler(e)} />

                    <label for="password">Password:</label>
                    <input type="password" id="password" name="password" required value={input.password} onChange={(e) => inputHandler(e)} />
                    {
                        loading ? <button>
                            <img src="/img/loader.png" className='Loader' alt="loader" />
                        </button>
                            :
                            <button type="submit" onClick={signIn}>Sign In</button>
                    }
                </form>
                <span className="close-signin" onClick={() => dispatch(setOpenSignIn(!openSignIn))}>X</span>
                <p>Don't have any account?<span style={{ color: 'green', cursor: 'pointer' }} onClick={() => {
                    dispatch(setOpenSignUp(!openSignUp));
                    dispatch(setOpenSignIn(!openSignIn));
                }}> Sign Up</span>  </p>
            </div>
        </>
    )
}

export default SignIn
