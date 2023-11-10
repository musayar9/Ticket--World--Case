import React, { useEffect, useState } from "react";
import axiosConcertApi from "../axios/axiosConcertApi";

function ConcertCard() {
  const [uniqueCategory, setUniqueCategory] = useState(["all"]);
  const [cardsData, setCardsData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosConcertApi.get("");
        console.log("response", response);

        const data = response.data.activity;
        console.log(data);

        
        const cards = data.map((item) => {
          return {
            image: item.image,
            title: item.title,
            location: item.location,
            date: item.date,
            ticketPrice: item.ticketPrice,
            category: item.category,
          };
        });

        setCardsData(cards);

        // const artistsTitle = [data.map((i) => i.title)];

        // const image = [data.map((i) => i.image)];
        // const location = [data.map((i) => i.location)];

        // const date = data.map((i) => i.date);

        // const ticketPrice = [data.map((i) => i.ticketPrice)];


        const categories = ["all", ...new Set(data.map((i) => i.category))];
        setUniqueCategory(categories);

        if (data.length > 0) {
          const keys = Object.keys(data[0]); // İlk öğenin anahtarlarını alıyoruz
          console.log("Anahtarlar: ", keys);
        }
      } catch (error) {
        console.error("Error: ", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
    <div className="m-6 mx-14 flex items-center">
      <h2 className="mr-auto">Samsun Konser Etkinlikleri</h2>
      <div className="ml-auto">
        <input type="checkbox" id="checkbox" />
        <label htmlFor="checkbox"> Tarihi Geçenler</label>
      </div>
    </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mx-14">
        {cardsData.map((card, index) => (
          <div
            key={index}
            className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
          >
            <a href="#">
              <img className="rounded-t-lg" src={card.image} alt="" />
            </a>
            <div className="p-5">
              <a href="#">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  {card.title}
                </h5>
              </a>
              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                {card.location}
              </p>
              <a
                href="#"
                className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Price: {card.ticketPrice} $
                <svg
                  className="w-3.5 h-3.5 ml-2"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 10"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M1 5h12m0 0L9 1m4 4L9 9"
                  />
                </svg>
              </a>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default ConcertCard;
