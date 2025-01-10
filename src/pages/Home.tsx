import { ShoppingCart } from 'lucide-react';
import { initiatePayment } from '../services/payment';

function Home() {
  const productPrice = 15000;

  const handlePayment = async () => {
    try {
      const response = await initiatePayment(productPrice);
      if (response.url && response.token) {
        console.log(`Redirecting to: ${response.url}?token_ws=${response.token}`);
        window.location.href = `${response.url}?token_ws=${response.token}`;
      }
    } catch (error) {
      console.error('Error initiating payment:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1542291026-7eec264c27ff"
              alt="Product"
              className="w-full h-64 object-cover"
            />
            <div className="absolute top-4 right-4 bg-white px-2 py-1 rounded-full text-sm font-semibold text-gray-700">
              Nuevo
            </div>
          </div>
          <div className="p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Zapatillas Deportivas</h2>
            <p className="text-gray-600 mb-4">
              Zapatillas deportivas de alta calidad para running y entrenamiento.
            </p>
            <div className="flex items-center justify-between mb-6">
              <span className="text-3xl font-bold text-gray-900">
                ${productPrice.toLocaleString('es-CL')} CLP
              </span>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                En stock
              </span>
            </div>
            <button
              onClick={handlePayment}
              className="w-full bg-blue-600 text-white px-6 py-3 rounded-md font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors flex items-center justify-center gap-2"
            >
              <ShoppingCart className="w-5 h-5" />
              Pagar con Webpay
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
