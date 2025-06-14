import axios from 'axios';
import { SignupFormData } from '@/lib/validations';
import { LoginFormData } from '@/lib/validations';

const CODESPACE_NAME = process.env.NEXT_PUBLIC_CODESPACE_NAME || process.env.CODESPACE_NAME;
const apiurl = CODESPACE_NAME 
  ? `https://${CODESPACE_NAME}-8000.app.github.dev`
  : 'http://localhost:8000';

// Create axios instance with default config
const api = axios.create({
  baseURL: apiurl,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const signupUser = async (data: SignupFormData) => {
  try {
    const response = await api.post('/auth/register/', data);
    return response.data;
  } catch (err: any) {
    if (err.response && err.response.data) {
      // Handle Django-style validation errors
      const errors = err.response.data;
      const errorMessage = Object.entries(errors)
        .map(([key, value]) => `${key}: ${value}`)
        .join(', ');
      throw new Error(errorMessage);
    }
    throw new Error(err.message || 'An unknown error occurred');
  }
};

export const signinUser = async (data: LoginFormData) => {
  try {
    const response = await api.post('/auth/login/', data);
    return response.data;
  } catch (err: any) {
    if (err.response && err.response.data) {
      const errors = err.response.data;
      const errorMessage = Object.entries(errors)
        .map(([key, value]) => `${key}: ${value}`)
        .join(', ');
      throw new Error(errorMessage);
    }
    throw new Error(err.message || 'An unknown error occurred');
  }
};