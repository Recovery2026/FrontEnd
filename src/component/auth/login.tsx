import "./login.scss";
import { Link } from "react-router-dom";

const Login = () => {
    return (
        <section className={"login-section"}>
            <article className={"login-article"}>
                <h2 className={"logo"}>
                    <img src={"images/logo.svg"} alt={"logo"} />
                </h2>

                <form className={"login-form"}>
                    <input type={"email"} className={"md"} placeholder={"이메일"} required />
                    <input type={"password"} className={"md"} placeholder={"비밀번호"} required />

                    <button type={"submit"} className={"secondary"}>
                        <span>로그인</span>
                    </button>
                </form>

                <div className={"login-links"}>
                    <Link to={"/signup"}><a>가입하기</a></Link>
                    <a href={"#"}>아이디/비밀번호 찾기</a>
                </div>

                <a href={"#"} className={"kakao-login-btn"}>
                    <img src={"images/kakao/kakao_logo.svg"} alt={"카카오 로고"} />
                    <span>카카오 로그인</span>
                </a>
            </article>
        </section>
    );
};

export default Login;
