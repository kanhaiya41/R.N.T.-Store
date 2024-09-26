import React, { useState } from 'react'
import axios from 'axios';
import { URL } from '../ultils';
import toast from 'react-hot-toast';
import { setUser, setUserType } from '../redux/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const EditProfile = () => {

    const navigate = useNavigate();

    const dispatch = useDispatch();
    const { user } = useSelector(store => store.user);

    const [input, setInput] = useState({
        username: '',
        email: '',
        mobile: null,
        opassword: '',
        npassword: ''
    });
    const [loading, setLoading] = useState(false);


    const [image, setImage] = useState(null);

    const inputHandler = (e) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        });
    }

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    }

    const GenerateRandomOTP = (lenth) => {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const characterlenth = characters.length;
        let result = '';
        for (let i = 0; i < lenth; i++) {
            result += characters.charAt(Math.floor(Math.random() * characterlenth));
        }
        return result;
    }

    const sentMail = async (type) => {
        try {
            const Code = GenerateRandomOTP(6);
            if (Code) {
                setLoading(true);
                const res = await axios.post(`${URL}/auth/gmail/${user.email}/${Code}`);
                if (res?.data?.success) {
                    if (type === 'email') {
                        navigate('/email-auth', { state: { Code: Code, newEmail: input.email } });
                    }
                    else {
                        navigate('/password-authentication', { state: Code });
                    }
                    toast.success(res?.data?.message);
                }
            }
            else {
                toast.error('Code not sent!');
            }

        } catch (error) {
            console.log(error);

        }
        finally {
            setLoading(false);
        }
    }

    const editProfile = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const formData = new FormData();
            formData.append('username', input.username);
            formData.append('email', input.email);
            if (input.mobile) {
                formData.append('mobile', input.mobile);
            }
            formData.append('opassword', input.opassword);
            formData.append('npassword', input.npassword);
            if (image) {
                formData.append('image', image);
            }
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

    const logoutNow = async () => {
        try {
            setLoading(true);
            const res = await axios.get(`${URL}/auth/logout`, { withCredentials: true });
            if (res?.data?.success) {
                dispatch(setUser(null));
                dispatch(setUserType(''));
                navigate('/');
                toast.success(res?.data?.message);
            }
        } catch (error) {
            console.log(error);
        }
        finally {
            setLoading(false);
        }
    }

    return (
        <>
            <div className='editProfile'>
                <div>
                    <h2>Edit Your Profile</h2>
                </div>

                <div className='changeProfile'>
                    {
                        user.username === 'Host' ? '' : <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <label>Username: </label> <input name='username' className='fillbl' type="text" value={input.username} onChange={inputHandler} />
                            {
                                loading ? <button>
                                    <img src="/img/loader.png" className='Loader' alt="loader" />
                                </button>
                                    :
                                    <button type="submit" onClick={editProfile}>Save</button>
                            }
                        </div>
                    }

                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <label>Email:</label> <input name='email' type="text" className='fillbl' value={input.email} onChange={inputHandler} />
                        {
                            loading ? <button>
                                <img src="/img/loader.png" className='Loader' alt="loader" />
                            </button>
                                :
                                <button type="submit" onClick={() => sentMail('email')}>Save</button>
                        }
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <label>Mobile:</label> <input name='mobile' type="text" className='fillbl' value={input.mobile} onChange={inputHandler} />
                        {
                            loading ? <button>
                                <img src="/img/loader.png" className='Loader' alt="loader" />
                            </button>
                                :
                                <button type="submit" onClick={editProfile}>Save</button>
                        }
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <form onSubmit={editProfile}>
                            <h3> Change Password : </h3>
                            <label>old Password:</label> <input name='opassword' className='fillbl' type="password" value={input.opassword} onChange={inputHandler} required />
                            <label>new Password:</label> <input name='npassword' className='fillbl' type="password" value={input.npassword} onChange={inputHandler} required />
                            <div className='pswrd'>
                                {
                                    loading ? <button>
                                        <img src="/img/loader.png" className='Loader' alt="loader" />
                                    </button>
                                        :
                                        <button type="submit" >Save</button>
                                }

                                {
                                    loading ? <button>
                                        <img src="/img/loader.png" className='Loader' alt="loader" />
                                    </button>
                                        : <span className='frgtpswrd' onClick={() => sentMail('password')}>forget password</span>
                                }
                            </div>
                        </form>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>

                        <label>Profile Pic :</label> <input type="file" id="file" name="file" style={{ display: 'none' }} onChange={handleImageChange} />
                        <label className='fillbl' htmlFor="file" style={{ background: 'white', cursor: 'pointer' }}>{image ? image?.name : 'choose from device...'}</label>
                        {
                            loading ? <button>
                                <img src="/img/loader.png" className='Loader' alt="loader" />
                            </button>
                                :
                                <button type="submit" onClick={editProfile}>Save</button>
                        }
                    </div>
                </div>
                <div className='editlb'>
                    {
                        loading ? <button>
                            <img src="/img/loader.png" className='Loader' alt="loader" />
                        </button>
                            :
                            <button style={{ width: '50%' }} onClick={logoutNow} >Log Out</button>
                    }
                    <button style={{ width: '50%' }} onClick={() => navigate('/main-menu')} >Back</button>
                </div>

            </div>
        </>
    )
}

export default EditProfile
