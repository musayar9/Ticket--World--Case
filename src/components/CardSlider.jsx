import { useEffect } from "react"
import { axiosConcertApi } from "../axios/axiosConcertApi";
import useActivityAxiosApi from "../customHooks/useActivityAxiosApi";

export default function CardSlider() {
    const [isLoading, isError, error, concertData] = useActivityAxiosApi()
    console.log(concertData)
    return (<>

    </>)
}