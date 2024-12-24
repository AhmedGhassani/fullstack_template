import React from 'react';
import { Outlet } from 'react-router-dom';

export default (): React.ReactElement => {
  return (
    <div className="flex justify-center items-center w-screen h-screen ">
      <Outlet />
    </div>
  );
};
