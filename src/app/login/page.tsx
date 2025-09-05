/**
 * Grama Groceries - Login Page
 * Phone number authentication with OTP verification
 */

"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import { Alert, AlertDescription } from '@/components/ui/alert';
import Link from 'next/link';

export default function LoginPage() {
  const [step, setStep] = useState<'phone' | 'otp'>('phone');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [resendTimer, setResendTimer] = useState(0);

  const handleSendOtp = async () => {
    if (!phoneNumber || phoneNumber.length !== 10) {
      setError('Please enter a valid 10-digit phone number');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Success - move to OTP step
      setStep('otp');
      setResendTimer(30); // 30 second countdown
      
      // Start countdown timer
      const timer = setInterval(() => {
        setResendTimer(prev => {
          if (prev <= 1) {
            clearInterval(timer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      
    } catch (err) {
      setError('Failed to send OTP. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    if (!otp || otp.length !== 6) {
      setError('Please enter the complete 6-digit OTP');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // For demo, accept any OTP
      if (otp === '123456' || otp.length === 6) {
        // Success - redirect to dashboard
        window.location.href = '/dashboard';
      } else {
        setError('Invalid OTP. Please try again.');
      }
      
    } catch (err) {
      setError('OTP verification failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOtp = async () => {
    if (resendTimer > 0) return;
    
    setIsLoading(true);
    setError('');

    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setResendTimer(30);
      
      // Restart countdown
      const timer = setInterval(() => {
        setResendTimer(prev => {
          if (prev <= 1) {
            clearInterval(timer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      
    } catch (err) {
      setError('Failed to resend OTP. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-orange-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        {/* Logo and Header */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center text-white text-2xl font-bold">
              🌾
            </div>
            <div className="text-left">
              <h1 className="text-2xl font-bold text-gray-900">Grama Groceries</h1>
              <p className="text-sm text-gray-600">Farm to Family</p>
            </div>
          </Link>
        </div>

        <Card className="border-0 shadow-2xl">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold">
              {step === 'phone' ? 'Welcome Back!' : 'Enter OTP'}
            </CardTitle>
            <CardDescription>
              {step === 'phone' 
                ? 'Enter your phone number to get started'
                : `We've sent a 6-digit code to +91 ${phoneNumber}`
              }
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {step === 'phone' ? (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-4"
              >
                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <div className="flex mt-2">
                    <div className="flex items-center px-3 bg-gray-50 border border-r-0 rounded-l-md">
                      <span className="text-gray-600">+91</span>
                    </div>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="9876543210"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, '').slice(0, 10))}
                      className="rounded-l-none"
                      disabled={isLoading}
                    />
                  </div>
                </div>

                <Button 
                  onClick={handleSendOtp}
                  disabled={isLoading || !phoneNumber || phoneNumber.length !== 10}
                  className="w-full bg-green-500 hover:bg-green-600"
                >
                  {isLoading ? 'Sending OTP...' : 'Send OTP'}
                </Button>

                <div className="text-center text-sm text-gray-600">
                  By continuing, you agree to our{' '}
                  <Link href="/terms" className="text-green-500 hover:underline">
                    Terms of Service
                  </Link>{' '}
                  and{' '}
                  <Link href="/privacy" className="text-green-500 hover:underline">
                    Privacy Policy
                  </Link>
                </div>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                <div>
                  <Label htmlFor="otp">Enter 6-digit OTP</Label>
                  <div className="flex justify-center mt-4">
                    <InputOTP
                      maxLength={6}
                      value={otp}
                      onChange={setOtp}
                      disabled={isLoading}
                    >
                      <InputOTPGroup>
                        <InputOTPSlot index={0} />
                        <InputOTPSlot index={1} />
                        <InputOTPSlot index={2} />
                        <InputOTPSlot index={3} />
                        <InputOTPSlot index={4} />
                        <InputOTPSlot index={5} />
                      </InputOTPGroup>
                    </InputOTP>
                  </div>
                  <p className="text-sm text-gray-500 text-center mt-2">
                    For demo: Use any 6-digit code or "123456"
                  </p>
                </div>

                <Button
                  onClick={handleVerifyOtp}
                  disabled={isLoading || otp.length !== 6}
                  className="w-full bg-green-500 hover:bg-green-600"
                >
                  {isLoading ? 'Verifying...' : 'Verify & Continue'}
                </Button>

                <div className="flex items-center justify-between text-sm">
                  <button
                    onClick={() => setStep('phone')}
                    className="text-green-500 hover:underline"
                    disabled={isLoading}
                  >
                    ← Change Number
                  </button>
                  
                  <button
                    onClick={handleResendOtp}
                    disabled={resendTimer > 0 || isLoading}
                    className="text-green-500 hover:underline disabled:text-gray-400"
                  >
                    {resendTimer > 0 ? `Resend in ${resendTimer}s` : 'Resend OTP'}
                  </button>
                </div>
              </motion.div>
            )}
          </CardContent>
        </Card>

        {/* Additional Options */}
        <div className="mt-8 text-center">
          <div className="text-sm text-gray-600 mb-4">
            Don't have an account? It will be created automatically
          </div>
          
          <div className="space-y-3">
            <Link href="/vendor/login">
              <Button variant="outline" size="sm" className="w-full">
                Login as Farmer/Vendor
              </Button>
            </Link>
            
            <Link href="/admin/login">
              <Button variant="outline" size="sm" className="w-full">
                Admin Login
              </Button>
            </Link>
          </div>
        </div>

        {/* Guest Access */}
        <div className="mt-6 text-center">
          <Link href="/shop">
            <Button variant="ghost" size="sm" className="text-gray-500">
              Continue as Guest
            </Button>
          </Link>
        </div>
      </motion.div>
    </div>
  );
}