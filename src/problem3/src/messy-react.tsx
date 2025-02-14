import { useMemo, useCallback } from "react";
import { usePrices, useWalletBalances } from "./hooks";

interface WalletBalance {
  currency: string;
  amount: number;
  blockchain: string;
}
interface FormattedWalletBalance extends WalletBalance {
  formatted: string;
}

interface Prices {
  [currency: string]: number;
}

export const WalletPage = () => {
  const balances: WalletBalance[] = useWalletBalances();
  const prices: Prices = usePrices();

  const getPriority = useCallback((blockchain: string): number => {
    switch (blockchain) {
      case "Osmosis":
        return 100;
      case "Ethereum":
        return 50;
      case "Arbitrum":
        return 30;
      case "Zilliqa":
        return 20;
      case "Neo":
        return 20;
      default:
        return -99;
    }
  }, []);

  const sortedBalances = useMemo(() => {
    return balances
      .filter(
        (balance: WalletBalance) =>
          getPriority(balance.blockchain) > -99 && balance.amount > 0
      )
      .sort(
        (lhs: WalletBalance, rhs: WalletBalance) =>
          getPriority(rhs.blockchain) - getPriority(lhs.blockchain)
      );
  }, [balances]);

  const formattedBalances: FormattedWalletBalance[] = useMemo(() => {
    return sortedBalances.map((balance: WalletBalance) => ({
      ...balance,
      formatted: balance.amount.toFixed(2), // Format số có 2 chữ số thập phân
    }));
  }, [sortedBalances]);

  // Render danh sách
  const rows = formattedBalances.map((balance, index) => {
    const usdValue = (prices[balance.currency] ?? 0) * balance.amount;
    return (
      <WalletRow
        key={index}
        amount={balance.amount}
        usdValue={usdValue}
        formattedAmount={balance.formatted}
      />
    );
  });

  return <div>{rows}</div>;
};

/** 
  Đoạn code cũ đang gặp những problem như là :
  + Lỗi sử dụng biến sai trong useMemo -> Sửa lỗi biến lhsPriority chưa khai báo
  + getPriority nên được tối ưu bằng useCallback để tránh việc render lại không cần thiết -> Tối ưu getPriority bằng useCallback để tránh tạo lại hàm không cần thiết
  + Lọc (filter) không hợp lý trước khi sắp xếp (sort) -> Cải thiện bộ lọc filter để chỉ giữ lại số dư hợp lệ
  + Gán kiểu không chính xác cho sortedBalances -> Dùng useMemo cho formattedBalances để tránh tính toán lại mỗi lần render
  + Cách tính usdValue chưa xử lý trường hợp prices[balance.currency] là undefined -> Thay đổi prices[balance.currency] ?? 0 để tránh lỗi NaN khi giá không tồn tại
 * */
