import React from 'react'
import { useGetPhoneNumbersQuery } from '../phone_numbers/phoneNumbersApi';
import PhoneNumberCard from '../phone_numbers/PhoneNumberCard';
import './EmbeddedSignupStyling.css';

interface EmbeddedSignupNumbersListProps {
  onPhoneNumberSelect: (id: string) => void;
}

function EmbeddedSignupNumbersList({ onPhoneNumberSelect }: EmbeddedSignupNumbersListProps) {
    const { data, error, isLoading, refetch } = useGetPhoneNumbersQuery();

    if (isLoading) {
      return (
        <div className="phone-numbers-section">
          <h2>Phone Numbers</h2>
          <div className="loading">Loading phone numbers...</div>
        </div>
      );
    }
  
    if (error) {
      return (
        <div className="phone-numbers-section">
          <h2>Phone Numbers</h2>
          <div className="error">
            Error loading phone numbers: {JSON.stringify(error)}
          </div>
          <button onClick={() => refetch()} className="retry-button">Retry</button>
        </div>
      );
    }

    const handleSelectPhoneNumber = (id: string) => {
        console.log('Selected phone number ID:', id);
        onPhoneNumberSelect(id);
    }

    const verifiedPhoneNumbers = data?.data?.filter((phoneNumber) => phoneNumber.code_verification_status === 'VERIFIED');

    if (!verifiedPhoneNumbers || verifiedPhoneNumbers.length === 0) {
      return (
        <div className="phone-numbers-section">
          <h2>Phone Numbers</h2>
          <div className="no-phone-numbers">
            <p>No verified phone numbers available for selection.</p>
          </div>
        </div>
      );
    }

  return (
    <div className="phone-numbers-section">
        <h2>Phone Numbers</h2>
        <div className="phone-numbers-list">
            {verifiedPhoneNumbers.map((phoneNumber) => (
                <div key={phoneNumber.id} className="phone-number-item">  
                    <div className="phone-number-info">
                        <p><strong>Phone Number:</strong> {phoneNumber.phone_number}</p>
                        <div className="phone-number-id">ID: {phoneNumber.id}</div>
                    </div>
                    <button 
                        onClick={() => handleSelectPhoneNumber(phoneNumber.id)}
                        className="select-phone-button"
                    >
                        Select Phone Number
                    </button>
                </div>
            ))}
        </div>
    </div>
  )
}

export default EmbeddedSignupNumbersList