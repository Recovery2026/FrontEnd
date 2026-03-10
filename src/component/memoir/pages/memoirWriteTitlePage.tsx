import "./memoirWriteTitlePage.scss";
import MemoirTitleList from "../write/memoirTitleList";
import { Link } from "react-router-dom";

const MemoirWriteTitlePage = () => {
    return (
        <section className={"memoir-section"}>
            <h2 className={"memoir-edit-title"}>김아무개님 오늘 하루는 어떠셨나요?</h2>
            <span>모두에겐 비밀로 할게요 제게 맘껏 이야기해주세요</span>
            <div className={"memoir-box"}>
                <div className="memoir-title">
                    <span>오늘의 나를 회고해보세요</span>
                </div>
                <MemoirTitleList editable={true} width={"1270px"} />
            </div>

            <div className="progress-circles">
                <div className="first-circle"></div>
                <div className="second-circle"></div>
            </div>
            <div className={"btn-footer"}>
                <Link to="/memoir/improvement">
                    <button className={"improvement-btn"}>개선점 입력하기</button>
                </Link>
            </div>
        </section>
    );
};

export default MemoirWriteTitlePage;
