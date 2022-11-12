import axios from 'axios';
import { config } from '../config';
import { jwtService } from '../services/JWTService';
import assert from 'assert';

export const api = axios.create({
  baseURL: config.baseUrl,
  headers: {
    // 'Content-Type': 'application/json',
    // 'Access-Control-Allow-Origin': '*',
    // 'Access-Control-Allow-Methods': 'GET,HEAD,OPTIONS,POST,PUT',
    // 'Access-Control-Allow-Headers':
    //   'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  }
});

export const withAuthHeader = () => {
  const token = jwtService.getJWTToken();
  assert(!!token, 'Token not defined');

  return { Authorization: `Bearer ${token}` };
};
