import { useMainTitleItemStore } from "../common/useMainTitleItemStore";

type EditSubTitleProps = {
    mainTitleId: number;
};

const EditSubTitle = (props: EditSubTitleProps) => {
    const { mainTitleId } = props;
    const { addSubTitle } = useMainTitleItemStore();

    const handleEnterEvent = (e: React.KeyboardEvent<HTMLInputElement>) => {
        const title = e.currentTarget.value;

        if (e.key === "Enter" && title.length > 0) {
            addSubTitle(mainTitleId, title);
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
