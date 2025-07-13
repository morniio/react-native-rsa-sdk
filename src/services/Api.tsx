import { sendRequest } from './sendRequest';
import Constants from '../helper/Constants';

export const init = ({
  token,
  baseUrl,
  language,
}: {
  token: string;
  baseUrl: string;
  language?: 'ar' | 'en';
}) => {
  Constants.token = token;
  Constants.baseUrl = baseUrl;
  Constants.lang = language || 'en';
};

export const getUser = (): Promise<any> =>
  sendRequest({
    endpoint: `users`,
    method: 'GET',
  });

export const getServices = () =>
  sendRequest<any>({
    endpoint: 'service-requests',
    method: 'GET',
  });

export const cancelService = (id: number) =>
  sendRequest<any>({
    endpoint: `service-requests/${id}/cancel`,
    method: 'POST',
  });

export const createService = (data: {
  user_id: number;
  service_id: number;
  add_on_id: number;
  pick_up_lat: number;
  pick_up_lng: number;
  drop_off_lat?: number;
  drop_off_long?: number;
  pick_up_time: string;
  note?: string;
}) =>
  sendRequest<any>({
    endpoint: 'service-requests',
    method: 'POST',
    data,
  });
