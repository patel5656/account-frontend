const fetchOrders = async () => {
  try {
    const response = await fetch('/mock-orders.json');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching orders:', error);
    return [];
  }
};

export default fetchOrders;
