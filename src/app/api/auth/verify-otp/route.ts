/**
 * API Route: Verify OTP
 * Handles OTP verification and user authentication
 */

import { NextRequest, NextResponse } from 'next/server';

interface VerifyOTPRequest {
  phoneNumber: string;
  otp: string;
}

interface UserResponse {
  id: string;
  phoneNumber: string;
  profile: {
    firstName: string;
    lastName: string;
    isPhoneVerified: boolean;
  };
  role: 'customer' | 'vendor' | 'admin';
  createdAt: string;
}

export async function POST(request: NextRequest) {
  try {
    const body: VerifyOTPRequest = await request.json();
    const { phoneNumber, otp } = body;

    // Validate inputs
    if (!phoneNumber || !otp) {
      return NextResponse.json(
        { success: false, error: 'Phone number and OTP are required' },
        { status: 400 }
      );
    }

    if (!/^[6-9]\d{9}$/.test(phoneNumber)) {
      return NextResponse.json(
        { success: false, error: 'Invalid phone number format' },
        { status: 400 }
      );
    }

    if (!/^\d{6}$/.test(otp)) {
      return NextResponse.json(
        { success: false, error: 'OTP must be 6 digits' },
        { status: 400 }
      );
    }

    // For demo purposes, accept any 6-digit OTP or specific test OTP
    const isValidOtp = otp === '123456' || otp.length === 6;
    
    if (!isValidOtp) {
      return NextResponse.json(
        { success: false, error: 'Invalid OTP' },
        { status: 400 }
      );
    }

    // In production:
    // 1. Verify OTP from database/cache
    // 2. Check expiry (5 minutes)
    // 3. Handle rate limiting
    // 4. Create or fetch user from database
    
    // Create or fetch user (demo implementation)
    const user: UserResponse = {
      id: `user_${phoneNumber}`,
      phoneNumber,
      profile: {
        firstName: 'User',
        lastName: phoneNumber.slice(-4),
        isPhoneVerified: true
      },
      role: 'customer',
      createdAt: new Date().toISOString()
    };

    // In production, generate JWT token
    // const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '30d' });

    return NextResponse.json({
      success: true,
      message: 'OTP verified successfully',
      user,
      // token // In production
    });

  } catch (error) {
    console.error('Verify OTP Error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}