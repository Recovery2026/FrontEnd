import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import type { MainTitleItem } from "./memoir.types";

const data: MainTitleItem[] = [
    {
        title: "2026/01/01 회고 - 오늘 공부한 것",
        subMemoirTitles: [
            {
                title: "TSX란?",
            },
        ],
    },
    {
        title: "2026/03/09 회고 - 오늘의 나의 일기",
        subMemoirTitles: [
            {
                title: "문구점을 갔다.",
            },
            {
                title: "산책을 갔다.",
            },
        ],
    },
];

type MainTitleItemStore = {
    mainTitleItems: MainTitleItem[];
    addSubTitle: (mainTitleId: number, newSubTitle: string) => void;
    addMainTitle: (mainTitle: string) => void;
    setMainTitleItems: (mainTitleItems: MainTitleItem[]) => void;
};

export const useMainTitleItemStore = create<MainTitleItemStore>()(
    immer((set) => ({
        mainTitleItems: data,
        addSubTitle: (mainTitleId, newSubTitle) =>
            set((state) => {
                state.mainTitleItems[mainTitleId].subMemoirTitles.push({ title: newSubTitle });
            }),
        addMainTitle: (mainTitle: string) =>
            set((state) => {
                state.mainTitleItems.push({ title: mainTitle, subMemoirTitles: [] });
            }),
        setMainTitleItems: (mainTitleItems: MainTitleItem[]) => set({ mainTitleItems }),
    })),
);
