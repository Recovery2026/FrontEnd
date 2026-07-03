export type Mode = "VIEW" | "EDIT";

export type MemoirTitleKind = "MAIN" | "SUB";

export type MemoirTitleBase = {
    id: string;
    title: string;
    mode?: Mode;
};

export type MainTitleItem = MemoirTitleBase & {
    subTitleIds: string[];
};

export type SubTitleItem = MemoirTitleBase & {
    parentMainTitleId: string;
};

export type MemoirState = {
    mainTitleIds: string[];
    mainTitlesById: Record<string, MainTitleItem>;
    subTitlesById: Record<string, SubTitleItem>;
    dateById: Record<string, string>;
};

export type AddMainTitlePayload = {
    kind: "MAIN";
    title: string;
};

export type AddSubTitlePayload = {
    kind: "SUB";
    title: string;
    parentMainTitleId: string;
};

export type AddTitlePayload = AddMainTitlePayload | AddSubTitlePayload;

export type TitleTargetPayload = {
    kind: MemoirTitleKind;
    id: string;
};

export type UpdateTitlePayload = TitleTargetPayload & {
    title: string;
};

export type SetImprovementPayLoad = {
    kind: MemoirTitleKind;
    id: string;
    improvement: string;
};

export type SubFeedback = {
    feedback: string;
};

export type FeedbackItem = {
    feedback: string;
    subFeedback: Record<string, SubFeedback>;
};

export type SubImprovement = {
    improvement: string;
};

export type ImprovementItem = {
    improvement: string;
    subImprovements: Record<string, SubImprovement>;
};

export type SubMemoirTitle = {
    title: string;
};

export type MemoirItem = {
    title: string;
    subMemoirTitles: Record<string, SubMemoirTitle>;
};

export type MemoirResponse = {
    id?: number;
    date?: string;
    feedback: Record<string, FeedbackItem>;
    improvement: Record<string, ImprovementItem>;
    memoir: Record<string, MemoirItem>;
};

export type ApiMemoirItem = {
    id?: number;
    date?: string;
    feedback?: Record<string, FeedbackItem>;
    improvement?: Record<string, ImprovementItem>;
    memoir: Record<string, MemoirItem>;
};

export type ApiMemoirResponse =
    | MemoirResponse
    | {
          list: ApiMemoirItem[];
          total?: number;
      };
