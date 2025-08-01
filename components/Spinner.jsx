'use client';
import ClipLoader from 'react-spinners/ClipLoader';


const override = {
    display: 'block',
    margin: '100px auto',
};

const Spinner = ({ loading }) => {
  return (
        <ClipLoader
        color="#000000"
        loading={loading}
        cssOverride={override}
        size={50}
        aria-label="Loading Spinner"
    />
  );
};

export default Spinner;