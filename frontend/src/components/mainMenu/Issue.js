import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { URL } from '../../ultils';
import toast from 'react-hot-toast';
const Issue = () => {

    const [issueReq, setIssueReq] = useState([]);
    const [input, setInput] = useState({
        username: '',
        product: ''
    });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const getIssueReqests = async () => {
            try {
                const res = await axios.get(`${URL}/admin/getissuereq`, { withCredentials: true });
                if (res?.data?.success) {
                    setIssueReq(res?.data?.req);
                }
            } catch (error) {
                console.log(error);
            }
        }
        getIssueReqests();
    }, [issueReq]);

    const onChangeinput = (e) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
    }

    const issueNow = async () => {
        try {
            setLoading(true);
            const res = await axios.post(`${URL}/admin/issue`, input, {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            });
            if (res?.data?.success) {
                toast.success(res?.data?.message);
                setInput({
                    username: '',
                    product: ''
                })
            }
        } catch (error) {
            console.log(error)
        }
        finally {
            setLoading(false);
        }
    }

    const deleteRequest = async () => {
        try {
            setLoading(true);
            const res = await axios.get(`${URL}/admin/deleteissuerequests/${input.username}/${input.product}`);
            if (res?.data?.success) {
                toast.success(res?.data?.message);
            }
            setInput({
                username: '',
                product: ''
            })
        } catch (error) {
            console.log(error);
            toast.error(error?.response?.data?.message);
        }
        finally {
            setLoading(false);
        }
    }

    const Clear = () => {
        setInput({
            username: '',
            product: ''
        })
    }

    return (
        <>
            <div>
                <div className='issueItem'>
                    <h1>Requests from Users:-</h1>
                    <div className='issuetable'  >

                        <table className='sotable'>
                            <thead>
                                <tr className='table-th'>
                                    <th className='table-head'>S.N.</th>
                                    <th className='table-head'>UserName</th>
                                    <th className='table-head'>product</th>
                                    <th className='table-head'>quantity</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    issueReq && issueReq.map((curElem, index) => (
                                        <tr className='table-row'>
                                            <td className='table-data'>{index + 1}</td>
                                            <td className='table-data'>{curElem.username}</td>
                                            <td className='table-data'>{curElem.product}</td>
                                            <td className='table-data'>{curElem.quantity}</td>

                                        </tr>
                                    ))
                                }


                            </tbody>
                        </table>
                    </div>
                    <h2>Do Operations with Resquests....</h2>
                    <div className='reqitm' >
                        UserName: <input type="text" name='username' className='ritem' value={input.username} onChange={onChangeinput} /></div>

                    <div className='reqitm' >
                        ProductName: <input type="text" name='product' className='ritem' value={input.product} onChange={onChangeinput} /></div>

                    <div style={{ display: 'flex', gap: '10%', marginLeft: '6vw', marginTop: '2vh' }}>
                        {
                            loading ? <button>
                                <img src="/img/loader.png" className='Loader' alt="loader" />
                            </button>
                                :
                                <button onClick={issueNow}>Accept</button>
                        }
                        {
                            loading ? <button>
                                <img src="/img/loader.png" className='Loader' alt="loader" />
                            </button>
                                :
                                <button onClick={deleteRequest}>Delete</button>
                        }
                        <button onClick={Clear} >Clear</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Issue
