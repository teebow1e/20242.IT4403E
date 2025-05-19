import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { TextField, FormControl, FormControlLabel, Radio, RadioGroup, FormLabel } from '@mui/material';
import { selectCartItems, selectCartTotalAmount, clearCart } from '../features/CartSlice';
import { setLastOrderReceipt } from '../features/ReceiptSlice';
import { selectUser } from '../features/UserSlice';
import OrderService from '../services/OrderService';
import FormSubmit from '../forms/FormSubmit';

function CheckoutScreen() {
    const [otpToken, setOtpToken] = useState('');
    const [otpRequired, setOtpRequired] = useState(false);

    const cartItems = useSelector(selectCartItems);
    const totalAmount = useSelector(selectCartTotalAmount);
    const user = useSelector(selectUser);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        state: '',
        zip: '',
        paymentMethod: 'creditCard',
        cardNumber: '',
        cardName: '',
        cardExpiry: '',
        cardCvv: '',
    });

    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [orderCompleted, setOrderCompleted] = useState(false);
    const [completedOrderData, setCompletedOrderData] = useState(null);

    useEffect(() => {
        if (user) {
            const nameParts = user.displayName ? user.displayName.split(' ') : ['', ''];
            const firstName = nameParts[0] || '';
            const lastName = nameParts.length > 1 ? nameParts.slice(1).join(' ') : '';

            setFormData(prevData => ({
                ...prevData,
                firstName,
                lastName,
                email: user.email || ''
            }));
        }
    }, [user]);

    useEffect(() => {
        if (cartItems.length === 0) {
            navigate('/cart');
        }
    }, [cartItems.length, navigate]);

    useEffect(() => {
        if (orderCompleted && completedOrderData) {
            navigate('/order-confirmation', {
                state: completedOrderData
            });
        }
    }, [orderCompleted, completedOrderData, navigate]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });

        if (errors[name]) {
            setErrors({
                ...errors,
                [name]: ''
            });
        }
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
        if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
        if (!formData.email.trim()) newErrors.email = 'Email is required';
        if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';

        if (formData.paymentMethod === 'creditCard') {
            if (!formData.cardNumber.trim()) newErrors.cardNumber = 'Card number is required';
            if (!formData.cardName.trim()) newErrors.cardName = 'Name on card is required';
            if (!formData.cardExpiry.trim()) newErrors.cardExpiry = 'Expiry date is required';
            if (!formData.cardCvv.trim()) newErrors.cardCvv = 'CVV is required';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setIsSubmitting(true);

        if (!otpToken) {
            try {
                // Generate and send OTP
                const response = await fetch('http://localhost:5000/api/send-otp', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        email: formData.email,
                        phone: formData.phone
                    })
                });

                if (response.ok) {
                    setOtpRequired(true);
                    setIsSubmitting(false);
                    return;
                }
            } catch (error) {
                console.error('Error sending OTP:', error);
                alert('Failed to send verification code. Please try again.');
                setIsSubmitting(false);
                return;
            }
        }

        const orderData = {
            customer: {
                firstName: formData.firstName,
                lastName: formData.lastName,
                email: formData.email,
                phone: formData.phone
            },
            items: cartItems.map(item => ({
                id: item.id,
                type: item.type,
                quantity: item.quantity,
                price: item.price,
                customizations: item.customizations
            })),
            paymentMethod: formData.paymentMethod,
            deliveryAddress: formData.address
                ? {
                    address: formData.address,
                    city: formData.city,
                    state: formData.state,
                    zip: formData.zip
                }
                : undefined,
            totalAmount: totalAmount * 1.0725 // including tax
        };

        try {
            if (otpRequired) {
                const verifyResponse = await fetch('http://localhost:5000/api/verify-otp', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        otp: otpToken,
                        email: formData.email
                    })
                });

                if (!verifyResponse.ok) {
                    alert('Invalid verification code. Please try again.');
                    setIsSubmitting(false);
                    return;
                }
            }

            const response = await OrderService.placeOrder(orderData);

            if (response.success) {
                // Clear the cart
                dispatch(clearCart());

                setCompletedOrderData({
                    orderId: response.orderId,
                    orderDetails: orderData
                });
                setOrderCompleted(true);
            } else {
                alert(`Failed to place order: ${response.message}`);
            }
        } catch (error) {
            console.error('Error during checkout:', error);
            alert('Something went wrong during checkout. Please try again later.');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (cartItems.length === 0) {
        return <div className="text-center py-8">Redirecting to cart...</div>;
    }

    return (
        <div className="container mx-auto px-4 py-8 max-w-6xl">
            <h1 className="text-3xl font-bold mb-8 text-center">Checkout</h1>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                <div className="md:col-span-8">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="bg-white p-6 rounded-lg shadow-sm">
                            <h2 className="text-xl font-bold mb-4">Personal Information</h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                <div>
                                    <TextField
                                        label="First Name"
                                        name="firstName"
                                        value={formData.firstName}
                                        onChange={handleChange}
                                        error={!!errors.firstName}
                                        helperText={errors.firstName}
                                        fullWidth
                                        required
                                    />
                                </div>
                                <div>
                                    <TextField
                                        label="Last Name"
                                        name="lastName"
                                        value={formData.lastName}
                                        onChange={handleChange}
                                        error={!!errors.lastName}
                                        helperText={errors.lastName}
                                        fullWidth
                                        required
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <TextField
                                        label="Email"
                                        name="email"
                                        type="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        error={!!errors.email}
                                        helperText={errors.email}
                                        fullWidth
                                        required
                                    />
                                </div>
                                <div>
                                    <TextField
                                        label="Phone Number"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        error={!!errors.phone}
                                        helperText={errors.phone}
                                        fullWidth
                                        required
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="bg-white p-6 rounded-lg shadow-sm">
                            <h2 className="text-xl font-bold mb-4">Delivery Method</h2>

                            <FormControl component="fieldset">
                                <RadioGroup
                                    name="deliveryMethod"
                                    value={formData.deliveryMethod || 'pickup'}
                                    onChange={handleChange}
                                >
                                    <FormControlLabel value="pickup" control={<Radio />} label="Pickup in store" />
                                    <FormControlLabel value="delivery" control={<Radio />} label="Delivery (additional fees may apply)" />
                                </RadioGroup>
                            </FormControl>

{formData.deliveryMethod === 'delivery' && (
                                <div className="mt-4">
                                    <div className="mb-4">
                                        <TextField
                                            label="Address"
                                            name="address"
                                            value={formData.address}
                                            onChange={handleChange}
                                            error={!!errors.address}
                                            helperText={errors.address}
                                            fullWidth
                                        />
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        <div>
                                            <TextField
                                                label="City"
                                                name="city"
                                                value={formData.city}
                                                onChange={handleChange}
                                                error={!!errors.city}
                                                helperText={errors.city}
                                                fullWidth
                                            />
                                        </div>
                                        <div>
                                            <TextField
                                                label="State"
                                                name="state"
                                                value={formData.state}
                                                onChange={handleChange}
                                                error={!!errors.state}
                                                helperText={errors.state}
                                                fullWidth
                                            />
                                        </div>
                                        <div>
                                            <TextField
                                                label="ZIP Code"
                                                name="zip"
                                                value={formData.zip}
                                                onChange={handleChange}
                                                error={!!errors.zip}
                                                helperText={errors.zip}
                                                fullWidth
                                            />
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="bg-white p-6 rounded-lg shadow-sm">
                            <h2 className="text-xl font-bold mb-4">Payment Method</h2>

                            <FormControl component="fieldset">
                                <RadioGroup
                                    name="paymentMethod"
                                    value={formData.paymentMethod}
                                    onChange={handleChange}
                                >
                                    <FormControlLabel value="cash" control={<Radio />} label="Cash" />
                                    <FormControlLabel value="creditCard" control={<Radio />} label="Credit Card" />
                                    <FormControlLabel value="paypal" control={<Radio />} label="PayPal" />
                                    <FormControlLabel value="starbucksCard" control={<Radio />} label="Starbucks Card" />
                                </RadioGroup>
                            </FormControl>

                            {formData.paymentMethod === 'creditCard' && (
                                <div className="mt-4">
                                    <div className="mb-4">
                                        <TextField
                                            label="Card Number"
                                            name="cardNumber"
                                            value={formData.cardNumber}
                                            onChange={handleChange}
                                            error={!!errors.cardNumber}
                                            helperText={errors.cardNumber}
                                            fullWidth
                                        />
                                    </div>

                                    <div className="mb-4">
                                        <TextField
                                            label="Name on Card"
                                            name="cardName"
                                            value={formData.cardName}
                                            onChange={handleChange}
                                            error={!!errors.cardName}
                                            helperText={errors.cardName}
                                            fullWidth
                                        />
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <TextField
                                                label="Expiry Date (MM/YY)"
                                                name="cardExpiry"
                                                value={formData.cardExpiry}
                                                onChange={handleChange}
                                                error={!!errors.cardExpiry}
                                                helperText={errors.cardExpiry}
                                                fullWidth
                                            />
                                        </div>
                                        <div>
                                            <TextField
                                                label="CVV"
                                                name="cardCvv"
                                                value={formData.cardCvv}
                                                onChange={handleChange}
                                                error={!!errors.cardCvv}
                                                helperText={errors.cardCvv}
                                                fullWidth
                                            />
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        {otpRequired && (
                            <div className="bg-white p-6 rounded-lg shadow-sm">
                                <h2 className="text-xl font-bold mb-4">OTP Verification</h2>
                                <TextField
                                    label="6-digit OTP"
                                    value={otpToken}
                                    onChange={(e) => setOtpToken(e.target.value)}
                                    fullWidth
                                    required
                                />
                            </div>
                        )}

                        <div className="flex justify-end">
                            <button
                                type="button"
                                onClick={() => navigate('/cart')}
                                className="px-6 py-2 mr-4 bg-gray-200 rounded-full hover:bg-gray-300 transition"
                            >
                                Back to Cart
                            </button>
                            <FormSubmit name="Place Order" type="submit" />
                        </div>
                    </form>
                </div>

                <div className="md:col-span-4">
                    <div className="bg-gray-50 p-6 rounded-lg shadow-sm sticky top-4">
                        <h2 className="text-xl font-bold mb-4">Order Summary</h2>

                        <div className="max-h-60 overflow-y-auto mb-4">
                            {cartItems.map((item) => (
                                <div
                                    key={`${item.id}-${JSON.stringify(item.customizations)}`}
                                    className="flex items-center gap-2 mb-3 pb-3 border-b"
                                >
                                    <img
                                        src={item.image}
                                        alt={item.type}
                                        className="w-10 h-10 rounded-full object-cover"
                                    />
                                    <div className="flex-1">
                                        <p className="text-sm font-medium">{item.type}</p>
                                        <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                                    </div>
                                    <p className="font-medium">${item.totalPrice.toFixed(2)}</p>
                                </div>
                            ))}
                        </div>

                        <div className="space-y-2">
                            <div className="flex justify-between">
                                <span>Subtotal</span>
                                <span>${totalAmount.toFixed(2)}</span>
                            </div>

                            <div className="flex justify-between">
                                <span>Tax (7.25%)</span>
                                <span>${(totalAmount * 0.0725).toFixed(2)}</span>
                            </div>

                            <div className="border-t pt-2 mt-2">
                                <div className="flex justify-between font-bold">
                                    <span>Total</span>
                                    <span>${(totalAmount * 1.0725).toFixed(2)}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CheckoutScreen;
