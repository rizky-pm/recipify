// import { PropsWithChildren } from 'react';
import { RouterProvider } from 'react-router-dom';

import { router } from '@/routes';

// ({ children }: PropsWithChildren)
const Providers = () => {
  return <RouterProvider router={router} />;
};

export default Providers;
