import Link from "next/link";
import { useEffect, useState } from "react";

const colorStyle = {
    primary: "",
    secondary: "",
    primeTable: "",
    bg: ""
}

const tableHeaderContent = () => {
    return (<>
        <tr>
            <th scope="col" className="px-6 py-5 max-w-[10px]">
                Rank
            </th>

            <th scope="col" className="px-6 text-center">
                Name
            </th>
            <th scope="col" className="px-6 text-center">
                Score Detail
            </th>
            <th scope="col" className="px-6 text-end">
                Total Score
            </th>
        </tr>
    </>)
}

const generateHeaderRowQuestionair = (questionGroup) => {
    if (questionGroup == "Easy") {
        return <tr>
            <th>Q1</th>
            <th>Q2</th>
            <th>Q3</th>
            <th>Q4</th>
        </tr>
    }
    else if (questionGroup == "Medium") {
        return <tr>
            <th>Q5</th>
            <th>Q6</th>
        </tr>
    } else {
        return <tr>
            <th>Q7</th>
        </tr>
    }
}

const generateColumnScoreByQuestionair = (questionGroup, answers) => {
    if (answers.length == 0) {
        if (questionGroup == "Easy") {
            return <>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
            </>
        } else if (questionGroup == "Medium") {
            return <>
                <td>-</td>
                <td>-</td>
            </>
        }
        return <td>-</td>
    }
    return answers.map((value, index) => {
        return <td>{value}</td>
    })
}

const createContentTableForScore = (questionGroup = "Easy", answerScoreArrs = []) => {
    return <div>
        <table class="table">
            <thead>
                {generateHeaderRowQuestionair(questionGroup)}
            </thead>

            <tbody>
                <tr className="border-0">
                    {generateColumnScoreByQuestionair(questionGroup, answerScoreArrs)}
                </tr>
            </tbody>
        </table>
    </div>
}
const userScoreDetailContent = (scoreArrs) => {
    return (<div class='overflow-x-auto w-full'>
        <table className="mx-auto max-w-4xl w-full whitespace-nowrap rounded-box bg-white divide-y divide-gray-300 overflow-hidden">
            <thead class="bg-gray-900">
                <tr class="text-white text-left">
                    <th className="text-sm uppercase px-6 py-4 text-center">Easy (1 point)</th>
                    <th className="text-sm uppercase px-6 py-4 text-center">Medium (3 point)</th>
                    <th className="text-sm uppercase px-6 py-4 text-center">Hard (5 point)</th>
                </tr>
            </thead>

            <tbody>
                <tr>
                    <td className="text-sm px-6 py-4">
                        {createContentTableForScore("Easy")}
                    </td>

                    <td className="text-sm px-6 py-4">{createContentTableForScore("Medium")}</td>
                    <td className="text-sm px-6 py-4">{createContentTableForScore("Hard")}</td>
                </tr>
            </tbody>
        </table>
    </div>)
}

const tableBodyContent = (data, setHoverIndex = () => { }) => {
    return data?.map((element, index) => {
        return (
            <>
                <tbody className="group animate-in fade-in border-opacity-0 bg-gray-800 hover:bg-gray-700">
                    <tr key={index} clasName="group-hover:bg-700 border-opacity-0 bg-white bg-gray-800 border-0">
                        <th scope="row" class="text-xl px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white max-w-[10px]" >
                            {index + 1}
                        </th>
                        <td class="px-6 py-4 max-w-[100px]">
                            {/* image */}
                            <div class="avatar">
                                <div class="w-24 rounded-full">
                                    <img src="https://marketplace.canva.com/EAFHfL_zPBk/1/0/1600w/canva-yellow-inspiration-modern-instagram-profile-picture-kpZhUIzCx_w.jpg" />
                                </div>
                            </div>

                            <div class="overflow-ellipsis overflow-hidden">
                                Temmies Sammmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm
                            </div>
                        </td>

                        {/* show table of point */}
                        <td class="px-6 py-4" className="text-center py-4">
                            {userScoreDetailContent()}
                        </td>

                        {/* show full point */}
                        <td class="px-6 py-4 text-end">
                            <h1 className="font-bold text-xl">50.44</h1>
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
    // const [hoverIndex, setHoverIndex] = useState(-1)

    // useEffect(() => {
    //     console.log("hover " + hoverIndex)
    //     if (hoverIndex != -1) {
    //         const hoverId = document.getElementById("hover-input-" + hoverIndex);
    //         hoverId.focus()
    //     }
    // }, [hoverIndex])

    return (
        <main className={`flex min-h-screen flex-col items-center`}>
            <div className="m-5">
                <h1 className="text-white text-5xl font-bold">Compose Battle</h1>
            </div>

            <div className="w-full mx-auto px-24">
                <div class="relative overflow-x-auto h-[100vh] shadow-md sm:rounded-lg ">
                    <table class="w-full text-left text-gray-500 dark:text-gray-400 overscroll-y-auto">
                        <thead className="text-xs sticky top-0 py-3 text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
                            style={{ zIndex: "999 !important" }}>
                            {tableHeaderContent()}
                        </thead>

                        <tbody>
                            <tr className="border-0"><td>
                                <div className="mt-3"></div>
                            </td></tr>
                        </tbody>
                        {tableBodyContent(joiner)}
                    </table>
                </div>
            </div>
        </main>)
}