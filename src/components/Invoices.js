import React, { useState, useEffect } from "react";
import { getInvoices, addNewInvoice } from "../service";
import { Form, Button, ListGroup } from "react-bootstrap";

function Invoices() {
  const [invoices, setInvoices] = useState([]);
  const [newInvoice, setNewInvoice] = useState({
    name: "",
    mobile_no: "",
    email: "",
    address: "",
    billing_type: "cash",
    items: [],
  });
  const [errorMessages, setErrorMessages] = useState({
    mobile_no: "",
    email: "",
  });

  useEffect(() => {
    fetchInvoices();
  }, []);

  const fetchInvoices = async () => {
    try {
      const response = await getInvoices();
      setInvoices(response.data);
    } catch (error) {
      console.error("Error fetching invoices:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewInvoice({ ...newInvoice, [name]: value });
    setErrorMessages({ ...errorMessages, [name]: "" });
  };

  const isValidMobileNumber = (mobileNumber) => {
    return /^\d+$/.test(mobileNumber);
  };

  const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleCreateInvoice = async () => {
    try {
      const errors = {};

      if (!isValidEmail(newInvoice.email)) {
        errors.email = "Invalid email address";
      }

      if (!isValidMobileNumber(newInvoice.mobile_no)) {
        errors.mobile_no = "Invalid mobile number";
      }

      if (Object.keys(errors).length > 0) {
        setErrorMessages(errors);
        return;
      }

      const { items, ...invoiceData } = newInvoice;
      const invoiceWithItems = {
        ...invoiceData,
        items: items.map(({ product, quantity, amount }) => ({
          product,
          quantity,
          amount,
        })),
      };

      await addNewInvoice(invoiceWithItems);
      setNewInvoice({
        name: "",
        mobile_no: "",
        email: "",
        address: "",
        billing_type: "cash",
        items: [],
      });
      fetchInvoices();
    } catch (error) {
      console.error("Error creating invoice:", error);
    }
  };

  const handleAddItem = () => {
    setNewInvoice({
      ...newInvoice,
      items: [...newInvoice.items, { product: "", quantity: 1, amount: 0 }],
    });
  };

  const handleItemChange = (index, field, value) => {
    const updatedItems = [...newInvoice.items];
    updatedItems[index] = { ...updatedItems[index], [field]: value };
    setNewInvoice({ ...newInvoice, items: updatedItems });
  };

  return (
    <div className="container mt-5">
      <div
        className="card p-4 shadow"
        style={{ maxWidth: "600px", margin: "auto" }}
      >
        <h1 className="mb-4">Create Invoice</h1>
        <Form>
          <Form.Group className="mb-3" controlId="formName">
            <Form.Label>Name:</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter name"
              value={newInvoice.name}
              onChange={handleInputChange}
              name="name"
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formMobileNo">
            <Form.Label>Mobile Number:</Form.Label>
            <Form.Control
              type="tel"
              pattern="[0-9]{10}"
              placeholder="Enter mobile number"
              value={newInvoice.mobile_no}
              onChange={handleInputChange}
              name="mobile_no"
              required
              isInvalid={!!errorMessages.mobile_no}
            />
            <Form.Control.Feedback type="invalid">
              {errorMessages.mobile_no}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formEmail">
            <Form.Label>Email:</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={newInvoice.email}
              onChange={handleInputChange}
              name="email"
              required
              isInvalid={!!errorMessages.email}
            />
            <Form.Control.Feedback type="invalid">
              {errorMessages.email}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formAddress">
            <Form.Label>Address:</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Address"
              value={newInvoice.address}
              onChange={handleInputChange}
              name="address"
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Billing Type:</Form.Label>
            <div>
              <Form.Check
                inline
                label="Cash"
                type="radio"
                id="billingTypeCash"
                name="billing_type"
                value="cash"
                checked={newInvoice.billing_type === "cash"}
                onChange={handleInputChange}
                required
              />
              <Form.Check
                inline
                label="Card"
                type="radio"
                id="billingTypeCard"
                name="billing_type"
                value="card"
                checked={newInvoice.billing_type === "card"}
                onChange={handleInputChange}
              />
            </div>
          </Form.Group>
          <h4>Invoice Items:</h4>
          {newInvoice.items.map((item, index) => (
            <div key={index} className="mb-3">
              <Form.Group controlId={`product-${index}`}>
                <Form.Label>Product:</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter product"
                  value={item.product}
                  onChange={(e) =>
                    handleItemChange(index, "product", e.target.value)
                  }
                  required
                />
              </Form.Group>
              <Form.Group controlId={`quantity-${index}`}>
                <Form.Label>Quantity:</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter quantity"
                  value={item.quantity}
                  onChange={(e) =>
                    handleItemChange(index, "quantity", e.target.value)
                  }
                  required
                />
              </Form.Group>
              <Form.Group controlId={`amount-${index}`}>
                <Form.Label>Amount:</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter amount"
                  value={item.amount}
                  onChange={(e) =>
                    handleItemChange(index, "amount", e.target.value)
                  }
                  required
                />
              </Form.Group>
              <div>
                <strong>Total:</strong> {item.quantity * item.amount}
              </div>
            </div>
          ))}
          <Button variant="secondary" onClick={handleAddItem}>
            Add Item
          </Button>
          <Button
            variant="success"
            onClick={handleCreateInvoice}
            className="ms-2"
          >
            Create Invoice
          </Button>
        </Form>

        <h2 className="mt-4">Invoices</h2>
        <ListGroup>
          {invoices.map((invoice) => (
            <ListGroup.Item key={invoice.id}>
              <div>
                <strong>Invoice ID:</strong> {invoice.id}
              </div>
              <div>
                <strong>Name:</strong> {invoice.name}
              </div>
              <div>
                <strong>Mobile Number:</strong> {invoice.mobile_no}
              </div>
              <div>
                <strong>Email:</strong> {invoice.email}
              </div>
              <div>
                <strong>Address:</strong> {invoice.address}
              </div>
              <div>
                <strong>Billing Type:</strong> {invoice.billing_type}
              </div>
              <div>
                {/* {invoice.items.map((item, index) => (
                  <div key={index} className="mb-3">
                    <div>
                      <strong>Product:</strong> {item.product}
                    </div>
                    <div>
                      <strong>Quantity:</strong> {item.quantity}
                    </div>
                    <div>
                      <strong>Amount:</strong> {item.amount}
                    </div>
                    <div>
                      <strong>Total:</strong> {item.quantity * item.amount}
                    </div>
                  </div>
                ))} */}
              </div>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </div>
    </div>
  );
}

export default Invoices;
