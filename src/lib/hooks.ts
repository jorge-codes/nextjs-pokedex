// Taken from the Next.js code from the 'with-redux' example, and made it work with mine from installer
// This file serves as a central hub for re-exporting pre-typed Redux hooks.
import { useDispatch, useSelector, useStore } from 'react-redux';
import type { AppDispatch, AppStore, RootState } from '@/redux/store';

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
export const useAppStore = useStore.withTypes<AppStore>();
