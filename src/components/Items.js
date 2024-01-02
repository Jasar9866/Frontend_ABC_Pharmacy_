import React, { useState, useEffect } from "react";
import { getItems, addNewItem, updateItem, deleteItem } from "../service";
import { Button, Form, ListGroup, Modal } from "react-bootstrap";

function Items() {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState({
    name: "",
    unit_price: 0,
    item_category: "",
  });
  const [editItem, setEditItem] = useState({
    id: null,
    name: "",
    unit_price: 0,
    item_category: "",
  });
  const [errorMessages, setErrorMessages] = useState({
    unit_price: "",
  });
  const [showEditModal, setShowEditModal] = useState(false);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const response = await getItems();
      setItems(response.data);
    } catch (error) {
      console.error("Error fetching items:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewItem({ ...newItem, [name]: value });
    setErrorMessages({ ...errorMessages, [name]: "" });
  };

  const isValidUnitPrice = (unitPrice) => {
    return !isNaN(unitPrice) && unitPrice >= 0;
  };

  const handleCreateItem = async () => {
    try {
      const errors = {};

      if (!isValidUnitPrice(newItem.unit_price)) {
        errors.unit_price = "Invalid unit price";
      }

      if (Object.keys(errors).length > 0) {
        setErrorMessages(errors);
        return;
      }

      const newItemWithDecimalPrice = {
        ...newItem,
        unit_price: parseFloat(newItem.unit_price),
      };

      await addNewItem(newItemWithDecimalPrice);
      setNewItem({
        name: "",
        unit_price: 0,
        item_category: "",
      });
      fetchItems();
    } catch (error) {
      console.error(
        "Error creating item:",
        error.response ? error.response.data : error.message
      );
    }
  };

  const handleEditClick = (item) => {
    setEditItem({ ...item });
    setShowEditModal(true);
  };

  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditItem({ ...editItem, [name]: value });
  };

  const handleUpdateItem = async () => {
    try {
      // Convert unit_price to a valid number
      editItem.unit_price = parseFloat(editItem.unit_price);

      await updateItem(editItem.id, editItem);
      setShowEditModal(false);
      fetchItems();
    } catch (error) {
      console.error("Error updating item:", error);
    }
  };

  const handleDeleteItem = async (itemId) => {
    try {
      await deleteItem(itemId);
      fetchItems();
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  return (
    <div className="container mt-5">
      <div
        className="card p-4 shadow"
        style={{ maxWidth: "600px", margin: "auto" }}
      >
        <h1 className="mb-4">Create Item</h1>
        <Form>
          <Form.Group className="mb-3" controlId="formName">
            <Form.Label>Name:</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter name"
              value={newItem.name}
              onChange={handleInputChange}
              name="name"
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formUnitPrice">
            <Form.Label>Unit Price:</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter unit price"
              value={newItem.unit_price}
              onChange={handleInputChange}
              name="unit_price"
              required
              isInvalid={!!errorMessages.unit_price}
            />
            <Form.Control.Feedback type="invalid">
              {errorMessages.unit_price}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formItemCategory">
            <Form.Label>Item Category:</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter item category"
              value={newItem.item_category}
              onChange={handleInputChange}
              name="item_category"
              required
            />
          </Form.Group>
          <Button variant="success" onClick={handleCreateItem}>
            Create Item
          </Button>
        </Form>

        <h2 className="mt-4">Items</h2>
        {items !== null && items.length > 0 ? (
          <ListGroup>
            {items.map((item) => (
              <ListGroup.Item key={item.id}>
                <div>Name: {item.name}</div>
                <div>Unit Price: ${item.unit_price}</div>
                <div>Item Category: {item.item_category}</div>
                <Button
                  variant="info"
                  size="sm"
                  className="ms-2"
                  onClick={() => handleEditClick(item)}
                >
                  Edit
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                  className="ms-2"
                  onClick={() => handleDeleteItem(item.id)}
                >
                  Delete
                </Button>
              </ListGroup.Item>
            ))}
          </ListGroup>
        ) : (
          <p>No items available.</p>
        )}
      </div>

      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Item</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3" controlId="formEditName">
            <Form.Label>Name:</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter name"
              value={editItem.name}
              onChange={handleEditInputChange}
              name="name"
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formEditUnitPrice">
            <Form.Label>Unit Price:</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter unit price"
              value={editItem.unit_price}
              onChange={handleEditInputChange}
              name="unit_price"
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formEditItemCategory">
            <Form.Label>Item Category:</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter item category"
              value={editItem.item_category}
              onChange={handleEditInputChange}
              name="item_category"
              required
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEditModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleUpdateItem}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Items;
