import "./editMainMemoirTitle.scss";
import { useMainTitleItemStore } from "../common/useMainTitleItemStore";

const EditMainMemoirTitle = () => {
    const { mainTitleItems, addMainTitle } = useMainTitleItemStore();

    const handleEnterEvent = (e: React.KeyboardEvent<HTMLInputElement>) => {
        const title = e.currentTarget.value;

        if (e.key === "Enter" && title.length > 0) {
            addMainTitle(title);
            e.currentTarget.value = "";
        }
    };

    return (
        <div>
            {mainTitleItems.length > 0 && <hr />}
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
