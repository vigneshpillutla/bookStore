import react, { useEffect, useState } from 'react';
import './ReadPage.css';
import { Book } from './Book';
import axios from 'axios';
import keys from 'configs/keys.js';
import { axiosCng } from 'common';
import { useParams, useHistory } from 'react-router-dom';
const serverPath = keys.serverDomain;
const bookDetailsUrl = `${serverPath}/api/readBook`;

let htmlData;

const ReadPage = (props) => {
  const [contentIndex, setContentIndex] = useState([]);
  const [bookInfo, setBookInfo] = useState({ name: 'unknown', pages: -1 });
  const [isDataFetched, setIsDataFetched] = useState(false);
  const [isBookmarking, setIsBookMarking] = useState(false);
  const [showIndexBar, setShowIndexBar] = useState(false);
  const [isHighlighting, setIsHighlighting] = useState(false);
  const [isPotrait, setIsPotrait] = useState(true);
  const toggleBookMark = () => setIsBookMarking(!isBookmarking);
  const history = useHistory();
  let { bookId } = useParams();

  useEffect(() => {
    const getDetails = async () => {
      const res = await axios.get(`${bookDetailsUrl}/getBookDetails`, {
        params: {
          bookId
        },
        ...axiosCng,
        withCredentials: true
      });
      const { success } = res.data;
      if (!success) {
        history.push('/');
        return;
      }
      const { data } = res.data;
      setContentIndex(data.contentsGuide);
      setBookInfo({ name: data.bookName, pages: data.pages });
      setIsDataFetched(true);
    };
    getDetails();
    // const url = 'http://localhost:3001/getBookDetails?n=' + props.bookName;
    // fetch(url)
    //   .then((res) => {
    //     return res.json();
    //   })
    //   .then((res) => {
    //     setContentIndex(res.data.contentsGuide);
    //     setBookInfo({ name: res.data.bookName, pages: res.data.pages });
    //     setIsDataFetched(true);
    //   });
  }, [bookId]);
  return (
    <>
      <ToolBar
        toggleBookMark={toggleBookMark}
        showIndexBar={showIndexBar}
        setShowIndexBar={setShowIndexBar}
        isHighlighting={isHighlighting}
        setIsHighlighting={setIsHighlighting}
        isPotrait={isPotrait}
        setIsPotrait={setIsPotrait}
      />
      <Book
        bookName={bookInfo.name}
        pages={bookInfo.pages}
        isDataFetched={isDataFetched}
        isBookmarking={isBookmarking}
        isHighlighting={isHighlighting}
        isPotrait={isPotrait}
        setIsPotrait={setIsPotrait}
      />
      <Index
        contentIndex={contentIndex}
        showIndexBar={showIndexBar}
        setShowIndexBar={setShowIndexBar}
      />
    </>
  );
};

const ToolBar = (props) => {
  return (
    <>
      <div className="toolbar-cont">
        <button
          className="tool-btn"
          onClick={() => props.setShowIndexBar(!props.showIndexBar)}
        >
          I
        </button>
        <button className="tool-btn" onClick={() => props.toggleBookMark()}>
          B
        </button>
        <button
          className="tool-btn"
          onClick={() => props.setIsHighlighting(!props.isHighlighting)}
        >
          H
        </button>
        <button
          className="tool-btn"
          onClick={() => props.setIsPotrait(!props.isPotrait)}
        >
          IF
        </button>
        <button className="tool-btn">DF</button>
      </div>
    </>
  );
};
const Index = (props) => {
  return (
    <div
      className="index-cont"
      style={{ right: props.showIndexBar ? '10px' : '-250px' }}
    >
      <div className="title-cont">
        <div className="title">Contents</div>
        <button
          className="close-btn"
          onClick={() => props.setShowIndexBar(false)}
        >
          X
        </button>
      </div>

      <div className="contents-list">
        {props.contentIndex.map((item) => {
          return <Item title={item.title} target={item.target} />;
        })}
      </div>
    </div>
  );
};

const Item = (props) => {
  return (
    <>
      <div
        className="content-item"
        onClick={() => {
          if (props.target.search(/.html#/) == -1) {
            window.document.getElementById(props.target).scrollIntoView();
          } else {
            window.document
              .getElementById(props.target.slice(0, props.target.search('#')))
              .scrollIntoView();
          }
        }}
      >
        {props.title}
      </div>
    </>
  );
};

export default ReadPage;
