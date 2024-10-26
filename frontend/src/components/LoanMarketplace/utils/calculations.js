export const calculateStats = (loans) => {
    if (!loans.length) return {
        totalAvailable: 0,
        totalFunding: 0,
        averageInterestRate: 0
    };

    const totalAvailable = loans.filter(loan => loan.status === 'Available').length;
    const totalFunding = loans.filter(loan => loan.status === 'Funding').length;
    const averageInterestRate = loans.reduce((acc, loan) => acc + loan.interest_rate, 0) / loans.length;
    
    return {
        totalAvailable,
        totalFunding,
        averageInterestRate: averageInterestRate || 0
    };
};

export const getColor = (value) => {
    const intensity = Math.floor((value / 100) * 255);
    return `rgb(${255 - intensity}, ${255 - intensity}, 255)`;
};