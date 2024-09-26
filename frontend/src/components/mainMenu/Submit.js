import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { URL } from '../../ultils';
import toast from 'react-hot-toast';

const Submit = () => {

    const [submitReq, setSubmitReq] = useState([]);
    const [input, setInput] = useState({
        username: '',
        product: ''
    })
    const [loading, setLoading] = useState(false);


    useEffect(() => {
        const getSubmitReqests = async () => {
            try {
                const res = await axios.get(`${URL}/admin/getsubmitreq`, { withCredentials: true });
                if (res?.data?.success) {
                    setSubmitReq(res?.data?.req);
                }
            } catch (error) {
                console.log(error);
            }
        }
        getSubmitReqests();
    }, [submitReq]);

    const onChangeinput = (e) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
    }

    const submitNow = async () => {
        try {
            setLoading(true);
            const res = await axios.post(`${URL}/admin/submit`, input, {
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

    const Clear = () => {
        setInput({
            username: '',
            product: ''
        })
    }

    return (
        <>
            <div className='issue'>
                <div className='issueItem'>
                    <h2>Requests for Submission from Users:-</h2>
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
                                    submitReq && submitReq.map((curElem, index) => (
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
                        UserName: <input type="text" className='ritem' name='username' value={input.username} onChange={onChangeinput} /></div>

                    <div className='reqitm' >
                        ProductName: <input type="text" className='ritem' name='product' value={input.product} onChange={onChangeinput} /></div>

                    <div style={{ display: 'flex', gap: '10vw', marginLeft: '6vw', marginTop: '2vh' }}>
                        {
                            loading ? <button>
                                <img src="/img/loader.png" className='Loader' alt="loader" />
                            </button>
                                :
                                <button onClick={submitNow}>Accept</button>
                        }
                        <button onClick={Clear}>Clear</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Submit
