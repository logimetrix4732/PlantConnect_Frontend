import axios from "axios";

// GET request
export const getFetch = async (url) => {
  try {
    const response = await axios.get(url, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("GET request error:", error);
    return error.response;
  }
};

// GET request with limit and pagination
export const getFetchByLimit = async (url, limit, page) => {
  try {
    const response = await axios.get(`${url}/${limit}/${page}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("GET request with limit error:", error);
    return error.response;
  }
};

// POST request
export const postFetch = async (url, data) => {
  try {
    const response = await axios.post(url, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("POST request error:", error);
    return error.response;
  }
};

// PATCH request
export const patchFetch = async (url, data) => {
  try {
    const response = await axios.patch(url, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("PATCH request error:", error);
    return error.response;
  }
};

// PUT request
export const putFetch = async (url, data) => {
  try {
    const response = await axios.put(url, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("PUT request error:", error);
    return error.response;
  }
};

export const postFetchData = async (url, data) => {
  try {
    const response = await axios.post(url, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("POST request error:", error);
    return error.response;
  }
};

// DELETE request
export const deleteFetch = async (url) => {
  try {
    const response = await axios.delete(url, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("DELETE request error:", error);
    return error.response;
  }
};
