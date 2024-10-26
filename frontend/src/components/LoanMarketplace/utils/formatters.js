export const formatCurrency = (amount, currency = 'KES') => {
    return `${currency} ${parseFloat(amount).toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    })}`;
  };
  
  export const formatDate = (date) => {
    return new Date(date).toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };
  
  export const formatPercentage = (value) => {
    return `${parseFloat(value).toFixed(1)}%`;
  };
  
  export const formatDuration = (months) => {
    if (months < 12) {
      return `${months} month${months === 1 ? '' : 's'}`;
    }
    const years = Math.floor(months / 12);
    const remainingMonths = months % 12;
    const yearText = `${years} year${years === 1 ? '' : 's'}`;
    const monthText = remainingMonths > 0 ? ` ${remainingMonths} month${remainingMonths === 1 ? '' : 's'}` : '';
    return `${yearText}${monthText}`;
  };