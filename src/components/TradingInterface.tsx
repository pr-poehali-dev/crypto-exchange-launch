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
    return new Intl.NumberFormat("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(price);
  };

  return (
    <div className="min-h-screen bg-bybit-primary text-bybit-text">
      {/* Header */}
      <div className="bg-bybit-secondary border-b border-bybit-border px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-3">
              <span className="text-2xl font-bold text-bybit-accent">
                Bybit
              </span>
              <span className="text-lg text-bybit-textSec">|</span>
              <span className="text-lg font-medium">BTC/USDT</span>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-2xl font-mono font-semibold">
                {formatPrice(currentPrice)}
              </div>
              <div
                className={`px-2 py-1 rounded text-sm font-medium ${
                  priceChange >= 0
                    ? "bg-bybit-green/20 text-bybit-green"
                    : "bg-bybit-red/20 text-bybit-red"
                }`}
              >
                {priceChange >= 0 ? "+" : ""}
                {priceChange.toFixed(2)}%
              </div>
            </div>
          </div>
          <div className="flex space-x-6 text-sm">
            <div>
              <div className="text-bybit-textSec">24h Change</div>
              <div className="font-mono text-bybit-green">+1,234.56</div>
            </div>
            <div>
              <div className="text-bybit-textSec">24h High</div>
              <div className="font-mono">68,542.10</div>
            </div>
            <div>
              <div className="text-bybit-textSec">24h Low</div>
              <div className="font-mono">66,123.45</div>
            </div>
            <div>
              <div className="text-bybit-textSec">24h Volume(BTC)</div>
              <div className="font-mono">12,456.78</div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex h-[calc(100vh-80px)]">
        {/* Left Sidebar - Order Book */}
        <div className="w-80 bg-bybit-secondary border-r border-bybit-border flex flex-col">
          <div className="p-4 border-b border-bybit-border">
            <h3 className="text-base font-medium">Order Book</h3>
          </div>

          <div className="flex-1 overflow-hidden">
            <div className="px-4 py-2 border-b border-bybit-border">
              <div className="grid grid-cols-3 text-xs text-bybit-textSec">
                <div>Price(USDT)</div>
                <div className="text-right">Amount(BTC)</div>
                <div className="text-right">Total</div>
              </div>
            </div>

            {/* Asks */}
            <div className="flex-1 max-h-48 overflow-y-auto">
              {orderBook.asks.map((ask, i) => (
                <div
                  key={i}
                  className="grid grid-cols-3 px-4 py-1 text-xs hover:bg-bybit-card/50"
                >
                  <div className="text-bybit-red font-mono">
                    {formatPrice(ask.price)}
                  </div>
                  <div className="text-right font-mono">{ask.amount}</div>
                  <div className="text-right font-mono text-bybit-textSec">
                    {(ask.price * parseFloat(ask.amount)).toFixed(0)}
                  </div>
                </div>
              ))}
            </div>

            {/* Current Price */}
            <div className="px-4 py-3 bg-bybit-card border-y border-bybit-border">
              <div className="text-center">
                <div
                  className={`text-lg font-mono font-semibold ${
                    priceChange >= 0 ? "text-bybit-green" : "text-bybit-red"
                  }`}
                >
                  {formatPrice(currentPrice)}
                </div>
                <div className="text-xs text-bybit-textSec">≈ $67,485.50</div>
              </div>
            </div>

            {/* Bids */}
            <div className="flex-1 max-h-48 overflow-y-auto">
              {orderBook.bids.map((bid, i) => (
                <div
                  key={i}
                  className="grid grid-cols-3 px-4 py-1 text-xs hover:bg-bybit-card/50"
                >
                  <div className="text-bybit-green font-mono">
                    {formatPrice(bid.price)}
                  </div>
                  <div className="text-right font-mono">{bid.amount}</div>
                  <div className="text-right font-mono text-bybit-textSec">
                    {(bid.price * parseFloat(bid.amount)).toFixed(0)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          {/* Chart Area */}
          <div className="flex-1 bg-bybit-secondary m-4 rounded border border-bybit-border">
            <div className="p-4 border-b border-bybit-border">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-medium">TradingView Chart</h3>
                <div className="flex space-x-2 text-sm">
                  {["1m", "5m", "15m", "1h", "4h", "1d"].map((timeframe) => (
                    <button
                      key={timeframe}
                      className="px-2 py-1 rounded text-bybit-textSec hover:text-bybit-text hover:bg-bybit-card"
                    >
                      {timeframe}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <div className="h-96 flex items-center justify-center">
              <div className="text-center">
                <div className="text-4xl mb-4">📈</div>
                <div className="text-bybit-textSec">
                  TradingView Integration
                </div>
                <div className="text-sm text-bybit-textSec mt-2">
                  Chart will be integrated in next iteration
                </div>
              </div>
            </div>
          </div>

          {/* Recent Trades */}
          <div className="h-80 bg-bybit-secondary m-4 mt-0 rounded border border-bybit-border">
            <div className="p-4 border-b border-bybit-border">
              <h3 className="text-base font-medium">Recent Trades</h3>
            </div>
            <div className="h-64 overflow-y-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-bybit-border hover:bg-transparent">
                    <TableHead className="text-bybit-textSec text-xs h-8">
                      Time
                    </TableHead>
                    <TableHead className="text-bybit-textSec text-xs h-8">
                      Price(USDT)
                    </TableHead>
                    <TableHead className="text-bybit-textSec text-xs h-8">
                      Amount(BTC)
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentTrades.slice(0, 12).map((trade) => (
                    <TableRow
                      key={trade.id}
                      className="border-bybit-border hover:bg-bybit-card/30 h-6"
                    >
                      <TableCell className="text-bybit-textSec font-mono text-xs py-1">
                        {trade.time}
                      </TableCell>
                      <TableCell
                        className={`font-mono text-xs py-1 ${
                          trade.side === "buy"
                            ? "text-bybit-green"
                            : "text-bybit-red"
                        }`}
                      >
                        {formatPrice(parseFloat(trade.price))}
                      </TableCell>
                      <TableCell className="font-mono text-xs py-1">
                        {trade.amount}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </div>

        {/* Right Sidebar - Trading Panel */}
        <div className="w-80 bg-bybit-secondary border-l border-bybit-border">
          <div className="p-4">
            <div className="flex space-x-1 mb-4">
              <Button
                variant={orderType === "buy" ? "default" : "ghost"}
                className={`flex-1 text-sm h-8 ${
                  orderType === "buy"
                    ? "bg-bybit-green hover:bg-bybit-green/90 text-white"
                    : "text-bybit-textSec hover:text-bybit-text hover:bg-bybit-card"
                }`}
                onClick={() => setOrderType("buy")}
              >
                Buy
              </Button>
              <Button
                variant={orderType === "sell" ? "default" : "ghost"}
                className={`flex-1 text-sm h-8 ${
                  orderType === "sell"
                    ? "bg-bybit-red hover:bg-bybit-red/90 text-white"
                    : "text-bybit-textSec hover:text-bybit-text hover:bg-bybit-card"
                }`}
                onClick={() => setOrderType("sell")}
              >
                Sell
              </Button>
            </div>

            <div className="space-y-3 mb-4">
              <div>
                <label className="text-xs text-bybit-textSec mb-1 block">
                  Price
                </label>
                <Input
                  value={orderPrice}
                  onChange={(e) => setOrderPrice(e.target.value)}
                  placeholder={currentPrice.toString()}
                  className="bg-bybit-card border-bybit-border text-bybit-text h-8 text-sm"
                />
              </div>

              <div>
                <label className="text-xs text-bybit-textSec mb-1 block">
                  Quantity
                </label>
                <Input
                  value={orderAmount}
                  onChange={(e) => setOrderAmount(e.target.value)}
                  placeholder="0.00000000"
                  className="bg-bybit-card border-bybit-border text-bybit-text h-8 text-sm"
                />
              </div>

              <div className="grid grid-cols-4 gap-1">
                {["25%", "50%", "75%", "Max"].map((percent) => (
                  <Button
                    key={percent}
                    variant="outline"
                    size="sm"
                    className="border-bybit-border text-bybit-textSec hover:text-bybit-text hover:bg-bybit-card h-6 text-xs"
                  >
                    {percent}
                  </Button>
                ))}
              </div>

              <Button
                className={`w-full h-8 text-sm font-medium ${
                  orderType === "buy"
                    ? "bg-bybit-green hover:bg-bybit-green/90"
                    : "bg-bybit-red hover:bg-bybit-red/90"
                } text-white`}
              >
                {orderType === "buy" ? "Buy BTC" : "Sell BTC"}
              </Button>
            </div>

            <div className="border-t border-bybit-border pt-4">
              <div className="text-xs text-bybit-textSec mb-2">
                Available Balance
              </div>
              <div className="space-y-1 text-xs">
                <div className="flex justify-between">
                  <span className="text-bybit-textSec">BTC:</span>
                  <span className="font-mono">0.12345678</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-bybit-textSec">USDT:</span>
                  <span className="font-mono">5,247.83</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TradingInterface;
