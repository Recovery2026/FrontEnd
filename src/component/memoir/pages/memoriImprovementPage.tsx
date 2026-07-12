import "./memoirImprovementPage.scss";
import MemoirTitleList from "../write/memoirTitleList";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useImprovementItemStore } from "../common/useMainTitleItemStore.ts";
import type { TitleTargetPayload } from "../common/memoir.types.ts";
import { updateMemoirImprovement } from "../../../api/memoir.api.ts";

const MemoirImprovementPage = () => {
    const navigate = useNavigate();
    const [feedbackCnt] = useState(0);
    const { improvementsById, subImprovementsById, saveImprovement, getImprovementData } =
        useImprovementItemStore();
    const memoirId = useImprovementItemStore((state) => state.memoirData?.id);
    const setLoading = useImprovementItemStore((state) => state.setLoading);
    const setErrorMessage = useImprovementItemStore((state) => state.setErrorMessage);
    const [improvementContent, setImprovementContent] = useState<string>("");
    const [selectedTitleId, setSelectedTitleId] = useState<string | null>(null);

    const getImprovementContent = ({ id, kind }: TitleTargetPayload) => {
        return kind === "MAIN" ? improvementsById[id]?.improvement || "" : subImprovementsById[id]?.improvement || "";
    };

    const handleItemClick = (payload: TitleTargetPayload) => {
        if (selectedTitleId) {
            saveImprovement(selectedTitleId, improvementContent);
        }

        setImprovementContent(getImprovementContent(payload));
        setSelectedTitleId(payload.id);
    };

    const handleImprovementChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const nextContent = e.currentTarget.value;
        setImprovementContent(nextContent);
        saveImprovement(selectedTitleId, nextContent);
    };

    const handleFeedbackClick = async () => {
        if (!selectedTitleId) {
            setErrorMessage("개선점을 저장할 제목을 선택해주세요.");
            return;
        }

        if (!memoirId) {
            setErrorMessage("저장할 회고 ID를 찾을 수 없습니다.");
            return;
        }

        setLoading(true);
        setErrorMessage(null);

        try {
            saveImprovement(selectedTitleId, improvementContent);

            await updateMemoirImprovement(memoirId, {
                userId: 5,
                data: getImprovementData(),
            });
            navigate("/memoir/feedback");
        } catch (error) {
            setErrorMessage(error instanceof Error ? error.message : "Failed to save improvement.");
        } finally {
            setLoading(false);
        }
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
                            onChange={handleImprovementChange}
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
                <button className={"memoir-btn"} onClick={() => void handleFeedbackClick()}>
                    피드백 받기({feedbackCnt}/5)
                </button>
            </article>
        </section>
    );
};

export default MemoirImprovementPage;
