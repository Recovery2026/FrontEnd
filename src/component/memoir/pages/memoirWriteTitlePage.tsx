import "./memoirWriteTitlePage.scss";
import MemoirTitleList from "../write/memoirTitleList";
import { Link } from "react-router-dom";

const MemoirWriteTitlePage = () => {
    return (
        <section className={"memoir-section"}>
            <article className={"memoir-top"}>
                <h2 className={"memoir-main-title"}>김아무개님 오늘 하루는 어떠셨나요?</h2>
                <span>모두에겐 비밀로 할게요 제게 맘껏 이야기해주세요</span>
            </article>

            <article className={"memoir-middle"}>
                <div className="sub-title">
                    <span>오늘의 나를 회고해보세요</span>
                </div>
                <MemoirTitleList editable={true} selectHook={() => null} />
                <div className="progress-circles">
                    <div className="memoir-first-circle"></div>
                    <div className="memoir-second-circle"></div>
                </div>
            </article>

            <article className={"memoir-bottom"}>
                <Link to="/memoir/improvement">
                    <button className={"memoir-btn"}>개선점 입력하기</button>
                </Link>
            </article>
        </section>
    );
};

export default MemoirWriteTitlePage;
