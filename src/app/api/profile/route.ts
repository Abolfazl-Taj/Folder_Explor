import jwt from "jsonwebtoken";
import getUserId from "@/app/lib/getUserId";
import nextResponse, { nextRedirect } from "@/app/lib/nextResponse";
import prisma from "@/app/lib/prisma";
import { NextRequest } from "next/server";
import bcrypt from "bcryptjs";
import path from "path";
import { writeFile, unlink } from "fs/promises";
import createLog from "@/app/lib/createLog";
const JWT_SECRET = process.env.JWT_SECRET || "my_super_secret_key";

export const POST = async (req: NextRequest) => {
  const token = req.cookies.get("token")?.value;
  if (!token) return nextRedirect("/login", req);
  const formData = await req.formData();
  const file = formData.get("img") as File;
  const email = formData.get("email") as string;
  const userName = formData.get("userName") as string;
  const oldPassword = formData.get("oldPassword") as string;
  const password = formData.get("password") as string;
  let imgUrl: any = null;
  const id = getUserId(req);
  if (!id) return nextRedirect("/login", req);
  const user = await prisma.user.findUnique({ where: { id } });
  const userAvatar = user?.img;
  try {
    if (file && file.size > 0) {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const safeName = file.name
        .replace(/\s+/g, "_")
        .replace(/[^a-zA-Z0-9._-]/g, "");
      const fileName = `avatar_${Date.now()}_${safeName}`;
      const filePath = path.join(process.cwd(), "public", "upload", fileName);
      if (userAvatar) {
        console.log(userAvatar);

        const oldFilePath = path.join(
          process.cwd(),
          "public",
          userAvatar.replace(/^\/+/g, "")
        );
        await unlink(oldFilePath).catch((err) =>
          console.warn("Failed to delete old avatar:", err)
        );
      }
      await writeFile(filePath, buffer);
      imgUrl = `/upload/${fileName}`;
    }
    console.log({ userName, email, imgUrl, oldPassword, password });

    if (!user)
      return nextResponse({ message: "User not found" }, { status: 404 });
    if (oldPassword) {
      const isMatch = await bcrypt.compare(oldPassword, user.password);
      if (!isMatch)
        return nextResponse(
          { message: "Invalid credentials" },
          { status: 401 }
        );
      const newHashedPassword = await bcrypt.hash(password, JWT_SECRET);
      const updatedUser = await prisma.user.update({
        where: { id },
        data: {
          password: newHashedPassword,
          userName: userName || user.userName,
          email: email || user.email,
          img: imgUrl || user.img || null,
        },
      });
      return nextResponse(
        { message: "User updated successfully !", user: updatedUser },
        { status: 200 }
      );
    }

    const updatedUser = await prisma.user.update({
      where: { id },
      data: {
        userName: userName || user.userName,
        email: email || user.email,
        img: imgUrl || user.img || null,
      },
      select: {
        userName: true,
        email: true,
        id: true,
        img: true,
        createdAt: true,
        updatedAt: true,
      },
    });
    const newToken = jwt.sign(
      {
        id: updatedUser.id,
        email: updatedUser.email,
        img: updatedUser.img,
        userName: updatedUser.userName,
        createdAt: updatedUser.createdAt,
        updatedAt: updatedUser.updatedAt,
      },
      JWT_SECRET,
      { expiresIn: "7d" }
    );
    const response = nextResponse(
      { messsage: "User updated successfully!", user: updatedUser },
      { status: 200 }
    );
    response.cookies.set("token", newToken, {
      httpOnly: true,
      sameSite: "lax",
      path: "/",
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7,
    });
    await createLog({
      actor: id,
      action: "PROFILE_UPDATE",
      entityId: id,
      entityType: "USER",
      ownerId: id,
      metadata: {
        oldUserName: user.userName,
        oldEmail: user.email,
        newUserName: updatedUser.userName,
        newEmail: updatedUser.email,
        changes: {
          password: password ?? true,
          email: email ?? true,
          image: file.size > 0,
          userName: userName ?? true
        },
      }
    })
    return response;
  } catch (error) {
    return nextResponse(
      { message: "Internal server error", error },
      { status: 500 }
    );
  }
};
