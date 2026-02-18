import FolderCreateLog from "@/app/components/Log/Folder/Create/FolderCreateLog";
import FolderDeleteLog from "../components/Log/Folder/Delete/FolderDeleteLog";
import FolderUpdateLog from "../components/Log/Folder/Rename/FolderUpdateLog";
import FileCreateLog from "../components/Log/File/Create/FileCreateLog";
import FileUpdateLog from "../components/Log/File/Update/FileUpdateLog";
import FileDeleteLog from "../components/Log/File/Delete/FileDeleteLog";

export const logUi = ({ entity, type, data }) => {
  const normalizedEntity = entity.toLocaleLowerCase();
  const normalizedType = type.toLocaleLowerCase();
  switch (normalizedEntity) {
    case "folder":
      switch (normalizedType) {
        case "create":
          return <FolderCreateLog data={data} />;
        case "delete":
          return <FolderDeleteLog data={data} />;
        case "rename":
          return <FolderUpdateLog data={data} />;
      }
    case "file":
      switch (normalizedType) {
        case "upload":
          return <FileCreateLog data={data} />;
        case "update":
          return <FileUpdateLog data={data} />;
        case "delete":
          return <FileDeleteLog data={data} />;
      }
  }
};
