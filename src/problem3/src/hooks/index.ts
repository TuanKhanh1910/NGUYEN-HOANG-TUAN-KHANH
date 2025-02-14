export const useWalletBalances = () => {
  return [
    { currency: "ETH", amount: 1.5, blockchain: "Ethereum" },
    { currency: "BTC", amount: 0.25, blockchain: "Bitcoin" },
    { currency: "USDT", amount: 500, blockchain: "Ethereum" },
    { currency: "BNB", amount: 3, blockchain: "Binance Smart Chain" },
    { currency: "SOL", amount: 10, blockchain: "Solana" },
    { currency: "ADA", amount: 1000, blockchain: "Cardano" },
    { currency: "MATIC", amount: 200, blockchain: "Polygon" },
    { currency: "DOT", amount: 50, blockchain: "Polkadot" },
    { currency: "AVAX", amount: 5, blockchain: "Avalanche" },
    { currency: "NEO", amount: 20, blockchain: "Neo" },
  ];
};

export const usePrices = () => {
  return {
    ETH: 3200,
    BTC: 45000,
    USDT: 1,
    BNB: 400,
    SOL: 120,
    ADA: 0.5,
    MATIC: 1.2,
    DOT: 7,
    AVAX: 30,
    NEO: 15,
  };
};
