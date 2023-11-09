export default function Card({item}) {
    {console.log(item)}
        return (
    
            <div className="max-w-sm w-[350px] h-[100vh] m-5 flex flex-col justify-between bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                <a href="#">
                    <div className="w-[350px] h-[280px] overflow-hidden bg-red-800">
                        <img className="rounded-t-lg object-fill w-[350px] h-[100%]" src={item.image[0].photo} alt="" />
                    </div>
                </a>
                <div className="p-5 h-[55vh] flex flex-col justify-between">
                    <a href="#">
                        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{item.title}</h5>
                    </a>
                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{`${item.description.substring(0,40)}...`}</p>
                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{`${item.locationName.substring(0,30)}...`}</p>
                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{`${item.date} | ${item.hour}`}</p>
                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{`${item.ticketPrice} TL`}</p>
                    <a href="#" className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        Read more
                        <svg className="w-3.5 h-3.5 ml-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                        </svg>
                    </a>
                </div>
            </div>
    
        )
    }