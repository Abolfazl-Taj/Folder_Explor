import { NextRequest } from "next/server";
import { GETHandler } from "./handlers/get";
import { POSTHandler } from "./handlers/post";
import { DELETEHandler } from "./handlers/delete";

export async function GET(req: NextRequest) {
  return GETHandler(req);
}
export async function POST(req: NextRequest) {
  return POSTHandler(req);
}
export async function DELETE(req: NextRequest) {
  return DELETEHandler(req);
}
