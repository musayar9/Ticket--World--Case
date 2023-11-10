import { useEffect, useState } from "react";
import { axiosConcertApi } from "../axios/axiosConcertApi";
import { useParams } from "react-router";
import CardSlider from "../components/CardSlider";
import SeatsModal from "../components/SeatsModal";

export default function ConcertDetailed() {
  const [concertData, setConcertData] = useState();
 
  const params = useParams();

  useEffect(() => {
    const getData = async () => {
      const response = await axiosConcertApi(`/activity/${params.id}`);
      const responseData = await response.data;
      setConcertData(responseData.activity);
    };
    getData();
  }, []);


  return (
    <>  
      <div className="my-14" style={{ border: "1px solid red" }}>
        <div className="bg-purple-800 text-white py-12">
          <div className="container mx-auto text-center">
            <h1 className="text-4xl font-extrabold tracking-wider">
              Harika Konser
            </h1>
            <p className="text-sm">23 Kasım 2023 | Konser Salonu</p>
          </div>
        </div>
        <div className="container mx-auto mt-8 flex">
          <div className="w-2/3 pr-8">
            <img
              src="https://ichef.bbci.co.uk/images/ic/1200x675/p0fq9cyz.jpg"
              alt="Konser Resmi"
              className="w-full h-96 object-cover rounded-lg shadow-2xl"
            />
          </div>

          <div className="w-1/3 p-8 bg-white rounded-lg shadow-lg">
            <div className="mb-4">
              <span className="text-gray-600 font-semibold">Kategori:</span>{" "}
              Category Name
            </div>
            <div className="mb-4">
              <span className="text-gray-600 font-semibold">Şehir:</span> City
            </div>
            <div className="mb-4">
              <span className="text-gray-600 font-semibold">Tarih:</span> Date
            </div>
            <div className="mb-4">
              <span className="text-gray-600 font-semibold">Saat:</span> Hour
            </div>
            <div className="mb-4">
              <span className="text-gray-600 font-semibold">Açıklama:</span>{" "}
              Description
            </div>
            <div className="mb-4">
              <span className="text-gray-600 font-semibold">Yer:</span> Location
            </div>
            <div className="mb-4">
              <span className="text-gray-600 font-semibold">Yer Adı:</span>{" "}
              Location Name
            </div>
            <div className="mb-4">
              <span className="text-gray-600 font-semibold">Bilet Fiyatı:</span>{" "}
              Ticket Price
            </div>
            <div className="mb-4">
              <span className="text-gray-600 font-semibold">Başlık:</span> Title
            </div>
          </div>
        </div>
        <div className="mb-20 top-5 left-5  w-3/4 flex items-center p-5">
          <div className="w-full mt-10 mb-4">
            <CardSlider concertData={concertData} />
          </div>
        </div>

        <div className="text-center">
          <a
            href="#"
            className="bg-red-800 text-white py-3 px-6 rounded-full inline-block text-lg font-semibold transition duration-300 hover:bg-purple-600"
          >
            Add to favorites
          </a>
          <a
            href="#"
            className="bg-purple-800 text-white py-3 px-6 rounded-full inline-block text-lg font-semibold transition duration-300 hover:bg-purple-600"
          >
            Add to chart
          </a>
        </div>
      </div>
      <SeatsModal/>
    </>
  );
}
