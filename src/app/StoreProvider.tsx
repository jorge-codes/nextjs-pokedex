// Taken from the Next.js code from the 'with-redux' example, and made it work with mine from installer
'use client';
import { useRef, useEffect } from 'react';
import type { ReactNode } from 'react';
import { Provider } from 'react-redux';
import { retry, setupListeners } from '@reduxjs/toolkit/query';

import { makeStore, AppStore } from '@/redux/store';

interface Props {
  readonly children: ReactNode;
}

export const StoreProvider = ({ children }: Props) => {
  const storeRef = useRef<AppStore | null>(null);

  if (!storeRef.current) {
    storeRef.current = makeStore();
  }

  useEffect(() => {
    if (storeRef.current !== null) {
      const unsubscribe = setupListeners(storeRef.current.dispatch);
      return unsubscribe;
    }
  }, []);

  return <Provider store={storeRef.current}>{children}</Provider>;
};
