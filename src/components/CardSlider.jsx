import { useState } from "react";

export default function CardSlider({ concertData }) {
    console.log(concertData)
    const [activeIndex, setActiveIndex] = useState(0);

    const handleActiveIndex = (index) => {
        setActiveIndex(index);
    };

    const handlePrevious = () => {
        const newIndex = (activeIndex - 1 + concertData?.image.length) % concertData?.image.length;
        setActiveIndex(newIndex);
        handleActiveIndex(newIndex);
    };

    const handleNext = () => {
        const newIndex = (activeIndex + 1) % concertData?.image.length;
        setActiveIndex(newIndex);
        handleActiveIndex(newIndex);
    };

    return (
        <>
            <div id="controls-carousel" className="relative w-[50%] mt-8 mb-4" data-carousel="static">
                {
                    concertData?.image.map((item, index) => (
                        <>
                            <div key={item._id} id={`img-${index + 1}`} className={`object-cover bg-red-800 duration-700 ease-in-out transform translate-x-${index - activeIndex} -translate-y-1/2 ${activeIndex === index ? "opacity-100" : "opacity-0"}`} data-carousel-item>
                                <img src={item.photo} className="absolute object-cover block w-full h-[30vh] -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 object-cover" alt="..." />
                            </div>
                        </>
                    ))
                }
                <button onClick={() => handlePrevious()} type="button" className="absolute top-0 left-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" data-carousel-prev>
                    <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
                        <svg className="w-4 h-4 text-white dark:text-gray-800" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 1 1 5l4 4" />
                        </svg>
                        <span className="sr-only">Previous</span>
                    </span>
                </button>
                <button onClick={() => handleNext()} type="button" className="absolute top-0 right-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" data-carousel-next>
                    <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
                        <svg className="w-4 h-4 text-white dark:text-gray-800" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4" />
                        </svg>
                        <span className="sr-only">Next</span>
                    </span>
                </button>
            </div>

        </>
    )
}