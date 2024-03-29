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

        if (questionGroup == "Easy") {
            return <div className="w-1/2 min-w-[4rem] bg-teal-50 mx-2 shadow-lg shadow-dark-rose">
                <div className="flex flex-col text-center py-4">
                    <div className="text-teal-600">
                        {questionGroup + " " + (index + 1)}
                    </div>
                    <div className="text-gray-900 font-semibold text-xl mt-4">
                        {value != answer?.order ?? -1 ? "0" : answer.score}
                    </div>
                </div>
            </div>
        } else if (questionGroup == "Medium") {
            return <div className="w-1/2 min-w-[4rem] bg-amber-50 mx-2 shadow-lg shadow-dark-rose">
                <div className="flex flex-col text-center py-4">
                    <div className="text-amber-600">
                        {questionGroup + " " + (index + 1)}
                    </div>
                    <div className="text-gray-900 font-semibold text-xl mt-4">
                        {value != answer?.order ?? -1 ? "0" : answer.score}
                    </div>
                </div>
            </div> 
        } else if (questionGroup == "Hard") {
            return <div className="w-1/2 min-w-[4rem] bg-red-50 mx-2 shadow-lg shadow-dark-rose">
                <div className="flex flex-col text-center py-4">
                    <div className="text-red-600">
                        {questionGroup + " " + (index + 1)}
                    </div>
                    <div className="text-gray-900 font-semibold text-xl mt-4">
                        {value != answer?.order ?? -1 ? "0" : answer.score}
                    </div>
                </div>
            </div>   
        } else {
            return <></>
        }
    });
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
                score: parseDisplayScore(assignment?.score ?? 0)
            })
        } else if (assignment.level == "Medium") {
            mediumLevelScore.push({
                order: parseInt(assignment?.name?.slice(-1) ?? "0"),
                score: parseDisplayScore((assignment?.score * 3) ?? 0)
            })
        } else if (assignment.level == "Hard") {
            hardLevelScore.push({
                order: parseInt(assignment?.name?.slice(-1) ?? "0"),
                score: parseDisplayScore((assignment?.score * 5) ?? 0)
            })
        }
        // no Qualify level at final round and need to filter timestamp more
    })

    //sort question number
    easylevelScore?.sort((a, b) => a.order - b.order)
    mediumLevelScore?.sort((a, b) => a.order - b.order)
    hardLevelScore?.sort((a, b) => a.order - b.order)

    return (<div className='flex flex-row w-full h-32 px-4'>
        {generateColumnScoreByQuestionair("Easy", easylevelScore)}
        <div className="w-20" />
        {generateColumnScoreByQuestionair("Medium", mediumLevelScore)}
        <div className="w-20" />
        {generateColumnScoreByQuestionair("Hard", hardLevelScore)}
    </div>)
}

const parseDisplayScore = (score) => {
    if (score == 0) return "0"
    return parseFloat(score.toFixed(3))
}

const getTotalScore = (user) => {
    let totalScore = user?.assignments.reduce((prev, assignment) => {
        if (assignment.level == "Easy") {
            return prev + assignment.score
        } else if (assignment.level == "Medium") {
            return prev + (assignment.score * 3)
        } else if (assignment.level == "Hard") {
            return prev + (assignment.score * 5)
        } else {
            return 0
        }
    }, 0) ?? 0
    return parseDisplayScore(totalScore)
}

const contestantScores = (data) => {
    return data?.map((user, index) => {
        return <>
            <table className="w-full">
                <tbody>
                    <tr className="p-3 shadow-lg shadow-dark-rose" key={user?.username}>
                        <td className="w-[15rem] min-w-[15rem] px-6 py-4 bg-white">
                            <div className="flex flex-col items-center">
                                <div className="stack max-h-[8rem] aspect-square">
                                    {index == 0 ? (<img src="/image/rank/first.webp"></img>) : <></>}
                                    {index == 1 ? (<img src="/image/rank/second.webp"></img>) : <></>}
                                    {index == 2 ? (<img src="/image/rank/third.webp"></img>) : <></>}
                                    {index == 3 ? (<img src="/image/rank/fourth.webp"></img>) : <></>}
                                    {index == 4 ? (<img src="/image/rank/fifth.webp"></img>) : <></>}
                                    {index == 5 ? (<img src="/image/rank/sixth.webp"></img>) : <></>}
                                    {index == 6 ? (<img src="/image/rank/seventh.webp"></img>) : <></>}
                                    {index == 7 ? (<img src="/image/rank/eighth.webp"></img>) : <></>}
                                    {index == 8 ? (<img src="/image/rank/ninth.webp"></img>) : <></>}
                                    {index == 9 ? (<img src="/image/rank/tenth.webp"></img>) : <></>}
                                    {
                                        user?.imgProfile 
                                        ? <img className="aspect-square object-cover rounded-full border-4 border-rose-300" src={user.imgProfile} /> 
                                        : <div className="rounded-full border-4 border-rose-300"></div>
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
                        <td className="hidden expand:table-cell expand:w-4/8 h-full">
                            {userScoreDetailContent(user?.assignments)}
                        </td>

                        {/* show full point */}
                        <td className="w-[20rem] min-w-[12rem] bg-rose-200 text-center">
                            <div className="font-semibold text-4xl text-gray-900">{getTotalScore(user)}</div>
                        </td>
                    </tr>
                    <tr className="h-4"></tr>
                </tbody>
            </table>
        </>
    });
}

const getTotalScoreInt = (user) => {
    return user?.assignments.reduce((prev, assignment) => {
        if (assignment.level == "Easy") {
            return prev + assignment.score
        } else if (assignment.level == "Medium") {
            return prev + (assignment.score * 3)
        } else if (assignment.level == "Hard") {
            return prev + (assignment.score * 5)
        } else {
            return 0
        }
    }, 0) ?? 0
}

export default function Dashboard() {
    const [userScores, setuserScores] = useState([])
    const [scrollPercentage, _] = useState(0)

    useEffect(() => {
        observeUserScore((userScores) => {
            const list = userScores?.map((value, index) => {
                return {
                    ...value,
                    totalScoreForOrder: getTotalScoreInt(value)
                }
            })


            list.sort((a, b) => {
                if (a.totalScoreForOrder !== b.totalScoreForOrder) {
                    return b.totalScoreForOrder - a.totalScoreForOrder; // Descending order of totalScore
                }
                //     // If totalScore is the same, compare by timestamp
                return a.timestamp - b.timestamp; // Ascending order of timestamp
            })

            console.log("addtotalScoreForOrder", list)
            setuserScores(list)
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