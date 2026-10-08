import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, Utensils, Clock, CheckCircle2, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';
import { CartItem } from '../types/restaurant';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (dishId: string, quantity: number) => void;
  onClearCart: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onClearCart,
}) => {
  const [orderType, setOrderType] = useState<'dine-in' | 'takeaway' | 'delivery'>('dine-in');
  const [tableNumber, setTableNumber] = useState('Table 4 (Terrace)');
  const [deliveryAddress, setDeliveryAddress] = useState('Civil Lines, Jaipur');
  const [customerName, setCustomerName] = useState('Anshika Napit');
  const [customerPhone, setCustomerPhone] = useState('+91 98765 43210');
  const [orderPlacedData, setOrderPlacedData] = useState<{
    orderId: string;
    items: CartItem[];
    subtotal: number;
    gst: number;
    total: number;
    type: string;
    tableOrAddress: string;
  } | null>(null);

  if (!isOpen) return null;

  const subtotal = cartItems.reduce((acc, item) => acc + item.dish.price * item.quantity, 0);
  const gst = Math.round(subtotal * 0.05); // 5% GST on dining
  const packagingFee = orderType === 'delivery' ? 50 : 0;
  const grandTotal = subtotal + gst + packagingFee;

  const handlePlaceOrder = () => {
    if (cartItems.length === 0) return;

    const orderId = 'ORD-' + Math.floor(10000 + Math.random() * 90000);
    const orderRecord = {
      orderId,
      items: [...cartItems],
      subtotal,
      gst,
      total: grandTotal,
      type: orderType,
      tableOrAddress: orderType === 'dine-in' ? tableNumber : deliveryAddress,
    };

    // Save order in browser demo localStorage
    try {
      const existing = JSON.parse(localStorage.getItem('golden_fork_orders') || '[]');
      existing.unshift({ ...orderRecord, date: new Date().toISOString() });
      localStorage.setItem('golden_fork_orders', JSON.stringify(existing));
    } catch {
      // Ignore localStorage quotas
    }

    // Launch confetti
    confetti({
      particleCount: 50,
      spread: 50,
      origin: { y: 0.5 },
      colors: ['#D4AF37', '#F3E5AB', '#FFFFFF'],
    });

    setOrderPlacedData(orderRecord);
    onClearCart();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex justify-end"
    >
      <div className="w-full max-w-md bg-[#131216] border-l border-[#d4af37]/40 h-full flex flex-col justify-between shadow-2xl overflow-hidden">
        
        {/* Header */}
        <div className="p-5 bg-[#17161b] border-b border-[#2b2720] flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <ShoppingBag className="w-5 h-5 text-[#d4af37]" />
            <h3 className="font-serif-title text-xl text-[#f6ebd4] font-medium">
              Your Culinary Cart
            </h3>
            <span className="text-xs bg-[#24211a] text-[#d4af37] px-2 py-0.5 rounded border border-[#d4af37]/20 font-bold">
              {cartItems.reduce((acc, item) => acc + item.quantity, 0)} items
            </span>
          </div>

          <button
            onClick={() => {
              setOrderPlacedData(null);
              onClose();
            }}
            className="p-1.5 rounded-full text-stone-400 hover:text-white hover:bg-stone-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Order Success Receipt Modal View */}
        {orderPlacedData ? (
          <div className="flex-1 p-6 overflow-y-auto space-y-5 bg-[#0d0d10]">
            <div className="text-center py-4">
              <div className="w-14 h-14 rounded-full border-2 border-[#d4af37] bg-[#1d1a15] flex items-center justify-center text-[#d4af37] mx-auto shadow-lg shadow-[#d4af37]/20 mb-3">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h4 className="font-serif-title text-2xl text-white">Order Confirmed!</h4>
              <p className="text-xs text-[#a39a89] mt-1">
                Kitchen ticket successfully created and sent to our chefs.
              </p>
              <div className="mt-2 font-mono text-sm font-bold text-[#d4af37]">
                #{orderPlacedData.orderId}
              </div>
            </div>

            {/* Preparation status tracker */}
            <div className="bg-[#17161b] border border-[#2b2720] rounded-lg p-4 space-y-3">
              <div className="flex items-center justify-between text-xs text-[#d4af37] font-semibold">
                <span className="flex items-center space-x-1.5">
                  <Clock className="w-3.5 h-3.5 animate-spin" />
                  <span>Kitchen Prep Time</span>
                </span>
                <span>~25-30 mins</span>
              </div>
              <div className="w-full bg-stone-800 h-1.5 rounded-full overflow-hidden">
                <div className="bg-gradient-to-r from-[#d4af37] to-[#e5c158] w-2/3 h-full animate-pulse"></div>
              </div>
              <div className="text-[11px] text-[#8e8576]">
                Destination: <strong className="text-white">{orderPlacedData.tableOrAddress}</strong>
              </div>
            </div>

            {/* Items summary */}
            <div className="bg-[#17161b] border border-[#2b2720] rounded-lg p-4 space-y-2 text-xs">
              <span className="text-[10px] uppercase tracking-wider text-[#7e7465] block pb-1 border-b border-stone-800">
                Dishes Ordered
              </span>
              {orderPlacedData.items.map((it) => (
                <div key={it.dish.id} className="flex justify-between text-[#d6cdbd]">
                  <span>{it.quantity}x {it.dish.name}</span>
                  <span className="font-mono">₹{(it.dish.price * it.quantity).toLocaleString('en-IN')}</span>
                </div>
              ))}
              <div className="pt-2 border-t border-stone-800 flex justify-between font-bold text-white text-sm">
                <span>Total Paid</span>
                <span className="font-mono text-[#d4af37]">₹{orderPlacedData.total.toLocaleString('en-IN')}</span>
              </div>
            </div>

            <div className="p-3 bg-[#171512] border border-[#d4af37]/20 rounded text-[11px] text-[#baa78d] leading-relaxed">
              <strong>Demo notice:</strong> Saved in your browser storage. In a production launch, this seamlessly triggers POS printing and online payment gateway.
            </div>

            <button
              onClick={() => {
                setOrderPlacedData(null);
                onClose();
              }}
              className="w-full py-3 bg-[#d4af37] text-black font-semibold text-xs uppercase tracking-wider rounded"
            >
              Close & Return to Menu
            </button>
          </div>
        ) : (
          /* Normal Cart Items & Checkout Flow */
          <>
            <div className="flex-1 overflow-y-auto p-5 space-y-4">
              
              {/* Dining Mode Selector */}
              <div className="bg-[#1b191e] p-1.5 rounded-lg border border-[#2e2a22] flex items-center justify-between text-xs">
                <button
                  onClick={() => setOrderType('dine-in')}
                  className={`flex-1 py-1.5 rounded text-center font-medium transition-colors ${
                    orderType === 'dine-in'
                      ? 'bg-[#d4af37] text-black font-semibold shadow'
                      : 'text-[#9c9383] hover:text-white'
                  }`}
                >
                  Dine-In Table
                </button>
                <button
                  onClick={() => setOrderType('takeaway')}
                  className={`flex-1 py-1.5 rounded text-center font-medium transition-colors ${
                    orderType === 'takeaway'
                      ? 'bg-[#d4af37] text-black font-semibold shadow'
                      : 'text-[#9c9383] hover:text-white'
                  }`}
                >
                  Takeaway
                </button>
                <button
                  onClick={() => setOrderType('delivery')}
                  className={`flex-1 py-1.5 rounded text-center font-medium transition-colors ${
                    orderType === 'delivery'
                      ? 'bg-[#d4af37] text-black font-semibold shadow'
                      : 'text-[#9c9383] hover:text-white'
                  }`}
                >
                  Delivery
                </button>
              </div>

              {/* Order Context input */}
              {orderType === 'dine-in' && (
                <div className="bg-[#17161b] p-3 rounded border border-[#2b2720] text-xs">
                  <label className="text-[10px] uppercase tracking-wider text-[#8e8576] block mb-1">
                    Your Table / Seating
                  </label>
                  <input
                    type="text"
                    value={tableNumber}
                    onChange={(e) => setTableNumber(e.target.value)}
                    placeholder="e.g. Table 4 or Terrace Table"
                    className="w-full bg-[#111013] border border-stone-700 rounded px-2.5 py-1.5 text-white focus:outline-none"
                  />
                </div>
              )}

              {orderType === 'delivery' && (
                <div className="bg-[#17161b] p-3 rounded border border-[#2b2720] text-xs space-y-2">
                  <div>
                    <label className="text-[10px] uppercase tracking-wider text-[#8e8576] block mb-1">Delivery Address</label>
                    <input
                      type="text"
                      value={deliveryAddress}
                      onChange={(e) => setDeliveryAddress(e.target.value)}
                      placeholder="Street, Apartment, Landmark"
                      className="w-full bg-[#111013] border border-stone-700 rounded px-2.5 py-1.5 text-white focus:outline-none"
                    />
                  </div>
                </div>
              )}

              {/* Items List */}
              {cartItems.length === 0 ? (
                <div className="py-16 text-center text-[#8e8576]">
                  <Utensils className="w-12 h-12 text-[#d4af37]/30 mx-auto mb-3" />
                  <p className="font-serif-title text-lg text-[#d8cebf]">Your cart is currently empty</p>
                  <p className="text-xs text-[#70685b] mt-1">
                    Explore our starters, chef specials, and desserts to add dishes.
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {cartItems.map((item) => (
                    <div
                      key={item.dish.id}
                      className="bg-[#17161b] border border-[#2b2720] rounded-lg p-3 flex items-center justify-between gap-3"
                    >
                      <img
                        src={item.dish.image}
                        alt={item.dish.name}
                        className="w-14 h-14 rounded object-cover border border-stone-700 shrink-0"
                      />

                      <div className="flex-1 min-w-0">
                        <h4 className="text-xs font-semibold text-[#f8f1e2] truncate">
                          {item.dish.name}
                        </h4>
                        <div className="font-cinzel text-xs text-[#d4af37] font-bold mt-0.5">
                          ₹{item.dish.price.toLocaleString('en-IN')}
                        </div>
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex items-center bg-[#111013] border border-[#2e2a22] rounded px-1.5 py-1 space-x-2 shrink-0">
                        <button
                          onClick={() => onUpdateQuantity(item.dish.id, item.quantity - 1)}
                          className="text-[#baa78d] hover:text-[#d4af37] p-0.5"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-xs font-bold text-white px-1">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item.dish.id, item.quantity + 1)}
                          className="text-[#baa78d] hover:text-[#d4af37] p-0.5"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <button
                        onClick={() => onUpdateQuantity(item.dish.id, 0)}
                        className="text-stone-500 hover:text-red-400 p-1 transition-colors"
                        title="Remove item"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Bill Summary & Place Order CTA */}
            {cartItems.length > 0 && (
              <div className="p-5 bg-[#17161b] border-t border-[#2b2720] space-y-3">
                <div className="space-y-1.5 text-xs text-[#bfb6a4]">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="font-mono font-medium text-white">₹{subtotal.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between text-[11px] text-[#8e8576]">
                    <span>GST (5%)</span>
                    <span className="font-mono">₹{gst.toLocaleString('en-IN')}</span>
                  </div>
                  {packagingFee > 0 && (
                    <div className="flex justify-between text-[11px] text-[#8e8576]">
                      <span>Eco-Friendly Packaging</span>
                      <span className="font-mono">₹{packagingFee}</span>
                    </div>
                  )}
                  <div className="pt-2 border-t border-[#26231c] flex justify-between text-base font-bold text-white">
                    <span>Grand Total</span>
                    <span className="font-cinzel text-lg text-[#f7e7b4]">
                      ₹{grandTotal.toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>

                <button
                  onClick={handlePlaceOrder}
                  className="w-full py-3.5 bg-gradient-to-r from-[#d4af37] via-[#e5c158] to-[#b88a1a] text-black font-bold text-xs uppercase tracking-widest rounded-sm shadow-xl shadow-[#d4af37]/20 hover:brightness-110 active:scale-95 transition-all flex items-center justify-center space-x-2"
                >
                  <span>Confirm Order</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <div className="text-center text-[10px] text-[#7a7263]">
                  Demonstration ordering flow &middot; Saved in browser storage
                </div>
              </div>
            )}
          </>
        )}

      </div>
    </div>
  );
};
