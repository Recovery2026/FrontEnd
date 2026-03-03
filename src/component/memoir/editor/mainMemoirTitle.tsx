import "./mainMemoirTitle.scss";
import type { MainTitleItem, SubTitleItem } from "../common/memoir.types";
import SubMemoirTitle from "./subMemoirTitle";
import EditSubTitle from "./editSubMemoirTitle";
import { findMainTitleById } from "../common/memoir.utils";

type MainMemoirTitleProps = {
    id: number;
    titleItems: MainTitleItem[];
    setTitleItems: React.Dispatch<React.SetStateAction<MainTitleItem[]>>;
};

const MainMamoirTitle = (props: MainMemoirTitleProps) => {
    const { id, titleItems, setTitleItems } = props;
    const mainTitleItem = findMainTitleById(titleItems, id);
    const { title, subMemoirTitles } = mainTitleItem;

    return (
        <div className={"title-div"}>
            {id > 0 && <hr />}
            <div className={"main-title"}>{title}</div>
            <div className={"sub-title-div"}>
                {subMemoirTitles.map((subMemoirTitle: SubTitleItem, idx: number) => {
                    return <SubMemoirTitle key={idx} title={subMemoirTitle.title} />;
                })}
                <EditSubTitle mainTitleId={id} mainTitleItems={titleItems} setMainTitleItem={setTitleItems} />
            </div>
        </div>
    );
};

export default MainMamoirTitle;
