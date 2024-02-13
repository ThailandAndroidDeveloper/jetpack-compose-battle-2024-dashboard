import Link from "next/link";
import { useEffect, useState } from "react";
import observeUserScore from "./api/_internal/observe-user-score";

const tableHeaderContent = () => {
    return (<>
        <tr>
            <th scope="col" className="px-6 py-5 max-w-[10px] text-lg">
                Rank
            </th>

            <th scope="col" className="px-6 text-center text-lg">
                Name
            </th>
            <th scope="col" className="px-6 text-center text-lg">
                Score Detail
            </th>
            <th scope="col" className="px-6 text-center text-lg">
                Total Score
            </th>
        </tr>
    </>)
}

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

const cutScoreString = (score) => {
    if (score == 0) return "0.0000"
    return score.toLocaleString("en-US", { minimumFractionDigits: 4 })
}

const competitors = [
    {
        "akexorcist": {
            "name": "Somkiat Khitwongwattana",
            "photo": "/image/competitor/akexorcist.jpg"
        }
    }
]

const tableBodyContent = (data) => {
    return data?.map((user, index) => {
        return <>
            <tr className="border-opacity-0 bg-[#ffffff] text-black" key={user?.username}>
                <th scope="row" className="text-3xl px-6 py-4 font-medium  whitespace-nowrap max-w-[80px] text-center" >
                    <div className="flex-row">
                        {index == 0 ? (<img width={100} src="/ic_crown.png" className="mx-auto"></img>) : <></>}
                        {index + 1}
                    </div>

                </th>

                <td className="px-6 py-4 max-w-[10em] text-center">
                    {/* image */}
                    {
                        user?.imgProfile ? <>
                            <div className="avatar">
                                <div className="w-24 rounded-full">
                                    <img src={user.imgProfile} />
                                </div>
                            </div>
                        </> : <>
                            <div className="avatar">
                                <div className="w-24 rounded-full">
                                    <img src="https://marketplace.canva.com/EAFHfL_zPBk/1/0/1600w/canva-yellow-inspiration-modern-instagram-profile-picture-kpZhUIzCx_w.jpg" />
                                </div>
                            </div>
                        </>
                    }

                    <div className="overflow-ellipsis overflow-hidden whitespace-nowrap">
                        {user?.username ?? ""}
                    </div>
                </td>

                {/* show table of point */}
                <td className="px-6 py-4 text-center">
                    {userScoreDetailContent(user?.assignments)}
                </td>

                {/* show full point */}
                <td className="px-6 py-4 text-center">
                    <h1 className="font-semibold text-2xl">{cutScoreString(user?.totalScore ?? 0)}</h1>
                </td>
            </tr>
        </>

    });
}

export default function Dashboard() {
    const [userScores, setuserScores] = useState([])
    const [isShowFullTable, setIsShowFullTable] = useState(false)
    const [scrollPercentage, setScrollPercentage] = useState(0)

    useEffect(() => {
        observeUserScore((userScores) => {
            console.log(userScores)
            setuserScores(userScores)
        });
    }, []);

    return (
        <main className={`flex min-h-screen flex-col items-center`}>
            {
                isShowFullTable == false && (<div className="mt-20 flex-row text-white" onClick={() => {
                    setIsShowFullTable(true)
                }}>
                    <div className="mx-auto">
                        <h1 className="text-6xl font-mono font-semibold uppercase">Compose Battle</h1>
                    </div>
                    <div className="mx-auto mt-3 flex-row">
                        <h1 className="mx-auto w-fit">Click here to show table full screen</h1>
                        <img className="mx-auto" width={40} src="ic_down_arrow.png" />
                    </div>
                </div>
                )

            }

            <div className="w-full mx-auto px-24">
                <div className="relative overflow-x-auto h-[100vh] sm:rounded-lg ">
                    <table className="w-full text-left text-white overscroll-y-auto animate-in fade-in myTable">
                        <thead className={`text-xs sticky top-0 py-3 uppercase bg-pink-500`}
                            style={{ zIndex: "999 !important" }}>
                            {tableHeaderContent()}
                        </thead>

                        <tbody>
                            {tableBodyContent(userScores)}
                        </tbody>

                    </table>
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