import "./memoirImprovementPage.scss";
import MemoirTitleList from "../write/memoirTitleList";
import { useState } from "react";
import { Link } from "react-router-dom";

const MemoirImprovementPage = () => {
    const [feedbackCnt] = useState(0);

    return (
        <section className={"improvement-section"}>
            <h2 className={"memoir-improvement-title"}>느낀점이나 개선점이 있나요?</h2>
            <span>이런 상황은 어떻게 해결할 수 있을까요 편하게 이야기해주세요</span>
            <div className={"improvement-box"}>
                <div className={"left-box"}>
                    <div className="memoir-title">
                        <span>오늘 내게 있었던 일</span>
                    </div>
                    <MemoirTitleList editable={false} width={"625px"} />
                </div>
                <div className={"right-box"}>
                    <div className="memoir-title">
                        <span>개선점</span>
                    </div>
                    <textarea placeholder="개선점을 입력해주세요" className={"improvement-editor"} />
                </div>
            </div>

            <div className="progress-circles">
                <div className="first-circle"></div>
                <div className="second-circle"></div>
            </div>

            <div className={"btn-footer"}>
                <Link to="/memoir/write">
                    <button className={"previous-btn"}>이전</button>
                </Link>
                <Link to="/memoir/feedback">
                    <button className={"feedback-btn"}>피드백 받기({feedbackCnt}/5)</button>
                </Link>
            </div>
        </section>
    );
};

export default MemoirImprovementPage;
