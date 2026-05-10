import "./memoirImprovementPage.scss";
import MemoirTitleList from "../write/memoirTitleList";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useImprovementItemStore } from "../common/useMainTitleItemStore.ts";
import type { TitleTargetPayload } from "../common/memoir.types.ts";

const MemoirImprovementPage = () => {
    const [feedbackCnt] = useState(0);
    const { improvementsById, subImprovementsById, saveImprovement } = useImprovementItemStore();
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
        console.log(id);
    };

    useEffect(() => {
        const intervalId = setInterval(() => {
            if (selectedTitleId && improvementContent) {
                saveImprovement(selectedTitleId, improvementContent);
                console.log(`개선점 자동 저장: ${selectedTitleId}`);
            }
        }, 10000);

        return () => clearInterval(intervalId);
    }, [selectedTitleId, improvementContent, saveImprovement]);

    return (
        <section className={"memoir-section"}>
            <article className={"memoir-top"}>
                <h2 className={"memoir-main-title"}>느낀점이나 개선점이 있나요?</h2>
                <span>이런 상황은 어떻게 해결할 수 있을까요 편하게 이야기해주세요</span>
            </article>

            <article className={"memoir-middle"}>
                <div className={"content-box"}>
                    <div className={"sub-box"}>
                        <span className={"sub-title"}>오늘 내게 있었던 일</span>
                        <MemoirTitleList
                            editable={false}
                            selectHook={(payload) => handleItemClick(payload)}
                            selectedTitleId={selectedTitleId}
                        />
                    </div>
                    <div className={"sub-box"}>
                        <span className="sub-title">개선점</span>
                        <textarea
                            placeholder="개선점을 입력해주세요"
                            className={"memoir-container"}
                            value={improvementContent}
                            onChange={(e) => setImprovementContent(e.currentTarget.value)}
                        />
                    </div>
                </div>
                <div className="progress-circles">
                    <div className="improvement-first-circle"></div>
                    <div className="improvement-second-circle"></div>
                </div>
            </article>

            <article className={"memoir-bottom"}>
                <Link to="/memoir/write">
                    <button className={"memoir-btn"}>이전</button>
                </Link>
                <Link to="/memoir/feedback">
                    <button
                        className={"memoir-btn"}
                        onClick={() => {
                            saveImprovement(selectedTitleId!, improvementContent);
                        }}
                    >
                        피드백 받기({feedbackCnt}/5)
                    </button>
                </Link>
            </article>
        </section>
    );
};

export default MemoirImprovementPage;
