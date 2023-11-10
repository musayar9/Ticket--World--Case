import { useContext, useEffect } from "react";
import FavoriteCard from "../components/FavoriteCard";
import { SiteContext } from "../context/SiteContext";
import useActivitiesAxiosApi from "../customHooks/useActivitiesAxiosApi";

export default function Favorites(){

    const [concertData] = useActivitiesAxiosApi()


    return (
        <div className="flex flex-col w-[97%] flex-wrap m-auto p-5">
            <h1 className="text-3xl my-3">Favorites:</h1>
        {
            concertData.map((item, index) => <FavoriteCard key={index} item = {item}/> )
        }


    </div>
    )
}
