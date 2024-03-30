import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useCart } from './CartContext.jsx';
import Footer from '../Footer/Footer.jsx';
import NavBar from '../Header/Header.jsx';
import './cartStyle.css';

const Cart = () => {
    const { cartItems, setCartItems } = useCart();
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    //inc quantity
    function inc(product)
    {
        const exsit = cartItems.find((x) => {
            return x._id === product._id;
        })
        setCartItems(cartItems.map((item) => {
            return item._id === product._id ? {...exsit, quantity: exsit.quantity + 1}: item
        }))
    }

    //dec quantity
    function dec(product)
    {
        const exsit = cartItems.find((x) => {
            return x._id === product._id;
        })
        setCartItems(cartItems.map((item) => {
            return item._id === product._id ? {...exsit, quantity: exsit.quantity - 1}: item
        }))
    }

    //Calculate Total
    const TotalPrice = cartItems.reduce((sellingPrice, item) => sellingPrice + item.quantity * item.sellingPrice, 0);

    useEffect(() => {
        // Fetch cart items from backend
        const fetchCartItems = async () => {
            try {
                const response = await axios.get('http://localhost:3001/cart/product-list');
                setCartItems(response.data);
                setIsLoading(false);
            } catch (error) {
                console.error('Error fetching cart items:', error);
                setError(error.message || 'An error occurred while fetching cart items.');
                setIsLoading(false);
            }
        };

        fetchCartItems();
    }, [setCartItems]);

    // const handleDeleteFromCart = async (productId) => {
    //     try {
    //         await axios.delete(`/api/cart/delete/${productId}`);
    //         // Update the cart items after deleting
    //         const updatedCartItems = cartItems.filter(item => item._id !== productId);
    //         setCartItems(updatedCartItems);
    //     } catch (error) {
    //         console.error('Error deleting item from cart:', error);
    //     }
    // };

    console.log('Cart Items:', cartItems);

    if (!Array.isArray(cartItems)) {
        return <p>Error: Invalid cart items data</p>;
    }

    if (isLoading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    return (
        <>
            <NavBar />
            <div className="cart-container">
                { cartItems.length === 0 ? (
                    <>
                        <h2 className='empty_cart'>Cart Is Empty, please select a product.</h2>
                        <Link to="/allProducts">
                            <button className='cart_shop'>Shop Now</button>
                        </Link>
                    </>
                ) : (
                    <div>
                        <h2>My Cart</h2>
                        <div className='cart_container'>
                        <div className="cart_product">

                            {cartItems.map(item => (
                                <div className="cart_box" key={item._id}>
                                    <div className="cart_product_container">
                                        <div className="card-body">
                                            <h5 className="card-title">{item.name}</h5>
                                            <p className="card-text">Price: {item.sellingPrice} LKR</p>
                                            <p className="card-dis">Dis: {item.description}</p>
                                            <p className="card-dis">Category: {item.category}</p>
                                            <button className='quantity_dec' onClick={() => dec(item)}>-</button>
                                            <input type='text' value={item.quantity}></input>
                                            <button className='quantity_inc' onClick={() => inc(item)}>+</button>
                                            <h6>Sub Total: {item.sellingPrice * item.quantity}LKR</h6>
                                            <button className="remove_cart">Delete</button>
                                            {/*onClick={() => handleDeleteFromCart(item._id)}*/}
                                        </div>
                                    </div>


                                </div>

                            ))}
                        </div>
                        </div>
                    </div>
                )}
            </div>
<div className='total_card'>
            {cartItems.length > 0 &&
                <>
                    <p className='cart_total'>Total: {TotalPrice} LKR</p>
                    <button className='checkout'>CheckOut</button>

                </>
            }
</div>
            <Footer/>
        </>
    );
};

export default Cart;


