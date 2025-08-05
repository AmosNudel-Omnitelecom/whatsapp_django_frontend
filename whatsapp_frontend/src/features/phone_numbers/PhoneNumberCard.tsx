import React, { useState } from 'react';
import {
  useDeletePhoneNumberMutation,
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
  const [deletePhoneNumber, { isLoading: isDeleting }] = useDeletePhoneNumberMutation();
  const [requestVerificationCode, { isLoading: isRequestingCode }] = useRequestVerificationCodeMutation();
  const [showVerificationInput, setShowVerificationInput] = useState(false);

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this phone number?')) {
      try {
        await deletePhoneNumber(phoneNumber.id).unwrap();
      } catch (error) {
        console.error('Failed to delete phone number:', error);
        alert('Failed to delete phone number. Please try again.');
      }
    }
  };

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

      {showVerificationInput && (
        <VerificationSection numberId={phoneNumber.id} onSuccess={() => setShowVerificationInput(false)} />
      )}

      <div className="phone-number-actions">
        <button
          className="request-code-button"
          onClick={handleRequestVerificationCode}
          disabled={isRequestingCode}
        >
          {isRequestingCode ? 'Requesting...' : 'Request Code'}
        </button>
        <button
          className="delete-button"
          onClick={handleDelete}
          disabled={isDeleting}
        >
          {isDeleting ? 'Deleting...' : 'Delete'}
        </button>
      </div>
    </div>
  );
};

export default PhoneNumberCard;
