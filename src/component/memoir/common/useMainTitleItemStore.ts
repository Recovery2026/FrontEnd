import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import type {
    AddTitlePayload,
    ApiMemoirResponse,
    ImprovementItem,
    MainTitleItem,
    MemoirItem,
    MemoirResponse,
    MemoirState,
    SetImprovementPayLoad,
    SubTitleItem,
    TitleTargetPayload,
    UpdateTitlePayload,
} from "./memoir.types";

type ImprovementStoreState = {
    improvementsById: Record<string, { improvement: string }>;
    subImprovementsById: Record<string, { improvement: string }>;
};

type FeedbackStoreState = {
    feedbacksById: Record<string, { feedback: string }>;
    subFeedbacksById: Record<string, { feedback: string }>;
};

type MemoirWriteDataState = MemoirState &
    ImprovementStoreState &
    FeedbackStoreState & {
        memoirData: MemoirResponse | null;
        isLoading: boolean;
        errorMessage: string | null;
    };

export type MemoirWriteStore = MemoirWriteDataState & {
    setMemoirWriteData: (apiData: ApiMemoirResponse) => void;
    resetMemoirWriteData: () => void;
    setLoading: (isLoading: boolean) => void;
    setErrorMessage: (errorMessage: string | null) => void;
    addTitle: (payload: AddTitlePayload) => void;
    deleteTitle: (payload: TitleTargetPayload) => void;
    updateTitle: (payload: UpdateTitlePayload) => void;
    setImprovement: (payload: SetImprovementPayLoad) => void;
    saveImprovement: (id: string | null, improvement: string) => void;
    getMemoirTitleData: () => Record<string, MemoirItem>;
    getImprovementData: () => Record<string, ImprovementItem>;
};

const emptyMemoirData: MemoirResponse = {
    feedback: {},
    improvement: {},
    memoir: {},
};

const initialMemoirData: MemoirResponse = {
    feedback: {},
    improvement: {},
    memoir: {},
};

const toMemoirResponse = (apiData: ApiMemoirResponse): MemoirResponse => {
    if ("list" in apiData) {
        const firstMemoir = apiData.list[0];

        if (!firstMemoir) {
            return emptyMemoirData;
        }

        return {
            id: firstMemoir.id,
            date: firstMemoir.date,
            feedback: firstMemoir.feedback ?? {},
            improvement: firstMemoir.improvement ?? {},
            memoir: firstMemoir.memoir,
        };
    }

    return {
        id: apiData.id,
        date: apiData.date,
        feedback: apiData.feedback ?? {},
        improvement: apiData.improvement ?? {},
        memoir: apiData.memoir ?? {},
    };
};

const getNextNumberId = (ids: string[]) => {
    const maxId = ids.reduce((max, id) => {
        const numericId = Number(id);
        return Number.isFinite(numericId) ? Math.max(max, numericId) : max;
    }, 0);

    return String(maxId + 1);
};

const getNextSubTitleId = (mainTitle: MainTitleItem) => {
    const maxSubId = mainTitle.subTitleIds.reduce((max, id) => {
        const [, subId] = id.split("-");
        const numericId = Number(subId);
        return Number.isFinite(numericId) ? Math.max(max, numericId) : max;
    }, 0);

    return `${mainTitle.id}-${maxSubId + 1}`;
};

const normalizeTitleData = (memoirData: MemoirResponse): MemoirState => {
    const mainTitleIds: string[] = [];
    const mainTitlesById: Record<string, MainTitleItem> = {};
    const subTitlesById: Record<string, SubTitleItem> = {};
    const dateById: Record<string, string> = {};

    for (const id in memoirData.memoir) {
        const mainItem = memoirData.memoir[id];
        const subTitleIds: string[] = [];

        mainTitlesById[id] = {
            id,
            title: mainItem.title,
            subTitleIds,
        };

        if (memoirData.date) {
            dateById[id] = memoirData.date;
        }

        for (const subId in mainItem.subMemoirTitles) {
            const normalizedSubId = `${id}-${subId}`;
            subTitleIds.push(normalizedSubId);
            subTitlesById[normalizedSubId] = {
                id: normalizedSubId,
                title: mainItem.subMemoirTitles[subId].title,
                parentMainTitleId: id,
            };
        }

        mainTitleIds.push(id);
    }

    return { mainTitleIds, mainTitlesById, subTitlesById, dateById };
};

const normalizeImprovementData = (memoirData: MemoirResponse): ImprovementStoreState => {
    const improvementsById: Record<string, { improvement: string }> = {};
    const subImprovementsById: Record<string, { improvement: string }> = {};

    for (const id in memoirData.improvement) {
        const improvementItem = memoirData.improvement[id];
        improvementsById[id] = {
            improvement: improvementItem.improvement,
        };

        for (const subId in improvementItem.subImprovements) {
            subImprovementsById[`${id}-${subId}`] = {
                improvement: improvementItem.subImprovements[subId].improvement,
            };
        }
    }

    return { improvementsById, subImprovementsById };
};

const normalizeFeedbackData = (memoirData: MemoirResponse): FeedbackStoreState => {
    const feedbacksById: Record<string, { feedback: string }> = {};
    const subFeedbacksById: Record<string, { feedback: string }> = {};

    for (const id in memoirData.feedback) {
        const feedbackItem = memoirData.feedback[id];
        feedbacksById[id] = {
            feedback: feedbackItem.feedback,
        };

        for (const subId in feedbackItem.subFeedback) {
            subFeedbacksById[`${id}-${subId}`] = {
                feedback: feedbackItem.subFeedback[subId].feedback,
            };
        }
    }

    return { feedbacksById, subFeedbacksById };
};

const normalizeMemoirWriteData = (apiData: ApiMemoirResponse): MemoirWriteDataState => {
    const memoirData = toMemoirResponse(apiData);

    return {
        ...normalizeTitleData(memoirData),
        ...normalizeImprovementData(memoirData),
        ...normalizeFeedbackData(memoirData),
        memoirData,
        isLoading: false,
        errorMessage: null,
    };
};

export const useMainTitleItemStore = create<MemoirWriteStore>()(
    immer((set, get) => ({
        ...normalizeMemoirWriteData(initialMemoirData),
        setMemoirWriteData: (apiData) =>
            set((state) => {
                Object.assign(state, normalizeMemoirWriteData(apiData));
            }),
        resetMemoirWriteData: () =>
            set((state) => {
                Object.assign(state, normalizeMemoirWriteData(emptyMemoirData));
            }),
        setLoading: (isLoading) =>
            set((state) => {
                state.isLoading = isLoading;
            }),
        setErrorMessage: (errorMessage) =>
            set((state) => {
                state.errorMessage = errorMessage;
            }),
        addTitle: (payload) =>
            set((state) => {
                if (payload.kind === "MAIN") {
                    const mainId = getNextNumberId(state.mainTitleIds);
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

                const subId = getNextSubTitleId(mainTitle);
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
                        delete state.subImprovementsById[subId];
                        delete state.subFeedbacksById[subId];
                    });
                    delete state.mainTitlesById[payload.id];
                    delete state.improvementsById[payload.id];
                    delete state.feedbacksById[payload.id];
                    delete state.dateById[payload.id];
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
                delete state.subImprovementsById[payload.id];
                delete state.subFeedbacksById[payload.id];
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
        setImprovement: (payload) =>
            set((state) => {
                if (payload.kind === "MAIN") {
                    state.improvementsById[payload.id] = { improvement: payload.improvement };
                    return;
                }

                state.subImprovementsById[payload.id] = { improvement: payload.improvement };
            }),
        saveImprovement: (id, improvement) =>
            set((state) => {
                if (!id) {
                    return;
                }

                if (id.includes("-")) {
                    state.subImprovementsById[id] = { improvement };
                    return;
                }

                state.improvementsById[id] = { improvement };
            }),
        getMemoirTitleData: () => {
            const state = get();

            return state.mainTitleIds.reduce<Record<string, MemoirItem>>((memoir, mainTitleId) => {
                const mainTitle = state.mainTitlesById[mainTitleId];
                if (!mainTitle) {
                    return memoir;
                }

                const subMemoirTitles = mainTitle.subTitleIds.reduce<MemoirItem["subMemoirTitles"]>(
                    (subTitles, subTitleId) => {
                        const subTitle = state.subTitlesById[subTitleId];
                        if (!subTitle) {
                            return subTitles;
                        }

                        const idPrefix = `${mainTitleId}-`;
                        const requestSubTitleId = subTitleId.startsWith(idPrefix)
                            ? subTitleId.slice(idPrefix.length)
                            : subTitleId;

                        subTitles[requestSubTitleId] = { title: subTitle.title };
                        return subTitles;
                    },
                    {},
                );

                memoir[mainTitleId] = {
                    title: mainTitle.title,
                    subMemoirTitles,
                };
                return memoir;
            }, {});
        },
        getImprovementData: () => {
            const state = get();

            return state.mainTitleIds.reduce<Record<string, ImprovementItem>>(
                (improvements, mainTitleId) => {
                    const mainTitle = state.mainTitlesById[mainTitleId];
                    if (!mainTitle) {
                        return improvements;
                    }

                    const subImprovements = mainTitle.subTitleIds.reduce<ImprovementItem["subImprovements"]>(
                        (subImprovementData, subTitleId) => {
                            const idPrefix = `${mainTitleId}-`;
                            const requestSubTitleId = subTitleId.startsWith(idPrefix)
                                ? subTitleId.slice(idPrefix.length)
                                : subTitleId;

                            subImprovementData[requestSubTitleId] = {
                                improvement: state.subImprovementsById[subTitleId]?.improvement ?? "",
                            };
                            return subImprovementData;
                        },
                        {},
                    );

                    improvements[mainTitleId] = {
                        improvement: state.improvementsById[mainTitleId]?.improvement ?? "",
                        subImprovements,
                    };
                    return improvements;
                },
                {},
            );
        },
    })),
);

export const useMemoirWriteStore = useMainTitleItemStore;
export const useImprovementItemStore = useMainTitleItemStore;
