import { storeWrapper } from 'app-root/store';
import { setIsAuthenticated } from 'app-entities/user/model';
import { GetServerSideProps } from 'next';
import { dehydrate, QueryClient } from '@tanstack/react-query';
import { authUser } from 'ssr/model/user/auth-user';
import { fillCartFavIdsCache } from 'ssr/cache-managment/fill-cart-fav-ids-cache';
import { fillProductCatalogCache } from 'ssr/cache-managment/fill-product-catalog-cache';
import { fillUserCache } from 'ssr/cache-managment/fill-user-cache';
import { readUrlSearchParams } from './lib/read-url-search-params';
import { fillProductCategoriesCache } from 'ssr/cache-managment/fill-product-categories-cache';

export const getServerSideProps: GetServerSideProps = storeWrapper.getServerSideProps(
  (store) =>
    async ({ req, query }) => {
      const queryClient = new QueryClient();
      const searchParams = readUrlSearchParams(query);

      const { data: AuthData, error: AuthError } = await authUser(req);
      const userAuth = AuthError !== undefined ? { status: false as const } : AuthData;

      store.dispatch(setIsAuthenticated(userAuth.status));

      const asyncRequests: Promise<unknown>[] = [];

      asyncRequests.push(
        fillProductCatalogCache(queryClient, {
          pagination: {
            limit: searchParams.numElemsPerPage,
            offset: searchParams.numElemsPerPage * (searchParams.page - 1),
          },
          filters: searchParams.filters,
          searchBy: searchParams.searchBy,
          sort: searchParams.sort,
        })
      );
      asyncRequests.push(fillProductCategoriesCache(queryClient));

      if (userAuth.status === true) {
        asyncRequests.push(fillCartFavIdsCache(queryClient, userAuth.user.userId));
        fillUserCache(queryClient, userAuth.user);
      }

      await Promise.allSettled(asyncRequests);

      return {
        props: {
          dehydratedState: dehydrate(queryClient),
        },
      };
    }
);
