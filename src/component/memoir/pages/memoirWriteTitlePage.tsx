import "./memoirWriteTitlePage.scss";
import MemoirTitleList from "../editor/memoirTitleList";

const MemoirWriteTitlePage = () => {
    return (
        <section className={"memoir-section"}>
            <h1 className={"memoir-edit-title"}>김아무개님 오늘 하루는 어떠셨나요?</h1>
            <span>모두에겐 비밀로 할게요 제게 맘껏 이야기해주세요</span>
            <MemoirTitleList />

            <div className={"btn-footer"}>
                <button className={"improvement-btn"}>개선점 입력하기</button>
            </div>
        </section>
    );
};

export default MemoirWriteTitlePage;
