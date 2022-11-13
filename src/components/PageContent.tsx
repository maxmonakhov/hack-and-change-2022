import { PropsWithChildren } from 'react';
import clsx from 'clsx';

type PageContentProps = PropsWithChildren & {
  className?: string;
};

const PageContent = (props: PageContentProps) => {
  const { children, className = '' } = props;

  return (
    <div
      className={clsx(
        'relative mx-auto flex h-full w-[min(760px,100%)] min-w-[320px] flex-1 justify-center',
        className
      )}
    >
      {children}
    </div>
  );
};

export { PageContent };
