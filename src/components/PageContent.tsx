import { FC, PropsWithChildren } from 'react';

const PageContent: FC<PropsWithChildren> = (props) => {
  const { children } = props;

  return (
    <div className="relative mx-auto flex h-full w-[min(760px,100%)] min-w-[320px] flex-1 justify-center">
      {children}
    </div>
  );
};

export { PageContent };
