import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Trash2, Minus, Plus, ShoppingBag, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/CartContext';
import { openWhatsApp } from '@/lib/whatsapp';

const Cart = () => {
  const {
    items,
    removeFromCart,
    updateQuantity,
    getTotalPrice,
    getWhatsAppMessage,
    clearCart,
  } = useCart();

  const [showAddressModal, setShowAddressModal] = useState(false);
  const [address, setAddress] = useState('');
  const [pincode, setPincode] = useState('');

  const handleCheckout = () => {
    setShowAddressModal(true);
  };

  const confirmWhatsAppOrder = () => {
    if (!address || !pincode) return;

    const baseMessage = getWhatsAppMessage();
    if (!baseMessage) return;

    const finalMessage = `
${baseMessage}

📍 Delivery Address:
${address}

📮 Pincode: ${pincode}
    `.trim();

    openWhatsApp(finalMessage);
    setShowAddressModal(false);
  };

  if (items.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center px-4">
        <ShoppingBag className="h-16 w-16 text-muted-foreground mb-4" />
        <h1 className="text-2xl font-bold mb-2">Your Cart is Empty</h1>
        <p className="text-muted-foreground mb-6 text-center">
          Looks like you haven't added anything to your cart yet.
        </p>
        <Link to="/shop">
          <Button>
            Continue Shopping
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="bg-secondary/30 py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold">Shopping Cart</h1>
          <p className="text-muted-foreground mt-2">
            {items.length} {items.length === 1 ? 'item' : 'items'} in your cart
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <div
                key={`${item.product.id}-${item.size}-${item.color}`}
                className="flex gap-4 bg-card rounded-xl p-4 border border-border"
              >
                <Link to={`/product/${item.product.id}`} className="flex-shrink-0">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-24 h-32 md:w-32 md:h-40 object-cover rounded-lg"
                  />
                </Link>

                <div className="flex-1 flex flex-col">
                  <div className="flex justify-between">
                    <div>
                      <Link to={`/product/${item.product.id}`}>
                        <h3 className="font-medium hover:text-primary transition-colors">
                          {item.product.name}
                        </h3>
                      </Link>
                      <p className="text-sm text-muted-foreground mt-1">
                        {item.size && `Size: ${item.size}`}
                        {item.size && item.color && ' | '}
                        {item.color && `Color: ${item.color}`}
                      </p>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.product.id)}
                      className="text-muted-foreground hover:text-destructive transition-colors"
                      aria-label="Remove item"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>

                  <div className="mt-auto flex items-center justify-between">
                    <div className="flex items-center border border-border rounded-lg">
                      <button
                        onClick={() =>
                          updateQuantity(item.product.id, item.quantity - 1)
                        }
                        className="p-2 hover:bg-secondary transition-colors"
                      >
                        <Minus className="h-4 w-4" />
                      </button>
                      <span className="w-10 text-center text-sm">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateQuantity(item.product.id, item.quantity + 1)
                        }
                        className="p-2 hover:bg-secondary transition-colors"
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>
                    <span className="font-semibold">
                      ${(item.product.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            ))}

            <Button variant="outline" onClick={clearCart} className="w-full">
              Clear Cart
            </Button>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-card rounded-xl p-6 border border-border sticky top-24">
              <h2 className="text-xl font-bold mb-4">Order Summary</h2>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>${getTotalPrice().toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Shipping</span>
                  <span className="text-primary">Free</span>
                </div>
                <div className="border-t border-border pt-3">
                  <div className="flex justify-between font-semibold">
                    <span>Total</span>
                    <span>${getTotalPrice().toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <Button className="w-full" size="lg" onClick={handleCheckout}>
                Place Order on WhatsApp
              </Button>

              <p className="text-xs text-muted-foreground text-center mt-4">
                Your order details will be sent via WhatsApp for confirmation
              </p>

              <Link to="/shop" className="block mt-4">
                <Button variant="outline" className="w-full">
                  Continue Shopping
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Address Modal */}
      {showAddressModal && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center px-4">
          <div className="bg-white rounded-xl w-full max-w-md p-6">
            <h3 className="text-xl font-bold mb-4 text-center">
              Enter Delivery Details
            </h3>

            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Delivery Address</label>
                <textarea
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  rows={3}
                  className="w-full mt-1 rounded-lg border border-border p-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="House no, Street, Area, City"
                />
              </div>

              <div>
                <label className="text-sm font-medium">Pincode</label>
                <input
                  type="text"
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value)}
                  className="w-full mt-1 rounded-lg border border-border p-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Enter pincode"
                />
              </div>
            </div>

            <div className="mt-6 flex gap-3">
              <Button
                variant="outline"
                className="w-1/2"
                onClick={() => setShowAddressModal(false)}
              >
                Cancel
              </Button>
              <Button
                className="w-1/2"
                disabled={!address || !pincode}
                onClick={confirmWhatsAppOrder}
              >
                Send on WhatsApp
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
