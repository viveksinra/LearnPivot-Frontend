import axios, { AxiosInstance } from "axios";
import qs from "qs";
import {
  getAuthorizationHeader,
  getHeaderUrlEncoded,
} from "../utils/getAuthorizationHeader";
import Cookies from "js-cookie";

export class AuthService {
  instance;
  constructor(url) {
    this.instance = axios.create({
      baseURL: url,
      timeout: 30000,
      timeoutErrorMessage: "Time out!",
    });
  }

  login = async (email, password) => {
    return this.instance
      .post(
        `/api/v1/auth/passwordAuth/login`,
        qs.stringify({
          emu: email,
          password,
        }),
        {
          headers: getHeaderUrlEncoded(),
        }
      )
      .then((res) => {
        return {
          id: res.data.id,
          name: res.data.name,
          firstName: res.data.firstName,
          lastName: res.data.lastName,
          token: res.data.token,
          success: res.data.success,
          message: res.data.message,
          userImage: res.data.userImage,
          designation: res.data.designation,
          variant: res.data.variant,
          roleData: res.data.roleData,
        };
      })
      .catch((err) => {
        return err;
      });
  };
  get = async (url) => {
    return this.instance
      .get(`/${url}`, {
        headers: getHeaderUrlEncoded(),
      })
      .then((res) => res.data)
      .catch((err) => err);
  };

  post = async (url, data) => {
    return this.instance
      .post(`/${url}`, data, {
        headers: getHeaderUrlEncoded(),
      })
      .then((res) => res.data)
      .catch((err) => err);
  };

  getLoggedInUser = () => {
    const currentUser = Cookies.get("currentUser");
    return currentUser ? JSON.parse(currentUser) : {};
  };
}
