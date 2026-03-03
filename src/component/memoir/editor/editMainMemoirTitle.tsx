import type { MainTitleItem } from "../common/memoir.types";
import "./editMainMemoirTitle.scss";
import { addMainTitle } from "../common/memoir.utils";

type EditMemoirProps = {
    memoirTitles: MainTitleItem[];
    setMemoirTitles: React.Dispatch<React.SetStateAction<MainTitleItem[]>>;
};

const EditMainMemoirTitle = (props: EditMemoirProps) => {
    const { memoirTitles, setMemoirTitles } = props;

    const handleEnterEvent = (e: React.KeyboardEvent<HTMLInputElement>) => {
        const title = e.currentTarget.value;

        if (e.key === "Enter" && title.length > 0) {
            setMemoirTitles(addMainTitle(memoirTitles, title));
            e.currentTarget.value = "";
        }
    };

    return (
        <div>
            <input
                type="text"
                className="edit-text"
                placeholder="대주제 (입력으로 활성화)"
                onKeyDown={handleEnterEvent}
                required
            />
        </div>
    );
};

export default EditMainMemoirTitle;
