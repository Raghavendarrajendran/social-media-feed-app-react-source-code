import { useDispatch } from 'react-redux';
import type { AppDispatch } from '../store';

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export { useAppSelector } from './useAppSelector';
