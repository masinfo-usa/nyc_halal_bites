import { useEffect, useState, useMemo } from "react";

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortBy, setSortBy] = useState("createdAt");
  const [desc, setDesc] = useState(true);

  const fetchOrders = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/squareorders`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      const data = await res.json();
      setOrders(data);
    } catch (err) {
      console.error("Error fetching orders:", err);
      setError("Failed to fetch orders. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const formatMoney = (money) =>
    money ? (parseInt(money.amount) / 100).toFixed(2) : "0.00";


  const calculateSubtotal = (order) => {
  const subtotal = parseInt(order.totalMoney?.amount || 0);
  const tax = parseInt(order.totalTaxMoney?.amount || 0);
  const tip = parseInt(order.totalTipMoney?.amount || 0);
  const discount = parseInt(order.totalDiscountMoney?.amount || 0);
  const service = parseInt(order.totalServiceChargeMoney?.amount || 0);

  const total = subtotal-tax;// + tip + service - discount;
  return (total / 100).toFixed(2);
};

  const calculateTotal = (order) => {
  const subtotal = parseInt(order.totalMoney?.amount || 0);
  const tax = parseInt(order.totalTaxMoney?.amount || 0);
  const tip = parseInt(order.totalTipMoney?.amount || 0);
  const discount = parseInt(order.totalDiscountMoney?.amount || 0);
  const service = parseInt(order.totalServiceChargeMoney?.amount || 0);

  const total = subtotal + tip + service - discount;
  return (total / 100).toFixed(2);
};


  // Compute summary stats using useMemo
  const summary = useMemo(() => {
    const totalOrders = orders.length;
    const totalSales = orders.reduce(
      (sum, o) => sum + parseInt(o.totalMoney?.amount || 0),
      0
    );
    const totalTax = orders.reduce(
      (sum, o) => sum + parseInt(o.totalTaxMoney?.amount || 0),
      0
    );
    const totalDiscount = orders.reduce(
      (sum, o) => sum + parseInt(o.totalDiscountMoney?.amount || 0),
      0
    );
    const totalTip = orders.reduce(
      (sum, o) => sum + parseInt(o.totalTipMoney?.amount || 0),
      0
    );
    const totalService = orders.reduce(
      (sum, o) => sum + parseInt(o.totalServiceChargeMoney?.amount || 0),
      0
    );

    return {
      totalOrders,
      totalSales,
      totalTax,
      totalDiscount,
      totalTip,
      totalService,
    };
  }, [orders]);

  const sortedOrders = [...orders].sort((a, b) => {
    let valA, valB;

    switch (sortBy) {
      case "total":
        valA = parseInt(a.totalMoney.amount);
        valB = parseInt(b.totalMoney.amount);
        break;
      case "status":
        valA = a.state;
        valB = b.state;
        break;
      case "createdAt":
      default:
        valA = new Date(a.createdAt).getTime();
        valB = new Date(b.createdAt).getTime();
    }

    if (valA < valB) return desc ? 1 : -1;
    if (valA > valB) return desc ? -1 : 1;
    return 0;
  });

  return (
    <div style={{ padding: "20px", maxWidth: "900px", margin: "0 auto" }}>
      <h2>Active Orders</h2>

      {loading && <p>Loading orders...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {!loading && orders.length === 0 && <p>No orders found.</p>}

      {/* Summary */}
      {!loading && orders.length > 0 && (
        <div
          style={{
            border: "1px solid #ddd",
            padding: "15px",
            marginBottom: "20px",
            borderRadius: "6px",
            background: "#f9f9f9",
          }}
        >
          <h3>Summary</h3>
          <p>Total Orders: {summary.totalOrders}</p>
          <p>Total Sales: {(summary.totalSales / 100).toFixed(2)} USD</p>
          <p>Total without Tax: {((summary.totalSales - summary.totalTax) / 100).toFixed(2)} USD</p>
          <p>Total Tax: {(summary.totalTax / 100).toFixed(2)} USD</p>
          <p>Total Discounts: {(summary.totalDiscount / 100).toFixed(2)} USD</p>
          <p>Total Tips: {(summary.totalTip / 100).toFixed(2)} USD</p>
          <p>Total Service Charges: {(summary.totalService / 100).toFixed(2)} USD</p>
        </div>
      )}

      {/* Sorting Controls */}
      <div style={{ marginBottom: "20px" }}>
        <label>Sort by: </label>
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="createdAt">Created At</option>
          <option value="total">Total</option>
          <option value="status">Status</option>
        </select>
        <button onClick={() => setDesc(!desc)}>
          {desc ? "Descending" : "Ascending"}
        </button>
      </div>

      {/* Orders List */}
      {sortedOrders.map((order) => (
        <div
          key={order.id}
          style={{
            border: "1px solid #ddd",
            padding: "15px",
            marginBottom: "15px",
            borderRadius: "6px",
            boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
          }}
        >
          <p>
            <strong>Created:</strong> {new Date(order.createdAt).toLocaleString()}
          </p>
          
          {order.fulfillments?.map((f) => (
            <div key={f.uid} style={{ marginBottom: "0px" }}>
               
              {f.pickupDetails?.recipient && (
                <>
                  <strong>{f.pickupDetails.recipient.displayName}</strong> ({f.pickupDetails.recipient.phoneNumber})
                  {/* Schedule: {f.pickupDetails.scheduleType} */}
                </>
              )}
               <br /> <br />
              <strong>OrderType:</strong> {f.type}
               <br /> <br />
              <strong>IsRealOrder:</strong>: true
              {/* <br />
              Status: {f.state} */}
              <p>
                <strong>Status:</strong> {order.state}
              </p>
            </div>
          ))}
          
          
          
      
          

          <h4 sx={{ mb: 0 }}>Items:</h4>
          <ul>
            {order.lineItems?.map((item) => (
              <li key={item.uid}>
                {item.quantity} × {item.name} 
                {/* Discount: {formatMoney(item.totalDiscountMoney)}, */}
                — Subtotal: {formatMoney(item.basePriceMoney)} USD, 
                {/* Total: {formatMoney(item.totalMoney)}, Tax: {formatMoney(item.totalTaxMoney)},  Service: {formatMoney(item.totalServiceChargeMoney)} */}
              </li>
            ))}
          </ul>

          <p>
          <strong>Subtotal:</strong> {calculateSubtotal(order)} USD
          </p>

          {/* <h4>Totals:</h4>
          <p>Subtotal: {formatMoney(order.totalMoney)} USD</p>
          <p>Tax: {formatMoney(order.totalTaxMoney)} USD</p>
          <p>Tip: {formatMoney(order.totalTipMoney)} USD</p>
          <p>Discount: {formatMoney(order.totalDiscountMoney)} USD</p>
          <p>Service Charge: {formatMoney(order.totalServiceChargeMoney)} USD</p>
          <p>
            <strong>Total Due:</strong> {formatMoney(order.netAmountDueMoney)} USD
          </p> */}





          {/* <h4>Totals:</h4> */}
            {/* <p>Subtotal: {formatMoney(order.totalMoney)} USD</p> */}
            <p>Tax: {formatMoney(order.totalTaxMoney)} USD</p>
            <p>DeliveryFee: 0 USD</p>
            <p>TipAmount: {formatMoney(order.totalTipMoney)} USD</p>
            <p>Total: {calculateTotal(order)} USD</p>
            {/* <p>Discount: {formatMoney(order.totalDiscountMoney)} USD</p>
            <p>Service Charge: {formatMoney(order.totalServiceChargeMoney)} USD</p> */}
           <p>Payment Provider: Square</p>

            <p>Transaction ID: {order?.tenders?.[0]?.id}</p>

            <p>Provider Order ID: {order?.tenders?.[0]?.transactionId}</p>

            <p>Payment Source Type: {order?.tenders?.[0]?.type}</p>

            <p>
              Card:{" "}
              {order?.tenders?.[0]?.cardDetails?.card?.cardBrand} 
              </p>
            <p>
              Last4: 
              {order?.tenders?.[0]?.cardDetails?.card?.last4}
            </p>

            <p>
              Card Type: {order?.tenders?.[0]?.cardDetails?.card?.cardType}
            </p>

        </div>
      ))}
    </div>
  );
}
