import { useEffect } from 'react';
import { useRouter } from 'next/router';
import useAuth from '@hooks/useAuth';
import FullPageLoader from '@components/FullPageLoader';


export default function PrivateRoute({ publicRoutes, children }) {
  const router = useRouter();
   const { isAuthenticated, fetchingUser:isLoading } = useAuth();

  const pathIsPublic = publicRoutes.indexOf(router.pathname) == -1;

  useEffect(() => {
    if (!isLoading && !isAuthenticated && pathIsPublic) {
      // Redirect route, you can point this to / -> home
      router.push('/');
    }
  }, [isLoading, isAuthenticated, pathIsPublic]);

  if ((isLoading || !isAuthenticated) && pathIsPublic) {
    return <FullPageLoader />;
  }

  return children;
}
