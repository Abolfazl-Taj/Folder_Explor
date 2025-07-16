import { GETHanlder } from "./handlers/get";
import { NextRequest } from "next/server";
import { POSTHandler } from "./handlers/post";
import { DELETEHanlder } from "./handlers/delete";
export const GET = (req: NextRequest) => {
  return GETHanlder(req);
};
export const POST = (req: NextRequest) => {
  return POSTHandler(req);
};
export const DELETE = (req: NextRequest) => {
  return DELETEHanlder(req);
};
