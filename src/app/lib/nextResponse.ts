import { NextResponse } from "next/server";

const nextResponse = (data: any, options: { status: number }) => {
  return NextResponse.json(data, { status: options.status });
};
export const nextRedirect = (url: string, req: any) => {
  return NextResponse.redirect(new URL(url, req.url));
};

export default nextResponse;
