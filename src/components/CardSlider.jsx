import { useEffect } from "react"
import { useActivityAxiosApi } from "../customHooks"

export default function CardSlider() {
    const [concertData] = useActivityAxiosApi()
    // const [cityData] = useCityAxiosApi()
    console.log(concertData)
    // console.log(cityData)
    return (<>

    </>)
}