import react, { useCallback, useEffect, useRef, useState } from 'react';
import axios from 'axios';
import keys from 'configs/keys.js';
import { axiosCng } from 'common';
import { useParams, useHistory } from 'react-router-dom';
const serverPath = keys.serverDomain;
const bookDetailsPath = `${serverPath}/api/readBook`;

export const Book = (props) => {
  const [pagesData, setPagesData] = useState([]);

  const getPage = async (url) => {
    const response = await fetch(url);
    const json = await response.json();
    return json;
  };

  useEffect(() => {
    if (props.isDataFetched) {
      const newData = [];
      for (let i = 0; i < props.pages; i++) {
        newData.push({
          id: '',
          html: '',
          target: ''
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
    console.log(props.isDataFetched);
  }, [props.isDataFetched]);

  return (
    <>
      <div className="book-cont">
        <div className="book-title">{props.bookName}</div>
        {pagesData.map((page) => {
          return (
            <Page
              key={page.id}
              id={page.target}
              html={page.html}
              isBookmarking={props.isBookmarking}
              isHighlighting={props.isHighlighting}
            />
          );
        })}
      </div>
    </>
  );
};

// [2,3,5,1,offset,endIndex]

const saveHighlight = (ref, id) => {
  const selection = ref.current.contentDocument.getSelection();
  console.log(selection);
  const start = selection.anchorOffset;
  const l = selection.toString().length;
  const first = selection.anchorNode.parentNode.innerHTML.slice(0, start);
  const second = selection.anchorNode.parentNode.innerHTML.slice(start + l);
  const r =
    "<span style='background-color:tomato;'>" +
    selection.anchorNode.parentNode.innerHTML.slice(start, start + l) +
    '</span>';
  selection.anchorNode.parentNode.innerHTML = first + r + second;
};

const Page = (props) => {
  const refw = useRef(null);

  const addBookMark = useCallback(() => {
    console.log(props.id);
  }, []);
  const stopHighlight = useCallback(() => {
    saveHighlight(refw, props.id);
  }, []);

  useEffect(() => {
    refw.current.addEventListener('load', () => {
      console.log(refw.current.contentWindow);
      refw.current.height =
        refw.current.contentWindow.document.body.clientHeight + 150;
    });
  }, []);

  useEffect(() => {
    if (props.isBookmarking) {
      refw.current.contentDocument.addEventListener('click', addBookMark);
    } else {
      refw.current.contentDocument.removeEventListener('click', addBookMark);
    }
  }, [props.isBookmarking]);

  useEffect(() => {
    if (props.isHighlighting) {
      refw.current.contentDocument.addEventListener('mouseup', stopHighlight);
    } else {
      refw.current.contentDocument.removeEventListener(
        'mouseup',
        stopHighlight
      );
    }
  }, [props.isHighlighting]);

  return (
    <>
      <iframe
        id={props.id}
        className="book-page"
        ref={refw}
        srcDoc={props.html}
      ></iframe>
    </>
  );
};
