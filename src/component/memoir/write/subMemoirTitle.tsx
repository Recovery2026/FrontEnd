import "./subMemoirTitle.scss";

type SubMemoirTitleProps = {
    title: string;
};

const SubMemoirTitle = (props: SubMemoirTitleProps) => {
    const { title } = props;

    return (
        <div className={"sub-title"}>
            <span className={"sub-title-text"}>{title}</span>
        </div>
    );
};

export default SubMemoirTitle;
