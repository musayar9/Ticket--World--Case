export default function Signup() {
    return (
        <div className=" container mx-auto  my-14 max-2xl:w-[35%] max-xl:w-[55%] max-lg:w-[65%] max-sm:w-[100%]">
            <div className=" p-6 border border-solid border-gray-300">
                <form>
                    <div className="mb-2">
                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 ">Email</label>
                        <input type="email" id="email" className="shadow-sm bg-gray-50 border border-gray-300 outline-none text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-gray-500 block w-full p-2.5" placeholder="davis@flowbite.com" required />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="firstName" className="block mb-2 text-sm font-medium text-gray-900 ">First name</label>
                        <input type="text" id="firstName" className="shadow-sm bg-gray-50 border border-gray-300 outline-none text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-gray-500 block w-full p-2.5" placeholder="Davis" required />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="lastName" className="block mb-2 text-sm font-medium text-gray-900 ">Last name</label>
                        <input type="text" id="lastName" className="shadow-sm bg-gray-50 border border-gray-300 outline-none text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-gray-500 block w-full p-2.5" placeholder="Joseph" required />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 ">Password</label>
                        <input type="password" id="password" className="shadow-sm bg-gray-50 border border-gray-300 outline-none text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-gray-500 block w-full p-2.5" placeholder="******" required />
                    </div>
                    <div className="flex items-start mb-6">
                        <div className="flex items-center h-5">
                            <input id="terms" type="checkbox" value="" className="w-4 h-4 border border-gray-300 outline-none rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800" required />
                        </div>
                        <label htmlFor="terms" className="ml-2 text-sm">I agree with the <a href="#" className="text-blue-600 hover:underline dark:text-blue-500">terms and conditions</a></label>
                    </div>
                    <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Register new account</button>
                </form>
            </div>
            <div className="border border-solid border-gray-300 p-4 my-2" role="group">
                <label htmlFor="terms" className="ml-2 text-sm ">Do you already have an account? <a href="#" className="text-blue-600 hover:underline dark:text-blue-500">Log in</a></label>
            </div>

        </div>

    )
}