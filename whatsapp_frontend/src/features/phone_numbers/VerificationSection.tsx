import React, { useState } from 'react';
import { useVerifyCodeMutation } from './phoneNumbersApi';

interface Props {
  numberId: string;
  onSuccess: () => void;
}

const VerificationSection: React.FC<Props> = ({ numberId, onSuccess }) => {
  const [verifyCode, { isLoading }] = useVerifyCodeMutation();
  const [code, setCode] = useState('');

  const handleVerify = async () => {
    if (!code.trim()) {
      alert('Please enter a verification code');
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
          placeholder="Enter verification code"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="verification-input"
          maxLength={6}
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
