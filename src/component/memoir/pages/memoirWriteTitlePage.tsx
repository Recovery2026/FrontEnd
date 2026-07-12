import "./memoirWriteTitlePage.scss";
import MemoirTitleList from "../write/memoirTitleList";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchMemoirByDate, writeMemoirTitle } from "../../../api/memoir.api";
import { useMainTitleItemStore } from "../common/useMainTitleItemStore";

const MemoirWriteTitlePage = () => {
    const navigate = useNavigate();
    const setMemoirWriteData = useMainTitleItemStore((state) => state.setMemoirWriteData);
    const resetMemoirWriteData = useMainTitleItemStore((state) => state.resetMemoirWriteData);
    const setLoading = useMainTitleItemStore((state) => state.setLoading);
    const setErrorMessage = useMainTitleItemStore((state) => state.setErrorMessage);
    const getMemoirTitleData = useMainTitleItemStore((state) => state.getMemoirTitleData);
    const now = new Date();
    const date = [
        now.getFullYear(),
        String(now.getMonth() + 1).padStart(2, "0"),
        String(now.getDate()).padStart(2, "0"),
    ].join("-");

    useEffect(() => {
        let isMounted = true;

        async function fetchTodaysMemoir() {
            resetMemoirWriteData();
            setLoading(true);

            try {
                const memoirData = await fetchMemoirByDate(date, 5);
                if (isMounted) {
                    setMemoirWriteData(memoirData);
                }
            } catch (error) {
                if (isMounted) {
                    setErrorMessage(error instanceof Error ? error.message : "Failed to fetch memoir.");
                }
            } finally {
                if (isMounted) {
                    setLoading(false);
                }
            }
        }

        void fetchTodaysMemoir();

        return () => {
            isMounted = false;
        };
    }, [date, resetMemoirWriteData, setErrorMessage, setLoading, setMemoirWriteData]);

    const improvementEditHandler = async () => {
        setLoading(true);
        setErrorMessage(null);
        const titleData = getMemoirTitleData();

        try {
            await writeMemoirTitle({
                userId: 5,
                data: titleData,
                date,
            });

            const savedMemoirData = await fetchMemoirByDate(date, 5);
            setMemoirWriteData(savedMemoirData);
            navigate("/memoir/improvement");
        } catch (error) {
            setErrorMessage(error instanceof Error ? error.message : "Failed to save memoir.");
        } finally {
            setLoading(false);
        }
    };

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
                <button className={"memoir-btn"} onClick={() => void improvementEditHandler()}>
                    개선점 입력하기
                </button>
            </article>
        </section>
    );
};

export default MemoirWriteTitlePage;
