import { useEffect, useState } from "react";
import { axiosConcertApi } from "../axios/axiosConcertApi";

export default function useActivitiesAxiosApi() {
  const [concertData, setConcertData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState();
  const [filteredToCategories, setFilteredToCategories] = useState();
  const [sidebar, setSidebar] = useState(false);
  const getData = async () => {
    try {
      const response = await axiosConcertApi.get("/api/activity");
      const responseData = response.data;
      if (response.status !== 200) {
        setIsError(true);
        setError("Veri alınamadı");
        throw new Error("Veri alınamadı");
      }
      setConcertData(responseData.activity);
      setIsLoading(false);
      if (concertData) {
        setFilteredToCategories(responseData.activity);
      }
    } catch (error) {
      setIsLoading(false);
      throw new Error(error);
    }
  };
  useEffect(() => {
    getData();
  }, []);

  return [
    concertData,
    filteredToCategories,
    setFilteredToCategories,
    sidebar,
    setSidebar,
  ];
}
