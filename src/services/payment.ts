//src/services/payment.ts
import axios from 'axios';


export const initiatePayment = async (amount: number) => {
  try {
    const response = await axios.post(`https://backend-react-nodejs-webpay.onrender.com/api/create-transaction`, { amount });
    return response.data;
  } catch (error) {
    console.error('Error initiating payment:', error);
    throw error;
  }
};
