import { useContext, useState } from "react";
import { SiteContext } from "../context/SiteContext";
import { useDropzone } from "react-dropzone";
import { Box } from "@mui/material";
import { Image } from "@mui/icons-material";
import { axiosConcertApi } from "../axios/axiosConcertApi";

export default function AvatarModal() {
  const { isOpenAvatarModal, setIsOpenAvatarModal, avatarUrl, setAvatarUrl } =
    useContext(SiteContext);
  const [url, setUrl] = useState("");

  const { getRootProps, getInputProps } = useDropzone({
    maxFiles: 1,
    maxSize: 1000000,
    accept: [".png", ".jpg", ".jpeg"],
    onDrop: (acceptedFiles) => {
      acceptedFiles.forEach((file) => {
        const newData = {
          path: URL.createObjectURL(file),
          name: file.name,
          file: Object.assign(file),
        };
        setUrl(newData.path);
      });
    },
    onDropRejected: () => {
      console.error("You can only upload 1 image & maximum size of 1 MB.", {
        duration: 2000,
      });
    },
  });

  const handleSubmitAvatar = async (e) => {
    setAvatarUrl(url);
    try {
      const storedOnlineUser = JSON.parse(localStorage.getItem("onlineUser"));
      const updatedUser = {
        ...storedOnlineUser,
        avatar: url || "",
      };
      localStorage.setItem("onlineUser", JSON.stringify(updatedUser));
      await axiosConcertApi.put(`/api/users/${updatedUser._id}`, {
        ...updatedUser,
      });
    } catch (error) {
      console.error("Avatar değişimi sırasında bir hata oluştu:", error);
    }
    setIsOpenAvatarModal(false);
    setUrl(url);
  };
  const handleResetAvatar = async (e) => {
    try {
      const storedOnlineUser = JSON.parse(localStorage.getItem("onlineUser"));
      const updatedUser = {
        ...storedOnlineUser,
        avatar: "",
      };
      localStorage.setItem("onlineUser", JSON.stringify(updatedUser));
      await axiosConcertApi.put(`/api/users/${updatedUser._id}`, {
        ...updatedUser,
      });
      setAvatarUrl("");
    } catch (error) {
      console.error("Avatar değişimi sırasında bir hata oluştu:", error);
    }
    setIsOpenAvatarModal(false);
    setUrl("");
  };

  return (
    <>
      <div
        id="default-modal"
        tabIndex="-1"
        aria-hidden="true"
        className={`flex items-center justify-center ${
          isOpenAvatarModal ? `block` : `hidden`
        } mx-auto overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full`}
      >
        <div className="relative p-4 w-full max-w-2xl max-h-full">
          <div className="relative bg-[#2b2d32] rounded-lg shadow ">
            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                Change your avatar
              </h3>
              <button
                onClick={() => setIsOpenAvatarModal(false)}
                type="button"
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                data-modal-hide="default-modal"
              >
                <svg
                  className="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>
            <input
              type="file"
              accept="image/*"
              className="input-zone"
              {...getInputProps()}
            />
            <div {...getRootProps({ className: "dropzone" })}>
              <Box
                sx={{
                  alignContent: "center",
                  alignItems: "center",
                  display: "flex",
                  justifyContent: "center",
                }}
                width="100%"
                height={150}
              >
                {url == "" ? (
                  <Image
                    sx={{ width: "100px", height: "100px", color: "grey.500" }}
                  />
                ) : (
                  <Box
                    style={{ objectFit: "cover", width: 120, height: 120 }}
                    component="img"
                    sx={{
                      borderRadius: "16px",
                    }}
                    src={url}
                  />
                )}
              </Box>
            </div>

            <div className="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
              <button
                onClick={handleSubmitAvatar}
                data-modal-hide="default-modal"
                type="button"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Change Avatar
              </button>
              <button
                onClick={handleResetAvatar}
                data-modal-hide="default-modal"
                type="button"
                className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm ml-2 px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
              >
                Reset Avatar
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
