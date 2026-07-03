import axios from "axios";
import type { ApiMemoirResponse, ImprovementItem, MemoirItem } from "../component/memoir/common/memoir.types";

type MemoirResponseBody = ApiMemoirResponse | { data: ApiMemoirResponse };

const unwrapMemoirResponse = (responseBody: MemoirResponseBody): ApiMemoirResponse => {
    return "data" in responseBody ? responseBody.data : responseBody;
};

export const fetchMemoirByDate = async (date: string, userId: number) => {
    const response = await axios.post<MemoirResponseBody>(
        `${import.meta.env.VITE_SERVER_URL}/api/memoirs?date=${date}`,
        {
            userId,
        },
    );

    return unwrapMemoirResponse(response.data);
};

export const fetchMemoirById = async (memoirId: number, userId: number) => {
    const response = await axios.post<MemoirResponseBody>(
        `${import.meta.env.VITE_SERVER_URL}/api/memoirs/${memoirId}`,
        {
            userId,
        },
    );

    return unwrapMemoirResponse(response.data);
};

export type MemoirWriteRequest = {
    userId: number;
    data: Record<string, MemoirItem>;
    date: string;
};

export const writeMemoirTitle = async (request: MemoirWriteRequest) => {
    return await axios.post(`${import.meta.env.VITE_SERVER_URL}/api/memoirs/memoir`, request);
};

export type MemoirImprovementRequest = {
    userId: number;
    data: Record<string, ImprovementItem>;
};

export const updateMemoirImprovement = async (memoirId: number, request: MemoirImprovementRequest) => {
    return await axios.put(`${import.meta.env.VITE_SERVER_URL}/api/memoirs/${memoirId}/improvement`, request);
};
