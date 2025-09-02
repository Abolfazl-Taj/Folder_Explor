"use client"
import { Modal } from "@/types/Modal"
import { useState } from "react"
import { FaPlus, FaTrashCan } from "react-icons/fa6"
import FormikForm from "../FormikForm"
import Input from "../Input"
import { CreateFileSchema } from "@/app/lib/schemas/FolderCreate"
import { IoCloseSharp } from "react-icons/io5"
import { deleteRequest, postRequest } from "@/app/lib/fetchRequest"
import { useRouter } from "next/navigation"
import { useQueryClient } from "@tanstack/react-query"
import { FaFileAlt } from "react-icons/fa";
import { toast } from "react-toastify"

const FileForm = ({ type, folderId = null, data }: Modal) => {
  const queryClient = useQueryClient()
  const [isopen, setIsopen] = useState(false)
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const router = useRouter()
  const pathName = folderId ? `/dashboard/${folderId}` : "/dashboard"
  const createFile = async (value: { name: string; content: string }) => {
    const { name, content } = value;
    if (selectedFile) {
      // Send FormData if file selected
      const formData = new FormData();
      formData.append("file", selectedFile);
      folderId ? formData.append("folderId", folderId) : null;
      formData.append("name", name.trim());
      postRequest({ url: "/api/file", body: formData }).then(() => {
        toast.success("File created successfully")
        queryClient.invalidateQueries();
      }).catch((err) => {
        console.log(err);
        toast.error("Somethign wrong happend try again")
      })
    } else {
      // Normal JSON send for manual file creation
      await postRequest({
        url: "/api/file",
        body: {
          name: name.trim(),
          content,
          folderId: folderId,
        },
      }).then((res) => {
        toast.success("File created successfully")
      }).catch((err) => {
        console.log(err);

        toast.error("Somethign wrong happend try again")
      })
    }

    router.push(pathName)
    queryClient.invalidateQueries();
    setIsopen(false);
  };
  const deleteFile = async () => {
    try {
      await deleteRequest(`/api/file/${data.id}`).then(() => {
        queryClient.invalidateQueries()
        setIsopen(false)
        toast.success("File deleted sucessfully!")
      })
    } catch (err: any) {
      toast.error(err.message)
    }
    router.push(pathName)
  }
  if (!isopen) {
    switch (type) {
      case "add":
        return <button
          onClick={() => setIsopen(true)}
          className="flex bg-[#111]/2 backdrop-blur-2xl border border-white/20 w-fit px-4 py-1 rounded-md shadow-2xl gap-2 items-center hover:bg-[#111]/40 transition-all">
          <FaPlus className="text-red-900" />
          Add File
        </button>
      case "delete":
        return <button className="flex justify-end hover:text-red-800 transition-all hover:scale-110" onClick={(e) => {
          setIsopen(true)
        }}  >
          <FaTrashCan />
        </button>
    }

  }
  switch (type) {
    case "add":
      return <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-[18px] border border-white/10 shadow-2xl rounded-xl flex justify-center items-center ">
        <div className="relative p-4 w-full max-w-md rounded-xl bg-[#111] backdrop-blur-[14px] border border-white/10 shadow-lg flex flex-col gap-4">
          <button
            onClick={() => setIsopen(false)}
            className="absolute top-3 right-3 text-2xl text-red-600 hover:text-red-400 transition"
            aria-label="Close"
          >
            <IoCloseSharp />
          </button>          <h1 className="font-bold text-2xl text-center">Add new file</h1>
          <FormikForm className="flex flex-col gap-4"
            initialState={{ name: "", content: "" }}
            schema={CreateFileSchema}
            onSubmit={createFile}
          >
            {(formik) => (
              <>
                <Input
                  labelClass="text-xl"
                  name="name"
                  labelName="File name"
                  placeHolder="Test File"
                  icon={<FaFileAlt />}
                  type="text"
                />

                {/* NEW: File upload input */}
                <label className="flex flex-col gap-1 text-white text-lg font-semibold">
                  Upload File (optional)
                  <input
                    type="file"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        formik.setFieldValue("name", file.name); // ✅ Set the "name" field
                        setSelectedFile(file); // ✅ Save it in state if needed
                        console.log(file);
                      }
                    }}
                    className="mt-1 rounded-md bg-[#222] px-3 py-2 text-white"
                    accept="*/*"
                  />
                </label>

                <button
                  type="submit"
                  className="bg-[#444]/40 transition-all w-fit px-4 py-1 self-center rounded-md hover:bg-[#444]"
                >
                  Create File
                </button>
              </>
            )}
          </FormikForm>

        </div>
      </div>
    case "delete":
      return <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-[18px] border border-white/10 shadow-2xl rounded-xl flex justify-center items-center ">
        <div className="p-4 w-1/3 rounded-xl bg-[#111] backdrop-blur-[14px] border border-white/10 shadow-lg flex flex-col gap-4">
          <i onClick={() => setIsopen(false)} className="absolute top-2 right-4 text-[25px] text-red-900"><IoCloseSharp /></i>
          <h1 className="font-bold text-2xl text-center">Are you sure ?</h1>
          <p className="text-center text-gray-300 text-sm ">Deleting file meaning to delete every content inside of it.</p>
          <h3 className="text-center">Your trying to delete <span className="font-bold border-b text-red-900">{data.name}</span> File</h3>
          <div className="w-full items-center justify-around flex mt-2">
            <button className="px-12 py-1 rounded-md shadow border border-white/20 bg-green-700 hover:bg-green-900 transition-all" onClick={deleteFile} >Yes</button><button onClick={() => setIsopen(false)} className=" transition-all px-12 py-1 rounded-md shadow border border-white/20 bg-red-900 hover:bg-red-950">No</button>
          </div>
        </div>
      </div>
  }
}

export default FileForm