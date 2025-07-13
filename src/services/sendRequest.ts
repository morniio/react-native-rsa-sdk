import { Alert, Platform } from 'react-native';
import Constants from '../helper/Constants';

export const baseUrl = Constants.baseUrl;

export const token = Constants.token;

type RequestMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

interface SendRequestParams<T> {
  endpoint: string;
  method: RequestMethod;
  data?: T;
  queryParams?: Record<string, string | number>;
  file?: any;
  files?: any[];
  multiFile?: { [key: string]: any };
  fileKey?: string;
}

export const sendRequest = async <T>({
  endpoint,
  method,
  data,
  queryParams,
  file,
  files,
  multiFile,
  fileKey,
}: SendRequestParams<T>): Promise<T | null> => {
  if (!token || !baseUrl) {
    Alert.alert('Error Missing Token Or BaseUrl');
    return null;
  }
  try {
    let url = `${baseUrl}${endpoint}`;

    if (queryParams) {
      const queryString = new URLSearchParams(queryParams as any).toString();
      if (queryString) {
        url += `?${queryString}`;
      }
    }

    const hasFile =
      file ||
      (files && files.length > 0) ||
      (multiFile && Object.keys(multiFile).length > 0);

    const headers: HeadersInit_ = {
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/json',
      'Accept-Language': Constants.lang,
    };

    let body: any;

    if (method !== 'GET') {
      if (hasFile) {
        const formData = new FormData();

        // Handle a single file
        if (file) {
          let uri = file.uri;
          if (Platform.OS !== 'android') {
            uri = uri.replace('file://', '');
          }
          formData.append(fileKey || 'file', {
            uri,
            type: file.type,
            name: file.fileName || uri.substring(uri.lastIndexOf('/') + 1),
          } as any);
        }

        // Handle multiple files from an array
        if (files && files.length > 0) {
          files.forEach((f) => {
            let uri = f.uri;
            if (Platform.OS !== 'android') {
              uri = uri.replace('file://', '');
            }
            formData.append(fileKey || 'file', {
              uri,
              type: f.type,
              name: f.fileName || uri.substring(uri.lastIndexOf('/') + 1),
            } as any);
          });
        }

        // Handle multiFile as an object with keys
        if (multiFile) {
          Object.keys(multiFile).forEach((key) => {
            const f = multiFile[key];
            let uri = f.uri;
            if (Platform.OS !== 'android') {
              uri = uri.replace('file://', '');
            }
            formData.append(key, {
              uri,
              type: f.type,
              name: f.fileName || uri.substring(uri.lastIndexOf('/') + 1),
            } as any);
          });
        }

        // Append any additional data to the FormData
        if (data) {
          Object.keys(data).forEach((key) => {
            // @ts-ignore
            formData.append(key, data[key]);
          });
        }
        body = formData;
      } else {
        headers['Content-Type'] = 'application/json';
        body = JSON.stringify(data);
      }
    }

    console.log('qqqqqq 🔍 Request URL:', url);

    const response = await fetch(url, {
      method,
      headers,
      body,
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('HTTP error:', response.status, errorText);
      return null;
    }

    return await response.json();
  } catch (error) {
    console.error('Request failed:', error);
    return null;
  }
};
