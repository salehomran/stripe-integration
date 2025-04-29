import { useContext, useState, useEffect } from "react";
import { createCustomer, fetchCustomerByEmail } from "../services/customerService";
import { CustomerContext } from "../contexts/CustomerContext";
import { ICustomer } from "../types/Customer";
import CartContext from "../contexts/CartContext";
import { createOrder, updateOrder } from "../services/orderService";
import { IOrder } from "../types/order";
import { IOrderItem } from "../types/orderItem";
import { createCheckoutSessionHosted } from "../services/stripeService";

export default function CheckoutPage() {
    const {cart} = useContext(CartContext);
    const {customer, setCustomer} = useContext(CustomerContext);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [address, setAddress] = useState("");
    const [postalCode, setPostalCode] = useState("");
    const [city, setCity] = useState("");
    const [country, setCountry] = useState("");
    const [phone, setPhone] = useState("");

    useEffect(() => {
        if (customer) {
            setFirstName(customer.firstname);
            setLastName(customer.lastname);
            setEmail(customer.email);
            setAddress(customer.street_address);
            setPostalCode(customer.postal_code);
            setCity(customer.city);
            setCountry(customer.country);
            setPhone(customer.phone);
        }
    }, [customer]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const existingCustomer = await fetchCustomerByEmail(email);
        let customerId = 0;

        if (existingCustomer && existingCustomer.status === 200) {
            customerId = existingCustomer.data.id;
            setCustomer(existingCustomer.data);
            setFirstName(existingCustomer.data.firstname);
            setLastName(existingCustomer.data.lastname);
            setEmail(existingCustomer.data.email);
            setAddress(existingCustomer.data.street_address);
            setPostalCode(existingCustomer.data.postal_code);
            setCity(existingCustomer.data.city);
            setCountry(existingCustomer.data.country);
            setPhone(existingCustomer.data.phone);

        } else if (existingCustomer && existingCustomer.status === 404) {
            const customer_data: ICustomer = {
                firstname: firstName,
                lastname: lastName,
                email: email,
                street_address: address,
                phone: phone,
                postal_code: postalCode,
                city: city,
                country: country,
                created_at: new Date(),
                id: 0
            }
            const newCustomer = await createCustomer(customer_data);

            customer_data.id = newCustomer.id;
            setCustomer(customer_data);
            customerId = newCustomer.id;
        } else {
            alert("Error creating customer. " + existingCustomer?.data);
        }
        
        if (cart.length > 0 && customerId > 0) {
            const orderData: IOrder = {
                customer_id: customerId,
                payment_status: "Unpaid",
                payment_id: "",
                order_status: "Pending",
                order_items: [],
                id: 0
            }
            const order_items: IOrderItem[] = cart.map((item) => ({
                product_id: item.product.id,
                quantity: item.quantity,
                unit_price: item.product.price,
                product_name: item.product.name,
                order_id: 0
            }));
            orderData.order_items = order_items;
            const order = await createOrder(orderData);
            if (order.id) {
                orderData.id = order.id;
                const response = await createCheckoutSessionHosted(orderData);
                console.log(response);
                if (response.checkout_url && response.session_id) {
                    orderData.payment_id = response.session_id;
                    console.log(orderData);
                    await updateOrder(orderData);
                    window.location.href = response.checkout_url;
                }
            }
        }

        console.log('Customer ID:', customerId);
    }

    return (
        <div className="checkout-page">
            <h2>Checkout Page</h2>
            <form onSubmit={handleSubmit}>
                <p>Customer Information</p>
                <div className="checkout-form-group">
                    <label htmlFor="firstName">First Name</label>
                    <input type="text" placeholder="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                    <label htmlFor="lastName">Last Name</label>
                    <input type="text" placeholder="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                    <label htmlFor="email">Email</label>
                    <input type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <p>Shipping Information</p>
                <div className="checkout-form-group">
                    <label htmlFor="address">Address</label>
                    <input type="text" placeholder="Address" value={address} onChange={(e) => setAddress(e.target.value)} />
                    <label htmlFor="postalCode">Postal Code</label>
                    <input type="text" placeholder="Postal Code" value={postalCode} onChange={(e) => setPostalCode(e.target.value)} />
                    <label htmlFor="city">City</label>
                    <input type="text" placeholder="City" value={city} onChange={(e) => setCity(e.target.value)} />
                    <label htmlFor="country">Country</label>
                    <input type="text" placeholder="Country" value={country} onChange={(e) => setCountry(e.target.value)} />
                    <label htmlFor="phone">Phone</label>
                    <input type="text" placeholder="Phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
                </div>
                <button type="submit">Checkout</button>
            </form>
        </div>
    );
}
