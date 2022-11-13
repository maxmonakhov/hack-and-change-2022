import { memo } from 'react';
import { Svg, SvgProps } from './svg';

const XMark = (props: SvgProps) => {
  return (
    <Svg
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="h-6 w-6"
      {...props}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6 18L18 6M6 6l12 12"
      />
    </Svg>
  );
};

export default memo(XMark);
