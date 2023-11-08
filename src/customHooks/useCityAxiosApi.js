import { useEffect, useState } from "react"
import { axiosConcertApi } from "../axios/axiosConcertApi"

export default function useCityAxiosApi() {
    const [cityData, setCityData] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [isError, setIsError] = useState(false)
    const [error, setError] = useState()

    const getData = async () => {
        try {
            const response = await axiosConcertApi.get("/city");
            const responseData = await response.data;
            if (response.status !== 200) {
                setIsError(true)
                setError("Veri alınamadı")
                throw new Error("Veri alınamadı")
            }
            else {
                setCityData(responseData.city)
                setIsLoading(false)
            }
        } catch (error) {
            throw new Error("Veri alınamadı")
        }

    }
    useEffect(() => {
        getData()
    }, [])

    return [cityData]
}