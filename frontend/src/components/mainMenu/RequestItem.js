import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { URL } from '../../ultils';
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';
const RequestItem = () => {

    const [stock, setStock] = useState([]);
    const { user } = useSelector(store => store.user);
    const [input, setInput] = useState({
        username: '',
        product: '',
        quantity: null,
        rate: null,
        type: ''
    });
    const [rate, setRate] = useState({});

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchStock = async () => {
            try {
                const res = await axios.get(`${URL}/admin/getstock`, { withCredentials: true });
                if (res?.data?.success) {
                    setStock(res?.data?.allStock);
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
                const res = await axios.post(`${URL}/user/issuereqest`, updatedinput, {
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
                setInput({
                    product: '',
                    quantity: '',
                    rate: '',
                    type: ''
                });
                setRate('');
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

    const clearNow = () => {
        setInput({
            product: '',
            quantity: '',
            rate: '',
            type: ''
        });
        setRate('');
    }


    return (
        <div>
            <div className='RequestItem'>
                <h1>Request for Issue Items:-</h1>
                <div className='reqitm' >
                    Item: <select name="product" value={input.product} onChange={handleInput} id="" className='ritem'>
                        <option value="">--select--</option>
                        {
                            stock && stock.map((curElem) => (
                                <option value={curElem.product}>{curElem.product}</option>
                            ))
                        }
                    </select></div>
                <div className='reqitm' >
                    Quantity: <input type="text" name='quantity' value={input.quantity} onChange={handleInput} className='ritem' /> </div>
                <div className='reqitm' >
                    Rate: <label htmlFor="" style={{ background: 'white', color: 'black' }} value={input.value} onChange={handleInput} className='ritem'>{rate.rate}</label></div>
                <div className='reqitm' >
                    Type : <select name="type" value={input.type} onChange={handleInput} id="" className='ritem'>
                        <option value="">--select--</option>
                        <option value="returnable">returnable</option>
                        <option value="non-returnable">non-returnable</option>
                    </select> </div>
                <div style={{ display: 'flex', gap: '10vw', marginLeft: '6vw', marginTop: '2vh' }}>
                    {
                        loading ? <button>
                            <img src="/img/loader.png" className='Loader' alt="loader" />
                        </button>
                            :
                            <button onClick={requestNow}>Request</button>
                    }
                    <button onClick={clearNow}>Clear</button>
                </div>
            </div>
        </div>
    )
}

export default RequestItem
