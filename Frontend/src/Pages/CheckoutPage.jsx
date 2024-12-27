import React, { useEffect, useState } from 'react';
import './CheckoutPage.css';
import OrderSuccessAnimation from '../components/OrderSuccess/OrderSuccess';

function CheckoutPage() {
  const [isOpen, setIsOpen] = useState(true);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    companyName: '',
    country: 'India',
    streetAddress: '',
    apartment: '',
    townCity: '',
    state: 'Andhra Pradesh',
    pinCode: '',
    phone: '',
    email: '',
    createAccount: false,
    differentAddress: false,
    orderNotes: '',
    termsAccepted: false,
    weight:''
  });

  const [isOpenModal, setIsOpenModal] = useState(false);
  const [cartProducts, setCartProducts] = useState([]);
  const [showSuccessAnimation, setShowSuccessAnimation] = useState(false);
  const [orderDetails, setOrderDetails] = useState(null);
  const [errors, setErrors] = useState({});

  // Fetch products from localStorage when the component mounts
  useEffect(() => {
    const storedProducts = JSON.parse(localStorage.getItem('cart')) || [];
    setCartProducts(storedProducts);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Handle form field changes
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : value
    }));
    // Clear error for the changed field
    setErrors(prevErrors => ({
      ...prevErrors,
      [name]: ''
    }));
  };

  // Validate the form
  const validateForm = () => {
    const newErrors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required.';
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required.';
    }

    if (!formData.streetAddress.trim()) {
      newErrors.streetAddress = 'Street address is required.';
    }

    if (!formData.townCity.trim()) {
      newErrors.townCity = 'Town/City is required.';
    }

    if (!formData.pinCode.trim()) {
      newErrors.pinCode = 'PIN Code is required.';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required.';
    } else if (!/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = 'Phone number should be 10 digits.';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required.';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email address is invalid.';
    }

    if (!formData.termsAccepted) {
      newErrors.termsAccepted = 'You must accept the terms and conditions.';
    }

    return newErrors;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form data
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // Validate that there are products in the cart
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    if (cart.length === 0) {
      alert("Your cart is empty. Add items to proceed.");
      return;
    }

    // Prepare the order payload
    const orderPayload = {
      customer: {
        name: `${formData.firstName} ${formData.lastName}`,
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        companyName: formData.companyName,
        address: {
          street: formData.streetAddress,
          apartment: formData.apartment,
          city: formData.townCity,
          state: formData.state,
          zipCode: formData.pinCode,
          country: formData.country,
        },
      },
      products: cart.map((product) => ({
        productId: product._id,
        weight:product.weight,
        quantity: product.quantity,
        price: product.price,
      })),
      orderNotes: formData.orderNotes,
      totalAmount: calculateTotal(),
      paymentMethod: "Pending", // Default to UPI, or dynamically set this based on user input
      termsAccepted: formData.termsAccepted,
    };

    console.log(orderPayload)

    try {
      // Make API request to the backend
      const response = await fetch("https://varahiorganics.onrender.com/createOrder", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderPayload),
      });

      if (response.ok) {
        const data = await response.json();
        setOrderDetails({
          orderNumber: data.orderNumber, // Assuming the API returns an order number
          total: calculateTotal()
        });
        setShowSuccessAnimation(true);

        localStorage.removeItem("cart");
        setCartProducts([]);
        setFormData({
          firstName: '',
          lastName: '',
          companyName: '',
          streetAddress: '',
          apartment: '',
          townCity: '',
          state: 'Andhra Pradesh',
          pinCode: '',
          phone: '',
          email: '',
          orderNotes: '',
          termsAccepted: false,
        });
        setErrors({});
      } else {
        const error = await response.json();
        alert(`Failed to place order: ${error.message}`);
      }
    } catch (error) {
      console.error("Error placing order:", error);
      alert("An error occurred while placing the order. Please try again.");
    }
  };

  // Calculate total price of all products (including shipping)
  const calculateTotal = () => {
    const productTotal = cartProducts?.reduce((total, product) => total + product.price * product.quantity, 0);
    const shippingCost = 110; // Flat shipping rate
    return productTotal + shippingCost;
  };

  

  return (
    <>
      <div className="cart-header" style={{ marginTop: "" }}>
        <h2>Checkout</h2>
        <p>varahifoods / checkout</p>
      </div>

      <div className="checkout-container">
        {/* Checkout Form */}
        <div className="checkout-form">
          <form onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="firstName">First name *</label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  required
                />
                {errors.firstName && <div className="error-message">{errors.firstName}</div>}
              </div>
              <div className="form-group">
                <label htmlFor="lastName">Last name *</label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  required
                />
                {errors.lastName && <div className="error-message">{errors.lastName}</div>}
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="companyName">Company name (optional)</label>
              <input
                type="text"
                id="companyName"
                name="companyName"
                value={formData.companyName}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="country">Country/Region *</label>
              <input
                type="text"
                id="country"
                name="country"
                value={formData.country}
                onChange={handleInputChange}
                readOnly
              />
            </div>

            <div className="form-group">
              <label htmlFor="streetAddress">Street address *</label>
              <input
                type="text"
                id="streetAddress"
                name="streetAddress"
                placeholder="House number and street name"
                value={formData.streetAddress}
                onChange={handleInputChange}
                required
              />
              {errors.streetAddress && <div className="error-message">{errors.streetAddress}</div>}
            </div>

            <div className="form-group">
              <label htmlFor="apartment">Apartment, suite, unit, etc. (optional)</label>
              <input
                type="text"
                id="apartment"
                name="apartment"
                value={formData.apartment}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="townCity">Town / City *</label>
              <input
                type="text"
                id="townCity"
                name="townCity"
                value={formData.townCity}
                onChange={handleInputChange}
                required
              />
              {errors.townCity && <div className="error-message">{errors.townCity}</div>}
            </div>

            <div className="form-group">
              <label htmlFor="state">State *</label>
              <select
                id="state"
                name="state"
                value={formData.state}
                onChange={handleInputChange}
                required
              >
                <option value="Andhra Pradesh">Andhra Pradesh</option>
                {/* Add other states as needed */}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="pinCode">PIN Code *</label>
              <input
                type="text"
                id="pinCode"
                name="pinCode"
                value={formData.pinCode}
                onChange={handleInputChange}
                required
              />
              {errors.pinCode && <div className="error-message">{errors.pinCode}</div>}
            </div>

            <div className="form-group">
              <label htmlFor="phone">Phone *</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                required
              />
              {errors.phone && <div className="error-message">{errors.phone}</div>}
            </div>

            <div className="form-group">
              <label htmlFor="email">Email address *</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
              {errors.email && <div className="error-message">{errors.email}</div>}
            </div>

            <div className="form-group checkbox">
              <input
                type="checkbox"
                id="createAccount"
                name="createAccount"
                checked={formData.createAccount}
                onChange={handleInputChange}
              />
              <label htmlFor="createAccount">Create an account?</label>
            </div>

            <div className="form-group checkbox">
              <input
                type="checkbox"
                id="differentAddress"
                name="differentAddress"
                checked={formData.differentAddress}
                onChange={handleInputChange}
              />
              <label htmlFor="differentAddress">Deliver to a different address?</label>
            </div>

            <div className="form-group">
              <label htmlFor="orderNotes">Order notes (optional)</label>
              <textarea
                id="orderNotes"
                name="orderNotes"
                value={formData.orderNotes}
                onChange={handleInputChange}
                placeholder="Notes about your order, e.g. special notes for delivery."
              />
            </div>

            {errors.termsAccepted && <div className="error-message">{errors.termsAccepted}</div>}
            <div className="form-group terms-checkbox">
              <input
                type="checkbox"
                id="terms"
                name="termsAccepted"
                checked={formData.termsAccepted}
                onChange={handleInputChange}
                required
              />
              <label htmlFor="terms">
                I have read and agree to the website terms and conditions *
              </label>
            </div>

            {/* <button className="place-order-btn" type="submit">
              PLACE ORDER
            </button> */}
          </form>
        </div>

        {/* Order Summary */}
        <div className="order-summary">
          <h3 className="summary-title">Your order</h3>
          <div className="summary-header">
            <span>PRODUCT</span>
            <span>SUBTOTAL</span>
          </div>

          {/* Loop through cart products */}
          {cartProducts.length > 0 ? (
            cartProducts.map((product, index) => (
              <div key={index} className="summary-product">
                <span>{product.name} × {product.quantity}</span>
                <span>₹{product.price * product.quantity}</span>
              </div>
            ))
          ) : (
            <div className="summary-product">
              <span>No products in the cart</span>
            </div>
          )}

          <div className="summary-subtotal">
            <span>Subtotal</span>
            <span>₹{cartProducts.reduce((total, product) => total + product.price * product.quantity, 0)}</span>
          </div>
          <div className="summary-shipping">
            <span>Shipping</span>
            <span>Flat rate: ₹110.00</span>
          </div>
          <div className="summary-total">
            <span>Total</span>
            <span>₹{calculateTotal()}</span>
          </div>

          <div className="payment-section">
            {/* <h3>PhonePe Payment Solutions</h3>
            <div className="phonepe-logo">
              <img src="/phonepe-logo.png" alt="PhonePe" />
              <span>UPI, Credit/Debit Card, NetBanking</span>
            </div>
            <p className="payment-info">
              All UPI apps, Debit and Credit Cards, and NetBanking accepted | Powered by PhonePe
            </p> */}
            <p className="privacy-notice">
              Your personal data will be used to process your order, support your experience throughout this website, and for other purposes described in our privacy policy.
            </p>
            <button className="place-order-btn" onClick={handleSubmit}>
              PLACE ORDER
            </button>
          </div>
        </div>
      </div>
      {showSuccessAnimation &&  (
        <OrderSuccessAnimation
          orderNumber={orderDetails?.orderNumber}
          total={orderDetails?.total}
          onAnimationComplete={() => {
            setShowSuccessAnimation(false);
            // You can add any additional actions here, like redirecting to a confirmation page
          }}
        />
      )}
    </>
  );
}

export default CheckoutPage;

// Handle form submission



// const handleSubmit = async (e) => {
//   e.preventDefault();

//   // Validate that there are products in the cart
//   const cart = JSON.parse(localStorage.getItem("cart")) || [];
//   if (cart.length === 0) {
//       alert("Your cart is empty. Add items to proceed.");
//       return;
//   }

//   if (!formData.termsAccepted) {
//       alert("You must accept the terms and conditions to place an order.");
//       return;
//   }

//   // Prepare the order payload
//   const orderPayload = {
//       customer: {
//         name: `${formData.firstName} ${formData.lastName}`,
//           firstName: formData.firstName,
//           lastName: formData.lastName,
//           email: formData.email,
//           phone: formData.phone,
//           companyName: formData.companyName,
//           address: {
//               street: formData.streetAddress,
//               apartment: formData.apartment,
//               city: formData.townCity,
//               state: formData.state,
//               zipCode: formData.pinCode,
//               country: formData.country,
//           },
//       },
//       products: cart.map((product) => ({
//           productId: product._id,
//           quantity: product.quantity,
//           price: product.price,
//       })),
//       orderNotes: formData.orderNotes,
//       totalAmount: calculateTotal(),
//       paymentMethod: "Pending", // Default to UPI, or dynamically set this based on user input
//       termsAccepted: formData.termsAccepted,
//   };

//   try {
//       // Make API request to the backend
//       const response = await fetch("https://varahiorganics.onrender.com/createOrder", {
//           method: "POST",
//           headers: {
//               "Content-Type": "application/json",
//           },
//           body: JSON.stringify(orderPayload),
//       });

//       if (response.ok) {
//           const data = await response.json();
//           // setOrderDetails({
//           //   orderNumber: data.orderNumber, // Assuming the API returns an order number
//           //   total: calculateTotal()
//           // });
//           setShowSuccessAnimation(true);
          
//           // Clear cart and reset form
//           localStorage.removeItem("cart");
//           setCartProducts([]);
//           setFormData({
//               ...formData,
//               firstName: '',
//               lastName: '',
//               companyName: '',
//               streetAddress: '',
//               apartment: '',
//               townCity: '',
//               state: 'Andhra Pradesh',
//               pinCode: '',
//               phone: '',
//               email: '',
//               orderNotes: '',
//               termsAccepted: false,
//           });
//       } else {
//           const error = await response.json();
//           alert(`Failed to place order: ${error.message}`);
//       }
//   } catch (error) {
//       console.error("Error placing order:", error);
//       alert("An error occurred while placing the order. Please try again.");
//   }
// };