import { GETHanlder } from "./handlers/get";
import { NextRequest } from "next/server";
import { POSTHandler } from "./handlers/post";
import { PATCHHandler } from "./handlers/path";
export const GET = (req: NextRequest) => {
  return GETHanlder(req);
};
export const POST = (req: NextRequest) => {
  return POSTHandler(req);
};
export const PATCH = (req: NextRequest) => {
  return PATCHHandler(req);
};
