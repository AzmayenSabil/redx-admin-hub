import { OtpRequest, LoginPayload, User } from '@/types/auth';

export const requestLoginOtp = async (
  _data: OtpRequest,
): Promise<{ success: boolean }> => {
  await new Promise((r) => setTimeout(r, 500));
  return { success: true };
};

export const verifyOtp = async (
  data: LoginPayload,
): Promise<{ success: boolean; user?: User; error?: string }> => {
  await new Promise((r) => setTimeout(r, 500));
  if (data.otp === '123456') {
    return {
      success: true,
      user: {
        phone: data.phone,
        roles: [{ name: 'RedX Super Admin' }],
      },
    };
  }
  return { success: false, error: 'Invalid OTP' };
};
