"use client"
import FormikForm from "@/app/components/FormikForm";
import Input from "@/app/components/Input";
import { postRequest } from "@/app/lib/fetchRequest";
import settingScheme from "@/app/lib/schemas/settings";
import { useUser } from "@/hooks/useUser"
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FaUser } from "react-icons/fa";
import { MdAlternateEmail } from "react-icons/md";

const ProfilePage = () => {
    const { user } = useUser()
    const router = useRouter()
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
            <h1 className="text-xl font-semibold ">Profile and Settings</h1>
            <div className="w-full flex">
                <FormikForm className="flex flex-wrap justify-around gap-8"
                    initialState={{ userName: user?.userName || "", email: user?.email, password: "", oldPassword: "", img: user?.img || "" }} schema={settingScheme} onSubmit={updateSettings}>
                    <Input className="w-full" labelName="Upload Avatar" name="img" type="file" placeHolder="Image" />
                    <Input className="flex flex-1/3" labelName="User name" name="userName" placeHolder="ex:guess12" type="text" icon={<FaUser />} />
                    <Input className="flex flex-1/3" labelName="Email" name="email" placeHolder="ex:test@example.com" type="text" defaultValue={user?.email} icon={<MdAlternateEmail />} />
                    <Input className="flex flex-1/3" labelName="Prevous password" name="oldPassword" placeHolder="ex:old password" type="password" icon={<MdAlternateEmail />} />
                    <Input className="flex flex-1/3" labelName="New password" name="password" strengthBar={true} placeHolder="ex:test@example.com" type="password" icon={<MdAlternateEmail />} />
                    <button type="submit" className="flex-1/2 w-fit  slef-center border p-4 border-white/20 bg-[#222]/10 backdrop-blur-3xl rounded-md">Update</button>
                </FormikForm>
            </div>
        </div>
    )
}

export default ProfilePage