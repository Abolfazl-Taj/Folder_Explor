import nextResponse from "@/app/lib/nextResponse";
import prisma from "@/app/lib/prisma";

export async function DELETEHandler(id: string) {
  if (!id) {
    return nextResponse({ message: "Folder ID is required" }, { status: 400 });
  }

  try {
    const deletedFolder = await prisma.folder.delete({
      where: { id: id },
    });

    return nextResponse(
      { message: "Folder deleted successfully!", deletedFolder },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return nextResponse(
      { message: "Internal Server Error", error },
      { status: 500 }
    );
  }
}
