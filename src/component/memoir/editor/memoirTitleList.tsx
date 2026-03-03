import "./memoirTitleList.scss";
import { useState } from "react";
import type { MainTitleItem } from "../common/memoir.types.ts";
import MainMamoirTitle from "./mainMemoirTitle.tsx";
import EditMainMemoirTitle from "./editMainMemoirTitle.tsx";

const data: MainTitleItem[] = [
    {
        title: "2026/01/01 회고 - 오늘 공부한 것",
        subMemoirTitles: [
            {
                title: "TSX란?",
            },
        ],
    },
];

const MemoirTitleList = () => {
    const [memoirTitles, setMemoirTitles] = useState<MainTitleItem[]>(data);

    return (
        <div className="memoir-div">
            <div className="memoir-title">
                <span>오늘의 나를 회고해보세요</span>
            </div>
            <div className="memoir-list">
                {memoirTitles.map((memoirTitle: MainTitleItem, idx: number) => {
                    return (
                        <MainMamoirTitle key={idx} id={idx} titleItems={memoirTitles} setTitleItems={setMemoirTitles} />
                    );
                })}
                <EditMainMemoirTitle memoirTitles={memoirTitles} setMemoirTitles={setMemoirTitles} />
            </div>
        </div>
    );
};

export default MemoirTitleList;
