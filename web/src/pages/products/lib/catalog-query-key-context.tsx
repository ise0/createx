import { useRouter } from 'next/router';
import { createContext, PropsWithChildren, useContext, useEffect, useMemo, useState } from 'react';
import { SearchParams } from '../types';
import { useSearchParams } from './search-params-context';
import { setUrlSearchParams } from './set-url-search-params';

type State = { catalogQueryKey: SearchParams; updateCatalogQueryKey: () => void };

const catalogQueryKeyContext = createContext<State | undefined>(undefined);

export function CatalogQueryKeyProvider({ children }: PropsWithChildren) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [catalogQueryKey, setCatalogQueryKey] = useState(searchParams);
  const [catalogQueryKeyDeprecated, setCatalogQueryKeyDeprecated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setUrlSearchParams(router, searchParams);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [catalogQueryKey]);

  useEffect(() => {
    if (catalogQueryKeyDeprecated === false) return;
    let { page } = searchParams;
    if (catalogQueryKey.page === searchParams.page && catalogQueryKey.page > 1) {
      setSearchParams((prevValue) => ({ ...prevValue, page: 1 }));
      page = 1;
    }
    setCatalogQueryKeyDeprecated(false);
    setCatalogQueryKey({ ...searchParams, page });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [catalogQueryKeyDeprecated]);

  const value = useMemo(() => {
    return({
      catalogQueryKey,
      updateCatalogQueryKey: () => setCatalogQueryKeyDeprecated(true),
    });
  }, [catalogQueryKey]);

  return (
    <catalogQueryKeyContext.Provider value={value}>{children}</catalogQueryKeyContext.Provider>
  );
}

export function useCatalogQueryKey() {
  const value = useContext(catalogQueryKeyContext);
  if (value === undefined) {
    throw new Error('useCatalogQueryKey must be used within a catalogQueryKeyContext');
  }
  return value;
}
