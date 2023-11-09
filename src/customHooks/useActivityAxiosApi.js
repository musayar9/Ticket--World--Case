import { useEffect, useState } from "react"
import { axiosConcertApi } from "../axios/axiosConcertApi"

export default function useActivityAxiosApi() {
    const [concertData, setConcertData] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [isError, setIsError] = useState(false)
    const [error, setError] = useState()

    const getData = async () => {
        const response = await axiosConcertApi.get("/activity");
        const responseData = await response.data;
        if (response.status !== 200) {
            setIsError(true)
            setError("Veri alınamadı")
            throw new Error("Veri alınamadı")
        }
        else {

            setConcertData(responseData.activity)
            setIsLoading(false)
        }
    }
    useEffect(() => {
        getData()
    }, [])

    return [concertData]
}