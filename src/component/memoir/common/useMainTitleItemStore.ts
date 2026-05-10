import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import type {
    AddTitlePayload,
    MainTitleItem,
    MemoirState,
    SetImprovementPayLoad,
    SubTitleItem,
    TitleTargetPayload,
    UpdateTitlePayload,
} from "./memoir.types";

type MainTitleItemLegacy = {
    title: string;
    subMemoirTitles: Record<string, { title: string }>;
};

type LegacyImprovementItem = {
    improvement: string;
    subImprovements: Record<string, { improvement: string }>;
};

type ApiMemoirResponse = {
    list: Array<{
        date: string;
        id: number;
        memoir: Record<string, MainTitleItemLegacy>;
    }>;
    total: number;
};

const data: ApiMemoirResponse = {
    list: [
        {
            date: "2026-04-23T04:40:25.134587Z",
            id: 1,
            memoir: {
                "1": {
                    title: "2026/01/01 회고 - 오늘 공부한 것",
                    subMemoirTitles: {
                        "1": {
                            title: "TSX란?",
                        },
                    },
                },
                "2": {
                    title: "2026/03/09 회고 - 오늘의 나의 일기",
                    subMemoirTitles: {
                        "1": {
                            title: "문구점을 갔다.",
                        },
                        "2": {
                            title: "산책을 갔다.",
                        },
                    },
                },
            },
        },
    ],
    total: 1,
};

const improvementData: Record<string, LegacyImprovementItem> = {
    1: {
        improvement: "TSX를 공부했다.",
        subImprovements: {
            1: {
                improvement: "TSX는 React 컴포넌트 정의를 위한 TypeScript기반 파일이다.",
            },
        },
    },
};

const normalizeInitialData = (apiData: ApiMemoirResponse): MemoirState => {
    const mainTitleIds: string[] = [];
    const mainTitlesById: Record<string, MainTitleItem> = {};
    const subTitlesById: Record<string, SubTitleItem> = {};
    const dateById: Record<string, string> = {};

    // 첫 번째 memoir 데이터 사용
    if (apiData.list.length === 0) {
        return { mainTitleIds, mainTitlesById, subTitlesById, dateById };
    }

    const memoirData = apiData.list[0];
    const legacyData = memoirData.memoir;

    for (const id in legacyData) {
        const mainItem = legacyData[id];
        const subIds: string[] = [];

        mainTitlesById[id] = {
            id,
            title: mainItem.title,
            subTitleIds: subIds,
        };

        dateById[id] = memoirData.date;

        for (const subId in mainItem.subMemoirTitles) {
            const sid = `${id}-${subId}`;
            subIds.push(sid);
            subTitlesById[sid] = {
                id: sid,
                title: mainItem.subMemoirTitles[subId].title,
                parentMainTitleId: id,
            };
        }

        mainTitleIds.push(id);
    }

    return { mainTitleIds, mainTitlesById, subTitlesById, dateById };
};

const normalizeImprovementData = (legacyData: Record<number, LegacyImprovementItem>) => {
    const improvementsById: Record<string, { improvement: string }> = {};
    const subImprovementsById: Record<string, { improvement: string }> = {};

    for (const id in legacyData) {
        const improvementItem = legacyData[id];
        improvementsById[id] = {
            improvement: improvementItem.improvement,
        };

        for (const subId in improvementItem.subImprovements) {
            const sid = `${id}-${subId}`;
            subImprovementsById[sid] = {
                improvement: improvementItem.subImprovements[subId].improvement,
            };
        }
    }
    return { improvementsById, subImprovementsById };
};

const initialState = normalizeInitialData(data);
const initialImprovementState = normalizeImprovementData(improvementData);

type MainTitleItemStore = {
    mainTitleIds: string[];
    mainTitlesById: Record<string, MainTitleItem>;
    subTitlesById: Record<string, SubTitleItem>;
    dateById: Record<string, string>;
    addTitle: (payload: AddTitlePayload) => void;
    deleteTitle: (payload: TitleTargetPayload) => void;
    updateTitle: (payload: UpdateTitlePayload) => void;
};

type ImprovementItemStore = {
    improvementsById: Record<string, { improvement: string }>;
    subImprovementsById: Record<string, { improvement: string }>;
    setImprovement: (payload: SetImprovementPayLoad) => void;
    saveImprovement: (id: string, improvement: string) => void;
};

export const useMainTitleItemStore = create<MainTitleItemStore>()(
    immer((set) => ({
        ...initialState,
        addTitle: (payload) =>
            set((state) => {
                if (payload.kind === "MAIN") {
                    const mainId = String(state.mainTitleIds.length + 1);
                    state.mainTitleIds.push(mainId);
                    state.mainTitlesById[mainId] = {
                        id: mainId,
                        title: payload.title,
                        subTitleIds: [],
                    };
                    return;
                }

                const mainTitle = state.mainTitlesById[payload.parentMainTitleId];
                if (!mainTitle) {
                    return;
                }

                const parentMainTitleId = payload.parentMainTitleId;
                const subId = `${parentMainTitleId}-${state.mainTitlesById[parentMainTitleId].subTitleIds.length + 1}`;
                mainTitle.subTitleIds.push(subId);
                state.subTitlesById[subId] = {
                    id: subId,
                    title: payload.title,
                    parentMainTitleId: payload.parentMainTitleId,
                };
            }),
        deleteTitle: (payload) =>
            set((state) => {
                if (payload.kind === "MAIN") {
                    const mainTitle = state.mainTitlesById[payload.id];
                    if (!mainTitle) {
                        return;
                    }

                    mainTitle.subTitleIds.forEach((subId) => {
                        delete state.subTitlesById[subId];
                    });
                    delete state.mainTitlesById[payload.id];
                    state.mainTitleIds = state.mainTitleIds.filter((mainId) => mainId !== payload.id);
                    return;
                }

                const subTitle = state.subTitlesById[payload.id];
                if (!subTitle) {
                    return;
                }

                const parent = state.mainTitlesById[subTitle.parentMainTitleId];
                if (parent) {
                    parent.subTitleIds = parent.subTitleIds.filter((subId) => subId !== payload.id);
                }
                delete state.subTitlesById[payload.id];
            }),
        updateTitle: (payload) =>
            set((state) => {
                if (payload.kind === "MAIN") {
                    const mainTitle = state.mainTitlesById[payload.id];
                    if (mainTitle) {
                        mainTitle.title = payload.title;
                    }
                    return;
                }

                const subTitle = state.subTitlesById[payload.id];
                if (subTitle) {
                    subTitle.title = payload.title;
                }
            }),
    })),
);

export const useImprovementItemStore = create<ImprovementItemStore>()(
    immer((set) => ({
        ...initialImprovementState,
        setImprovement: (payload) =>
            set((state) => {
                if (payload.kind === "MAIN") {
                    state.improvementsById[payload.id] = { improvement: payload.improvement };
                    return;
                }

                state.subImprovementsById[payload.id] = { improvement: payload.improvement };
            }),
        saveImprovement: (id: string, improvement: string) =>
            set((state) => {
                // id에 "-"가 있으면 SUB, 없으면 MAIN
                const kind: "MAIN" | "SUB" = id.includes("-") ? "SUB" : "MAIN";

                if (kind === "MAIN") {
                    state.improvementsById[id] = { improvement };
                    return;
                }

                state.subImprovementsById[id] = { improvement };
            }),
    })),
);
