import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// Mock data for crypto exchange
const generateMockOrderBook = () => {
  const asks = [];
  const bids = [];
  let basePrice = 67500;

  for (let i = 0; i < 10; i++) {
    asks.push({
      price: basePrice + (i + 1) * 50,
      amount: (Math.random() * 5 + 0.1).toFixed(4),
      total: 0,
    });
    bids.push({
      price: basePrice - (i + 1) * 50,
      amount: (Math.random() * 5 + 0.1).toFixed(4),
      total: 0,
    });
  }

  return { asks: asks.reverse(), bids };
};

const generateMockTrades = () => {
  const trades = [];
  const basePrice = 67500;

  for (let i = 0; i < 20; i++) {
    trades.push({
      id: i,
      price: (basePrice + (Math.random() - 0.5) * 1000).toFixed(2),
      amount: (Math.random() * 2 + 0.01).toFixed(4),
      time: new Date(Date.now() - i * 60000).toLocaleTimeString(),
      side: Math.random() > 0.5 ? "buy" : "sell",
    });
  }

  return trades;
};

const TradingInterface = () => {
  const [currentPrice, setCurrentPrice] = useState(67485.5);
  const [priceChange, setPriceChange] = useState(2.34);
  const [orderBook, setOrderBook] = useState(generateMockOrderBook());
  const [recentTrades, setRecentTrades] = useState(generateMockTrades());
  const [orderType, setOrderType] = useState("buy");
  const [orderAmount, setOrderAmount] = useState("");
  const [orderPrice, setOrderPrice] = useState("");

  // Simulate real-time price updates
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPrice((prev) => {
        const change = (Math.random() - 0.5) * 100;
        const newPrice = prev + change;
        setPriceChange(change);
        return Math.max(newPrice, 1000);
      });

      // Update order book occasionally
      if (Math.random() > 0.8) {
        setOrderBook(generateMockOrderBook());
      }
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("ru-RU", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(price);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white p-4">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-bold">🚀 CryptoExchange</h1>
            <div className="flex items-center space-x-2">
              <span className="text-3xl font-mono">
                {formatPrice(currentPrice)}
              </span>
              <span className="text-xl text-gray-400">USDT</span>
              <span
                className={`px-2 py-1 rounded text-sm ${priceChange >= 0 ? "bg-green-900 text-green-400" : "bg-red-900 text-red-400"}`}
              >
                {priceChange >= 0 ? "+" : ""}
                {priceChange.toFixed(2)}%
              </span>
            </div>
          </div>
          <div className="text-right">
            <div className="text-sm text-gray-400">24h Volume</div>
            <div className="text-lg font-mono">1,234.56 BTC</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        {/* Order Book */}
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader className="pb-3">
            <CardTitle className="text-white text-lg">Стакан заявок</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="px-4 pb-2">
              <div className="grid grid-cols-3 text-xs text-gray-400 mb-2">
                <div>Цена (USDT)</div>
                <div className="text-right">Объем (BTC)</div>
                <div className="text-right">Сумма</div>
              </div>
            </div>

            {/* Asks (продажи) */}
            <div className="max-h-40 overflow-hidden">
              {orderBook.asks.map((ask, i) => (
                <div
                  key={i}
                  className="grid grid-cols-3 px-4 py-1 text-xs hover:bg-slate-700"
                >
                  <div className="text-red-400 font-mono">
                    {formatPrice(ask.price)}
                  </div>
                  <div className="text-right font-mono">{ask.amount}</div>
                  <div className="text-right font-mono">
                    {(ask.price * parseFloat(ask.amount)).toFixed(0)}
                  </div>
                </div>
              ))}
            </div>

            <div className="px-4 py-3 bg-slate-700">
              <div className="text-center font-mono text-lg">
                <span
                  className={
                    priceChange >= 0 ? "text-green-400" : "text-red-400"
                  }
                >
                  {formatPrice(currentPrice)}
                </span>
              </div>
            </div>

            {/* Bids (покупки) */}
            <div className="max-h-40 overflow-hidden">
              {orderBook.bids.map((bid, i) => (
                <div
                  key={i}
                  className="grid grid-cols-3 px-4 py-1 text-xs hover:bg-slate-700"
                >
                  <div className="text-green-400 font-mono">
                    {formatPrice(bid.price)}
                  </div>
                  <div className="text-right font-mono">{bid.amount}</div>
                  <div className="text-right font-mono">
                    {(bid.price * parseFloat(bid.amount)).toFixed(0)}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Price Chart Placeholder */}
        <Card className="lg:col-span-2 bg-slate-800 border-slate-700">
          <CardHeader className="pb-3">
            <CardTitle className="text-white text-lg">
              График BTC/USDT
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80 bg-slate-900 rounded flex items-center justify-center border border-slate-600">
              <div className="text-center">
                <div className="text-4xl mb-4">📈</div>
                <div className="text-gray-400">Свечной график</div>
                <div className="text-sm text-gray-500 mt-2">
                  Интеграция с TradingView в следующей итерации
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Trading Form */}
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader className="pb-3">
            <CardTitle className="text-white text-lg">Торговля</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex space-x-2">
              <Button
                variant={orderType === "buy" ? "default" : "outline"}
                className={`flex-1 ${orderType === "buy" ? "bg-green-600 hover:bg-green-700" : ""}`}
                onClick={() => setOrderType("buy")}
              >
                Купить
              </Button>
              <Button
                variant={orderType === "sell" ? "default" : "outline"}
                className={`flex-1 ${orderType === "sell" ? "bg-red-600 hover:bg-red-700" : ""}`}
                onClick={() => setOrderType("sell")}
              >
                Продать
              </Button>
            </div>

            <div className="space-y-3">
              <div>
                <label className="text-sm text-gray-400">Цена (USDT)</label>
                <Input
                  value={orderPrice}
                  onChange={(e) => setOrderPrice(e.target.value)}
                  placeholder={currentPrice.toString()}
                  className="bg-slate-700 border-slate-600 text-white"
                />
              </div>

              <div>
                <label className="text-sm text-gray-400">
                  Количество (BTC)
                </label>
                <Input
                  value={orderAmount}
                  onChange={(e) => setOrderAmount(e.target.value)}
                  placeholder="0.00000000"
                  className="bg-slate-700 border-slate-600 text-white"
                />
              </div>

              <div className="grid grid-cols-4 gap-1 text-xs">
                {["25%", "50%", "75%", "100%"].map((percent) => (
                  <Button
                    key={percent}
                    variant="outline"
                    size="sm"
                    className="border-slate-600 text-gray-400"
                  >
                    {percent}
                  </Button>
                ))}
              </div>

              <Button
                className={`w-full ${orderType === "buy" ? "bg-green-600 hover:bg-green-700" : "bg-red-600 hover:bg-red-700"}`}
              >
                {orderType === "buy" ? "Купить BTC" : "Продать BTC"}
              </Button>
            </div>

            <div className="pt-4 border-t border-slate-700">
              <div className="text-sm text-gray-400 mb-2">Баланс</div>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span>BTC:</span>
                  <span className="font-mono">0.12345678</span>
                </div>
                <div className="flex justify-between">
                  <span>USDT:</span>
                  <span className="font-mono">5,247.83</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recent Trades */}
        <Card className="lg:col-span-4 bg-slate-800 border-slate-700">
          <CardHeader className="pb-3">
            <CardTitle className="text-white text-lg">
              Последние сделки
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow className="border-slate-700">
                  <TableHead className="text-gray-400">Время</TableHead>
                  <TableHead className="text-gray-400">Цена (USDT)</TableHead>
                  <TableHead className="text-gray-400">
                    Количество (BTC)
                  </TableHead>
                  <TableHead className="text-gray-400">Сумма (USDT)</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentTrades.slice(0, 10).map((trade) => (
                  <TableRow
                    key={trade.id}
                    className="border-slate-700 hover:bg-slate-700"
                  >
                    <TableCell className="text-gray-400 font-mono text-sm">
                      {trade.time}
                    </TableCell>
                    <TableCell
                      className={`font-mono ${trade.side === "buy" ? "text-green-400" : "text-red-400"}`}
                    >
                      {formatPrice(parseFloat(trade.price))}
                    </TableCell>
                    <TableCell className="font-mono text-sm">
                      {trade.amount}
                    </TableCell>
                    <TableCell className="font-mono text-sm">
                      {formatPrice(
                        parseFloat(trade.price) * parseFloat(trade.amount),
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TradingInterface;
