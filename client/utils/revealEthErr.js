const revealEthErr = (error, length = 220) => {
  return error.toString().split("").splice(0, length).join("");
};

export default revealEthErr;
