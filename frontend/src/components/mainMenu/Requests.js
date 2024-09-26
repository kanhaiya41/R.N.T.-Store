import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { URL } from '../../ultils';
import { useSelector } from 'react-redux';

const Requests = () => {

    const [submitReqList, setSubmitReqList] = useState([]);
    const [issueReqList, setIssueReqList] = useState([]);
    const { user } = useSelector(store => store.user);

    useEffect(() => {
        const fetchRequests = async () => {
            try {
                const subRes = await axios.get(`${URL}/user/findsubmitreqest/${user.username}`, { withCrendentials: true });
                const issueRes = await axios.get(`${URL}/user/findissuereqest/${user.username}`, { withCrendentials: true });
                if (subRes?.data?.success && issueRes?.data?.success) {
                    setSubmitReqList(subRes?.data?.issuereqests);
                    setIssueReqList(issueRes?.data?.issuereqests);
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchRequests();
    })

    return (
        <>
            <div>
                {/* issue Requests */}
                <div className='r'>
                    <h4 className='avstock' >You Requested for Items:-</h4>
                    <div className='tabled' >

                        <table className='sotable'>
                            <thead>
                                <tr className='table-th'>
                                    <th className='table-head'>S.N.</th>
                                    <th className='table-head'>Product</th>
                                    <th className='table-head'>Quantity</th>
                                    <th className='table-head'>Rate(Single Pro.)</th>
                                </tr>

                            </thead>
                            <tbody>
                                {
                                    issueReqList && issueReqList.map((curElem, index) => (
                                        <tr className='table-row'>
                                            <td className='table-data'>{index+1}</td>
                                            <td className='table-data'>{curElem.product}</td>
                                            <td className='table-data'>{curElem.quantity}</td>
                                            <td className='table-data'> {curElem.rate} </td>
                                        </tr>
                                    ))
                                }

                                
                            </tbody>
                        </table>
                    </div>
                </div>
                {/* Submisstion Requests  */}
                <div className='rr'>
                    <h4 className='avstock' >Submission Requests</h4>
                    <div className='tabled'  >

                        <table className='sotable' >
                            <thead>
                                <tr className='table-th'>
                                    <th className='table-head'>S.N.</th>
                                    <th className='table-head'>Product</th>
                                    <th className='table-head'>Quantity</th>
                                    <th className='table-head'>Rate(Single Pro.)</th>
                                </tr>

                            </thead>
                            <tbody>
                            {
                                    submitReqList && submitReqList.map((curElem, index) => (
                                        <tr className='table-row'>
                                            <td className='table-data'>{index+1}</td>
                                            <td className='table-data'>{curElem.product}</td>
                                            <td className='table-data'>{curElem.quantity}</td>
                                            <td className='table-data'> {curElem.rate} </td>
                                        </tr>
                                    ))
                                }
                                
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Requests
