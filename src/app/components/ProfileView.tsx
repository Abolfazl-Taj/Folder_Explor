import { User } from '@/generated/prisma'
import Image from 'next/image'
import { FaUser, FaBirthdayCake, FaUserEdit, FaEdit } from "react-icons/fa";
import { MdAlternateEmail } from "react-icons/md";

const ProfileView = ({ user, setIsEditing }: {
    user: User | any,
    setIsEditing: any
}) => {
    console.log(user);
    
    return (
        <div className='w-full flex justify-center items-center flex-col gap-8'>
            <Image unoptimized={true} className="w-40  h-40  rounded-full border-2 border-red-950 object-cover" src={user?.img || "https://ui-avatars.com/api/?name=user&background=#111"} alt={`${user?.userName}-img`} width={20} height={20} />
            <div className='flex-1 flex flex-wrap gap-4'>
                <div className='flex  gap-2 flex-col flex-[40%]'>
                    <h1 className='font-bold'>User Name :</h1>
                    <div className=' bg-[#111]/20 flex-1 px-4 py-3 flex items-center gap-2 rounded-md font-semibold text-[16px]  shadow-2xl shadow-red-950'>
                        <span className='border-r pr-1 text-xl text-red-800'><FaUser /></span>
                        {user?.userName || "not definded yet"}
                    </div>
                </div>
                <div className='flex  gap-2 flex-col flex-[40%]'>
                    <h1 className='font-bold'>Email :</h1>
                    <div className=' bg-[#111]/20 flex-1 px-4 py-3 flex items-center gap-2 rounded-md font-semibold text-[16px]  shadow-2xl shadow-red-950'>
                        <span className='border-r pr-1 text-xl text-red-800'><MdAlternateEmail /></span>
                        {user?.email}
                    </div>
                </div>
                <div className='flex  gap-2 flex-col flex-[40%]'>
                    <h1 className='font-bold'>Member Since :</h1>
                    <div className=' bg-[#111]/20 flex-1 px-4 py-3 flex items-center gap-2 rounded-md font-semibold text-[16px]  shadow-2xl shadow-red-950'>
                        <span className='border-r pr-1 text-xl text-red-800'><FaBirthdayCake /></span>
                        {new Date(user?.createdAt).getFullYear()}
                    </div>
                </div>
                <div className='flex  gap-2 flex-col flex-[40%]'>
                    <h1 className='font-bold'>Last account modified : </h1>
                    <div className=' bg-[#111]/20 flex-1 px-4 py-3 flex items-center gap-2 rounded-md font-semibold text-[16px]  shadow-2xl shadow-red-950'>
                        <span className='border-r pr-1 text-xl text-red-800'><FaUserEdit /></span>
                        {user?.updatedAt
                            ? new Date(user.updatedAt).toLocaleDateString("en-US", {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                            })
                            : "No modification has ever been done!"}
                    </div>
                </div>
            </div>
            <button onClick={() => setIsEditing(true)} className=' cursor-pointer bg-[#000]/10 hover:bg-[#000]/60 transition-all backdrop-blur-2xl w-1/3 justify-center flex items-center gap-2 ring text-lg font-bold py-4 ring-white/20 rounded-md'>
                <FaEdit className='text-2xl text-red-800' />
                Edit
            </button>
        </div>
    )
}

export default ProfileView