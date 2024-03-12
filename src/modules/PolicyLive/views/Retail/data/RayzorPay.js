// import { useEffect } from "react";
import swal from "sweetalert";

function RayzorPay({ key, amount, PayeeName, PayeeEmail, PayeeContact, PayeeAddress, onPayment }) {
  const obj = {
    key: key.toString(), // "rzp_test_KK09FiPyLY2aKI",
    amount: Math.round(amount * 100),
    name: PayeeName,
    description: "Policy Payment",
    email: PayeeEmail,
    handler: async (response) => {
      if (typeof response.razorpay_payment_id !== "undefined" || response.razorpay_payment_id > 1) {
        swal({
          icon: "success",
          text: "Payment Success",
        });
        onPayment({
          key,
          amount,
          PayeeName,
          PayeeEmail,
          PayeeContact,
          PayeeAddress,
          status: "success",
          paymentId: response.razorpay_payment_id,
        });
      } else {
        swal({
          icon: "error",
          text: "Payment Failed",
        });
      }
    },
    prefill: {
      name: PayeeName,
      email: PayeeEmail,
      contact: PayeeContact,
    },
    notes: {
      address: PayeeAddress,
    },
    theme: {
      color: "blue",
    },
  };
  const res1 = window.Razorpay(obj);
  console.log("res1", res1);
  res1.open();
  // .then((res2, res3) => {
  //   console.log("res2", res2, res3);
  // });

  //   return null;
}

export default RayzorPay;
