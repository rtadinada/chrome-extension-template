import X from "common/images/x.svg";
import { getResourceUrl } from "lib/chrome-utils";
import React, { MouseEventHandler } from "react";

import style from "./Button.scss";

export type Props = React.PropsWithChildren<{
    onClick: MouseEventHandler<HTMLButtonElement>;
}>;

export default function Button(props: Props): JSX.Element {
    return (
        <button className={style.button} onClick={props.onClick}>
            <img className={style.icon} src={getResourceUrl(X)} />
            {props.children}
        </button>
    );
}
