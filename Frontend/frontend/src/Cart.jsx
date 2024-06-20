import React from 'react'
import { useContext } from 'react'
import { CartContext } from './CartProvider'
function Cart() {
    const {cart, totalPrice, removeFromCart , clearCart} = useContext(CartContext);
    return (
        <div className='cart-body'>
            <h2 className='cart-title'>Shopping Cart</h2>
            {cart.length === 0 ? (
                <p>Your cart is empty</p>
            ): (
                <ul>
                    {cart.map((item)=> (
                        <li className="product-items" key={item.id}>
                            {item.name}  - {item.price}
                            <button className='item-button' onClick={()=>removeFromCart(item)}>Remove from Cart</button>
                        </li>
                    ))}
                </ul>
            ) }
            <p>Total: ${totalPrice}</p>
            <button className="cart-clear-btn" onClick={clearCart}>Clear Cart</button>
        </div>
    )
}

export default Cart
