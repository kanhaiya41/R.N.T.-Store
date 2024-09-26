import axios from 'axios';
import React, { useState } from 'react'
import { URL } from '../../ultils';
import toast from 'react-hot-toast';

const AddItems = () => {

    const [input, setInput] = useState({
        product: '',
        quantity: '',
        rate: ''
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        }
        )
    };

    const addStock = async () => {
        try {
            setLoading(true);
            const res = await axios.post(`${URL}/admin/addStock`, input, {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            });
            if (res?.data?.success) {
                toast.success(res?.data?.message);
                setInput({
                    product: '',
                    quantity: '',
                    rate: ''
                })
            }
        } catch (error) {
            console.log(error);
        }
        finally{
            setLoading(false);
        }
    }

    const Clear = () => {
        setInput({
            product: '',
            quantity: '',
            rate: ''
        })
    }

    return (
        <div>
            <div className='RequestItem'>
                <h1>Add Items in Main Stock:-</h1>
                <div className='reqitm' >
                    Item: <input type="text" value={input.product} name='product' className='ritem' onChange={handleChange} /></div>
                <div className='reqitm' >
                    Quantity: <input type="text" value={input.quantity} name='quantity' className='ritem' onChange={handleChange} /> </div>
                <div className='reqitm' >
                    Rate: <input type="text" value={input.rate} name='rate' className='ritem' onChange={handleChange} /></div>

                <div style={{ display: 'flex', gap: '10vw', marginLeft: '6vw', marginTop: '2vh' }}>
                    {
                        loading ? <button>
                            <img src="/img/loader.png" className='Loader' alt="loader" />
                        </button>
                            :
                            <button onClick={addStock}>Add</button>
                    }

                    <button onClick={Clear}>Clear</button>
                </div>
            </div>
        </div>
    )
}

export default AddItems
