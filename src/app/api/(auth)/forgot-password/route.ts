import { resend } from "@/app/lib/email";
import nextResponse, { nextRedirect } from "@/app/lib/nextResponse";
import prisma from "@/app/lib/prisma";
import { NextRequest } from "next/server";
import crypto from "crypto";

export const POST = async (req: NextRequest) => {
  const { email } = await req.json();
  if (!email)
    return nextResponse({ message: "Email is required!" }, { status: 400 });

  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user)
      return nextResponse({ message: "User does not exist" }, { status: 404 });

    // 1. Generate reset token
    const resetToken = crypto.randomBytes(32).toString("hex");
    const resetTokenExp = new Date(Date.now() + 60 * 60 * 1000); // 1 hour

    // 2. Save token in DB (assuming user table has resetToken + resetTokenExpiry fields)
    await prisma.user.update({
      where: { email },
      data: { resetToken, resetTokenExp },
    });

    // 3. Build link
    const resetLink = `${process.env.NEXT_PUBLIC_APP_URL}/reset-password?token=${resetToken}`;

    // 4. Send email
    const resualt = await resend.emails.send({
  from: "Folder Explorer <onboarding@resend.dev>",
      to: email,
      subject: "Reset your password",
      html: `
        <p>Hello ${user.userName || "Guest"},</p>
        <p>You requested to reset your password. Click the link below:</p>
        <a href="${resetLink}" target="_blank">${resetLink}</a>
        <p>This link will expire in 1 hour.</p>
        `,
    });
    console.log(resualt);

    return nextResponse(
      { message: "Reset password email sent successfully", resualt },
      { status: 200 }
    );
  } catch (err) {
    return nextResponse(
      { message: "Internal server error", error: err },
      { status: 500 }
    );
  }
};
