import React, { useState, useCallback, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { AlertCircle } from 'lucide-react';
import { useLoans } from './hooks/useLoans';
import { calculateStats } from './utils/calculations';
import Header from './components/Header';
import FilterBar from './components/FilterBar';
import LoanCard from './components/LoanCard';
import ApplyModal from './components/modals/ApplyModal';
import DetailModal from './components/modals/DetailModal';
import InvestModal from './components/modals/InvestModal';
import {
    MarketplaceContainer,
    LoanGrid,
    LoadingSpinner,
    InfoBox,
    InfoText
} from './styles/components';

const LoanMarketplace = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [activeFilter, setActiveFilter] = useState('all');
    const [sortOption, setSortOption] = useState('dateCreated');
    const [sortDirection, setSortDirection] = useState('desc');
    
    const [showApplyModal, setShowApplyModal] = useState(false);
    const [showDetailModal, setShowDetailModal] = useState(false);
    const [showInvestModal, setShowInvestModal] = useState(false);
    const [selectedLoan, setSelectedLoan] = useState(null);

    const { loans, loading, error, refetchLoans } = useLoans(
        searchTerm,
        activeFilter,
        sortOption,
        sortDirection
    );

    const stats = calculateStats(loans);

    const handleSortChange = (option, direction) => {
        setSortOption(option);
        setSortDirection(direction);
    };

    const handleViewDetails = (loan) => {
        setSelectedLoan(loan);
        setShowDetailModal(true);
    };

    const handleInvest = (loan) => {
        setSelectedLoan(loan);
        setShowInvestModal(true);
    };

    const handleCloseModals = () => {
        setShowApplyModal(false);
        setShowDetailModal(false);
        setShowInvestModal(false);
    };

    return (
        <MarketplaceContainer
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
        >
            {error && (
                <InfoBox type="error">
                    <AlertCircle size={20} />
                    <InfoText>{error}</InfoText>
                </InfoBox>
            )}

            <Header
                stats={stats}
                searchTerm={searchTerm}
                onSearchChange={setSearchTerm}
                onApplyClick={() => setShowApplyModal(true)}
            />

            <FilterBar
                activeFilter={activeFilter}
                onFilterChange={setActiveFilter}
                onSortChange={handleSortChange}
            />

            {loading ? (
                <LoadingSpinner
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                />
            ) : (
                <LoanGrid>
                    <AnimatePresence>
                        {loans.map(loan => (
                            <LoanCard
                                key={loan.id}
                                loan={loan}
                                onViewDetails={handleViewDetails}
                                onInvest={handleInvest}
                            />
                        ))}
                    </AnimatePresence>
                </LoanGrid>
            )}

            <AnimatePresence>
                {showApplyModal && (
                    <ApplyModal
                        isOpen={showApplyModal}
                        onClose={() => handleCloseModals()}
                        onSuccess={refetchLoans}
                    />
                )}

                {showDetailModal && selectedLoan && (
                    <DetailModal
                        isOpen={showDetailModal}
                        onClose={() => handleCloseModals()}
                        loan={selectedLoan}
                        onInvestClick={() => {
                            setShowDetailModal(false);
                            setShowInvestModal(true);
                        }}
                    />
                )}

                {showInvestModal && selectedLoan && (
                    <InvestModal
                        isOpen={showInvestModal}
                        onClose={() => handleCloseModals()}
                        loan={selectedLoan}
                        onSuccess={refetchLoans}
                    />
                )}
            </AnimatePresence>
        </MarketplaceContainer>
    );
};

export default LoanMarketplace;