import React, { useState, useMemo } from 'react'
import { useGetClientWABAsQuery } from './WabasApi'
import WebhookComponent from './WebhookComponnent'
import WabaPhoneNumbers from './WabaPhoneNumbers'

function ClientWabas() {
    const { data: wabas, isLoading, error } = useGetClientWABAsQuery();
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const paginatedData = useMemo(() => {
        if (!wabas?.data) return [];
        
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        return wabas.data.slice(startIndex, endIndex);
    }, [wabas?.data, currentPage]);

    const totalPages = useMemo(() => {
        if (!wabas?.data) return 0;
        return Math.ceil(wabas.data.length / itemsPerPage);
    }, [wabas?.data]);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    if (isLoading) return <div className="loading">Loading...</div>;
    if (error) return <div className="error">Error: {(error as any).data as string}</div>;

  return (
    <div className="wabas-section">
        <h3>Client Wabas</h3>
        {wabas?.data && wabas.data.length > 0 ? (
            <>
                <ul className="wabas-list">
                    {paginatedData.map((waba) => (
                        <li key={waba.id} className='waba-card'>
                            <div className="waba-info">
                                <h4>{waba.name}</h4>
                                <span className="waba-id">{waba.id}</span>
                            </div>
                            <WebhookComponent wabaId={waba.id} />
                            <div className='waba-phone-numbers'>
                                <WabaPhoneNumbers wabaId={waba.id} />
                            </div>
                        </li>
                    ))}
                </ul>
                
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
                    Showing {paginatedData.length} of {wabas.data.length} client WABAs
                </div>
            </>
        ) : (
            <div className="no-wabas">
                <p>No client WABAs found.</p>
            </div>
        )}
    </div>
  )
}

export default ClientWabas