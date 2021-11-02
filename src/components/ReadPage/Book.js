import react, { useCallback, useEffect, useRef, useState } from "react";
import axios from "axios";
import keys from "configs/keys.js";
import { axiosCng } from "common";
import { useParams, useHistory } from "react-router-dom";
const serverPath = keys.serverDomain;
const bookDetailsPath = `${serverPath}/api/readBook`;
const bookMarksPath = `${serverPath}/api/bookmarks`;
const highlightsPath = `${serverPath}/api/highlights`;

export const Book = (props) => {
    const [pagesData, setPagesData] = useState([]);
    const [highlights, setHighlights] = useState([]);

    const getPage = async (url) => {
        const response = await fetch(url);
        const json = await response.json();
        return json;
    };

    useEffect(async () => {
        if (props.isDataFetched) {
            const newData = [];
            for (let i = 0; i < props.pages; i++) {
                newData.push({
                    id: "",
                    html: "",
                    target: "",
                });
            }
            for (let i = 1; i <= props.pages; i++) {
                const url = `${bookDetailsPath}/read?bookId=${props.bookId}&p=${i}`;
                (async () => {
                    const json = await getPage(url);
                    newData[json.pageNo - 1].id = json.pageNo;
                    newData[json.pageNo - 1].html = json.data;
                    newData[json.pageNo - 1].target = json.target;

                    if (i == props.pages) {
                        setPagesData(newData);
                    }
                })();
            }
        }
        const highlights = await getHighlights(props.bookId);
        setHighlights(highlights);
    }, [props.isDataFetched]);

    return (
        <>
            <div className='book-cont'>
                <div className='book-title'>{props.bookName}</div>
                {pagesData.map((page) => {
                    return (
                        <Page
                            bookId= {props.bookId}
                            key={page.id}
                            id={page.target}
                            html={page.html}
                            pageNo={page.id}
                            highlights={highlights.map((h) => h.page == page.target ? h : [])}
                            isBookmarking={props.isBookmarking}
                            setIsBookMarking = {props.setIsBookMarking}
                            isHighlighting={props.isHighlighting}
                            highlightColor={props.highlightColor}
                            bookMarks = {props.bookMarks}
                            setBookMarks = {props.setBookMarks}
                        />
                    );
                })}
            </div>
        </>
    );
};

const getHighlights = async (bookId) => {
    const res = await axios.get(highlightsPath, {
        params: {
            bookId
        },
        ...axiosCng,
        withCredentials: true
    });
    const {success} = res.data;
    if (!success) {
        console.log("ERROR: failed to get highlights")
        return;
    }
    return res.data.highlights
}

const getXpath = (node, xpath) => {
    if (node == null || node.parentNode == null || node.tagName == "BODY") {
        return xpath
            .split("/")
            .slice(0, -1)
            .map((x) => parseInt(x));
    }

    const children =
        node.tagName == "BODY"
            ? node.parentNode.children
            : node.parentNode.childNodes;
    let index = 0;
    for (let i = 0; i < children.length; i++) {
        if (children[i] == node) {
            index = i;
            break;
        }
    }

    xpath = index + "/" + xpath;
    return getXpath(node.parentNode, xpath);
};

const traverseNode = (node, xpath, i) => {
    if (i >= xpath.length) {
        return node;
    }
    const k = xpath[i];
    i++;
    return traverseNode(node.childNodes[k], xpath, i);
}

const applyHighlight = (ref, highlight) => {
    if (highlight.page == ref.current.getAttribute("id")) {
        const g = traverseNode(ref.current.contentDocument.getElementsByTagName("body")[0], highlight.xpath, 0);
        const start = parseInt(highlight.start);
        const end = start + parseInt(highlight.l);
        if (g.nodeName == "#text") {
            const parent = g.parentNode;
            const parentChildrens = parent.childNodes;
            let index = 0;
            for( let i=0; i<parentChildrens.length; i++ ) {
                if (parentChildrens[i] == g) {
                    break;
                }
                const l = parentChildrens[i].outerHTML ? parentChildrens[i].outerHTML.length : parentChildrens[i].length
                index += l;
            }
            const word = parent.innerHTML.slice(index + start, index+end);
            const firstHalf = parent.innerHTML.slice(0, index+start);
            const secondHalf = parent.innerHTML.slice(index+end);
            const center = `<span style='background-color:${highlight.color};'>${word}</span>`;
            parent.innerHTML = firstHalf + center + secondHalf;
        } else {
            const start = parseInt(highlight.start);
            const end = start + parseInt(highlight.l);
            const word = g.innerHTML.slice(start, end);
            const firstHalf = g.innerHTML.slice(0, start);
            const secondHalf = g.innerHTML.slice(end);
            const center = `<span style='background-color:${highlight.color};'>${word}</span>`;
            g.innerHTML = firstHalf + center + secondHalf;
        }
    }
}

const saveHighlight = async (ref, id, bookId, highlightColor) => {
    const selection = ref.current.contentDocument.getSelection();
    const xpath = getXpath(selection.anchorNode);
    const start = selection.anchorOffset;
    const l = selection.toString().length;
    const newHighlight = {
        bookId: bookId,
        xpath: xpath,
        start: start,
        l: l,
        page: id,
        color: highlightColor
    };
    applyHighlight(ref, newHighlight);

    const res = await axios.post(highlightsPath, 
        newHighlight,
        {
            ...axiosCng,
            withCredentials: true,
        },
    );
};

const reApplyHighlights = (ref, highlights) => {
    for(let h of highlights) {
        try {
            applyHighlight(ref, h);
        } catch (err) {
            console.log(err)
            continue;
        }
    }
}

const Page = (props) => {
    const refw = useRef(null);

    const addBookMark = useCallback(async () => {
        const bookmarkName = refw.current.getAttribute("data-name");
        const newBookMark = {
            bookId: props.bookId,
            bookmark: props.id,
            bkname: bookmarkName
        }
        const res = await axios.post(bookMarksPath, 
            newBookMark,
            {
                ...axiosCng,
                withCredentials: true,
            },
        );
        
        props.setBookMarks(res.data.bookmarks);
        props.setIsBookMarking(false);
    }, []);
    const stopHighlight = useCallback(() => {
        console.log(props.highlightColor)
        saveHighlight(refw, props.id, props.bookId, props.highlightColor);
    }, []);

    useEffect(() => {
        refw.current.addEventListener("load", async () => {
            refw.current.height =
                refw.current.contentWindow.document.body.clientHeight + 150;
                reApplyHighlights(refw, props.highlights);
        });
    }, []);

    useEffect(() => {
        if (props.isBookmarking) {
            refw.current.contentDocument.addEventListener("click", addBookMark);
        } else {
            refw.current.contentDocument.removeEventListener(
                "click",
                addBookMark
            );
        }
    }, [props.isBookmarking]);

    useEffect(() => {
        if (props.isHighlighting) {
            refw.current.contentDocument.addEventListener(
                "mouseup",
                stopHighlight
            );
        } else {
            refw.current.contentDocument.removeEventListener(
                "mouseup",
                stopHighlight
            );
        }
    }, [props.isHighlighting]);

    return (
        <>
            <iframe
                scrolling="no"
                id={props.id}
                className='book-page'
                ref={refw}
                srcDoc={props.html}
                data-name={props.pageNo}
            ></iframe>
        </>
    );
};
