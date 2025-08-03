import { NextRequest } from "next/server";
import { GETHandler } from "./handlers/get";
import { POSTHandler } from "./handlers/post";
import { PATCHHandler } from "./handlers/patch";

export async function GET(req: NextRequest) {
  return GETHandler(req);
}
export async function POST(req: NextRequest) {
  return POSTHandler(req);
}
export async function PATCH(req: NextRequest) {
  return PATCHHandler(req);
}
