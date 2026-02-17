/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Form, Input, Button, Typography, message } from 'antd';
import { requestLoginOtp, verifyOtp } from '@/services/authAPI';
import { setUser } from '@/redux/slices/AuthSlice';
import { handleNumericValueChange } from '@/lib/formHelpers';

const { Title } = Typography;

const containerStyle = css`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #d32029 0%, #8c1515 100%);
`;

const cardStyle = css`
  background: #fff;
  border-radius: 12px;
  padding: 48px 40px;
  width: 400px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
`;

const titleStyle = css`
  text-align: center;
  margin-bottom: 32px !important;
  color: #d32029 !important;
`;

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSendOtp = async () => {
    try {
      const phone = form.getFieldValue('phone');
      if (!phone) {
        message.error('Please enter phone number');
        return;
      }
      setLoading(true);
      await requestLoginOtp({ phone });
      message.success('OTP sent successfully!');
      setOtpSent(true);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async () => {
    try {
      const values = await form.validateFields();
      setLoading(true);
      const res = await verifyOtp({
        phone: values.phone,
        otp: values.otp,
      });
      if (res.success && res.user) {
        dispatch(setUser(res.user));
        message.success('Login successful!');
        navigate('/parcels');
      } else {
        message.error(res.error || 'Login failed');
      }
    } catch {
      // validation error
    } finally {
      setLoading(false);
    }
  };

  return (
    <div css={containerStyle}>
      <div css={cardStyle}>
        <Title level={3} css={titleStyle}>
          RedX Admin Panel
        </Title>
        <Form form={form} layout="vertical" size="large">
          <Form.Item
            name="phone"
            label="Phone Number"
            rules={[
              { required: true, message: 'Phone is required' },
            ]}
          >
            <Input
              data-testid="phone-input"
              placeholder="01XXXXXXXXX"
              onChange={(e) => {
                const val = handleNumericValueChange(
                  e.target.value,
                );
                form.setFieldsValue({ phone: val });
              }}
            />
          </Form.Item>

          <Form.Item
            name="otp"
            label="OTP"
            rules={[
              { required: true, message: 'OTP is required' },
            ]}
          >
            <Input
              data-testid="otp-input"
              placeholder="Enter OTP"
              maxLength={6}
            />
          </Form.Item>

          <Form.Item>
            <Button
              data-testid="send-otp-button"
              block
              onClick={handleSendOtp}
              loading={loading && !otpSent}
              style={{ marginBottom: 12 }}
            >
              Send OTP
            </Button>
            <Button
              type="primary"
              data-testid="login-button"
              block
              onClick={handleLogin}
              loading={loading && otpSent}
              style={{
                background: '#d32029',
                borderColor: '#d32029',
              }}
            >
              Verify &amp; Login
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Login;
