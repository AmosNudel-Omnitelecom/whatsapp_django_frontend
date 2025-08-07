import React, { useState, useMemo } from 'react';
import { useGetPhoneNumbersQuery } from './phoneNumbersApi';
import PhoneNumberCard from './PhoneNumberCard';
import './PhoneNumbersStyleing.css';
import AddPhoneNumber from './AddPhoneNumber';

const PhoneNumbers: React.FC = () => {
  const { data, error, isLoading, refetch } = useGetPhoneNumbersQuery();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const paginatedData = useMemo(() => {
    if (!data?.data) return [];
    
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return data.data.slice(startIndex, endIndex);
  }, [data?.data, currentPage]);

  const totalPages = useMemo(() => {
    if (!data?.data) return 0;
    return Math.ceil(data.data.length / itemsPerPage);
  }, [data?.data]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (isLoading) {
    return (
      <div className="phone-numbers-container">
        <div className="loading">Loading phone numbers...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="phone-numbers-container">
        <div className="error">
          Error loading phone numbers: {JSON.stringify(error)}
        </div>
        <button onClick={() => refetch()} className="retry-button">Retry</button>
      </div>
    );
  }

  return (
    <div className="phone-numbers-container" style={{
      backgroundImage: `url(${process.env.PUBLIC_URL}/memphis-mini.png)`,
      backgroundRepeat: 'repeat',
      backgroundSize: '200px 200px',
      backgroundBlendMode: 'overlay'
    }}>
      <AddPhoneNumber />
      {data?.data && data.data.length > 0 ? (
        <>
          <div className="phone-numbers-list">
            {paginatedData.map(phoneNumber => (
              <PhoneNumberCard key={phoneNumber.id} phoneNumber={phoneNumber} />
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
            Showing {paginatedData.length} of {data.data.length} phone numbers
          </div>
        </>
      ) : (
        <div className="no-phone-numbers">
          <p>No phone numbers found.</p>
        </div>
      )}
    </div>
  );
};

export default PhoneNumbers;
