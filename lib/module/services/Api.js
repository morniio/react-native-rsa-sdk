"use strict";

import { sendRequest } from "./sendRequest.js";
import Constants from "../helper/Constants.js";
export const init = ({
  token,
  baseUrl,
  language
}) => {
  Constants.token = token;
  Constants.baseUrl = baseUrl;
  Constants.lang = language || 'en';
};
export const getUser = () => sendRequest({
  endpoint: `users`,
  method: 'GET'
});
export const getServices = () => sendRequest({
  endpoint: 'services',
  method: 'GET'
});
//# sourceMappingURL=Api.js.map