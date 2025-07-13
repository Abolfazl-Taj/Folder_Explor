import axios from "axios";

export const getRequest = async ({ url }: { url: string }) => {
  const response = await axios.get(url);
  return response.data;
};
export const postRequest = async ({
  url,
  body,
}: {
  url: string;
  body: any;
}) => {
  const response = await axios.post(url, body);
  return response.data;
};
