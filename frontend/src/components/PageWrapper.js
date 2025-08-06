import React from 'react';

const PageWrapper = ({ children }) => {
  return (
    <div style={{ paddingTop: '70px' /* or match your navbar height */ }}>
      {children}
    </div>
  );
};

export default PageWrapper;
