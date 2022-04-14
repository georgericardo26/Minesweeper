import React, { useCallback } from 'react';
import axios, { AxiosInstance } from 'axios';

import { IRequestData, IResponseData } from '../../interfaces/defaults';

const RequestPost = async (requestData: IRequestData)  => {

  try {
    
    let response = await axios.post(requestData.url, requestData.bodyData, requestData.header);

    return {
      status: response.status, 
      data: response.data
    }

  }
  catch (err) {
      console.log("error client", err);
      return {status: 500, data: {"message": "error"}}

  }

}


const RequestGet = async (requestData: IRequestData)  => {

  try {
    
    let response = await axios.get(requestData.url, requestData.header);

    return {
      status: response.status, 
      data: response.data
    }

  }
  catch (err) {

      return {status: err.status, data: err.data}

  }
}

const RequestPut = async (requestData: IRequestData)  => {

  try {
    
    let response = await axios.put(requestData.url, requestData.bodyData, requestData.header);

    return {
      status: response.status, 
      data: response.data
    }

  }
  catch (err) {

      return {status: err.status, data: err.data}

  }

}


const RequestDelete = async (requestData: IRequestData)  => {

  try {
    
    let response = await axios.delete(requestData.url, requestData.header);

    return {
      status: response.status, 
      data: response.data
    }

  }
  catch (err) {

      return {status: err.status, data: err.data}

  }

}


export { RequestPost, RequestGet, RequestPut, RequestDelete }