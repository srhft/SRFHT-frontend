import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { startLoading, stopLoading } from '../redux/LoadingSlice';
import { toast } from 'react-toastify';

const useApiCall = () => {
  const dispatch = useDispatch();
  const [isError, setIsError] = useState(false);
  const [IsTimedOut,setIsTimedOut] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false);

  const resetState = () => {
    setIsError(false);
    setIsSuccess(false);
    setIsTimedOut(false)
  };

  const handleApiCall = async (apiFunc, payload, successMessage ,errMessage) => {
    resetState()
    dispatch(startLoading())
    // const timeout = setTimeout(() => {
    //   console.log("inside timeout")
    //   setIsTimedOut(true);
    //   toast.error("Oops! The server is not responding. Please try again in a few minutes.")
    //   return false
    // }, 10);

    try {
      const { data } = await apiFunc(payload);
    
      successMessage && toast.success(successMessage)
      setIsSuccess(true)
      return data;

    } catch (err) {
      setIsError(true);
      errMessage && toast.error(succerrMessageessMessage)
      console.log(`err: ${err}`);

    } finally {
      clearTimeout(timeout)
      dispatch(stopLoading())
    }
  };

  return { isError, isSuccess, handleApiCall, resetState };
};

export default useApiCall;                                                                                                                                                  