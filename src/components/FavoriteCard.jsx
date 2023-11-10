import { Link } from "react-router-dom";
import { BsBookmark, BsFillBookmarkFill } from "react-icons/bs";

export default function FavoriteCard({ item }) {
    return (
        <>
            <div className="max-sm:w-[100%] max-md:w-[100%] max-lg:w-[85%] max-xl:w-[80%] max-2xl:w-[70%] my-2 h-[25vh] flex bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                <Link to={`/concert/${item._id}`}>
                    <div className="w-[190px] h-[100%] overflow-hidden">
                        <img className="rounded-t-lg object-fill w-[350px] h-[100%]" src={item.image[0].photo} alt="" />
                    </div>
                </Link>
                <div className="w-[100%] flex">
                    <div className="py-3 px-6 flex flex-col justify-between">
                        <a href="#">
                            <h5 className=" text-lg font-bold tracking-tight text-gray-900 dark:text-white">{`${item.title.substring(0, 30)}...`}</h5>
                        </a>
                        <p className="text-sm text-gray-700 dark:text-gray-400">{`${item.description.substring(0, 50)}...`}</p>
                        <p className="text-sm text-gray-700 dark:text-gray-400">{`${item.date} | ${item.hour}`}</p>
                        <div className="w-[100%]">
                            <span className="w-[30%] bg-red-100 text-red-800 text-base font-medium me-2 px-2.5 py-0.5 my-2 rounded dark:bg-red-900 dark:text-red-300">{`${item.ticketPrice} TL`}</span>
                        </div>
                    </div>
                    <div className="w-[40%] flex flex-col justify-between h-[100%]">
                            <button className="text-white ml-auto text-lg m-2" ><BsFillBookmarkFill /></button>
                            <button type="button" className=" my-2 mr-2 p-2 ml-auto float-right max-lg:w-[90%] max-xl:w-[70%] max-2xl:w-[60%] text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Sepete ekle</button>
                        {/* <BsFillBookmarkFill/> */}
                    </div>
                </div>
            </div>
        </>
    )
}