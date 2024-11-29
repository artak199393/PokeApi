import { useDispatch } from 'react-redux';
import { AppDispatch } from '../types/types';

type DispatchFunc = () => AppDispatch;
const useAppDispatch: DispatchFunc = useDispatch;
export default useAppDispatch;
