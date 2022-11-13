import { PageContent } from '../components/PageContent';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Chat } from '../features/chat/';
import { useGetDialogId } from '../features/chat/hooks/useGetDialogId';
import {
  AuthData,
  getAuthData
} from '../features/authorization/hooks/getAuthData';

const AdminPage = () => {
  const { push } = useRouter();

  const [authData, setAuthData] = useState<AuthData | null>();
  const { isAuthorized, user } = authData || {};
  const { userId } = user || {};

  const { data: dialogIdData, isError: isGettingDialogIdError } =
    useGetDialogId({ enabled: isAuthorized });
  const { dialogId } = dialogIdData || {};

  useEffect(() => {
    const authData = getAuthData();

    if (!authData.isAuthorized) void push('/login');
    else setAuthData(authData);
  }, []);

  if (isGettingDialogIdError)
    return <p className="text-xl text-accent">Can't get dialog id. </p>;

  if (!dialogId || !isAuthorized || !userId) return null;

  return (
    <PageContent>
      <div className="flex flex-col items-center justify-center">
        <Chat currentUserId={userId} dialogId={dialogId} />
      </div>
    </PageContent>
  );
};

export default AdminPage;
