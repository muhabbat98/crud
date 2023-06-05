import axios from 'axios';

interface Params {
  baseUrl: string;
  headers: any;
  method: string;
}

const configPost: Params = {
  baseUrl: 'https://no23.lavina.tech',
  headers: {
    Authorization: ''
  },
  method: 'post'
};
const configGet: Params = {
  baseUrl: 'https://no23.lavina.tech',
  headers: {
    Authorization: ''
  },
  method: 'get'
};

export const postAPI = async (url: string, data: any): Promise<any> => {
  return await axios({
    ...configPost,
    url: `${configPost.baseUrl}/${url}`,
    data
  })
    .then((response) => {
      // console.log(response)
      return {
        status: response.status,
        data: response.data
      };
    })
    .catch((error) => {
      console.log(error);
      return {
        status: error.status,
        data: error.response
      };
    });
};

export const getAPI = async (url: string, json: any): Promise<any> => {
  return await axios({
    ...configGet,
    url: `${configGet.baseUrl}/${url}`,
    headers: json
  });
};

export const getBooks = async (): Promise<any> => {
  return await axios({
    ...configGet,
    url: `${configGet.baseUrl}/books`,
    headers: {
      key: localStorage.getItem('key'),
      sign: 'b3ba64687888c6de41a7091d5e9e4254'
    }
  });
};
