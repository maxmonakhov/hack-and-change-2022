import { ClipLoader } from 'react-spinners';

type SpinnerProps = {
  size?: string;
};

const Spinner = (props: SpinnerProps) => {
  const { size } = props;

  return (
    <>
      <ClipLoader
        color="#3ABEF8"
        loading={true}
        size={size}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </>
  );
};

export default Spinner;
