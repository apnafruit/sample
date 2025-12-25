const WHATSAPP_NUMBER = '1234567890'; // Replace with actual WhatsApp number

export const openWhatsApp = (message: string) => {
  const encodedMessage = encodeURIComponent(message);
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
  window.open(url, '_blank');
};

export const orderProduct = (
  productName: string,
  price: number,
  quantity: number = 1,
  size?: string,
  color?: string
) => {
  let message = `Hi! I'd like to order:\n\n• ${productName} x${quantity} - $${(price * quantity).toFixed(2)}`;
  if (size) message += `\nSize: ${size}`;
  if (color) message += `\nColor: ${color}`;
  message += `\n\nPlease confirm availability and shipping details.`;
  
  openWhatsApp(message);
};

export const openGeneralChat = () => {
  openWhatsApp("Hi, I'd like to know more about your products.");
};
