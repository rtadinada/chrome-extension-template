/* eslint-disable @typescript-eslint/no-explicit-any */
import { BackgroundRequest, HTML_QUERY, HtmlQuery, HtmlResult } from "lib/background-fetch";

async function getHtmlHandler(
    request: HtmlQuery,
    sender: chrome.runtime.MessageSender,
    sendResponse: (a: HtmlResult) => void
) {
    const { url } = request;
    const fetchResult = await fetch(url);
    const content = await fetchResult.text();
    sendResponse({ html: content });
}

chrome.runtime.onMessage.addListener(
    <T>(
        req: BackgroundRequest<T>,
        sender: chrome.runtime.MessageSender,
        sendResponse: (a: any) => void
    ) => {
        console.log(req);
        if (req.query === HTML_QUERY) {
            getHtmlHandler(req.request as HtmlQuery, sender, sendResponse);
            return true;
        }
        return false;
    }
);
