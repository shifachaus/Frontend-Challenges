import "./App.css";
import { Trans, useTranslation } from "react-i18next";
import LanguageSelector from "./components/LanguageSelector";

function App() {
  const { t } = useTranslation();

  const { intro, details } = t("description");

  return (
    <div className="container">
      <LanguageSelector />
      <div className="">
        <h1>{t("greeting")}</h1>
        <span>
          <Trans
            i18nKey={intro}
            values={{
              word: "Explore",
            }}
            components={{ 1: <b /> }}
          />
        </span>

        <p>{details}</p>
      </div>
    </div>
  );
}

export default App;
