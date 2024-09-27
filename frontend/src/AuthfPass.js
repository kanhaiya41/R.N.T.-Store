import axios from 'axios';
import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast';
// import { setUser } from '../redux/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { URL } from './ultils';
import { setUser } from './redux/userSlice';

const AuthfPass = () => {

    const location = useLocation();
    const { user } = useSelector(store => store.user);
    const Code = location.state.Code;
    // const { newEmail } = location.state;
    const [code, setCode] = useState('');
    const [pass, setPass] = useState('');
    const [cpass, setCpass] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);


    const updateEmail = async () => {
        let email;
        if(location?.state?.email)
        {
            email=location?.state?.email
        }
        console.log("code from signin",Code);
        console.log("code from ath",code);
        if (Code === code) {
            if (pass === cpass) {
                try {
                    setLoading(true);
                    const formData = new FormData();

                    formData.append('npassword', pass);
                    if(user)
                    {
                        const res = await axios.post(`${URL}/auth/editprofile`, formData, {
                            headers: {
                                'Content-Type': 'multipart/form-data'
                            },
                            withCredentials: true
                        });
                        if (res?.data?.success) {
                            dispatch(setUser(res?.data?.updateduser));
                            toast.success(res?.data?.message);
                            
                                navigate('/profile');
                        }
                        else {
                            toast.error(res?.data?.message);
                        }
                    }
                    else{
                        const res = await axios.post(`${URL}/auth/forgetpass`,{email,password:pass},  {
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            withCredentials: true
                        });
                        if (res?.data?.success) {
                            dispatch(setUser(res?.data?.updateduser));
                            toast.success(res?.data?.message);
                            
                                navigate('/');
                        }
                        else {
                            toast.error(res?.data?.message);
                        }
                    }
                    
                    
                } catch (error) {
                    console.log(error);
                    toast.error(error?.response?.data?.message);
                }
                finally {
                    setLoading(false);
                }
            }
            else {
                toast.error('Confirm Password doest not match!')
            }

        }
        else {
            toast.error('Incorrect or Expired Code');
        }
    }

    return (
        <>
            <div className='auth'>
                <h4>Password Authentication:</h4>
                <input type="text" placeholder='Enter Code (to your mail)' value={code} onChange={(e) => setCode(e.target.value)} />
                <input type="password" placeholder='Enter new Password' value={pass} onChange={(e) => setPass(e.target.value)} />
                <input type="password" placeholder='Confirm new Password' value={cpass} onChange={(e) => setCpass(e.target.value)} />
                {
                    loading ? <button>
                        <img src="/img/loader.png" className='Loader' alt="loader" />
                    </button>
                        :
                        <button onClick={updateEmail}>Update Password</button>
                }
            </div>
        </>
    )
}

export default AuthfPass
