import axios from 'axios';
import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { URL } from '../ultils';
import toast from 'react-hot-toast';
import { setUser } from '../redux/userSlice';
import { useDispatch } from 'react-redux';

const Auth = () => {

    const location = useLocation();
    const { Code } = location.state;
    const { newEmail } = location.state;
    const [code, setCode] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);


    const updateEmail = async () => {
        if (Code === code) {
            try {
                setLoading(true);
                const formData = new FormData();

                formData.append('email', newEmail);

                // FormData को प्रिंट करने का सही तरीका
                for (var pair of formData.entries()) {
                    console.log(pair[0] + ': ' + pair[1]);
                }
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
            } catch (error) {
                console.log(error);
                toast.error(error?.response?.data?.message);
            }
            finally {
                setLoading(false);
            }
        }
        else {
            toast.error('Incorrect or Expired Code');
        }
    }

    return (
        <>
            <div className='auth'>
                <h4>Email Authentication:</h4>
                <input type="text" placeholder='Enter Code (to your old mail)' value={code} onChange={(e) => setCode(e.target.value)} />
                {
                    loading ? <button>
                        <img src="/img/loader.png" className='Loader' alt="loader" />
                    </button>
                        :
                        <button onClick={updateEmail}>Update Gmail</button>
                }
            </div>
        </>
    )
}

export default Auth
