import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  CreditCard,
  Smartphone,
  Wallet,
  Shield,
  CheckCircle,
  IndianRupee,
  Lock,
  Zap,
} from "lucide-react";
import { motion } from "framer-motion";

interface PaymentMethod {
  id: string;
  name: string;
  icon: any;
  type: "card" | "upi" | "wallet" | "banking";
  description: string;
  popular?: boolean;
}

const paymentMethods: PaymentMethod[] = [
  {
    id: "card",
    name: "Credit/Debit Card",
    icon: CreditCard,
    type: "card",
    description: "Visa, MasterCard, RuPay",
    popular: true,
  },
  {
    id: "upi",
    name: "UPI",
    icon: Smartphone,
    type: "upi",
    description: "GPay, PhonePe, Paytm, BHIM",
    popular: true,
  },
  {
    id: "wallet",
    name: "Digital Wallets",
    icon: Wallet,
    type: "wallet",
    description: "Paytm, PhonePe, Amazon Pay",
  },
  {
    id: "netbanking",
    name: "Net Banking",
    icon: Shield,
    type: "banking",
    description: "All major Indian banks",
  },
];

interface PaymentGatewayProps {
  amount: number;
  planName: string;
  onPaymentSuccess?: (paymentId: string) => void;
  onPaymentError?: (error: string) => void;
}

export function PaymentGateway({
  amount,
  planName,
  onPaymentSuccess,
  onPaymentError,
}: PaymentGatewayProps) {
  const [selectedMethod, setSelectedMethod] = useState<string>("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentStep, setPaymentStep] = useState<
    "method" | "details" | "processing" | "success"
  >("method");

  const [cardDetails, setCardDetails] = useState({
    number: "",
    expiry: "",
    cvv: "",
    name: "",
  });

  const [upiId, setUpiId] = useState("");

  const handleMethodSelect = (methodId: string) => {
    setSelectedMethod(methodId);
    setPaymentStep("details");
  };

  const processPayment = async () => {
    setIsProcessing(true);
    setPaymentStep("processing");

    // Simulate payment processing
    try {
      await new Promise((resolve) => setTimeout(resolve, 3000));

      // Simulate success (90% success rate)
      if (Math.random() > 0.1) {
        const paymentId = `pay_${Date.now()}`;
        setPaymentStep("success");
        onPaymentSuccess?.(paymentId);
      } else {
        throw new Error("Payment failed. Please try again.");
      }
    } catch (error) {
      onPaymentError?.(
        error instanceof Error ? error.message : "Payment failed",
      );
      setPaymentStep("method");
    } finally {
      setIsProcessing(false);
    }
  };

  const renderMethodSelection = () => (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold mb-4">Choose Payment Method</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {paymentMethods.map((method) => (
          <motion.div
            key={method.id}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Card
              className={`cursor-pointer transition-all duration-200 hover:shadow-md ${
                selectedMethod === method.id ? "ring-2 ring-primary" : ""
              }`}
              onClick={() => handleMethodSelect(method.id)}
            >
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <method.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <h4 className="font-medium">{method.name}</h4>
                      {method.popular && (
                        <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100 text-xs">
                          Popular
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {method.description}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );

  const renderPaymentDetails = () => {
    const method = paymentMethods.find((m) => m.id === selectedMethod);
    if (!method) return null;

    return (
      <div className="space-y-6">
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setPaymentStep("method")}
          >
            ← Back
          </Button>
          <h3 className="text-lg font-semibold">Payment Details</h3>
        </div>

        {method.type === "card" && (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="cardNumber">Card Number</Label>
              <Input
                id="cardNumber"
                placeholder="1234 5678 9012 3456"
                value={cardDetails.number}
                onChange={(e) =>
                  setCardDetails({ ...cardDetails, number: e.target.value })
                }
                maxLength={19}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="expiry">Expiry Date</Label>
                <Input
                  id="expiry"
                  placeholder="MM/YY"
                  value={cardDetails.expiry}
                  onChange={(e) =>
                    setCardDetails({ ...cardDetails, expiry: e.target.value })
                  }
                  maxLength={5}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cvv">CVV</Label>
                <Input
                  id="cvv"
                  placeholder="123"
                  type="password"
                  value={cardDetails.cvv}
                  onChange={(e) =>
                    setCardDetails({ ...cardDetails, cvv: e.target.value })
                  }
                  maxLength={4}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="cardName">Cardholder Name</Label>
              <Input
                id="cardName"
                placeholder="John Doe"
                value={cardDetails.name}
                onChange={(e) =>
                  setCardDetails({ ...cardDetails, name: e.target.value })
                }
              />
            </div>
          </div>
        )}

        {method.type === "upi" && (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="upiId">UPI ID</Label>
              <Input
                id="upiId"
                placeholder="yourname@paytm"
                value={upiId}
                onChange={(e) => setUpiId(e.target.value)}
              />
            </div>
            <div className="p-4 bg-muted/30 rounded-lg">
              <p className="text-sm text-muted-foreground">
                You'll be redirected to your UPI app to complete the payment
              </p>
            </div>
          </div>
        )}

        {method.type === "wallet" && (
          <div className="space-y-4">
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select Wallet" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="paytm">Paytm Wallet</SelectItem>
                <SelectItem value="phonepe">PhonePe Wallet</SelectItem>
                <SelectItem value="amazon">Amazon Pay</SelectItem>
              </SelectContent>
            </Select>
          </div>
        )}

        {method.type === "banking" && (
          <div className="space-y-4">
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select Bank" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="sbi">State Bank of India</SelectItem>
                <SelectItem value="hdfc">HDFC Bank</SelectItem>
                <SelectItem value="icici">ICICI Bank</SelectItem>
                <SelectItem value="axis">Axis Bank</SelectItem>
                <SelectItem value="kotak">Kotak Mahindra Bank</SelectItem>
              </SelectContent>
            </Select>
          </div>
        )}

        <Button
          onClick={processPayment}
          disabled={isProcessing}
          className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:opacity-90"
          size="lg"
        >
          <Lock className="w-4 h-4 mr-2" />
          Pay ₹{amount.toLocaleString()}
        </Button>
      </div>
    );
  };

  const renderProcessing = () => (
    <div className="text-center space-y-6 py-8">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        className="w-16 h-16 mx-auto"
      >
        <Zap className="w-16 h-16 text-primary" />
      </motion.div>
      <div>
        <h3 className="text-lg font-semibold mb-2">Processing Payment...</h3>
        <p className="text-muted-foreground">Please don't close this window</p>
      </div>
    </div>
  );

  const renderSuccess = () => (
    <div className="text-center space-y-6 py-8">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5, type: "spring" }}
      >
        <CheckCircle className="w-16 h-16 text-green-500 mx-auto" />
      </motion.div>
      <div>
        <h3 className="text-lg font-semibold text-green-600 mb-2">
          Payment Successful!
        </h3>
        <p className="text-muted-foreground">Welcome to {planName}</p>
      </div>
    </div>
  );

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <IndianRupee className="w-5 h-5" />
          <span>Secure Payment</span>
        </CardTitle>
        <CardDescription>
          {planName} - ₹{amount.toLocaleString()}
        </CardDescription>
      </CardHeader>

      <CardContent>
        {paymentStep === "method" && renderMethodSelection()}
        {paymentStep === "details" && renderPaymentDetails()}
        {paymentStep === "processing" && renderProcessing()}
        {paymentStep === "success" && renderSuccess()}

        {paymentStep !== "success" && (
          <div className="mt-6 flex items-center justify-center space-x-2 text-xs text-muted-foreground">
            <Shield className="w-4 h-4" />
            <span>Secured by 256-bit SSL encryption</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
