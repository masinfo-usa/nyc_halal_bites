import sgMail from '@sendgrid/mail';

export async function sendConfirmationEmail(order) {


  const formatDatePretty = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      weekday: "short", // Mon
      month: "short",   // Dec
      day: "2-digit",   // 01
    });
  };



  const subtotal = Number(order.subtotal || 0);
  const taxes = Number(order.taxes || 0);
  const deliveryFee = Number(order.deliveryInfo?.deliveryFee || 0);
  const onlineOrderingPlatformFee = Number(order.onlineOrderingPlatformFee || 0);
  const tip = Number(order.tip || 0);
  const total = Number(order.total || 0);



  const pickupTime = formatDatePretty(order.pickupInfo?.date) + ', ' + order.pickupInfo?.time;
  const deliveryTime = formatDatePretty(order.deliveryInfo?.date) + ', ' + order.deliveryInfo?.time;
  
  const DRIVER_DASHBOARD_URL = "https://mezquite-valley.com/staff/driver";




  const customerMsg = {
    to: order.customerEmail,
    from: {
      email: 'updates@mezquite-valley.com',
      name: 'Mezquite Valley Updates',
    },
    subject: 'Order Placed – Mezquite Valley',
    html: `

      <!-- HEADER -->
      <div style="text-align:center; margin-bottom:16px;">
        <a href="https://www.mezquite-valley.com" target="_blank" style="text-decoration:none;">
          <img
            src="https://raw.githubusercontent.com/masinfo-usa/mezquite_valley/main/frontend/src/images/MezquiteLogo.png"
            alt="Mezquite Valley Street Tacos and More"
            style="max-width:80px; height:auto; margin-bottom:8px;"
          />
        </a>
      </div>



      <!-- DIVIDER -->
      <hr style="border:none; border-top:1px solid #ddd; margin:16px 0;" />



      <div style="font-family: Arial, sans-serif; max-width:600px; margin:auto;">

      <p style="font-size:18px; color:#000; margin-bottom:8px; line-height:1.4;">
        Thanks for your order, <strong>${order.customerName}</strong>
      </p>



      <p style="margin: 0 0 10px 0;">
        ${
          order.fulfillmentType === "pickup"
            ? `<strong>Pickup Time:</strong> ${pickupTime}`
            : `<strong>Delivery Time:</strong> ${deliveryTime}`
        }
        
        <span style="color:#666; font-size: 13px;">(approx.)</span>
      </p>

      <p style="margin: 0;">
        ${
          order.fulfillmentType === "pickup"
            ? `
              <strong>Pickup From:</strong><br />
              ${order.pickupInfo?.restaurant}<br />
              <span style="color:#666; font-size: 13px;">
                ${order.pickupInfo?.address}
              </span>
            `
            : `
              <strong>Delivery To:</strong><br />
              ${order.deliveryInfo?.address?.full}<br />
              ${
                order.deliveryInfo?.unit
                  ? `<span style="color:#666; font-size: 13px;">${order.deliveryInfo.unit}</span><br />`
                  : ""
              }
              ${
                order.deliveryInfo?.dropoffOption
                  ? `<span style="color:#666; font-size: 13px;">${order.deliveryInfo.dropoffOption}</span><br />`
                  : "Leave at door. "
              }
              ${
                order.deliveryInfo?.deliveryInstruction
                  ? `<span style="color:#666; font-size: 13px;">${order.deliveryInfo.deliveryInstruction}</span>`
                  : ""
              }
            `
        }
      </p>


        ${ order.fulfillmentType === "delivery" ? `<hr/>
        <a
          href="https://mezquite-valley.com/customerstatus/${order.id}"
          style="
            display:inline-block;
            padding:12px 18px;
            background-color:#108910;
            color:#fff;
            text-decoration:none;
            border-radius:6px;
            font-weight:bold;
          "
        >
          Check Order Status
        </a>` : '' }


      


        <hr/>

        <p>
          Need help with your order?<br/>
          Call <strong>${order.phone}</strong>
        </p>

        <hr/>

        <h3>Items (${order.items.length})</h3>
        ${
          order.items.length === 0
            ? '<p>No items listed</p>'
            : order.items
                .map(
                  (item) => `
                    <p>
                      ${item.quantity} × ${item.name}
                      <span style="float:right">$${((item.price * item.quantity)/100).toFixed(2)}</span>
                    </p>
                  `
                )
                .join('')
        }



        ${ order.fulfillmentType === "delivery" ? `<p>
          1 × ${order.deliveryInfo?.freeItemWithDelivery}
          <span style="float:right">$0.00</span>
        </p>` : '' }

        <hr/>

        <table width="100%">
          <tr><td>Subtotal:</td><td align="right">$${subtotal.toFixed(2)}</td></tr>
          
          ${ order.fulfillmentType === "delivery" ? `<tr><td>Taxes & Fees:</td><td align="right">$${(taxes + onlineOrderingPlatformFee).toFixed(2)}</td></tr>` : `<tr><td>Taxes:</td><td align="right">$${taxes.toFixed(2)}</td></tr>` }
          ${ order.fulfillmentType === "delivery" ? `<tr><td>Delivery Charge:</td><td align="right">$${deliveryFee.toFixed(2)}</td></tr>` : '' }
          <tr><td>Tip:</td><td align="right">$${tip.toFixed(2)}</td></tr>
          <tr>
            <td><strong>Order Total:</strong></td>
            <td align="right"><strong>$${total.toFixed(2)}</strong></td>
          </tr>
        </table>

      <!-- DIVIDER -->
      <hr style="border:none; border-top:1px solid #ddd; margin:16px 0;" />

      <div style="text-align:center; margin-bottom:16px;">
      
        <div style="font-size:18px; font-weight:bold; color:#000; margin-bottom:4px;">
          Mezquite Valley Street Tacos and More
        </div>

        <div style="font-size:14px; color:#555; line-height:1.4;">
          430 Buck Jones Rd<br />
          Raleigh, NC 27606
        </div>

        <div style="font-size:14px; color:#555; margin-top:4px;">
          (919) 480-6649
        </div>
      </div>


      </div>
    `,
  };


  

  await sgMail.send(customerMsg);




  if (order.fulfillmentType === "delivery") {


    const DRIVER_EMAILS = [
        "mezquitevalleygrill@gmail.com",
        // "driver2@mezquite-valley.com"
      ];

    const driverMsg = {
      from: {
        email: "updates@mezquite-valley.com",
        name: "Mezquite Valley Orders",
      },
      subject: `New Delivery Order – ${order.customerName}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width:600px; margin:auto;">
          <h2>New Delivery Order</h2>

          <p>
            <strong>Customer:</strong> ${order.customerName}<br />
            <strong>Phone:</strong> ${order.phone}
          </p>

          <p>
            <strong>Delivery Time:</strong><br />
            ${deliveryTime} <span style="color:#666">(approx.)</span>
          </p>

          <p>
            <strong>Deliver To:</strong><br />
            ${order.deliveryInfo?.address?.full}<br />
            ${order.deliveryInfo?.unit || ""}<br />
            <span style="color:#666;">
              ${order.deliveryInfo?.dropoffOption || "Leave at door. "}
            </span><br />
            <span style="color:#666;">
              ${order.deliveryInfo?.deliveryInstruction || ""}
            </span>
          </p>

          <hr />

          <h3>Items (${order.items.length})</h3>
          ${
            order.items
              .map(
                (item) => `
                  <p>
                    ${item.quantity} × ${item.name}
                  </p>
                `
              )
              .join("")
          }

          <hr />

          <p style="text-align:center;">
            <a
              href="${DRIVER_DASHBOARD_URL}"
              style="
                display:inline-block;
                padding:12px 18px;
                background-color:#000;
                color:#fff;
                text-decoration:none;
                border-radius:6px;
                font-weight:bold;
              "
            >
              Show Pending Deliveries
            </a>
          </p>

          <p style="font-size:12px; color:#777; text-align:center;">
            Mezquite Valley – Driver Notification
          </p>
        </div>
      `,
    };





    await sgMail.send({
      ...driverMsg,
      to: DRIVER_EMAILS, // multiple recipients
    });


  }
}
