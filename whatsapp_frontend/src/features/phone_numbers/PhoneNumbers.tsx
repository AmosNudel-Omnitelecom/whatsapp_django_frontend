import React from 'react';
import { useGetPhoneNumbersQuery } from './phoneNumbersApi';
import PhoneNumberCard from './PhoneNumberCard';
import './PhoneNumbersStyleing.css';

const PhoneNumbers: React.FC = () => {
  const { data, error, isLoading, refetch } = useGetPhoneNumbersQuery();

  if (isLoading) {
    return (
      <div className="phone-numbers-container">
        <h2>Phone Numbers</h2>
        <div className="loading">Loading phone numbers...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="phone-numbers-container">
        <h2>Phone Numbers</h2>
        <div className="error">
          Error loading phone numbers: {JSON.stringify(error)}
        </div>
        <button onClick={() => refetch()} className="retry-button">Retry</button>
      </div>
    );
  }

  return (
    <div className="phone-numbers-container">
      <div className="header">
        <h2>Phone Numbers</h2>
        <button onClick={() => refetch()} className="refresh-button">Refresh</button>
      </div>

      {data?.data && data.data.length > 0 ? (
        <div className="phone-numbers-list">
          {data.data.map(phoneNumber => (
            <PhoneNumberCard key={phoneNumber.id} phoneNumber={phoneNumber} />
          ))}
        </div>
      ) : (
        <div className="no-phone-numbers">
          <p>No phone numbers found.</p>
        </div>
      )}
    </div>
  );
};

export default PhoneNumbers;
