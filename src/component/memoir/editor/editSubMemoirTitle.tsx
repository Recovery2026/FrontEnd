import type { MainTitleItem } from "../common/memoir.types";
import { addSubTitle } from "../common/memoir.utils";

type EditSubTitleProps = {
    mainTitleId: number;
    mainTitleItems: MainTitleItem[];
    setMainTitleItem: React.Dispatch<React.SetStateAction<MainTitleItem[]>>;
};

const EditSubTitle = (props: EditSubTitleProps) => {
    const { mainTitleId, mainTitleItems, setMainTitleItem } = props;

    const handleEnterEvent = (e: React.KeyboardEvent<HTMLInputElement>) => {
        const title = e.currentTarget.value;

        if (e.key === "Enter" && title.length > 0) {
            setMainTitleItem(addSubTitle(mainTitleItems, title, mainTitleId));
            e.currentTarget.value = "";
        }
    };

    return (
        <div>
            <input
                type="text"
                className="edit-text"
                placeholder="소주제 (입력으로 활성화)"
                onKeyDown={handleEnterEvent}
                required
            />
        </div>
    );
};

export default EditSubTitle;
