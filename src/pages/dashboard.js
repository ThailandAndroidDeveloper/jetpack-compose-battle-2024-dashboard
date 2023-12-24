import Link from "next/link";
import { useEffect, useState } from "react";

const tableHeaderContent = () => {
    return (<>
        <tr>
            <th scope="col" class="px-6 py-5 max-w-[10px]">
                Rank
            </th>
            <th scope="col" class="px-6">
                {/* for image */}
            </th>
            <th scope="col" class="px-6">
                Name
            </th>
            <th scope="col" colSpan="3" class="px-6">
                Complete
            </th>
            <th scope="col" colSpan="3" class="px-6">
                Point
                {/* <span class="sr-only">Edit</span> */}
            </th>
        </tr>
    </>)
}

const tableBodyContent = (data, setHoverIndex) => {
    return data?.map((element, index) => {
        return (
            <>
                <tbody className="group animate-in fade-in border-opacity-0 bg-gray-800 hover:bg-gray-700">
                    <tr key={index} clasName="group-hover:bg-700 border-opacity-0 bg-white bg-gray-800 border-0"
                        onMouseEnter={() => setHoverIndex(index)} onMouseLeave={() => setHoverIndex(-1)}
                    >
                        <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white max-w-[10px]" >
                            {index + 1}
                        </th>
                        <td class="px-6 py-4 max-w-[50px]">
                            {/* image */}
                            <div class="avatar">
                                <div class="w-24 rounded-full">
                                    <img src="https://marketplace.canva.com/EAFHfL_zPBk/1/0/1600w/canva-yellow-inspiration-modern-instagram-profile-picture-kpZhUIzCx_w.jpg" />
                                </div>
                            </div>
                            {/* <img src="https://marketplace.canva.com/EAFHfL_zPBk/1/0/1600w/canva-yellow-inspiration-modern-instagram-profile-picture-kpZhUIzCx_w.jpg" className="w-[100px] h-[100]" /> */}
                        </td>
                        <td class="px-6 py-4 max-w-[50px] overflow-ellipsis overflow-hidden">
                            Temmies Sammmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm
                        </td>
                        <td class="px-6 py-4" colSpan="3">
                            <div>4/7</div>
                        </td>
                        <td class="px-6 py-4 text-3xl" colSpan="3">
                            10
                            {/* <a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a> */}
                        </td>
                    </tr>

                    {/* hidden data */}
                    <tr className="animate-in fade-in  dark:bg-gray-900">
                        <td colSpan={12}>
                            <div tabindex={index} className="collapse focus:outline-none" id={"hover-input-" + index}>
                                {/* <input type="checkbox" id={"hover-input-"+index} />  */}
                                <div className="collapse-content">
                                    <div>
                                        <h1>Score part 1: .....</h1>
                                        <h1>Score part 2: .....</h1>
                                        <h1>Score part 3: .....</h1>
                                    </div>
                                </div>
                            </div>
                        </td>
                    </tr>

                    {/* <tr class="animate-in fade-in bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"><td colSpan={12}>
                    <button className="text-center w-full">expand</button>
                </td></tr> */}
                    {/* padding between data */}
                    {/* {index < data.length - 1 &&
                    <tr className="border-0"><td>
                        <div className="mt-3"></div>
                    </td></tr>
                } */}
                </tbody>
                {index < data.length - 1 &&
                    <tbody>
                        <tr className="border-0"><td>
                            <div className="mt-3"></div>
                        </td></tr>
                    </tbody>

                }

            </>
        )
    });
}

const shaffle = () => {

}

const createData = (number) => {
    let arrs = []
    for (let i = 0; i < number; i++) {
        arrs.push(
            {
                name: "Thitare Nimanong",
                complete: "5",
                point: "30"
            }
        )
    }
    return arrs
}

export default function Dashboard() {
    const [joiner, setJoiner] = useState(createData(50))
    const [hoverIndex, setHoverIndex] = useState(-1)
    useEffect(() => {
        console.log("hover " + hoverIndex)
        if (hoverIndex != -1) {
            const hoverId = document.getElementById("hover-input-" + hoverIndex);
            hoverId.focus()
        }
    }, [hoverIndex])
    return (
        <main className={`flex min-h-screen flex-col items-center`}>
            <div className="m-10">
                <h1 className="text-white text-5xl font-bold">Dashboard</h1>
            </div>

            <div className="w-full mx-auto px-24">
                {/* dark:bg-gray-700 */}
                <div class="relative overflow-x-auto h-[39rem] shadow-md sm:rounded-lg ">
                    <table class="w-full text-left text-gray-500 dark:text-gray-400 overscroll-y-auto">
                        <thead className="text-xs sticky top-0 py-3 text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            {tableHeaderContent()}
                        </thead>

                        <tbody>
                            <tr className="border-0"><td>
                                <div className="mt-3"></div>
                            </td></tr>
                        </tbody>
                        {tableBodyContent(joiner, setHoverIndex)}
                        {/* <tbody className="border-opacity-0">
                            <tr className="border-opacity-0"><td>
                                <div className="mt-3"></div>
                            </td></tr>

                            {tableBodyContent(joiner)}
                        </tbody> */}
                    </table>
                </div>
            </div>
        </main>)
}