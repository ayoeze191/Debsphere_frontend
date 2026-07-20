import AxiosInstance from "../axios";

const PaymentApi = {
  initiatePayment: async (payload: {
    slug: string;
    email: string;
    phone: string;
    fullName: string;
  }) => {
    return await AxiosInstance.post("/payment/initialize", {
      courseId: payload.slug,
      email: payload.email,
      phoneNumber: payload.phone,
      fullName: payload.fullName,
    });
  },
};

export default PaymentApi;
