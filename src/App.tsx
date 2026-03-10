import React from "react";
import "./App.scss";
import "./styles/index.scss";
import { Route, Routes } from "react-router-dom";
import SideBar from "./component/common/sideBar.tsx";
import Login from "./component/auth/login.tsx";
import MemoirsList from "./component/memoir/memoirsList.tsx";
import SignUp from "./component/auth/signup.tsx";
import User from "./component/user/user.tsx";
import MemoirWriteTitlePage from "./component/memoir/pages/memoirWriteTitlePage.tsx";
import MemoirImprovementPage from "./component/memoir/pages/memoriImprovementPage.tsx";

function App() {
    return (
        <div id={"App"}>
            <h1 className={"blind"}>Recovery - 회고 피드백 서비스</h1>
            <React.Suspense>
                <Routes>
                    <Route path={"/login"} element={<Login />} />
                    <Route path={"/signup"} element={<SignUp />} />
                    <Route element={<SideBar />}>
                        <Route path={"/"} element={<MemoirsList />} />
                        <Route path={"/profile/edit"} element={<User />} />
                        <Route path={"/memoir/write"} element={<MemoirWriteTitlePage />} />
                        <Route path={"/memoir/improvement"} element={<MemoirImprovementPage />} />
                    </Route>
                </Routes>
            </React.Suspense>
        </div>
    );
}

export default App;
