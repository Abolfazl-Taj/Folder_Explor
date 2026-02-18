"use client"
import { getRequest, patchRequest } from '@/app/lib/fetchRequest'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useParams } from 'next/navigation'
import Loading from '@/app/components/Loading';
import EditorContiner from '@/app/components/Editor/EditorContiner';
import { useEffect, useRef, useState } from 'react';
import languageExtensions from '@/app/lib/languageExtensions';
import { MdModeEdit } from "react-icons/md";
import { useRouter } from 'next/navigation';

const FilePage = () => {
  const params = useParams()
  const query = useQueryClient()
  const { id } = params
  const [lang, setLang] = useState<string | null>("")
  const [filename, setFilename] = useState<string | null>("")
  const [isEditing, setIsediting] = useState(false)
  const [fileUrl, setFileUrl] = useState<string | null>(null);
  const router = useRouter()
  const { data, isLoading, error } = useQuery({
    queryKey: ["file", id],
    queryFn: () => getRequest({ url: `/api/file/${id}` })
  })

  useEffect(() => {
    if (!data?.file?.content || !data.file.mimeType) return;

    // binary files (pdf, png, jpg, etc.)
    if (
      data.file.mimeType.startsWith("application/pdf") ||
      data.file.mimeType.startsWith("image/")
    ) {
      const url = `data:${data.file.mimeType};base64,${data.file.content}`;
      setFileUrl(url);
    }
  }, [data]);
  useEffect(() => {
    const name = filename || data?.file?.name;
    const suffix = name?.includes(".") ? "." + name.split(".").pop() : ".txt";
    setLang(languageExtensions[suffix] || "plaintext");
  }, [data, filename]);

  const editorRef = useRef<any>(null);
  if (isLoading) return <Loading />
  const saveHandler = () => {
    const value = editorRef?.current?.getValue() || null
    patchRequest("/api/file", {
      id: data.file.id,
      name: filename || data.file.name,
      content: value
    }).then(() => {
      query.invalidateQueries()
      const path = data.file.folder ? `/dashboard/${data.file.folder.id}` : "/dashboard"
      router.push(path)
    })
  }
  return (
    <div className='w-full p-4 gap-12 outline-none focus:outline-none flex flex-col'>
      <h1 className='w-full bg-[#111]/50 px-4 py-2 rounded-full font-bold text-white border border-[#000]/25 shadow
      flex justify-between items-center
      '>
        {isEditing ? (
          <>
            <div className='flex-1'>
              {data.file.folder ? data.file.folder.name : "Main folder"}/<input onChange={(e) => setFilename(e.target.value)} className='outline-none border-b border-white/10 focus:border-blue-500' defaultValue={filename ? filename : data.file.name} placeholder='ex:file.txt' />
            </div>
            <div className='flex gap-2'>
              <button className='px-4  rounded-md border border-white/20' onClick={() => setIsediting(false)}>Save</button>
              <button className='px-4  rounded-md border border-white/20' onClick={() => {
                setIsediting(false)
                setFilename(data.file.name)
              }}>Cancel</button>
            </div>
          </>

        ) : (
          <>
            {data?.file?.folder ? data?.file?.folder?.name : "Main folder"}/{filename ? filename : data.file.name}
            <button onClick={() => setIsediting(true)}>
              <MdModeEdit className='text-2xl cursor-pointer' />
            </button>
          </>
        )}
      </h1>
      {data.file.mimeType === "application/pdf" && fileUrl ? (
        <iframe
          src={fileUrl}
          className="w-full h-[600px] rounded-xl border"
        />
      ) : data.file.mimeType.startsWith("image/") && fileUrl ? (
        <div className='w-full flex justify-center items-center overflow-hidden p-4 shadow shadow-[#222] rounded'>
          <img src={fileUrl} alt={data.file.name}  className='w-auto h-auto ' />
        </div>
      ) : (
        <EditorContiner
          ref={editorRef}
          // text/code → decode from base64
          defaultValue={data.file.content ? atob(data.file.content) : ""}
          language={lang}
        />
      )}


      <div className='w-full flex justify-around items-center '>
        <button className='bg-[#111]/50 border border-white/20 backdrop-blur-2xl w-fit px-4 py-2 rounded-md shadow' onClick={saveHandler}>Save</button>
        <button className='bg-red-900/50 border border-white/20 backdrop-blur-2xl w-fit px-4 py-2 rounded-md shadow' onClick={() => editorRef.current?.setValue(data.file.content ? data.file.content : "")}>Cancel Changes</button>
      </div>

    </div >
  )
}



export default FilePage