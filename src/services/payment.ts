//src/services/payment.ts
import axios from 'axios';


export const initiatePayment = async (amount: number) => {
  try {
    const response = await axios.post(`http://localhost:3000/api/create-transaction`, { amount });
    return response.data;
  } catch (error) {
    console.error('Error initiating payment:', error);
    throw error;
  }
};
