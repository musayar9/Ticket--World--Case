import { Link } from "react-router-dom";
import CartCard from "../components/CartCard";
import { useContext, useEffect } from "react";
import { SiteContext } from "../context/SiteContext";

export default function Cart() {
    const { cartList, setCartList, totalCost } = useContext(SiteContext)
    useEffect(() => {
        const storedOnlineUser = JSON.parse(localStorage.getItem("onlineUser"))
        if (storedOnlineUser?.cart) {
            setCartList(storedOnlineUser?.cart)
        }

    }, [])

    return (
        <div className="p-2 max-2xl:w-[50%] max-xl:w-[60%] max-lg:w-[70%] max-md:w-[90%] max-sm:w-[100%] m-auto mt-20 flex flex-col items-center">
            {
                cartList?.length !== 0 ? cartList?.map((concert, index) => <CartCard key={index} item={concert.item} selectedSeats={concert.selectedSeats} />) : (<>
                    <div className="p-4 my-7 w-[100%] text-center text-lg text-blue-800 rounded-lg bg-blue-100 mt-20" role="alert">
                        <span className="font-medium">YOUR CART IS EMPTY !</span>
                    </div>
                </>)
            }

            <hr className="w-[100%] m-10 border-t border-gray-800" />
            <div className="w-[100%] flex text-gray-800 justify-between items-center p-2 border border-gray-700 rounded-lg shadow">
                <a href="#">
                    <h5 className="mb-2 text-medium font-bold tracking-tight text-gray-900">TOTAL COST:</h5>
                </a>
                <p className="mb-3 font-bold text-gray-700">{`${totalCost} TL`}</p>

                <Link to="/payment">
                    <button type="button" className={`text-white bg-green-700 hover:bg-green-800 font-medium rounded-lg text-sm px-3 py-2 text-center inline-flex items-center dark:bg-green-600 dark:hover:bg-green-700 ${cartList?.length !== 0 ? "opacity-100" : "opacity-50"}`} disabled={cartList?.length == 0}>
                        GO TO PAYMENT
                        <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                        </svg>
                    </button>
                </Link>

            </div>
        </div>
    )
}