export const formatLastSeen = (lastSeenDate) => {
    const now = new Date();
    const lastSeen = new Date(lastSeenDate);
  
    // Calculate the time difference in milliseconds
    const diffInMs = now - lastSeen;
    const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
    const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
  
    if (diffInMinutes < 60) {
      return `${diffInMinutes} minutes ago`;
    } else if (diffInHours < 24) {
      return `${diffInHours} hours ago`;
    } else if (diffInDays === 1) {
      return 'Yesterday';
    } else if (diffInDays < 7) {
      return `${diffInDays} days ago`;
    } else {
      const options = { year: 'numeric', month: 'short', day: 'numeric' };
      return lastSeen.toLocaleDateString(undefined, options); // For dates older than a week, show the actual date
    }
  };
  