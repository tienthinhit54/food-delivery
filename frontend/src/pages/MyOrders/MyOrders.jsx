import React, { useEffect,useContext } from 'react'
import './MyOrders.css'
import axios from 'axios';
import { StoreContext } from '../../context/StoreContext';
import { useState } from 'react';
import { assets } from '../../assets/assets';
const MyOrders = () => {

    const{url,token}=useContext(StoreContext);
    const  [data,setData]=useState([]);

    const fecthOrders = async()=>{
        const response = await axios.post(url+"/api/order/userorders",{},{headers:{token}});
        setData(response.data.data);
        console.log(response.data.data);
    }


    useEffect(()=>{
        if (token) {
            fecthOrders();
        }
    },[token])

  return (
    <div className='my-orders'>
      <h2>My Orders</h2>
      {data.map((order,index)=>{
        return (
            <div key={index} className='my-orders-order'>
                <img src={assets.parcel_icon} alt="" />
                <p>{order.items.map((item,index)=>{
                    if (index === order.item.length-1) {
                        return item.name+"x"+item.quantity+", "
                    }
                })}</p>
                <p>${order.amount}.00</p>
                <p>Items: {order.items.length}</p>
                <p><span>&#x25cf;</span><b>{order.status}</b></p>
                <button>Track Order</button>
            </div>
        )
      })}
    </div>
  )
}

export default MyOrders
