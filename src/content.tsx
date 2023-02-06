import Button from "components/Button/Button";
import React from "react";
import { createRoot } from "react-dom/client";

import App from "./app/App";

declare global {
    interface Window {
        App: App;
    }
}

const pageButtonContainerClass = "chr-header-v3__wrapper";

console.log("load");

function run() {
    console.log("run");
    const jsInitChecktimer = setInterval(checkForContainerElemLoaded, 11);

    function checkForContainerElemLoaded() {
        console.log("test");
        if (document.getElementsByClassName(pageButtonContainerClass).length > 0) {
            clearInterval(jsInitChecktimer);
            load();
        }
    }
}

function load() {
    const appContainer = document.createElement("div");
    appContainer.id = "ext-app-root";
    document.body.prepend(appContainer);

    const appRoot = createRoot(appContainer);
    appRoot.render(
        <React.StrictMode>
            <App
                ref={(app) => {
                    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                    window.App = app!;
                }}
            />
        </React.StrictMode>
    );

    const buttonContainer = document.createElement("div");
    buttonContainer.id = "ext-open-button";

    const pageButtonContainer = document.getElementsByClassName(pageButtonContainerClass).item(0);
    pageButtonContainer?.append(buttonContainer);

    const buttonRoot = createRoot(buttonContainer);
    buttonRoot.render(
        <React.StrictMode>
            <Button onClick={() => window.App.setState({ open: true })}>Click me</Button>
        </React.StrictMode>
    );
}

run();
