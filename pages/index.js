import { useEffect } from 'react';

export default function HomePage() {
  useEffect(() => {
    // Redirect to the actual index.html in public folder
    window.location.href = '/index.html';
  }, []);

  return null; // This component only redirects
}

