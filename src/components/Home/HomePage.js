import videoHomePage from "../../assets/videos/video-homepage.mp4";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const HomePage = () => {
    const isAuthenticated = useSelector((state) => state.user.isAuthenticated);

    // console.log("🚀 ~ HomePage.js:8 ~ HomePage ~ isAuthenticated:", isAuthenticated);

    const navigate = useNavigate();
    const { t } = useTranslation();

    return (
        <div className="homepage-container">
            <video autoPlay loop muted className="homepage-video">
                <source src={videoHomePage} type="video/mp4" />
            </video>
            <div className="homepage-content">
                <div className="title">{t("homePage.title1")}</div>
                <div className="quotes">
                    {t("homePage.quotes")}
                </div>
                {isAuthenticated === false ? (
                    <div className="btn-start" onClick={() => navigate("/login")}>
                        {t("homePage.login")}
                    </div>
                ) : (
                    <div className="btn-start" onClick={() => navigate("/users")}>
                        {t("homePage.start")}
                    </div>
                )}
            </div>
        </div>
    );
};

export default HomePage;
