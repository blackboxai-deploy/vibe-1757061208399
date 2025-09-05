/**
 * API Route: Send OTP
 * Handles OTP generation and SMS sending
 */

import { NextRequest, NextResponse } from 'next/server';

interface SendOTPRequest {
  phoneNumber: string;
}

export async function POST(request: NextRequest) {
  try {
    const body: SendOTPRequest = await request.json();
    const { phoneNumber } = body;

    // Validate phone number
    if (!phoneNumber || !/^[6-9]\d{9}$/.test(phoneNumber)) {
      return NextResponse.json(
        { success: false, error: 'Invalid phone number format' },
        { status: 400 }
      );
    }

    // For demo purposes, we'll just simulate OTP sending
    // In production, integrate with SMS service like Twilio, AWS SNS, or Indian SMS providers
    
    // Generate OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    
    // Store OTP in database/cache (Redis recommended for production)
    // For demo, we'll just log it
    console.log(`OTP for ${phoneNumber}: ${otp}`);
    
    // Simulate SMS sending delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // In production, send SMS here
    // await sendSMS(phoneNumber, `Your Grama Groceries OTP is: ${otp}. Valid for 5 minutes.`);
    
    return NextResponse.json({
      success: true,
      message: 'OTP sent successfully',
      // Don't send OTP in production response
      debug: process.env.NODE_ENV === 'development' ? { otp } : undefined
    });

  } catch (error) {
    console.error('Send OTP Error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}