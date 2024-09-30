import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { useState } from 'react';

interface UseApiRequestResult<T> {
  data: T | null;
  isLoading: boolean;
  error: { [key: string]: string } |null;
  makeRequest: (config: AxiosRequestConfig) => Promise<void>;
}

const useApiRequest = <T>(): UseApiRequestResult<T> => {
  const [data, setData] = useState< T | null >(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<  { [key: string]: string } | null >(null);

  const makeRequest = async (config: AxiosRequestConfig) => {
    setIsLoading(true);
    setError(null);
    setData(null); // Clear previous data

    try {
      const response: AxiosResponse<T> = await axios(config);
      setData(response.data);
    } catch (error: any) {
      console.error('API Request Error:', error);
      setError(error?.response?.data?.errors || 'Request failed');
    } finally {
      setIsLoading(false);
    }
  };

  return { data, isLoading, error, makeRequest };
};

export default useApiRequest;