import { PageContent } from '../components/PageContent';
import { isAuthorized } from '../features/authorization/hooks/isAuthorized';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Chat } from '../features/chat/';

const AdminPage = () => {
  const { push } = useRouter();

  const [authorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    if (!isAuthorized()) void push('/login');
    else setIsAuthorized(true);
  }, []);

  if (!authorized) return null;

  return (
    <PageContent>
      <Chat />
    </PageContent>
  );
};

export default AdminPage;
