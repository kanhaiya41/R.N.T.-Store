import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { URL } from '../../ultils';
import toast from 'react-hot-toast';

const Approvel = () => {

    const [approvelList, setApprovelList] = useState([]);
    const [selectionList, setSelectionList] = useState([]);
    const [username, setUsername] = useState('');
    const [selection, setSelection] = useState('');

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const getApprovels = async () => {
            try {
                const res = await axios.get(`${URL}/admin/getapprovel`, { withCredentials: true });
                if (res?.data?.success) {
                    setApprovelList(res?.data?.ua);
                    setSelectionList(res?.data?.ua);
                }
            } catch (error) {
                console.log(error);
            }
        }
        getApprovels();
    }, [approvelList]);



    const handlselection = (e) => {
        setSelection(e.target.value);
        setUsername(e.target.value);
    }

    useEffect(() => {
        const filteredList = approvelList.filter((user) =>
            user.username.toLowerCase().includes(username.toLowerCase())
        );
        setSelectionList(filteredList);
    }, [username, approvelList]);

    const approveNow = async () => {
        try {
            setLoading(true);
            const res = await axios.post(`${URL}/admin/approvel/${username}`, {
                headers: {
                    'Content-Type': 'application/json'
                }
                ,
                withCredentials: true
            });
            if (res?.data?.success) {
                toast.success(res?.data?.message);
            }
        } catch (error) {
            console.log('error during approvel', error);
            toast.error(error?.response?.data?.message);
        }
        finally {
            setLoading(false);
        }
    }

    const deleteRequest = async () => {
        try {
            setLoading(true);
            const res = await axios.get(`${URL}/admin/deleteapprovel/${username}`);
            if (res?.data?.success) {
                toast.success(res?.data?.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error?.response?.data?.message);
        }
        finally {
            setLoading(false);
        }
    }

    const Clear = () => {
        setUsername('');
    }

    return (
        <>
            <div>
                <div className='issueItem'>
                    <h2>User Requests:-</h2>
                    <div className='issuetable'  >

                        <table className='sotable'>
                            <thead>
                                <tr className='table-th'>
                                    <th className='table-head'>S.N.</th>
                                    <th className='table-head'>Username</th>
                                    <th className='table-head'>email</th>
                                    <th className='table-head'>mobile</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    approvelList && approvelList.map((curElem, index) => (
                                        <tr className='table-row'>
                                            <td className='table-data'>{index + 1}</td>
                                            <td className='table-data'>{curElem.username}</td>
                                            <td className='table-data'>{curElem.email}</td>
                                            <td className='table-data'>{curElem.mobile}</td>
                                        </tr>
                                    ))
                                }


                            </tbody>
                        </table>
                    </div>
                    <h2>Do Operations with Resquests....</h2>
                    <div className='reqitma' >
                        UserName:
                        <div className='ritema'>
                            <input type="text" className='ritema' value={username} onChange={(e) => setUsername(e.target.value)} />
                            <select className='ritema' value={selection} onChange={handlselection} name="" id="">
                                {
                                    selectionList && selectionList.map((curElem) => (
                                        <option value={curElem.username}>{curElem.username}</option>
                                    ))
                                }

                            </select>
                        </div>
                    </div>




                    <div style={{ display: 'flex', gap: '10%', marginLeft: '6vw', marginTop: '2vh' }}>
                        {
                            loading ? <button>
                                <img src="/img/loader.png" className='Loader' alt="loader" />
                            </button>
                                :
                                <button onClick={approveNow}>Approve</button>
                        }
                        {
                            loading ? <button>
                                <img src="/img/loader.png" className='Loader' alt="loader" />
                            </button>
                                :
                                <button onClick={deleteRequest}>Delete</button>
                        }
                        <button onClick={Clear}>Clear</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Approvel
