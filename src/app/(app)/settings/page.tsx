"use client"
import FormikForm from "@/app/components/FormikForm";
import Input from "@/app/components/Input";
import ProfileView from "@/app/components/ProfileView";
import { postRequest } from "@/app/lib/fetchRequest";
import settingScheme from "@/app/lib/schemas/settings";
import { useUser } from "@/hooks/useUser"
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaUser } from "react-icons/fa";
import { MdAlternateEmail } from "react-icons/md";

const ProfilePage = () => {
    const { user } = useUser()
    const router = useRouter()
    const [isEditing, setIsEditing] = useState(false)
    const updateSettings = async (value: any) => {
        const formdata = new FormData()
        formdata.append("email", value.email)
        formdata.append("userName", value.userName)
        formdata.append("oldPassword", value.oldPassword)
        formdata.append("img", value.img)
        formdata.append("password", value.password)
        console.log(formdata);
        await postRequest({
            url: "/api/profile", body: formdata
        })
        router.push("/settings")
    }
    return (
        <div className="flex-1 p-4 flex flex-col gap-4 h-full">
            <h1 className="text-xl font-semibold ">Profile page</h1>
            <div className="w-full flex">
                {isEditing ? (
                    <FormikForm className="flex flex-wrap justify-around gap-8"
                        initialState={{ userName: user?.userName || "", email: user?.email, password: "", oldPassword: "", img: user?.img || null }} schema={settingScheme} onSubmit={updateSettings}>
                        <Input className="w-full" labelName="Upload Avatar" name="img" type="file" placeHolder="Image" />
                        <Input className="flex flex-1/3" labelName="User name" name="userName" placeHolder="ex:guess12" type="text" icon={<FaUser />} />
                        <Input className="flex flex-1/3" labelName="Email" name="email" placeHolder="ex:test@example.com" type="text" defaultValue={user?.email} icon={<MdAlternateEmail />} />
                        <Input className="flex flex-1/3" labelName="Prevous password" name="oldPassword" placeHolder="ex:old password" type="password" icon={<MdAlternateEmail />} />
                        <Input className="flex flex-1/3" labelName="New password" name="password" strengthBar={true} placeHolder="ex:test@example.com" type="password" icon={<MdAlternateEmail />} />
                        <div className="flex items-center w-full gap-4 justify-center">
                            <button type="submit" className=" transition-all  hover:bg-red-950/80 w-1/3 border p-4 border-white/20 bg-red-800/10 backdrop-blur-3xl rounded-md">
                                Update
                            </button>
                            <button onClick={() => setIsEditing(false)} type="button" className=" transition-all  hover:bg-[#222]/80 w-1/3 border p-4 border-white/20 bg-[#222]/10 backdrop-blur-3xl rounded-md">
                                Cancel
                            </button>
                        </div>
                    </FormikForm>
                ) : (
                    <div className="flex-1">
                        <ProfileView user={user} setIsEditing={setIsEditing} />
                    </div>
                )}
            </div>
        </div >
    )
}

export default ProfilePage


