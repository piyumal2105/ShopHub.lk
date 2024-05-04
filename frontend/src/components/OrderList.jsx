import React, { useEffect, useState } from 'react';
import orderService from '../services/orderService';

function OrderList() {
  // State to store orders
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // Fetch orders from backend on component mount
    const fetchOrders = async () => {
      try {
        const fetchedOrders = await orderService.getAllOrders();
        setOrders(fetchedOrders);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };
    fetchOrders();
  }, []);

  return (
    <div>
      <h2>Orders</h2>
      {/* Render orders */}
      <ul>
        {orders.map(order => (
          <li key={order.id}>{order.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default OrderList;
