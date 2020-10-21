import React, { forwardRef } from 'react';

type Props = {
  loading?: boolean;
  children?: React.ReactNode;
};

export const CardLayout = forwardRef<HTMLDivElement, Props>(
  ({ loading = false, children }, ref) => (
    <div
      ref={ref}
      className={`p-3 bg-white shadow rounded ${
        loading ? 'opacity-75 cursor-wait' : ''
      } mb-4`}
    >
      {children}
    </div>
  ),
);
