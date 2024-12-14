export const truncateHtmlContent = (htmlContent: string, maxLength: number): string => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlContent, 'text/html');
    let currentLength = 0;
    const truncatedNodes: Node[] = [];

    for (const node of Array.from(doc.body.childNodes)) {
        if (currentLength >= maxLength) break;

        if (node.nodeType === Node.TEXT_NODE) {
            const text = node.textContent || '';
            if (currentLength + text.length > maxLength) {
                truncatedNodes.push(document.createTextNode(text.slice(0, maxLength - currentLength)));
                break;
            } else {
                truncatedNodes.push(node.cloneNode(true));
                currentLength += text.length;
            }
        } else if (node.nodeType === Node.ELEMENT_NODE) {
            const element = node as Element;
            const outerHtml = element.outerHTML || '';
            if (currentLength + outerHtml.length > maxLength) {
                break;
            } else {
                truncatedNodes.push(node.cloneNode(true));
                currentLength += outerHtml.length;
            }
        }
    }

    const tempDiv = document.createElement('div');
    truncatedNodes.forEach((n) => tempDiv.appendChild(n));
    return tempDiv.innerHTML;
};
