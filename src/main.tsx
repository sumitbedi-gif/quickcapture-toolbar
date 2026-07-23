
  import { createRoot } from "react-dom/client";
  import App from "./app/App.tsx";
  import ToolbarLab from "./app/ToolbarLab.tsx";
  import ShowcasePage from "./app/ShowcasePage.tsx";
  import PopupButtonPage from "./app/PopupButtonPage.tsx";
  import SlidesPage from "./app/SlidesPage.tsx";
  import "./styles/index.css";

  // #lab = layout comparison, #showcase = QuickCapture spec sheet,
  // #popup-button = popup CTA selection/edit spec,
  // #slides = leadership deck (Designing for compute), else the app.
  const route = window.location.hash.replace("#", "");
  window.addEventListener("hashchange", () => window.location.reload());

  const view = route === "lab" ? <ToolbarLab />
    : route === "showcase" ? <ShowcasePage />
    : route === "popup-button" ? <PopupButtonPage />
    : route === "slides" ? <SlidesPage />
    : <App />;

  createRoot(document.getElementById("root")!).render(view);
