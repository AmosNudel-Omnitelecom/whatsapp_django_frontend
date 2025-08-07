import React, { useState } from 'react';
import {
  useRequestVerificationCodeMutation
} from './phoneNumbersApi';
import VerificationSection from './VerificationSection';

interface PhoneNumber {
  id: string;
  phone_number: string;
  code_verification_status: string;
  verification_expiry_time?: string;
}

interface Props {
  phoneNumber: PhoneNumber;
}

const PhoneNumberCard: React.FC<Props> = ({ phoneNumber }) => {
  const [requestVerificationCode, { isLoading: isRequestingCode }] = useRequestVerificationCodeMutation();
  const [showVerificationInput, setShowVerificationInput] = useState(false);
  const handleRequestVerificationCode = async () => {
    try {
      await requestVerificationCode(phoneNumber.id).unwrap();
      alert('Verification code has been sent!');
      setShowVerificationInput(true);
    } catch (error) {
      console.error('Failed to request code:', error);
      alert('Failed to request code. Please try again.');
    }
  };

  return (
    <div className="phone-number-card">
      <div className="phone-number-info">
        <h3>{phoneNumber.phone_number}</h3>
        <p className="id">ID: {phoneNumber.id}</p>
        <p className="status">
          Status: <span className={`status-${phoneNumber.code_verification_status.toLowerCase()}`}>
            {phoneNumber.code_verification_status}
          </span>
        </p>
        {phoneNumber.verification_expiry_time && (
          <p className="expiry">
            Expires: {new Date(phoneNumber.verification_expiry_time).toLocaleString()}
          </p>
        )}
      </div>
        <div>
        <VerificationSection numberId={phoneNumber.id} onSuccess={() => setShowVerificationInput(false)} />
        </div>

      <div className="phone-number-actions">
        <button
          className="request-code-button"
          onClick={handleRequestVerificationCode}
          disabled={isRequestingCode}
        >
          {isRequestingCode ? 'Requesting...' : 'Request Code'}
        </button>
      </div>
    </div>
  );
};

export default PhoneNumberCard;
