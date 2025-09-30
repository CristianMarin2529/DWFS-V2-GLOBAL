import React, { useEffect, useState, useContext } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { AuthContext } from '../../context/AuthContext';
import { LocalStorageManager } from '../../utils/localStorage';
import './OrderConfirmation.css';

export default function OrderConfirmation() {
  const [searchParams] = useSearchParams();
  const [orderStatus, setOrderStatus] = useState('loading');
  const [orderDetails, setOrderDetails] = useState(null);
  const { clearCart } = useCart();
  const { accessToken } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    // Obtener parámetros de la URL para determinar el estado del pago
    const paymentStatus = searchParams.get('payment_status') || 'success';
    const sessionName = searchParams.get('sessionName') || searchParams.get('session_name');

    // Recuperar información del carrito guardada antes del checkout
    const savedCart = LocalStorageManager.getItem(LocalStorageManager.CART_KEY);

    if (paymentStatus === 'success') {
      setOrderStatus('success');
      if (savedCart && savedCart.items) {
        setOrderDetails({
          items: savedCart.items,
          total: savedCart.items.reduce((sum, item) => sum + (item.price * item.quantity), 0),
          sessionName
        });
        // Limpiar el carrito después de un pago exitoso
        clearCart();
      }
    } else if (paymentStatus === 'cancel') {
      setOrderStatus('cancelled');
      if (savedCart && savedCart.items) {
        setOrderDetails({
          items: savedCart.items,
          total: savedCart.items.reduce((sum, item) => sum + (item.price * item.quantity), 0),
          sessionName
        });
        // No limpiar el carrito si se canceló el pago
      }
    } else {
      setOrderStatus('error');
      setOrderDetails({
        sessionName
      });
    }
  }, [searchParams, clearCart]);

  const handleContinueShopping = () => {
    navigate('/products');
  };

  const handleViewProfile = () => {
    navigate('/profile');
  };

  const handleRetryPayment = () => {
    navigate('/cart');
  };

  if (orderStatus === 'loading') {
    return (
      <div className="order-confirmation-page">
        <div className="loading-container">
          <div className="spinner"></div>
          <p>Procesando información del pedido...</p>
        </div>
      </div>
    );
  }

  if (orderStatus === 'success') {
    return (
      <div className="order-confirmation-page">
        <div className="confirmation-container success">
          <div className="status-icon success">✅</div>
          <h1>¡Pedido confirmado!</h1>
          <p className="success-message">
            Tu pago ha sido procesado correctamente y tu pedido está siendo preparado.
          </p>

          {orderDetails && (
            <div className="order-summary">
              <h3>Resumen del pedido</h3>
              {orderDetails.sessionName && (
                <div className="session-card success-card">
                  <strong>Pedido: {orderDetails.sessionName}</strong>
                </div>
              )}
              <div className="order-items">
                {orderDetails.items?.map((item) => (
                  <div key={item.id} className="order-item">
                    <span className="item-name">{item.name}</span>
                    <span className="item-quantity">x{item.quantity}</span>
                    <span className="item-price">€{(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>
              <div className="order-total">
                <strong>Total: €{orderDetails.total?.toFixed(2) || '0.00'}</strong>
              </div>
            </div>
          )}

          <div className="action-buttons">
            <button className="primary-btn" onClick={handleViewProfile}>
              Ver mis pedidos
            </button>
            <button className="secondary-btn" onClick={handleContinueShopping}>
              Seguir comprando
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (orderStatus === 'cancelled') {
    return (
      <div className="order-confirmation-page">
        <div className="confirmation-container cancelled">
          <div className="status-icon cancelled">❌</div>
          <h1>Pago cancelado</h1>
          <p className="cancelled-message">
            Has cancelado el proceso de pago. Tu carrito se mantiene intacto.
          </p>

          {orderDetails && (
            <div className="order-summary">
              <h3>Productos en tu carrito</h3>
              {orderDetails.sessionName && (
                <div className="session-card error-card">
                  <strong>Pedido cancelado: {orderDetails.sessionName}</strong>
                </div>
              )}
              <div className="order-items">
                {orderDetails.items?.map((item) => (
                  <div key={item.id} className="order-item">
                    <span className="item-name">{item.name}</span>
                    <span className="item-quantity">x{item.quantity}</span>
                    <span className="item-price">€{(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>
              <div className="order-total">
                <strong>Total: €{orderDetails.total?.toFixed(2) || '0.00'}</strong>
              </div>
            </div>
          )}

          <div className="action-buttons">
            <button className="primary-btn" onClick={handleRetryPayment}>
              Intentar pago nuevamente
            </button>
            <button className="secondary-btn" onClick={handleContinueShopping}>
              Seguir comprando
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="order-confirmation-page">
      <div className="confirmation-container error">
        <div className="status-icon error">⚠️</div>
        <h1>Error en el procesamiento</h1>
        <p className="error-message">
          Ha ocurrido un error al procesar tu pedido. Por favor, inténtalo de nuevo.
        </p>

        {orderDetails?.sessionName && (
          <div className="session-card error-card">
            <strong>Error en pedido: {orderDetails.sessionName}</strong>
          </div>
        )}

        <div className="action-buttons">
          <button className="primary-btn" onClick={handleRetryPayment}>
            Volver al carrito
          </button>
          <button className="secondary-btn" onClick={handleContinueShopping}>
            Seguir comprando
          </button>
        </div>
      </div>
    </div>
  );
}
