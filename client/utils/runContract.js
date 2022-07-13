const options = {
  contractAddress: "0xe...56",
  abi: ABI,
};

const symbol = await Moralis.executeFunction({
  functionName: "symbol",
  ...options,
});
const decimals = await Moralis.executeFunction({
  functionName: "decimals",
  ...options,
});
const name = await Moralis.executeFunction({
  functionName: "name",
  ...options,
});
