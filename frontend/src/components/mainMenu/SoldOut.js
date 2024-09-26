import React, { useEffect, useState } from 'react'
import axios from 'axios';
import {URL} from '../../ultils';

const SoldOut = () => {

    const [submitReq, setSubmitReq] = useState([]);

    useEffect(() => {
        const getSubmitReqests = async () => {
            try {
                const res = await axios.get(`${URL}/admin/soldout`, { withCredentials: true });
                if (res?.data?.success) {
                    setSubmitReq(res?.data?.soi);
                }
            } catch (error) {
                console.log(error);
            }
        }
        getSubmitReqests();
    }, [submitReq]);

    return (
        <>
            <div className='allitems'>
                <h1 className='avstock' >Recently Sold Out Items:-</h1>
                <div className='tabled' style={{height:"60vh"}} >

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
            </div>
        </>
    )
}

export default SoldOut
