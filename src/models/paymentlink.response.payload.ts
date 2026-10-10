export default interface GeneratePaymentLinkResponse {
  status: string;
  message: string;
  data: {
    link: string;
  };
}
