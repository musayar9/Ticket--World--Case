import { useContext } from "react";
import { BsTrash3Fill } from "react-icons/bs";
import { SiteContext } from "../context/SiteContext";
import { Link } from "react-router-dom";
import { axiosUserApi } from "../axios/axiosUserApi";

export default function CartCard({ item, selectedSeats }) {
    const { cartList, setCartList } = useContext(SiteContext)

    const handleRemoveFromCart = async (item) => {
        const indexToRemove = cartList.findIndex(concert => concert.item._id === item._id);

        if (indexToRemove !== -1) {
            const filtered = [...cartList.slice(0, indexToRemove), ...cartList.slice(indexToRemove + 1)];
            setCartList(filtered);

            const storedOnlineUser = JSON.parse(localStorage.getItem("onlineUser"));

            const updatedUser = {
                ...storedOnlineUser,
                cart: filtered,
            };

            try {
                localStorage.setItem("onlineUser", JSON.stringify(updatedUser));
                await axiosUserApi.put(`/users/${updatedUser.id}`, { ...updatedUser });
                setCartList(updatedUser.cart);
            } catch (error) {
                console.error("Sepette kaldırma işlemi sırasında bir hata oluştu:", error);
            }
        }
    }

    return (<div className="w-[100%] border border-gray-700 rounded-lg shadow flex">
        <Link to={`/concert/${item._id}`} className="w-[100%]">
            <div className="w-[100%]">
                <div className="flex text-gray-800 items-center px-4 py-2 ">

                    <h5 className="w-[35%] mb-2 text-medium font-bold tracking-tight text-gray-900">{item.title}</h5>
                    <p className="text-center w-[30%] mb-2 font-normal text-gray-700">{`${item.date} | ${item.hour}`}</p>
                    <div className="w-[30%] text-center mb-2">
                        <span className="text-center  bg-red-100 text-red-800 text-base font-medium me-2 px-2.5 py-0.5  rounded">{`${item?.ticketPrice}x${selectedSeats?.length} = ${item?.ticketPrice * selectedSeats?.length} TL`}</span>
                    </div>

                </div>
                <div className="text-start font-medium p-4 text-sm text-red-800 rounded-lg" role="alert">Seats:
                    {
                        selectedSeats?.map((seat) => (
                            <span className="bg-red-100 text-red-800 text-xs font-medium mx-0.5 px-2 py-0.5 rounded dark:bg-red-900 dark:text-red-300">{`${seat.rowIndex}-${seat.columnIndex} |`}</span>
                        ))
                    }
                </div>
            </div>
        </Link>
        <button onClick={() => handleRemoveFromCart(item)} type="button" className="w-[5%] text-red-800"><BsTrash3Fill /></button>
    </div>)
}