// src/components/OrderHistory.jsx
import React from 'react';

const OrderHistory = ({ orders }) => {
  return (
    <div className="mt-6">
      <h3 className="text-lg font-semibold text-center md:text-left">Order History</h3>
      <ul className="mt-2 space-y-2">
        {orders.map(order => (
          <li key={order.id} className="flex flex-col md:flex-row justify-between items-center p-4 bg-gray-100 rounded-md">
            <div className="mb-2 md:mb-0">
              <p className="font-semibold">{order.date}</p>
              <p className="text-sm text-gray-600">{order.items.join(', ')}</p>
            </div>
            <div className="flex items-center justify-between md:ml-4">
              <p className="font-semibold">${order.total}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OrderHistory;
