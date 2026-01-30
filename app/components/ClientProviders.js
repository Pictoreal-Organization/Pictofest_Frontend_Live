// app/components/ClientProviders.js
'use client';

import { useEffect } from 'react';
import { analytics } from '@/app/config/firebase';

export function ClientProviders({ children }) {
  useEffect(() => {
    analytics; // Initialize analytics
  }, []);

  return <>{children}</>;
}