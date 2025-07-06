import React from 'react';

const AuthLayout = ({ imageUrl, children }) => {
  return (
    <div className="w-full lg:grid min-h-screen lg:grid-cols-2">
      <div className="hidden bg-muted lg:block">
        <img
          src={imageUrl}
          alt="Image"
          className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
      <div className="flex items-center justify-center py-12">
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
