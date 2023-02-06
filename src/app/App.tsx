import Modal from "components/Modal/Modal";
import { getHtml } from "lib/background-fetch";
import React from "react";

type Props = {
    ref: React.LegacyRef<App>;
};
type State = {
    open: boolean;
    text: string;
};

const INITIAL_STATE = { open: false, text: "click" };

export default class App extends React.Component<Props, State> {
    state = INITIAL_STATE;

    render(): React.ReactNode {
        return (
            this.state.open && (
                <Modal onClose={() => this.setState(INITIAL_STATE)}>
                    <div
                        onClick={async () =>
                            this.setState({ text: (await getHtml("https://www.google.com"))! })
                        }
                    >
                        {this.state.text}
                    </div>
                </Modal>
            )
        );
    }
}
