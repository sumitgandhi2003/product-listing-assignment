import axios from "axios";
import { useState } from "react";
useState;
export const useApi = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const apiCaller = async ({
    url,
    method = "GET",
    body = null,
    headers = {},
    authToken = null,
    params = {},
  }) => {
    setIsLoading(true);
    setError(null);
    const finalHeaders = {
      "Content-Type": "application/json",
      Accept: "application/json",
      ...headers,
    };

    if (authToken) {
      finalHeaders["Authorization"] = `Bearer ${authToken}`;
    }

    try {
      const response = await axios({
        method,
        url,
        data: body ? JSON.stringify(body) : null,
        headers: finalHeaders,
        params,
      });
      return response;
    } catch (err) {
      setError(err || "Something went wrong");
      return null;
    } finally {
      setIsLoading(false);
    }
  };
  return { apiCaller, isLoading, error };
};
