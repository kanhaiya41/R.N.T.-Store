import React, { useEffect, useState } from 'react'
import {useSelector} from 'react-redux';
import axios from 'axios';
import {URL} from '../../ultils';
import toast from 'react-hot-toast';

const MyItems = () => {

    const [stock, setStock] = useState([]);
    const {user}=useSelector(store=>store.user);

    useEffect(() => {
        const fetchStock=async ()=>{
            try {
                const res = await axios.get(`${URL}/user/useritems/${user.username}`, { withCredentials: true });
                if (res?.data?.success) {
                    setStock(res?.data?.ui);
                }
                else{
                    toast.error(res?.data?.message);
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchStock();
    },[]);

    return (
        <>
            <div className='allitems'>
                <h1 className='avstock' >Your Items</h1>
                <div className='tabled' style={{height:'60vh'}} >

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
                                stock && stock.map((curElem, index) => (
                                    <tr className='table-row'>
                                        <td className='table-data'>{index+1}</td>
                                        <td className='table-data'>{curElem.product}</td>
                                        <td className='table-data'>{curElem.quantity} </td>
                                        <td className='table-data'>{curElem.rate}</td>
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

export default MyItems
