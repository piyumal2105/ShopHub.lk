// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import axios from 'axios';
// import { useCart } from './CartContext.jsx';
// import Footer from '../Footer/Footer.jsx';
// import NavBar from '../Header/Header.jsx';
// import './cartStyle.css';
// import Modal from '../Cart/Modal.jsx';
//
// const Cart = () => {
//     const { cartItems, setCartItems } = useCart();
//     const [isLoading, setIsLoading] = useState(true);
//     const [error, setError] = useState(null);
//     const [showModal, setShowModal] = useState(false);
//
//     //inc quantity
//     function inc(product)
//     {
//         const exsit = cartItems.find((x) => {
//             return x._id === product._id;
//         })
//         setCartItems(cartItems.map((item) => {
//             return item._id === product._id ? {...exsit, quantity: exsit.quantity + 1}: item
//         }))
//     }
//
//     //dec quantity
//     function dec(product)
//     {
//         const exsit = cartItems.find((x) => {
//             return x._id === product._id;
//         })
//         setCartItems(cartItems.map((item) => {
//             return item._id === product._id ? {...exsit, quantity: exsit.quantity - 1}: item
//         }))
//     }
//
//     //Calculate Total
//     const TotalPrice = cartItems.reduce((sellingPrice, item) => sellingPrice + item.quantity * item.sellingPrice, 0);
//
//     useEffect(() => {
//         // Fetch cart items from backend
//         const fetchCartItems = async () => {
//             try {
//                 const response = await axios.get('http://localhost:3001/cart/product-list');
//                 setCartItems(response.data);
//                 setIsLoading(false);
//             } catch (error) {
//                 console.error('Error fetching cart items:', error);
//                 setError(error.message || 'An error occurred while fetching cart items.');
//                 setIsLoading(false);
//             }
//         };
//
//         fetchCartItems();
//     }, [setCartItems]);
//
//     const handleDeleteFromCart = async (productId) => {
//         console.log('Deleting product', productId);
//         try {
//             await axios.delete(`http://localhost:3001/cart/delete/${productId}`);
//             // Update the cart items after deleting
//             const updatedCartItems = cartItems.filter(item => item._id !== productId);
//             setCartItems(updatedCartItems);
//         } catch (error) {
//             console.error('Error deleting item from cart:', error);
//         }
//     };
//
//     const handleCheckout = () => {
//         setShowModal(true);
//     };
//
//     console.log('Cart Items:', cartItems);
//
//     if (!Array.isArray(cartItems)) {
//         return <p>Error: Invalid cart items data</p>;
//     }
//
//     if (isLoading) {
//         return <p>Loading...</p>;
//     }
//
//     if (error) {
//         return <p>Error: {error}</p>;
//     }
//
//     return (
//         <>
//             <NavBar />
//             <div className="cart-container">
//                 { cartItems.length === 0 ? (
//                     <>
//                         <h2 className='empty_cart'>Cart Is Empty, please select a product.</h2>
//                         <Link to="/allProducts">
//                             <button className='cart_shop'>Shop Now</button>
//                         </Link>
//                     </>
//                 ) : (
//                     <div>
//                         <h2>My Cart</h2>
//                         <div className='cart_container'>
//                         <div className="cart_product">
//
//                             {cartItems.map(item => (
//                                 <div className="cart_box" key={item._id}>
//                                     <div className="cart_product_container">
//                                         <div className="card-body">
//                                             <h5 className="card-title">{item.name}</h5>
//                                             <p className="card-text">Price: {item.sellingPrice} LKR</p>
//                                             <p className="card-dis">Dis: {item.description}</p>
//                                             <p className="card-dis">Category: {item.category}</p>
//                                             <button className='quantity_dec' onClick={() => dec(item)}>-</button>
//                                             <input type='text' value={item.quantity}></input>
//                                             <button className='quantity_inc' onClick={() => inc(item)}>+</button>
//                                             <h6>Sub Total: {item.sellingPrice * item.quantity}LKR</h6>
//                                             {/*<button className="remove_cart" onClick{(handleDeleteFromCart(item._id))}>Delete</button>*/}
//                                             <button className="remove_cart" onClick={() => handleDeleteFromCart(item._id)}>Delete</button>
//
//
//                                         </div>
//                                     </div>
//
//
//                                 </div>
//
//                             ))}
//                         </div>
//                         </div>
//                     </div>
//                 )}
//             </div>
// <div className='total_card'>
//             {cartItems.length > 0 &&
//                 <>
//                     <p className='cart_total'>Total: {TotalPrice} LKR</p>
//                     <button className='checkout' onClick={handleCheckout}>CheckOut</button>
//
//                 </>
//             }
// </div>
//             <Footer/>
//             <Modal isOpen={showModal} onClose={() => setShowModal(false)} items={cartItems} />
//         </>
//     );
// };
//
// export default Cart;
//
//

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useCart } from './CartContext.jsx';
import Footer from '../Footer/Footer.jsx';
import NavBar from '../Header/Header.jsx';
import './cartStyle.css';
import Modal from 'react-bootstrap/Modal';
import Table from "react-bootstrap/Table";
import {PDFDownloadLink} from '@react-pdf/renderer';
import PDFDocument from "./PDFDocument.jsx";


const Cart = () => {
    const { cartItems, setCartItems } = useCart();
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');

    //inc quantity
    const inc = (product) => {
        const exsit = cartItems.find((x) => {
            return x._id === product._id;
        });
        setCartItems(cartItems.map((item) => {
            return item._id === product._id ? { ...exsit, quantity: exsit.quantity + 1 } : item;
        }));
    };

    //dec quantity
    const dec = (product) => {
        const exsit = cartItems.find((x) => {
            return x._id === product._id;
        });
        setCartItems(cartItems.map((item) => {
            return item._id === product._id ? { ...exsit, quantity: exsit.quantity - 1 } : item;
        }));
    };

    // Delete item from cart and database
    const deleteItem = async (productId) => {
        try {
            // Make DELETE request to backend API to delete the item
            await axios.delete(`http://localhost:3001/cart/delete/${productId}`);
            // Filter out the deleted item from the cartItems state
            const updatedCart = cartItems.filter((item) => item._id !== productId);
            // Update the cartItems state
            setCartItems(updatedCart);
        } catch (error) {
            console.error('Error deleting item:', error);
        }
    };

    // Function to update quantity
    const updateQuantity = async (productId, newQuantity) => {
        try {
            // Make PUT request to backend API to update quantity
            await axios.put(`http://localhost:3001/cart/updateProduct/${productId}`, { quantity: newQuantity });
            // Fetch updated cart items from backend
            const response = await axios.get('http://localhost:3001/cart/product-list');
            setCartItems(response.data);
            setSuccessMessage('Quantity updated successfully.');

        } catch (error) {
            console.error('Error updating quantity:', error);
        }
    };

    // Reset success message after a delay
    useEffect(() => {
        const timeout = setTimeout(() => {
            setSuccessMessage('');
        }, 3000);

        return () => clearTimeout(timeout);
    }, [successMessage]);

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

    const handleCheckout = () => {
        setShowModal(true);
    };

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
                {cartItems.length === 0 ? (
                    <>
                        <h2 className='empty_cart'>Cart Is Empty, please select a product.</h2>
                        <Link to="/allProducts">
                            <button className='cart_shop'>Shop Now</button>
                        </Link>
                    </>
                ) : (
                    <div>
                        <h2 style={{margin: "center"}}>My Cart</h2>
                        <div className='cart_container'>
                            <div className="cart_product">
                                {cartItems.map((item) => (
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
                                                <h6>Sub Total: {item.quantity * item.sellingPrice} LKR</h6>
                                            </div>
                                            <button type="button" className="btn btn-outline-danger"
                                                    onClick={() => deleteItem(item._id)}>Delete
                                            </button>
                                            <button type="button" className="btn btn-outline-primary"
                                                    onClick={() => updateQuantity(item._id, item.quantity)}>Update
                                            </button>

                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="total_container">
                                <h2>Total Price: {TotalPrice} LKR</h2>
                                <button className='btn btn-outline-secondary' onClick={handleCheckout}>Checkout</button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Order Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <Table striped bordered hover>
                        <thead>
                        <tr>
                            <th>Name</th>
                            <th>Quantity</th>
                            <th>Price</th>
                            <th>Sub Total</th>
                        </tr>
                        </thead>
                        <tbody>

                        {cartItems.map((item) => (
                            <tr key={item._id}>
                                <td>{item.name}</td>
                                <td>{item.quantity}</td>
                                <td>{item.sellingPrice}</td>
                                <td>{item.quantity * item.sellingPrice}</td>
                            </tr>

                        ))}

                        </tbody>

                    </Table>
                    <div>Total Price: {TotalPrice} LKR</div>
                    <PDFDownloadLink document={<PDFDocument data={cartItems} TotalPrice={TotalPrice}/> } fileName="order_details.pdf">
                        {({blob, url, loading, error}) =>
                            loading ? 'Loading document...' : 'Download PDF'
                        }
                    </PDFDownloadLink>
                </Modal.Body>
                <Modal.Footer>
                <button className='order_btn'>Place Order</button>
                </Modal.Footer>
            </Modal>
            <Footer />

        </>
    );
};

export default Cart;

