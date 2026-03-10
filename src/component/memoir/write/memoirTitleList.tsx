import "./memoirTitleList.scss";
import type { MainTitleItem } from "../common/memoir.types.ts";
import MainMamoirTitle from "./mainMemoirTitle.tsx";
import EditMainMemoirTitle from "./editMainMemoirTitle.tsx";
import { useMainTitleItemStore } from "../common/useMainTitleItemStore.ts";

const MemoirTitleList = ({ editable, width }: { editable: boolean; width: string }) => {
    const { mainTitleItems } = useMainTitleItemStore();

    return (
        <div style={{ width: width }} className="memoir-div">
            <div className="memoir-list">
                {mainTitleItems.map((memoirTitle: MainTitleItem, idx: number) => {
                    return <MainMamoirTitle key={idx} id={idx} editable={editable} />;
                })}
                {editable && <EditMainMemoirTitle />}
            </div>
        </div>
    );
};

export default MemoirTitleList;
