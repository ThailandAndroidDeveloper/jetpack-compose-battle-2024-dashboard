import Link from "next/link";

const rowComponent = () => {
    return (<>
    </>)
}

const cardBody = () => {
    return (<>
    </>)
}


export default function Dashboard() {
    return (
        <main className={`flex min-h-screen flex-col items-center`}>
            <div className="m-10">
                <h1 className="text-white text-5xl font-bold">Dashboard</h1>
            </div>

            <div className="w-full mx-auto px-24">
                <div class="relative overflow-x-auto h-[39rem] dark:bg-gray-700 shadow-md sm:rounded-lg">
                    <table class="w-full text-left text-gray-500 dark:text-gray-400 overscroll-y-visible">
                        <thead className="text-xs sticky top-0 py-3 text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
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
                        </thead>

                        <tbody>
                            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white max-w-[10px]" >
                                    1
                                </th>
                                <td class="px-6 py-4 max-w-[50px]">
                                    {/* image */}
                                    <img src="https://marketplace.canva.com/EAFHfL_zPBk/1/0/1600w/canva-yellow-inspiration-modern-instagram-profile-picture-kpZhUIzCx_w.jpg" className="w-[100px] h-[100]"/>
                                </td>
                                <td class="px-6 py-4 max-w-[50px] overflow-ellipsis overflow-hidden">
                                    Temmies Sammmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm
                                </td>
                                <td class="px-6 py-4" colSpan="3">
                                    4/7
                                </td>
                                <td class="px-6 py-4 text-3xl" colSpan="3">
                                    10
                                    {/* <a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a> */}
                                </td>
                            </tr>

                            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white max-w-[10px]" >
                                    1
                                </th>
                                <td class="px-6 py-4 max-w-[50px]">
                                    {/* image */}
                                    <img src="https://marketplace.canva.com/EAFHfL_zPBk/1/0/1600w/canva-yellow-inspiration-modern-instagram-profile-picture-kpZhUIzCx_w.jpg" className="w-[100px] h-[100]"/>
                                </td>
                                <td class="px-6 py-4 max-w-[50px] overflow-ellipsis overflow-hidden">
                                    Temmies Sammmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm
                                </td>
                                <td class="px-6 py-4" colSpan="3">
                                    4/7
                                </td>
                                <td class="px-6 py-4 text-3xl" colSpan="3">
                                    10
                                    {/* <a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a> */}
                                </td>
                            </tr>

                            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white max-w-[10px]" >
                                    1
                                </th>
                                <td class="px-6 py-4 max-w-[50px]">
                                    {/* image */}
                                    <img src="https://marketplace.canva.com/EAFHfL_zPBk/1/0/1600w/canva-yellow-inspiration-modern-instagram-profile-picture-kpZhUIzCx_w.jpg" className="w-[100px] h-[100]"/>
                                </td>
                                <td class="px-6 py-4 max-w-[50px] overflow-ellipsis overflow-hidden">
                                    Temmies Sammmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm
                                </td>
                                <td class="px-6 py-4" colSpan="3">
                                    4/7
                                </td>
                                <td class="px-6 py-4 text-3xl" colSpan="3">
                                    10
                                    {/* <a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a> */}
                                </td>
                            </tr>

                            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white max-w-[10px]" >
                                    1
                                </th>
                                <td class="px-6 py-4 max-w-[50px]">
                                    {/* image */}
                                    <img src="https://marketplace.canva.com/EAFHfL_zPBk/1/0/1600w/canva-yellow-inspiration-modern-instagram-profile-picture-kpZhUIzCx_w.jpg" className="w-[100px] h-[100]"/>
                                </td>
                                <td class="px-6 py-4 max-w-[50px] overflow-ellipsis overflow-hidden">
                                    Temmies Sammmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm
                                </td>
                                <td class="px-6 py-4" colSpan="3">
                                    4/7
                                </td>
                                <td class="px-6 py-4 text-3xl" colSpan="3">
                                    10
                                    {/* <a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a> */}
                                </td>
                            </tr>


                            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white max-w-[10px]" >
                                    1
                                </th>
                                <td class="px-6 py-4 max-w-[50px]">
                                    {/* image */}
                                    <img src="https://marketplace.canva.com/EAFHfL_zPBk/1/0/1600w/canva-yellow-inspiration-modern-instagram-profile-picture-kpZhUIzCx_w.jpg" className="w-[100px] h-[100]"/>
                                </td>
                                <td class="px-6 py-4 max-w-[50px] overflow-ellipsis overflow-hidden">
                                    Temmies Sammmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm
                                </td>
                                <td class="px-6 py-4" colSpan="3">
                                    4/7
                                </td>
                                <td class="px-6 py-4 text-3xl" colSpan="3">
                                    10
                                    {/* <a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a> */}
                                </td>
                            </tr>

                            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white max-w-[10px]" >
                                    1
                                </th>
                                <td class="px-6 py-4 max-w-[50px]">
                                    {/* image */}
                                    <img src="https://marketplace.canva.com/EAFHfL_zPBk/1/0/1600w/canva-yellow-inspiration-modern-instagram-profile-picture-kpZhUIzCx_w.jpg" className="w-[100px] h-[100]"/>
                                </td>
                                <td class="px-6 py-4 max-w-[50px] overflow-ellipsis overflow-hidden">
                                    Temmies Sammmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm
                                </td>
                                <td class="px-6 py-4" colSpan="3">
                                    4/7
                                </td>
                                <td class="px-6 py-4 text-3xl" colSpan="3">
                                    10
                                    {/* <a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a> */}
                                </td>
                            </tr>

                            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white max-w-[10px]" >
                                    1
                                </th>
                                <td class="px-6 py-4 max-w-[50px]">
                                    {/* image */}
                                    <img src="https://marketplace.canva.com/EAFHfL_zPBk/1/0/1600w/canva-yellow-inspiration-modern-instagram-profile-picture-kpZhUIzCx_w.jpg" className="w-[100px] h-[100]"/>
                                </td>
                                <td class="px-6 py-4 max-w-[50px] overflow-ellipsis overflow-hidden">
                                    Temmies Sammmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm
                                </td>
                                <td class="px-6 py-4" colSpan="3">
                                    4/7
                                </td>
                                <td class="px-6 py-4 text-3xl" colSpan="3">
                                    10
                                    {/* <a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a> */}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

            </div>

        </main>)
}