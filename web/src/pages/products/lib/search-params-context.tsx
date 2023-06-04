import { useRouter } from 'next/router';
import {
  createContext,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useContext,
  useState,
} from 'react';
import { SearchParams } from '../types';
import { readUrlSearchParams } from './read-url-search-params';

const catalogSearchParamsContext = createContext<
  [SearchParams, Dispatch<SetStateAction<SearchParams>>] | undefined
>(undefined);

export function SearchParamsProvider({ children }: PropsWithChildren) {
  const router = useRouter();
  const urlSearchParams = readUrlSearchParams(router.query);
  const value = useState<SearchParams>(urlSearchParams);
  return (
    <catalogSearchParamsContext.Provider value={value}>
      {children}
    </catalogSearchParamsContext.Provider>
  );
}

export function useSearchParams() {
  const value = useContext(catalogSearchParamsContext);
  if (value === undefined) {
    throw new Error('useSearchParams must be used within a SearchParamsProvider');
  }
  return value;
}
