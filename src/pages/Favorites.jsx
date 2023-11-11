import { useContext, useEffect, useState } from "react";
import FavoriteCard from "../components/FavoriteCard";
import { SiteContext } from "../context/SiteContext";

export default function Favorites() {
    const {favList, setFavList,setIsValid} = useContext(SiteContext)

    useEffect( () => {
        if(localStorage.getItem("onlineUser")){
            setIsValid(true)
        }
        setFavList([...JSON.parse(localStorage.getItem("onlineUser"))?.favorites])
    }, [])

    return (
        <div className="flex flex-col w-[97%] flex-wrap m-auto p-5">
            <h1 className="text-3xl my-3">Favorites:</h1>
            {
               favList && favList?.map((item, index) => <FavoriteCard key={index} item={item} />)
            }
        </div>
    )
}
