
  import { createRoot } from "react-dom/client";
  import App from "./app/App.tsx";
  import ToolbarLab from "./app/ToolbarLab.tsx";
  import ShowcasePage from "./app/ShowcasePage.tsx";
  import PopupButtonPage from "./app/PopupButtonPage.tsx";
  import "./styles/index.css";

  // #lab = layout comparison, #showcase = QuickCapture spec sheet,
  // #popup-button = popup CTA selection/edit spec, else the app.
  const route = window.location.hash.replace("#", "");
  window.addEventListener("hashchange", () => window.location.reload());

  const view = route === "lab" ? <ToolbarLab />
    : route === "showcase" ? <ShowcasePage />
    : route === "popup-button" ? <PopupButtonPage />
    : <App />;

  createRoot(document.getElementById("root")!).render(view);
