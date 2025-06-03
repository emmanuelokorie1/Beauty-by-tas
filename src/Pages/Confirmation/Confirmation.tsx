"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { useLocation, Link } from "react-router-dom"
import { CheckCircle, Loader2, AlertCircle, Package, Calendar, Receipt, ArrowLeft, Printer } from "lucide-react"
import { formatCurrency } from "../../utils/CurrencyFormat"
import axiosInstance from "../../services/axiosInstance"

interface Order {
  id: string
  status: string
  name: string
  quantity: number
  total: number
  reference?: string
  date?: string
  customerName?: string
}

interface OrderDetails {
  id: string
  productId: string
  productName: string
  images: string[]
  amount: number
  totalStock: number
  customerName: string
  reference: string
  status: string
  createdAt: string
  paymentDetails: {
    reference: string
    status: string
    paidAt: string
    channel: string
    amount: number
    customer: {
      email: string
      name: string
    }
    authorization: {
      cardType: string
      bank: string
      last4: string
    }
  }
}

const OrderConfirmation: React.FC = () => {
  const [orderDetails, setOrderDetails] = useState<OrderDetails | null>(null)
  const [order, setOrder] = useState<Order | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const location = useLocation()

  useEffect(() => {
    const fetchOrderDetails = async () => {
      const searchParams = new URLSearchParams(location.search)
      const trxref = searchParams.get("trxref")

      if (!trxref) {
        setError("No transaction reference found")
        setIsLoading(false)
        return
      }

      try {
        const response = await axiosInstance.get(`/orders/verify/${trxref}`)
        const data = response.data

        console.log("API Response:", data) // Debug log

        // Check if we have the order data
        if (!data?.data) {
          setError("Order information is not available")
          setIsLoading(false)
          return
        }

        const orderData = data.data
        setOrderDetails(orderData)

        // Format the date
        const orderDate = orderData.createdAt
          ? new Date(orderData.createdAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })
          : new Date().toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })

        setOrder({
          total: orderData.amount / 100, // Convert from kobo/cents to main currency
          status: orderData.paymentDetails?.status || orderData.status,
          name: orderData.productName || "Order",
          id: orderData.id,
          quantity: 1, // Default to 1 since it's not in the response
          reference: orderData.reference,
          date: orderDate,
          customerName: orderData.customerName,
        })
      } catch (error: any) {
        console.error("Error fetching order details:", error)
        const errorMessage = error.response?.data?.message || "Failed to load order details. Please try again later."
        setError(errorMessage)
      } finally {
        setIsLoading(false)
      }
    }

    fetchOrderDetails()
  }, [location])

  const handlePrint = () => {
    // Create a new window for printing
    const printWindow = window.open("", "_blank")
    if (!printWindow) return

    // Generate print-friendly content
    const printContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Order Receipt - BeautyByTas</title>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
          body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
          }
          .header {
            text-align: center;
            margin-bottom: 30px;
            border-bottom: 1px solid #eee;
            padding-bottom: 20px;
          }
          .logo {
            font-size: 24px;
            font-weight: bold;
            color: #FF779F;
          }
          .order-info {
            margin-bottom: 20px;
          }
          .order-info div {
            margin-bottom: 5px;
          }
          table {
            width: 100%;
            border-collapse: collapse;
            margin: 20px 0;
          }
          th, td {
            padding: 12px;
            text-align: left;
            border-bottom: 1px solid #eee;
          }
          th {
            background-color: #f9f9f9;
          }
          .total {
            text-align: right;
            font-weight: bold;
            font-size: 18px;
            margin-top: 20px;
          }
          .footer {
            margin-top: 40px;
            text-align: center;
            font-size: 14px;
            color: #777;
            border-top: 1px solid #eee;
            padding-top: 20px;
          }
        </style>
      </head>
      <body onload="window.print()">
        <div class="header">
          <div class="logo">BeautyByTas</div>
          <div>Order Receipt</div>
        </div>
        
        <div class="order-info">
          <div><strong>Order ID:</strong> ${order?.id || "N/A"}</div>
          <div><strong>Reference:</strong> ${order?.reference || "N/A"}</div>
          <div><strong>Date:</strong> ${order?.date || "N/A"}</div>
          <div><strong>Customer:</strong> ${order?.customerName || "N/A"}</div>
          <div><strong>Status:</strong> ${order?.status ? order.status.charAt(0).toUpperCase() + order.status.slice(1) : "N/A"}</div>
        </div>
        
        <table>
          <thead>
            <tr>
              <th>Product</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>${orderDetails?.productName || "N/A"}</td>
              <td>${order?.quantity || 1}</td>
              <td>${formatCurrency(order?.total || 0)}</td>
              <td>${formatCurrency(order?.total || 0)}</td>
            </tr>
          </tbody>
        </table>
        
        <div class="total">
          Total: ${formatCurrency(order?.total || 0)}
        </div>
        
        <div class="footer">
          Thank you for shopping with BeautyByTas!<br>
          For any questions, please contact our customer support.
        </div>
      </body>
      </html>
    `

    printWindow.document.open()
    printWindow.document.write(printContent)
    printWindow.document.close()
  }

  if (isLoading) {
    return (
      <div className="flex flex-col justify-center items-center h-screen bg-gray-50">
        <Loader2 className="h-12 w-12 animate-spin text-primary-deepRed mb-4" />
        <p className="text-gray-600 font-medium">Processing your order...</p>
      </div>
    )
  }

  if (error || !orderDetails) {
    return (
      <div className="flex flex-col justify-center items-center h-screen bg-gray-50 px-4">
        <AlertCircle className="h-16 w-16 text-red-500 mb-6" />
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Order Not Found</h2>
        <p className="text-lg text-gray-600 mb-8 text-center">
          {error || "Failed to load order details. Please try again later."}
        </p>
        <Link
          to="/shop"
          className="flex items-center gap-2 bg-primary-deepRed text-white px-6 py-3 rounded-md hover:bg-opacity-90 transition-all"
        >
          <ArrowLeft size={18} />
          Continue Shopping
        </Link>
      </div>
    )
  }

  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case "success":
        return "bg-green-100 text-green-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "failed":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status?.toLowerCase()) {
      case "success":
        return <CheckCircle className="h-6 w-6 text-green-500 mr-2" />
      case "pending":
        return <Loader2 className="h-6 w-6 animate-spin text-yellow-500 mr-2" />
      default:
        return <AlertCircle className="h-6 w-6 text-red-500 mr-2" />
    }
  }

  return (
    <div className="bg-gray-50 min-h-screen py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header with back button */}
        <div className="flex items-center mb-8">
          <Link to="/shop" className="flex items-center text-gray-600 hover:text-primary-deepRed transition-colors">
            <ArrowLeft size={20} className="mr-2" />
            <span>Back to Shop</span>
          </Link>
        </div>

        {/* Order confirmation card */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
          {/* Header */}
          <div className="bg-primary-deepRed bg-opacity-10 px-6 py-6 border-b border-gray-100">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h1 className="text-2xl font-bold text-gray-800 mb-1">Order Confirmation</h1>
                <p className="text-gray-600">Thank you for your purchase, {orderDetails.customerName}!</p>
              </div>
              <div className={`px-4 py-2 rounded-full flex items-center ${getStatusColor(order?.status || "")}`}>
                {getStatusIcon(order?.status || "")}
                <span className="font-medium">
                  {order?.status ? order.status.charAt(0).toUpperCase() + order.status.slice(1) : "Unknown"}
                </span>
              </div>
            </div>
          </div>

          {/* Order details */}
          <div className="p-6">
            {/* Order info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="space-y-4">
                <div className="flex items-start">
                  <Receipt className="h-5 w-5 text-gray-400 mr-3 mt-0.5" />
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Order Reference</h3>
                    <p className="text-gray-800 font-medium">{order?.reference || "N/A"}</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Calendar className="h-5 w-5 text-gray-400 mr-3 mt-0.5" />
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Order Date</h3>
                    <p className="text-gray-800 font-medium">{order?.date || "N/A"}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-start">
                  <Package className="h-5 w-5 text-gray-400 mr-3 mt-0.5" />
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Payment Method</h3>
                    <p className="text-gray-800 font-medium">
                      {orderDetails.paymentDetails?.authorization?.cardType} ending in{" "}
                      {orderDetails.paymentDetails?.authorization?.last4}
                    </p>
                    <p className="text-sm text-gray-500">{orderDetails.paymentDetails?.authorization?.bank}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Order items */}
            <div className="border rounded-lg overflow-hidden mb-8">
              <div className="bg-gray-50 px-6 py-4 border-b">
                <div className="flex items-center">
                  <Package className="h-5 w-5 text-gray-400 mr-2" />
                  <h3 className="font-semibold text-gray-700">Order Items</h3>
                </div>
              </div>

              <div className="px-6 py-4">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden">
                      <img
                        src={orderDetails.images?.[0] || "/placeholder.svg"}
                        alt={orderDetails.productName}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-800">{orderDetails.productName}</h4>
                      <p className="text-sm text-gray-500">Product ID: {orderDetails.productId}</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between sm:justify-end gap-8">
                    <div className="text-sm text-gray-500">1 × {formatCurrency(order?.total || 0)}</div>
                    <div className="font-medium text-gray-800">{formatCurrency(order?.total || 0)}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Order summary */}
            <div className="bg-gray-50 rounded-lg p-6">
              <div className="flex justify-between mb-4">
                <span className="text-gray-600">Subtotal</span>
                <span className="text-gray-800 font-medium">{formatCurrency(order?.total || 0)}</span>
              </div>
              <div className="flex justify-between mb-4">
                <span className="text-gray-600">Shipping</span>
                <span className="text-gray-800 font-medium">Free</span>
              </div>
              <div className="border-t border-gray-200 pt-4 mt-4">
                <div className="flex justify-between">
                  <span className="text-lg font-bold text-gray-800">Total</span>
                  <span className="text-lg font-bold text-gray-800">{formatCurrency(order?.total || 0)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="px-6 py-4 bg-gray-50 border-t">
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={handlePrint}
                className="flex-1 flex justify-center items-center gap-2 bg-primary-deepRed text-white py-3 px-4 rounded-md hover:bg-opacity-90 transition-all"
              >
                <Printer size={18} />
                Print Receipt
              </button>
              <Link
                to="/shop"
                className="flex-1 flex justify-center items-center gap-2 border border-gray-300 text-gray-700 py-3 px-4 rounded-md hover:bg-gray-50 transition-all"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>

        {/* Help text */}
        <div className="text-center text-gray-500 text-sm">
          <p>If you have any questions about your order, please contact our customer support.</p>
          <p className="mt-2">
            <Link to="/contact-us" className="text-primary-deepRed hover:underline">
              Contact Us
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default OrderConfirmation
