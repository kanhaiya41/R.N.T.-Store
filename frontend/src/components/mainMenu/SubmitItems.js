import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { URL } from '../../ultils';
import toast from 'react-hot-toast';

const SubmitItems = () => {

    const [stock, setStock] = useState([]);
    const { user } = useSelector(store => store.user);
    const [input, setInput] = useState({
        username: '',
        product: '',
        quantity: null,
        rate: null
    });
    const [rate, setRate] = useState({});

    const [loading, setLoading] = useState(false);


    useEffect(() => {
        const fetchStock = async () => {
            try {
                const res = await axios.get(`${URL}/user/useritems/${user.username}`, { withCredentials: true });
                if (res?.data?.success) {
                    setStock(res?.data?.ui);
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchStock();
    }, []);

    const handleInput = (e) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        });
        if (e.target.name === 'product') { // Ensure rate is updated when product changes
            const selectedProduct = stock.find(s => s.product === e.target.value);
            setRate(selectedProduct || {});
        }
    };

    const requestNow = async () => {
        if (user.username) {
            const updatedinput = ({
                ...input,
                username: user.username,
                rate: rate.rate
            });
            try {
                setLoading(true);
                const res = await axios.post(`${URL}/user/submitreqest`, updatedinput, {
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    withCredentials: true
                });
                if (res?.data?.success) {
                    toast.success(res?.data?.message);
                }
                else {
                    toast.error(res?.data?.message);
                }
            } catch (error) {
                console.log(error);
            }
            finally {
                setLoading(false);
            }
        }
        else {
            toast.error('Something missing');
        }
    }

    return (
        <>
            <div className='RequestItem'>
                <h1>Request for Submit Items:-</h1>
                <div className='reqitm'>
                    Item: <select name="product" value={input.product} onChange={handleInput} id="" className='ritem'>
                        <option value="">--select--</option>
                        {
                            stock && stock.map((curElem) => (
                                <option value={curElem.product}>{curElem.product}</option>
                            ))
                        }
                    </select></div>
                <div className='reqitm'>
                    Quantity: <input type="text" name='quantity' value={input.quantity} onChange={handleInput} className='ritem' required /> </div>
                <div className='reqitm'>
                    Rate: <label htmlFor="" className='ritem' style={{ background: 'white', color: 'black' }}>{rate.rate}</label></div>
                <div className='btndivv' >
                    {
                        loading ? <button>
                            <img src="/img/loader.png" className='Loader' alt="loader" />
                        </button>
                            :
                            <button onClick={requestNow}>Request</button>
                    }
                    <button>Clear</button>
                </div>
            </div>
        </>
    )
}

export default SubmitItems
