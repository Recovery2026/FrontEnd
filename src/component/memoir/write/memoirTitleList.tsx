import "./memoirTitleList.scss";
import MainMemoirTitle from "./mainMemoirTitle.tsx";
import EditMainMemoirTitle from "./editMainMemoirTitle.tsx";
import { useMainTitleItemStore } from "../common/useMainTitleItemStore.ts";
import React from "react";
import type { TitleTargetPayload } from "../common/memoir.types.ts";

type MemoirTitleList = {
    editable: boolean;
    selectHook: (id: TitleTargetPayload) => void;
    selectedTitleId?: string | null;
};

const MemoirTitleList = (props: MemoirTitleList) => {
    const { editable, selectHook, selectedTitleId } = props;
    const mainTitleIds = useMainTitleItemStore((state) => state.mainTitleIds);

    return (
        <div className="memoir-container">
            {mainTitleIds.map((mainTitleId, idx) => (
                <React.Fragment key={mainTitleId}>
                    <MainMemoirTitle
                        key={mainTitleId}
                        mainTitleId={mainTitleId}
                        idx={idx}
                        editable={editable}
                        selectHook={selectHook}
                        selectedTitleId={selectedTitleId}
                    />
                    {idx < mainTitleIds.length - 1 && <hr />}
                </React.Fragment>
            ))}
            {editable && (
                <>
                    <hr />
                    <EditMainMemoirTitle />
                </>
            )}
        </div>
    );
};

export default MemoirTitleList;
