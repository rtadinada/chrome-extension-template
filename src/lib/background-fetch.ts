export type BackgroundRequest<T> = {
    query: string;
    request: T;
};

export type HtmlQuery = {
    url: string;
};
export type HtmlResult = {
    html: string | null;
};

export const HTML_QUERY = "HTML_QUERY";

async function sendMessage<T, R>(message: BackgroundRequest<T>): Promise<R> {
    const result: R = await chrome.runtime.sendMessage(message);
    return result;
}

async function sendQuery<T, R>(query: string, request: T): Promise<R> {
    return sendMessage({ query, request });
}

async function sendHtmlQuery(request: HtmlQuery): Promise<HtmlResult> {
    return sendQuery(HTML_QUERY, request);
}

export async function getHtml(url: string): Promise<string | null> {
    const queryResult = await sendHtmlQuery({ url });
    const { html } = queryResult;
    return html;
}
