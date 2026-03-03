import type { MainTitleItem } from "./memoir.types";

const findMainTitleById = (titleItems: MainTitleItem[], id: number): MainTitleItem => {
    return titleItems.find((item, idx) => id === idx)!;
};

const addSubTitle = (titleItems: MainTitleItem[], newSubTitle: string, mainTitleId: number): MainTitleItem[] => {
    return titleItems.map((mainTitle: MainTitleItem, idx: number) => {
        if (idx === mainTitleId) {
            return {
                title: mainTitle.title,
                subMemoirTitles: [...mainTitle.subMemoirTitles, { title: newSubTitle }],
            };
        }
        return mainTitle;
    });
};

const addMainTitle = (titleItems: MainTitleItem[], newMainTitle: string): MainTitleItem[] => {
    return [
        ...titleItems,
        {
            title: newMainTitle,
            subMemoirTitles: [],
        },
    ];
};

export { findMainTitleById, addSubTitle, addMainTitle };
