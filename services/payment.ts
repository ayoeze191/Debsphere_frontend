import AxiosInstance from "../axios";

const PaymentApi = {
  initiatePayment: async (payload: {
    slug: string;
    email: string;
    phone: string;
    fullName: string;
  }) => {
    return await AxiosInstance.post("/payments/initialize", {
      slug: payload.slug,
      email: payload.email,
      phoneNumber: payload.phone,
      fullName: payload.fullName,
    });
  },
  checkPaymentStatus: async (reference: string) => {
    return await AxiosInstance.get(`/payments/status/${reference}`);
  },
  verifyPayment: async (reference: string) => {
    return await AxiosInstance.post(`/payments/verify`, { reference });
  },
};

export default PaymentApi;
