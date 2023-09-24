// Function to format a date in a user-friendly format
    const formatDate = (dateString) => {
        const options = 
        { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric'
        };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    export default formatDate
