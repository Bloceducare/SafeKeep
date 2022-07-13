export const currrentChainId = () => "0x4";
// export const currrentChainId = () => localStorage.safeKeepCurrentChainId;

export const networkConfigs = {
  "0x1": {
    currencySymbol: "ETH",
    blockExplorerUrl: "https://etherscan.io/",
    wrapped: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
  },
  "0x3": {
    currencySymbol: "ETH",
    blockExplorerUrl: "https://ropsten.etherscan.io/",
  },
  4: {
    chainId: "0x4",
    currencySymbol: "ETH",
    currencyName: "Ethereum",
    blockExplorerUrl: "https://rinkeby.etherscan.io/",
    rpcUrl: "https://rinkeby.infura.io/v3/ba80361523fe423bb149026a490266f0",
    contractAddress: "0x1e63ba99ab74D0796dd897CBc58A0e741a8a1acc",
    graphqlEndpoint: "https://api.thegraph.com/subgraphs/name/okeken/sfk6",
    simpleBackendEndpoint: "https://crypto-safekeep.herokuapp.com/",
    logo: "https://github.com/okeken/safekeep-token-list/blob/main/src/images/0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2.png?raw=true",
    decimals: "18",
  },
  "0x2a": {
    currencySymbol: "ETH",
    blockExplorerUrl: "https://rinkeby.etherscan.io/",
  },
  "0x5": {
    currencySymbol: "ETH",
    blockExplorerUrl: "https://goerli.etherscan.io/",
  },
  "0x539": {
    chainName: "Local Chain",
    currencyName: "ETH",
    currencySymbol: "ETH",
    rpcUrl: "http://127.0.0.1:7545",
  },
  "0xa86a": {
    chainId: 43114,
    chainName: "Avalanche Mainnet",
    currencyName: "AVAX",
    currencySymbol: "AVAX",
    rpcUrl: "https://api.avax.network/ext/bc/C/rpc",
    blockExplorerUrl: "https://cchain.explorer.avax.network/",
  },
  "0x38": {
    chainId: 56,
    chainName: "Smart Chain",
    currencyName: "BNB",
    currencySymbol: "BNB",
    rpcUrl: "https://bsc-dataseed.binance.org/",
    blockExplorerUrl: "https://bscscan.com/",
    wrapped: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c",
    logo: "",
    thumbnail: "",
  },
  "0x61": {
    chainId: 97,
    chainName: "Smart Chain - Testnet",
    currencyName: "BNB",
    currencySymbol: "BNB",
    rpcUrl: "https://data-seed-prebsc-1-s1.binance.org:8545/",
    blockExplorerUrl: "https://testnet.bscscan.com/",
  },
  137: {
    chainId: 137,
    chainName: "Polygon Mainnet",
    currencyName: "MATIC",
    currencySymbol: "MATIC",
    rpcUrl: "https://rpc-mainnet.maticvigil.com/",
    blockExplorerUrl: "https://explorer-mainnet.maticvigil.com/",
    wrapped: "0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
    contractAddress: "0x2902654876B74Da7A304916aF9BC35a8eb1223CB",
    graphqlEndpoint: "https://api.thegraph.com/subgraphs/name/okeken/polygon",
    simpleBackendEndpoint: "https://crypto-safekeep.herokuapp.com/",
    logo: "https://github.com/okeken/safekeep-token-list/blob/main/src/images/0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270.png?raw=true",
    decimals: "18",
  },
  80001: {
    chainId: 80001,
    chainName: "Mumbai",
    currencyName: "MATIC",
    currencySymbol: "MATIC",
    rpcUrl: "https://rpc-mumbai.matic.today/",
    blockExplorerUrl: "https://mumbai.polygonscan.com/",
  },
};

export const getNativeByChain = (chain) =>
  networkConfigs[chain]?.currencySymbol || "NATIVE";

export const getChainById = (chain) => networkConfigs[chain]?.chainId || null;

export const getExplorer = (chain) => networkConfigs[chain]?.blockExplorerUrl;

export const currentNetworkConfig = () => networkConfigs[currrentChainId()];
// networkConfigs[localStorage.safeKeepCurrentChainId];

export const safekeepContractAddress = () =>
  networkConfigs[currrentChainId()]?.contractAddress;

export const graphqlEndpoint = () =>
  networkConfigs[currrentChainId()]?.graphqlEndpoint;
// networkConfigs[localStorage.safeKeepCurrentChainId]?.graphqlEndpoint;

export const simpleBackendEndpoint = () =>
  networkConfigs[currrentChainId()]?.simpleBackendEndpoint;

export const getWrappedNative = (chain) =>
  networkConfigs[chain]?.wrapped || null;

export const supportedChains = ["0x4", "0x89"];
