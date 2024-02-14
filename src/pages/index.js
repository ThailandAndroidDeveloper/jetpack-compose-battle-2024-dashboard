import Link from "next/link";
import { useEffect, useState } from "react";
import observeUserScore from "./api/_internal/observe-user-score";

const generateHeaderRowQuestionair = (questionGroup) => {
    if (questionGroup == "Easy") {
        return <tr className={"text-gray-500 text-lg"}>
            <th>Q1</th>
            <th>Q2</th>
            <th>Q3</th>
            <th>Q4</th>
        </tr>
    }
    else if (questionGroup == "Medium") {
        return <tr className={"text-gray-500 text-lg"}>
            <th>Q5</th>
            <th>Q6</th>
        </tr>
    } else {
        return <tr className={"text-gray-500 text-lg"}>
            <th>Q7</th>
        </tr>
    }
}

const generateColumnScoreByQuestionair = (questionGroup, answers) => {
    var arrayOrderNumber;
    if (questionGroup == "Easy") {
        arrayOrderNumber = [1, 2, 3, 4]
    } else if (questionGroup == "Medium") {
        arrayOrderNumber = [1, 2]
    } else if (questionGroup == "Hard") {
        arrayOrderNumber = [1]
    }

    return arrayOrderNumber.map((value, index) => {
        var answer = answers.shift()
        if (value != answer?.order ?? -1) {
            return <td>0.0000</td>
        } else {
            return <td>{answer.score}</td>
        }
    });
    // return answers.map((value, index) => {
    //     return <td>{value.score}</td>
    // })
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
    //sort item by the name of the firebase data
    assignments?.forEach((assignment) => {
        if (assignment.level == "Easy") {
            easylevelScore.push({
                order: parseInt(assignment?.name?.slice(-1) ?? "0"),
                score: cutScoreString(assignment?.score ?? 0)
            })
        } else if (assignment.level == "Medium") {
            mediumLevelScore.push({
                order: parseInt(assignment?.name?.slice(-1) ?? "0"),
                score: cutScoreString(assignment?.score ?? 0)
            })
        } else if (assignment.level == "Hard") {
            hardLevelScore.push({
                order: parseInt(assignment?.name?.slice(-1) ?? "0"),
                score: cutScoreString(assignment?.score ?? 0)
            })
        }
        // no Qualify level at final round and need to filter timestamp more
    })

    //sort question number
    easylevelScore?.sort((a, b) => a.order - b.order)
    mediumLevelScore?.sort((a, b) => a.order - b.order)
    hardLevelScore?.sort((a, b) => a.order - b.order)

    return (<div className='overflow-x-auto w-full'>
        <table >
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

const cutScoreString = (score) => {
    if (score == 0) return "0.0000"
    return score.toLocaleString("en-US", { minimumFractionDigits: 4 })
}

const contestantScores = (data) => {
    return data?.map((user, index) => {
        return <>
            <table className="w-full">
                <tbody>
                    <tr className="p-3 shadow-lg shadow-dark-rose" key={user?.username}>
                        <td className="w-[15rem] min-w-[15rem] px-6 py-4 bg-white">
                            <div className="flex flex-col items-center">
                                <div className="stack">
                                    {index == 0 ? (<img className="size-24 aspect-square" src="/image/rank/first.png"></img>) : <></>}
                                    {index == 1 ? (<img className="absolute size-24 aspect-square" src="/image/rank/second.png"></img>) : <></>}
                                    {index == 2 ? (<img className="absolute size-24 aspect-square" src="/image/rank/third.png"></img>) : <></>}
                                    {index == 3 ? (<img className="absolute size-24 aspect-square" src="/image/rank/fourth.png"></img>) : <></>}
                                    {index == 4 ? (<img className="absolute size-24 aspect-square" src="/image/rank/fifth.png"></img>) : <></>}
                                    {index == 5 ? (<img className="absolute size-24 aspect-square" src="/image/rank/sixth.png"></img>) : <></>}
                                    {index == 6 ? (<img className="absolute size-24 aspect-square" src="/image/rank/seventh.png"></img>) : <></>}
                                    {index == 7 ? (<img className="absolute size-24 aspect-square" src="/image/rank/eighth.png"></img>) : <></>}
                                    {index == 8 ? (<img className="absolute size-24 aspect-square" src="/image/rank/ninth.png"></img>) : <></>}
                                    {index == 9 ? (<img className="absolute size-24 aspect-square" src="/image/rank/tenth.png"></img>) : <></>}
                                    {
                                        user?.imgProfile 
                                        ? <img className="size-24 aspect-square object-cover rounded-full border-4 border-rose-300" src={user.imgProfile} /> 
                                        : <div  className="size-24 rounded-full border-4 border-rose-300"></div>
                                    }
                                </div>
                                
                                <div className="mt-2 overflow-ellipsis overflow-hidden whitespace-nowrap text-xl text-rose-600">
                                    {user?.username ?? ""}
                                </div>

                                <div className="overflow-ellipsis overflow-hidden whitespace-nowrap text-xs text-gray-900">
                                    {user?.fullname ?? ""}
                                </div>
                            </div>
                        </td>

                        {/* show table of point */}
                        <td className="w-4/8 px-6 py-4 bg-white text-center">
                            {userScoreDetailContent(user?.assignments)}
                        </td>

                        {/* show full point */}
                        <td className="w-[20rem] min-w-[12rem] bg-rose-200 text-center">
                            <h1 className="font-semibold text-4xl text-gray-900">{cutScoreString(user?.totalScore ?? 0)}</h1>
                        </td>
                    </tr>
                    <tr className="h-4"></tr>
                </tbody>
            </table>
        </>
    });
}

export default function Dashboard() {
    const [userScores, setuserScores] = useState([])
    const [scrollPercentage, _] = useState(0)

    useEffect(() => {
        observeUserScore((userScores) => {
            console.log(userScores)
            setuserScores(userScores)
        });
    }, []);

    return (
        <main className={`flex min-h-screen flex-col items-center bg-white`}>
            <div className="w-full">
                <div className="relative px-8 my-8 overflow-scroll">
                    {contestantScores(userScores)}
                </div>

                {/* implement on Scroll percentage */}
                {
                    scrollPercentage > 3 && <div className="text-white absolute bottom-3 right-32 " style={{ zIndex: "999 !important" }}>
                        <div className="border  shadow-lg p-5 rounded-full bg-purple-500 opacity-70">
                            <h1>Scroll To Top</h1>
                        </div>
                    </div>
                }

            </div>
        </main>)
}