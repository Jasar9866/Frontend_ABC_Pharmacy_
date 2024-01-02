import axios from "axios";

const BASE_URL = 'http://localhost:8080';

const service = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getItems = () => service.get('/api/items');
export const addNewItem = (item) => service.post('/api/items', item);
export const updateItem = (itemId, updatedItem) => service.put(`/api/items/${itemId}`, updatedItem, {
  headers: { 'Content-Type': 'application/json' },
});

export const deleteItem = (itemId) => service.delete(`/api/items/${itemId}`, {
  headers: { 'Content-Type': 'application/json' },
});

export const getInvoices = () => service.get('/api/invoices');
export const addNewInvoice = (invoice) => service.post('/api/invoices', invoice);


