const formatBigNumber = (value) => {
  const r = value.map((i) => {
    return i.toString();
  });

  return r;
};

//format the big number to string
export const formatVaultData = (value) => {
  //value is an array
  let r = formatBigNumber(value);
  return {
    owner: r[0],
    wei_balance: r[1],
    last_ping: r[2],
    id: r[3],
    backup: r[4],
    inheritors: r[5].split(","),
    tokensDeposited: r[6],
  };
};
