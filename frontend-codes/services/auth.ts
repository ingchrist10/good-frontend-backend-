import axios from 'axios';
import { SignupFormData } from '@/lib/validations';
import { LoginFormData } from '@/lib/validations';

const apiurl=process.env.NEXT_PUBLIC_API_URL || ''; 
export const signupUser = async (data: SignupFormData) => {
  try {
    const response = await axios.post(`${apiurl}/auth/register`, data);
    return response.data;
  } catch (err: any) {
   
    if (err.response && err.response.data?.message) {
      throw new Error(err.response.data.message);
    }
    throw new Error(err.message || 'An unknown error occurred');
  }
};

export const signinUser = async (data: LoginFormData) => {
  try {
    const response = await axios.post(`${apiurl}/auth/token/`, data);
    return response.data;
  } catch (err: any) {
   
    if (err.response && err.response.data?.message) {
      throw new Error(err.response.data.message);
    }
    throw new Error(err.message || 'An unknown error occurred');
  }
};

export const googleLogin = async (idToken: string) => {
  try {
    const response = await axios.post(`${apiurl}/auth/google/login/`, {
      id_token: idToken
    });
    return response.data;
  } catch (err: any) {
    if (err.response && err.response.data?.error) {
      throw new Error(err.response.data.error);
    }
    throw new Error(err.message || 'Google login failed');
  }
};

export const refreshToken = async (refreshToken: string) => {
  try {
    const response = await axios.post(`${apiurl}/auth/token/refresh/`, {
      refresh: refreshToken
    });
    return response.data;
  } catch (err: any) {
    if (err.response && err.response.data?.detail) {
      throw new Error(err.response.data.detail);
    }
    throw new Error(err.message || 'Token refresh failed');
  }
};

export const getProtectedData = async (accessToken: string) => {
  try {
    const response = await axios.get(`${apiurl}/auth/protected/`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });
    return response.data;
  } catch (err: any) {
    if (err.response && err.response.data?.detail) {
      throw new Error(err.response.data.detail);
    }
    throw new Error(err.message || 'Failed to fetch protected data');
  }
};