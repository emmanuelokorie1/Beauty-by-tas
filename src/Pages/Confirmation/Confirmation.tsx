import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { CheckCircle, Loader2, AlertCircle } from 'lucide-react';

interface Order {
  id: string;
  status:string;
  name: string;
  quantity: number;
  total: number;
}

//   id: string;
//   status: 'pending' | 'confirmed' | 'failed';
//   items: OrderItem[];
//   total: number;
interface OrderDetails  {
    address: string;
    city: string;
    country:string;
    customer_name: string;
    description:string;
    name: string;
    price: number;
    product_id: string;
    product_total: string;
    quantity: number;
    state: string;
    total_price: string;
    status: string;
    total: number;
    id:string;
}

const OrderConfirmation: React.FC = () => {
    const [orderDetails, setOrderDetails] = useState<OrderDetails[]>(null);
    const [order, setOrder] = useState<Order>(null);


  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const fetchOrderDetails = async () => {
      const searchParams = new URLSearchParams(location.search);
      const trxref = searchParams.get('trxref');
      console.log("🚀 ~ fetchOrderDetails ~ trxref:", trxref)

      if (!trxref) {
        console.error('No transaction reference found');
        setIsLoading(false);
        return;
      }

      try {
        const response = await fetch(`https://beautybytas.sytes.net/orders/paystack/verify/${trxref}`);
        console.log("🚀 ~ fetchOrderDetails ~ response:", response);
        
        if (!response.ok) throw new Error('Failed to fetch order details');
        
        const data = await response.json();
        console.log("🚀 ~ data:", data);
        
        // Check if the productDescriptions array exists and is populated
        const productDescriptions = data?.data?.metadata?.products?.productDescriptions;
        console.log("🚀 ~ productDescriptions:", productDescriptions);
        
        if (!productDescriptions || !Array.isArray(productDescriptions)) {
            console.error('Error: productDescriptions is not an array or is undefined');
            return; // Stop further execution if the array is not valid
        }
        
        const remap = productDescriptions.map(d => {
            return {
                ...d,
                total: parseFloat(d.total_price),
                status: data.data.status,
                id: d.product_id,
                price: parseFloat(d.price),
                quantity: parseFloat(d.quantity),
            };
        });
        
        console.log("🚀 ~ remap ~ remap:", remap);
        
        // Ensure remap has valid data before updating state
        if (remap.length > 0) {
            setOrderDetails(remap);
            console.log("🚀 ~ orderDetails:", remap);
        } else {
            console.warn("Warning: remap array is empty, nothing to set for orderDetails.");
        }
        
        setOrder({
            total: data.data.amount,
            status: data.data.status,
            name: data.data.name,
            id: data.data.product_id || 0, // Default to 0 or any other placeholder
            quantity: parseFloat(data.data.quantity) || 1 // Default to 1 or any other placeholder
        });
        

      } catch (error) {
        console.error('Error fetching order details:', error);
      } finally {
   
        setIsLoading(false);
      }
    };

    fetchOrderDetails();
  }, [location]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (!orderDetails) {
    return (
      <div className="flex flex-col justify-center items-center h-screen">
        <AlertCircle className="h-12 w-12 text-red-500 mb-4" />
        <p className="text-lg text-red-500">Failed to load order details. Please try again later.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="w-full max-w-2xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="px-6 py-4 bg-gray-100 border-b">
          <h1 className="text-2xl font-bold text-gray-800">Order Confirmation</h1>
        </div>
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <span className="text-lg font-semibold text-gray-700">Order Status:</span>
            <div className="flex items-center">
              {order?.status === 'success' ? (
                <CheckCircle className="h-6 w-6 text-green-500 mr-2" />
              ) : order?.status === 'pending' ? (
                <Loader2 className="h-6 w-6 animate-spin text-yellow-500 mr-2" />
              ) : (
                <AlertCircle className="h-6 w-6 text-red-500 mr-2" />
              )}
              <span
                className={
                    order?.status === 'success'
                    ? 'text-green-500'
                    : order?.status === 'pending'
                    ? 'text-yellow-500'
                    : 'text-red-500'
                }
              >
                {order?.status?.charAt(0).toUpperCase() + order?.status?.slice(1)}
              </span>
            </div>
          </div>
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">Purchased Items:</h3>
            <ul className="divide-y divide-gray-200">
              {orderDetails && orderDetails?.map((item) => (
                <li key={item?.id} className="py-2 flex justify-between">
                  <span className="text-gray-600">
                    {item?.name} (x{item?.quantity})
                  </span>
                  <span className="text-gray-800 font-medium">${(item?.price * item?.quantity).toFixed(2)}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="text-xl font-bold flex justify-between text-gray-800">
            <span>Total:</span>
            <span>{order.total}</span>
          </div>
        </div>
        <div className="px-6 py-4 bg-gray-100 border-t">
          <button 
          style={{backgroundColor:"#ff779f"}}
            className="w-full text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            onClick={() => window.print()}
          >
            Print Receipt
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;