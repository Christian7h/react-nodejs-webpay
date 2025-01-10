//src/pages/success.tsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { CheckCircle, XCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

function Success() {
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const navigate = useNavigate();

  useEffect(() => {
    const confirmPayment = async () => {
      try {
        const urlParams = new URLSearchParams(window.location.search);
        const token = urlParams.get('token_ws');
        
        if (!token) {
          setStatus('error');
          return;
        }

        const response = await axios.post('http://localhost:3000/api/confirm-transaction', { token });
        
        if (response.data.status === 'AUTHORIZED') {
          setStatus('success');
        } else {
          setStatus('error');
        }
      } catch (error) {
        console.error('Error confirming payment:', error);
        setStatus('error');
      }
    };

    confirmPayment();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-md w-full mx-auto bg-white rounded-lg shadow-lg p-8">
        {status === 'loading' && (
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Procesando tu pago...</p>
          </div>
        )}
        
        {status === 'success' && (
          <div className="text-center">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto" />
            <h2 className="mt-4 text-2xl font-bold text-gray-900">¡Pago exitoso!</h2>
            <p className="mt-2 text-gray-600">Tu transacción se ha completado correctamente.</p>
            <button
              onClick={() => navigate('/')}
              className="mt-6 w-full bg-blue-600 text-white px-6 py-3 rounded-md font-medium hover:bg-blue-700"
            >
              Volver a la tienda
            </button>
          </div>
        )}
        
        {status === 'error' && (
          <div className="text-center">
            <XCircle className="w-16 h-16 text-red-500 mx-auto" />
            <h2 className="mt-4 text-2xl font-bold text-gray-900">Error en el pago</h2>
            <p className="mt-2 text-gray-600">Hubo un problema al procesar tu pago.</p>
            <button
              onClick={() => navigate('/')}
              className="mt-6 w-full bg-blue-600 text-white px-6 py-3 rounded-md font-medium hover:bg-blue-700"
            >
              Intentar nuevamente
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Success;