type Mode = "VIEW" | "EDIT";

type MemoirTitleKind = "MAIN" | "SUB";

type MemoirTitleBase = {
    id: string;
    title: string;
};

type MainTitleItem = MemoirTitleBase & {
    subTitleIds: string[];
};

type SubTitleItem = MemoirTitleBase & {
    parentMainTitleId: string;
};

type MemoirState = {
    mainTitleIds: string[];
    mainTitlesById: Record<string, MainTitleItem>;
    subTitlesById: Record<string, SubTitleItem>;
    dateById: Record<string, string>;
};

type AddMainTitlePayload = {
    kind: "MAIN";
    title: string;
};

type AddSubTitlePayload = {
    kind: "SUB";
    title: string;
    parentMainTitleId: string;
};

type AddTitlePayload = AddMainTitlePayload | AddSubTitlePayload;

type TitleTargetPayload = {
    kind: MemoirTitleKind;
    id: string;
};

type UpdateTitlePayload = TitleTargetPayload & {
    title: string;
};

type SetImprovementPayLoad = {
    kind: MemoirTitleKind;
    id: string;
    improvement: string;
};

export type {
    AddMainTitlePayload,
    AddSubTitlePayload,
    AddTitlePayload,
    MainTitleItem,
    MemoirState,
    MemoirTitleKind,
    Mode,
    SubTitleItem,
    TitleTargetPayload,
    UpdateTitlePayload,
    SetImprovementPayLoad,
};
