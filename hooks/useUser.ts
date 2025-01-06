// hooks/useUser.ts (or similar)
'use client';

import { useState, useEffect } from 'react';

const useUser = () => {
  const [user, setUser] = useState<string | null>(null);

  useEffect(() => {
    // Only run this code on the client side
    const loggedInUser = localStorage.getItem('loggedInUser') || '';
    if (loggedInUser) {
      setUser(loggedInUser);
    }
  }, []);

  return user;
};

export default useUser;
