import { toast } from 'react-toastify';
import CustomNotification from '@/components/ui/CustomNotification';

type NotifyOptions = {
  position?: 'top-right' | 'top-center' | 'top-left' | 'bottom-right' | 'bottom-center' | 'bottom-left';
  autoClose?: number;
  hideProgressBar?: boolean;
  pauseOnHover?: boolean;
  draggable?: boolean;
  theme?: 'light' | 'dark' | 'colored';
};
const baseOptions: NotifyOptions = {
  position: 'top-right',
  autoClose: 2000,
  hideProgressBar: true,
  pauseOnHover: false,
  draggable: false,
  theme: 'light',
};

export const notify = {
  show: (message: string) => toast(message || 'Successfully done', baseOptions),
  error: (message: string) =>
    toast.error(message || 'Something went wrong', baseOptions),
  info: (data: { title: string; content: string }) =>
    toast.info(<CustomNotification data={data} />, baseOptions),
};
