import axios from "axios";

export const getRequest = async ({ url }: { url: string }) => {
  const response = await axios.get(url, {
    withCredentials: true, // THIS sends cookies with your request
  });
  return response.data;
};

export const postRequest = async ({
  url,
  body,
}: {
  url: string;
  body?: any;
}) => {
  const response = await axios.post(url, body, {
    withCredentials: true,
  });
  return response.data;
};

export const deleteRequest = async (url: string) => {
  try {
    const response = await axios.delete(url);
    return response.data;
  } catch (error: any) {
    console.error("Delete request failed:", error);
  }
};
export const patchRequest = async (url: string, body: any) => {
  try {
    const response = await axios.patch(url, body);
    return response.data;
  } catch (error: any) {
    console.error("Delete request failed:", error);
  }
};
