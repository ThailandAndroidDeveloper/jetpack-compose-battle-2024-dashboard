import Link from "next/link";
import { useEffect, useState } from "react";
import observeUserScore from "./api/_internal/observe-user-score";

const colorStyle = {
    primary: "#42193e",
    primaryDarker: "#ffa3f6",
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
        return <td>{value.score}</td>
    })
}

const createContentTableForScore = (questionGroup = "Easy", answerScoreArrs) => {
    return <div>
        <table className="table">
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

const userScoreDetailContent = (assignments) => {
    const easylevelScore = []
    const mediumLevelScore = []
    const hardLevelScore = []
    assignments?.forEach((assignment) => {
        if (assignment.level == "Easy") {
            easylevelScore.push({
                order: parseInt(assignment?.name?.slice(-1) ?? "0"),
                score: assignment?.score.toString() ?? "-"
            })
        } else if (assignment.level == "medium") {
            mediumLevelScore.push({
                order: parseInt(assignment?.name?.slice(-1) ?? "0"),
                score: assignment?.score.toString() ?? "-"
            })
        } else {
            hardLevelScore.push({
                order: parseInt(assignment?.name?.slice(-1) ?? "0"),
                score: assignment?.score?.toString() ?? "-"
            })
        }
    })

    console.log(easylevelScore)

    //sort question number
    easylevelScore?.sort((a, b) => a.order - b.order)
    mediumLevelScore?.sort((a, b) => a.order - b.order)
    hardLevelScore?.sort((a, b) => a.order - b.order)

    return (<div className='overflow-x-auto w-full'>
        <table className="mx-auto max-w-4xl w-full whitespace-nowrap rounded-box bg-white shadow-md my-2 overflow-hidden">
            <thead className="bg-pink-400">
                <tr className="text-white text-left">
                    <th className="text-sm uppercase px-6 py-4 text-center">Easy (1 point)</th>
                    <th className="text-sm uppercase px-6 py-4 text-center">Medium (3 point)</th>
                    <th className="text-sm uppercase px-6 py-4 text-center">Hard (5 point)</th>
                </tr>
            </thead>

            <tbody>
                <tr>
                    <td className="text-sm px-6 py-4">
                        {createContentTableForScore("Easy", easylevelScore)}
                    </td>

                    <td className="text-sm px-6 py-4">{createContentTableForScore("Medium", mediumLevelScore)}</td>
                    <td className="text-sm px-6 py-4">{createContentTableForScore("Hard", hardLevelScore)}</td>
                </tr>
            </tbody>
        </table>
    </div>)
}

const tableBodyContent = (data) => {
    return data?.map((user, index) => {
        return (
            <>
                <tbody className="group animate-in fade-in border-opacity-0 bg-[#ffffff] text-black">
                    <tr key={index} clasName="group-hover:bg-700 border-opacity-0 bg-white bg-gray-800 border-0">
                        <th scope="row" class="text-xl px-6 py-4 font-medium  whitespace-nowrap max-w-[10px]" >
                            {index + 1}
                        </th>
                        <td class="px-6 py-4 max-w-[10em]">
                            {/* image */}
                            <div class="avatar">
                                <div class="w-24 rounded-full">
                                    <img src="https://marketplace.canva.com/EAFHfL_zPBk/1/0/1600w/canva-yellow-inspiration-modern-instagram-profile-picture-kpZhUIzCx_w.jpg" />
                                </div>
                            </div>

                            <div class="overflow-ellipsis overflow-hidden whitespace-nowrap">
                                {user?.username ?? ""}
                            </div>
                        </td>

                        {/* show table of point */}
                        <td class="px-6 py-4" className="text-center py-4">
                            {userScoreDetailContent(user?.assignments)}
                        </td>

                        {/* show full point */}
                        <td class="px-6 py-4 text-end">
                            <h1 className="font-bold text-xl">{user?.totalScore ?? "0"}</h1>
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
    const [userScores, setuserScores] = useState([])

    useEffect(() => {
        observeUserScore((userScores) => {
            setuserScores(userScores)
        });
      }, []);

    useEffect(() => {
        console.log(userScores)
    }, [userScores])

    return (
        <main className={`flex min-h-screen flex-col items-center`}>
            <img/>
            <div className="my-20">
                <h1 className="text-white text-6xl font-mono font-semibold uppercase">Compose Battle</h1>
            </div>

            <div className="w-full mx-auto px-24">
                <div class="relative overflow-x-auto h-[100vh] sm:rounded-lg ">
                    <table class="w-full text-left text-white overscroll-y-auto">
                        <thead className={`text-xs sticky top-0 py-3 uppercase bg-pink-500`}
                            style={{ zIndex: "999 !important" }}>
                            {tableHeaderContent()}
                        </thead>

                        <tbody>
                            <tr className="border-0"><td>
                                <div className="mt-3"></div>
                            </td></tr>
                        </tbody>
                        {tableBodyContent(userScores)}
                    </table>
                </div>
            </div>
        </main>)
}