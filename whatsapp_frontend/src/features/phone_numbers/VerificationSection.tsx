import React, { useState } from 'react';
import { useVerifyCodeMutation } from './phoneNumbersApi';

interface Props {
  numberId: string;
  onSuccess: () => void;
}

const VerificationSection: React.FC<Props> = ({ numberId, onSuccess }) => {
  const [verifyCode, { isLoading }] = useVerifyCodeMutation();
  const [code, setCode] = useState('');

  // Format code for display (XXX-XXX)
  const formatCodeForDisplay = (value: string): string => {
    const numbersOnly = value.replace(/\D/g, '');
    if (numbersOnly.length <= 3) {
      return numbersOnly;
    }
    return `${numbersOnly.slice(0, 3)}-${numbersOnly.slice(3, 6)}`;
  };

  // Get only numbers for API call
  const getNumbersOnly = (value: string): string => {
    return value.replace(/\D/g, '').slice(0, 6);
  };

  const handleCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    const numbersOnly = getNumbersOnly(inputValue);
    
    // Only allow up to 6 digits
    if (numbersOnly.length <= 6) {
      setCode(numbersOnly);
    }
  };

  const handleVerify = async () => {
    if (!code.trim()) {
      alert('Please enter a verification code');
      return;
    }

    if (code.length !== 6) {
      alert('Please enter a 6-digit verification code');
      return;
    }

    try {
      await verifyCode({ numberId, code }).unwrap();
      alert('Code verified successfully!');
      setCode('');
      onSuccess();
    } catch (error) {
      console.error('Verification failed:', error);
      alert('Verification failed. Please try again.');
    }
  };

  return (
    <div className="verification-input-section">
      <div className="verification-input-group">
        <input
          type="text"
          placeholder="Verification code"
          value={formatCodeForDisplay(code)}
          onChange={handleCodeChange}
          className="verification-input"
          maxLength={7} // 6 digits + 1 dash
        />
        <button
          className="verify-button"
          onClick={handleVerify}
          disabled={isLoading}
        >
          {isLoading ? 'Verifying...' : 'Verify'}
        </button>
      </div>
    </div>
  );
};

export default VerificationSection;
