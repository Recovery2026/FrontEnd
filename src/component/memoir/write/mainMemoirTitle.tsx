import "./mainMemoirTitle.scss";
import type { SubTitleItem } from "../common/memoir.types";
import SubMemoirTitle from "./subMemoirTitle";
import EditSubTitle from "./editSubMemoirTitle";
import { useMainTitleItemStore } from "../common/useMainTitleItemStore";

const MainMamoirTitle = (props: { id: number; editable: boolean }) => {
    const { id, editable } = props;
    const mainTitleItem = useMainTitleItemStore((state) => state.mainTitleItems[id]);
    const { title, subMemoirTitles } = mainTitleItem;

    return (
        <div className={"title-div"}>
            {id > 0 && <hr />}
            <div className={"main-title"}>{title}</div>
            <div className={"sub-title-div"}>
                {subMemoirTitles.map((subMemoirTitle: SubTitleItem, idx: number) => {
                    return <SubMemoirTitle key={idx} title={subMemoirTitle.title} />;
                })}
                {editable && <EditSubTitle mainTitleId={id} />}
            </div>
        </div>
    );
};

export default MainMamoirTitle;
