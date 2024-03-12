import swal from "sweetalert2";

// const TotalPremium = 500000;
// const FirstName = "prashanth";
// const Email = "prash@gmail.com";
const ReyzorPay = () => {
  const options = {
    key: "rzp_test_KK09FiPyLY2aKI",
    amount: 200,
    // Math.round(genericPolicyDto.TotalPremium * 100),
    name: "abhi",
    // genericPolicyDto.FirstName,
    description: "Policy Payment",
    email: "abhishek@inubesolutions.com",
    // genericPolicyDto.Email,
    handler: async (response) => {
      console.log("response", response);
      if (typeof response.razorpay_payment_id !== "undefined" || response.razorpay_payment_id > 1) {
        console.log("response check", response.razorpay_payment_id);
        // handleSetPolicy();
        // flags.success = true;
        // flags.fail = false;
        // setFlags((prev) => ({ ...prev, success: true, fail: false }));
      } else {
        // flags.success = false;
        // flags.fail = true;
        // setFlags({ ...flags });
        // setFlags((prev) => ({ ...prev, success: false, fail: true }));
        swal.fire({
          icon: "error",
          text: "Payment Failed",
          html: true,
        });
      }
    },

    prefill: {
      name: "abhi",
      // genericPolicyDto.FirstName,
      email: "abhishek@inubesolutions.com",
      // genericPolicyDto.Email,
      contact: "9916408742",
    },
    notes: {
      address: "Bangalore",
    },
    theme: {
      color: "blue",
    },
  };

  const rzp = new window.Razorpay(options);
  rzp.open();
  console.log("rzp", rzp);
};

export default ReyzorPay;
