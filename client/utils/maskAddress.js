export const maskAddress = (address) => {
  const masked = `${address?.slice(0, 5)}...${address?.slice(
    39,
    address?.length
  )}`;
  return masked;
};
