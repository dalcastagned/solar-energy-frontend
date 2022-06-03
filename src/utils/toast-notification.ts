import { toast } from 'react-toastify';

import { Id, TypeOptions } from '../../node_modules/react-toastify/dist/types';

export type Notification = {
  message: string;
  type: TypeOptions;
};

export const notify = (id: Id, { message, type }: Notification): void => {
  toast.update(id, {
    render: message,
    type,
    isLoading: false,
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    closeButton: true,
    delay: 500,
  });
};
