import "./memoirFeedbackPage.scss";
import MemoirTitleList from "../write/memoirTitleList";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useImprovementItemStore } from "../common/useMainTitleItemStore.ts";
import type { TitleTargetPayload } from "../common/memoir.types.ts";

const MemoirFeedbackPage = () => {
    const { improvementsById, subImprovementsById } = useImprovementItemStore();
    const [improvementContent, setImprovementContent] = useState<string>("");
    const [selectedTitleId, setSelectedTitleId] = useState<string | null>(null);

    const handleItemClick = (payload: TitleTargetPayload) => {
        const { id, kind } = payload;
        if (kind === "MAIN") {
            setImprovementContent(improvementsById[id]?.improvement || "");
        } else {
            setImprovementContent(subImprovementsById[id]?.improvement || "");
        }
        setSelectedTitleId(id);
    };

    return (
        <section className={"memoir-section"}>
            <article className={"memoir-top"}>
                <h2 className={"memoir-main-title"}>회고에 대해 피드백 받아보아요!</h2>
                <span>Recovery AI가 함께합니다.</span>
            </article>
            <article className={"memoir-middle"}>
                <div className={"content-box"}>
                    <div className={"left-box"}>
                        <div className="sub-title">
                            <span>오늘 내게 있었던 일</span>
                        </div>
                        <MemoirTitleList
                            editable={false}
                            selectHook={(payload) => handleItemClick(payload)}
                            selectedTitleId={selectedTitleId}
                        />
                    </div>
                    <div className={"right-box"}>
                        <div className={"improvement-view-box"}>
                            <span className={"sub-title"}>개선점</span>
                            <textarea
                                className={"feedback-improvement-textarea"}
                                placeholder="개선점을 입력해주세요"
                                value={improvementContent}
                                readOnly={true}
                                onChange={(e) => setImprovementContent(e.currentTarget.value)}
                            />
                        </div>
                        <div className={"feedback-box"}>
                            <span className={"sub-title"}>피드백</span>
                            <textarea className="ai-feedback-textarea" value={"AI 피드백"} readOnly={true} />
                        </div>
                    </div>
                </div>
            </article>

            <article className={"memoir-bottom"}>
                <Link to="/memoir/improvement">
                    <button className={"memoir-btn"}>이전</button>
                </Link>
                <Link to="/">
                    <button className={"memoir-btn"}>완료</button>
                </Link>
            </article>
        </section>
    );
};

export default MemoirFeedbackPage;
