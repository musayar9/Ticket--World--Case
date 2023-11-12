import { BsTrash3Fill } from "react-icons/bs";

export default function CartCard() {
    return (
        <div className="w-[100%] flex text-gray-800 justify-between items-center px-4 py-2 border border-gray-700 rounded-lg shadow">
            <a href="#">
                <h5 className="mb-2 text-medium font-bold tracking-tight text-gray-900">Sıla Ankara Konseri</h5>
            </a>
            <p className="mb-3 font-normal text-gray-700">2023-11-24 | 16:30</p>
            <span className="bg-red-100 text-red-800 text-base font-medium me-2 px-2.5 py-0.5 my-2 rounded">850 TL</span>
            <button type="button" className="text-red-800"><BsTrash3Fill /></button>

        </div>
    )
}