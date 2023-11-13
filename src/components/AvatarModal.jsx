import { useContext, useState } from "react"
import { SiteContext } from "../context/SiteContext"
import { axiosUserApi } from "../axios/axiosUserApi";

export default function AvatarModal() {
    const { isOpenAvatarModal, setIsOpenAvatarModal, avatarUrl, setAvatarUrl } = useContext(SiteContext)

    const toBase64 = file => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
    });

    const handleImageRead = async (e) => {
        const base64File = await toBase64(e.target.files[0])
        console.log(base64File)
        setAvatarUrl(base64File || "");
    }

    const handleSubmitAvatar = async (e) => {
        try {
            const storedOnlineUser = JSON.parse(localStorage.getItem("onlineUser"))
            const updatedUser = {
                ...storedOnlineUser,
                avatar: avatarUrl || "",
            };
            localStorage.setItem("onlineUser", JSON.stringify(updatedUser));
            await axiosUserApi.put(`/users/${updatedUser.id}`, { ...updatedUser });
            setAvatarUrl(base64File || "");
        } catch (error) {
            console.error("Avatar değişimi sırasında bir hata oluştu:", error);
        }
        setIsOpenAvatarModal(false)
    }
    const handleResetAvatar = async (e) => {
        try {
            const storedOnlineUser = JSON.parse(localStorage.getItem("onlineUser"))
            const updatedUser = {
                ...storedOnlineUser,
                avatar: "",
            };
            localStorage.setItem("onlineUser", JSON.stringify(updatedUser));
            await axiosUserApi.put(`/users/${updatedUser.id}`, { ...updatedUser });
            setAvatarUrl("");
        } catch (error) {
            console.error("Avatar değişimi sırasında bir hata oluştu:", error);
        }
        setIsOpenAvatarModal(false)
    }

    return (<>
        <div id="default-modal" tabIndex="-1" aria-hidden="true" className={`flex items-center justify-center ${isOpenAvatarModal ? `block` : `hidden`} mx-auto overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full`}>
            <div className="relative p-4 w-full max-w-2xl max-h-full">
                <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                    <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                            Change your avatar
                        </h3>
                        <button onClick={() => setIsOpenAvatarModal(false)} type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="default-modal">
                            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                            </svg>
                            <span className="sr-only">Close modal</span>
                        </button>
                    </div>
                    <div className="p-4 md:p-5 space-y-4">
                        <div className="form-group mb-4">
                            <input onChange={handleImageRead} name="image" type="file" className="form-control-file" id="exampleFormControlFile" accept="image/png, image/jpeg" />
                        </div>
                    </div>
                    <div className="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
                        <button onClick={handleSubmitAvatar} data-modal-hide="default-modal" type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Change Avatar</button>
                        <button onClick={handleResetAvatar} data-modal-hide="default-modal" type="button" className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm ml-2 px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800">Reset Avatar</button>
                    </div>
                </div>
            </div>
        </div>


    </>)
}