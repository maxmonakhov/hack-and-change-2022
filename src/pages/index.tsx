import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { getAuthData } from '../features/authorization/hooks/getAuthData';

const IndexPage = () => {
  const { push } = useRouter();

  useEffect(() => {
    const authData = getAuthData();

    if (!authData.isAuthorized) void push('/login');
    else push('/admin');
  }, []);

  return null;
};

export default IndexPage;
