import React, { useState, useMemo } from 'react'
import { useGetPhoneNumbersQuery } from '../phone_numbers/phoneNumbersApi';
import './EmbeddedSignupStyling.css';

interface EmbeddedSignupNumbersListProps {
  onPhoneNumberSelect: (id: string) => void;
}

function EmbeddedSignupNumbersList({ onPhoneNumberSelect }: EmbeddedSignupNumbersListProps) {
    const { data, error, isLoading, refetch } = useGetPhoneNumbersQuery();
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    // All hooks must be called before any early returns
    const verifiedPhoneNumbers = data?.data?.filter((phoneNumber) => phoneNumber.code_verification_status === 'VERIFIED');
    
    const paginatedData = useMemo(() => {
        if (!verifiedPhoneNumbers) return [];
        
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        return verifiedPhoneNumbers.slice(startIndex, endIndex);
    }, [verifiedPhoneNumbers, currentPage]);

    const totalPages = useMemo(() => {
        if (!verifiedPhoneNumbers) return 0;
        return Math.ceil(verifiedPhoneNumbers.length / itemsPerPage);
    }, [verifiedPhoneNumbers]);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleSelectPhoneNumber = (id: string) => {
        console.log('Selected phone number ID:', id);
        onPhoneNumberSelect(id);
    }

    // Early returns after all hooks are called
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
            {paginatedData.map((phoneNumber) => (
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
        
        {totalPages > 1 && (
            <div className="pagination">
                <button 
                    className="pagination-button"
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                >
                    Previous
                </button>
                
                <div className="pagination-numbers">
                    {[...Array(totalPages)].map((_, index) => {
                        const page = index + 1;
                        return (
                            <button
                                key={page}
                                className={`pagination-number ${currentPage === page ? 'active' : ''}`}
                                onClick={() => handlePageChange(page)}
                            >
                                {page}
                            </button>
                        );
                    })}
                </div>
                
                <button 
                    className="pagination-button"
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                >
                    Next
                </button>
            </div>
        )}
        
        <div className="pagination-info">
            Showing {paginatedData.length} of {verifiedPhoneNumbers?.length || 0} verified phone numbers
        </div>
    </div>
  )
}

export default EmbeddedSignupNumbersList