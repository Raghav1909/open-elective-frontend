import axios from 'axios';

export const GET = url => {
    return axios.get(`${process.env.REACT_APP_BACKEND_API}/${url}`);
}

export const POST = (url, data) => {
  const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('access_token')}`
  }

  return axios(`${process.env.REACT_APP_BACKEND_API}/${url}`, {
      method: 'POST',
      headers,
      data,
  });
}

export const DELETE = url => {
  const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('access_token')}`
  }

  return axios(`${process.env.REACT_APP_BACKEND_API}/${url}`, {
      method: 'DELETE',
      headers,
  });
}
