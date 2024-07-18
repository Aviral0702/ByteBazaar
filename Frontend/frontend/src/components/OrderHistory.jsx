// src/components/OrderHistory.jsx
import React from 'react';

const OrderHistory = ({ orders }) => {
  return (
    <div className="mt-6">
      <h3 className="text-lg font-semibold">Order History</h3>
      <ul className="mt-2 space-y-2">
        {orders.map(order => (
          <li key={order.id} className="flex justify-between items-center p-4 bg-gray-100 rounded-md">
            <div>
              <p className="font-semibold">{order.date}</p>
              <p className="text-sm text-gray-600">{order.items.join(', ')}</p>
            </div>
            <p className="font-semibold">${order.total}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OrderHistory;
