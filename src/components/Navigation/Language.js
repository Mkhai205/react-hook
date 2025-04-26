import { NavDropdown } from "react-bootstrap";
import { useTranslation } from "react-i18next";

const Language = () => {
    const { t, i18n } = useTranslation();

    const handleChangeLanguage = (lang) => {
        i18n.changeLanguage(lang);
    };

    return (
        <>
            <NavDropdown title={t("language.title")} id="basic-nav-dropdown2">
                <NavDropdown.Item onClick={() => handleChangeLanguage('vi')}>Việt Nam</NavDropdown.Item>
                <NavDropdown.Item onClick={() => handleChangeLanguage("en")}>English</NavDropdown.Item>
            </NavDropdown>
        </>
    );
};

export default Language;
