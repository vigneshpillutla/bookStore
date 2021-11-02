import react, { useEffect, useState, useCallback } from 'react';
import './ReadPage.css';
import { Book } from './Book';
import BookLibrary from 'common/bookUtil';
import axios from 'axios';
import keys from 'configs/keys.js';
import { axiosCng } from 'common';
import { useParams, useHistory, Link } from 'react-router-dom';
import Rating from '@material-ui/lab/Rating';
import BookmarkBorderRoundedIcon from '@material-ui/icons/BookmarkBorderRounded';
import ListRoundedIcon from '@material-ui/icons/ListRounded';
import CloseRoundedIcon from '@material-ui/icons/CloseRounded';
import InfoRoundedIcon from '@material-ui/icons/InfoRounded';
import BrushRoundedIcon from '@material-ui/icons/BrushRounded';
import AddRoundedIcon from '@material-ui/icons/AddRounded';
import DeleteRoundedIcon from '@material-ui/icons/DeleteRounded';
import HomeRoundedIcon from '@material-ui/icons/HomeRounded';

const serverPath = keys.serverDomain;
const bookDetailsUrl = `${serverPath}/api/readBook`;
const bookMarksUrl = `${serverPath}/api/bookmarks`;
const deleteBookMarksUrl = `${serverPath}/api/bookmarks/delete`;

const ReadPage = (props) => {
  const [contentIndex, setContentIndex] = useState([]);
  const [bookInfo, setBookInfo] = useState({
    id: null,
    name: 'unknown',
    pages: -1
  });
  const [isDataFetched, setIsDataFetched] = useState(false);
  const [isBookmarking, setIsBookMarking] = useState(false);
  const [showIndexBar, setShowIndexBar] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [showBookMCont, setShowBookMCont] = useState(false);
  const [showHighlightCont, setShowHighlightCont] = useState(false);
  const [isHighlighting, setIsHighlighting] = useState(false);
  const [bookdata, setBookdata] = useState({
    bookId: null,
    bookName: null,
    author: null,
    pages: null,
    rating: null,
    genres: []
  });
  const [bookMarks, setBookMarks] = useState([]);
  const [highlightColor, setHighlightColor] = useState('tomato');
  const toggleBookMark = () => setIsBookMarking(!isBookmarking);
  const history = useHistory();
  let { bookId } = useParams();

  const deleteBookMark = useCallback(async (bk) => {
    const res = await axios.get(deleteBookMarksUrl, {
      params: {
        bookId: bookId,
        bookmark: bk
      },
      ...axiosCng,
      withCredentials: true
    });
    if (res.data.success) {
      setBookMarks(res.data.bookmarks);
    } else {
      console.log(`failed to delete bookmark: ${bk}`);
    }
  });

  const getBookMarks = useCallback(async () => {
    const res = await axios.get(bookMarksUrl, {
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
    setBookMarks(res.data.bookmarks);
  });

  const library = new BookLibrary();

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
      setBookInfo({ id: bookId, name: data.bookName, pages: data.pages });
      setIsDataFetched(true);
    };
    getDetails();
    library.getSingleBook(bookId, (bookData) => {
      setBookdata({
        bookId: bookId,
        bookName: bookData.name,
        author: bookData.author,
        pages: bookData.pages,
        rating: bookData.rating,
        genres: bookData.genres
      });
    });
    getBookMarks();
  }, [bookId]);
  return (
    <div style={{ cursor: isBookmarking ? 'grab' : 'default' }}>
      <ToolBar
        showIndexBar={showIndexBar}
        setShowIndexBar={setShowIndexBar}
        showInfo={showInfo}
        setShowInfo={setShowInfo}
        isHighlighting={isHighlighting}
        setIsHighlighting={setIsHighlighting}
        showBookMCont={showBookMCont}
        setShowBookMCont={setShowBookMCont}
        isBookmarking={isBookmarking}
        showHighlightCont={showHighlightCont}
        setShowHighlightCont={setShowHighlightCont}
      />
      <Book
        bookName={bookdata.bookName}
        bookId={bookInfo.id}
        pages={bookInfo.pages}
        isDataFetched={isDataFetched}
        isBookmarking={isBookmarking}
        setIsBookMarking={setIsBookMarking}
        isHighlighting={isHighlighting}
        bookMarks={bookMarks}
        setBookMarks={setBookMarks}
        highlightColor={highlightColor}
      />
      <Index
        contentIndex={contentIndex}
        showIndexBar={showIndexBar}
        setShowIndexBar={setShowIndexBar}
      />
      <Info showInfo={showInfo} setShowInfo={setShowInfo} bookdata={bookdata} />
      <BookMarkCont
        showBookMCont={showBookMCont}
        toggleBookMark={toggleBookMark}
        bookMarks={bookMarks}
        deleteBookMark={deleteBookMark}
      />
      <HighlightCont
        showHighlightCont={showHighlightCont}
        setShowHighlightCont={setShowHighlightCont}
        highlightColor={highlightColor}
        setHighlightColor={setHighlightColor}
      />
    </div>
  );
};

const ToolBar = (props) => {
  return (
    <>
      <div className="toolbar-cont">
        <button
          className="tool-btn"
          onClick={() => {
            props.setShowIndexBar(!props.showIndexBar);
            props.setShowInfo(false);
          }}
        >
          <ListRoundedIcon />
        </button>
        <button
          className="tool-btn"
          onClick={() => props.setShowBookMCont(!props.showBookMCont)}
          style={{ backgroundColor: props.isBookmarking ? '#dbf6ff' : 'white' }}
        >
          <BookmarkBorderRoundedIcon />
        </button>
        <button
          className="tool-btn"
          onClick={() => {
            props.setIsHighlighting(!props.isHighlighting);
            props.setShowHighlightCont(!props.showHighlightCont);
          }}
          style={{
            backgroundColor: props.isHighlighting ? '#dbf6ff' : 'white'
          }}
        >
          <BrushRoundedIcon />
        </button>
        <button
          className="tool-btn"
          onClick={() => {
            props.setShowInfo(!props.showInfo);
            props.setShowIndexBar(false);
          }}
        >
          <InfoRoundedIcon />
        </button>
        <Link to="/" style={{ color: '#262626' }}>
          <button className="tool-btn">
            <HomeRoundedIcon />
          </button>
        </Link>
      </div>
    </>
  );
};
const Index = (props) => {
  return (
    <div
      className="index-cont elevated"
      style={{ right: props.showIndexBar ? '20px' : '-250px' }}
    >
      <div className="title-cont">
        <div className="title">Contents</div>
        <button
          className="close-btn"
          onClick={() => props.setShowIndexBar(false)}
        >
          <CloseRoundedIcon />
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
          if (props.target.search(/.html#/) === -1) {
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

const Info = (props) => {
  return (
    <div
      style={{ right: props.showInfo ? '10px' : '-350px' }}
      className="info-cont elevated"
    >
      <div className="info-title-cont">
        <button
          className="close-btn"
          style={{ height: '30px' }}
          onClick={() => props.setShowInfo(!props.showInfo)}
        >
          <CloseRoundedIcon />
        </button>
      </div>
      <div className="main-info-cont">
        <div className="info-bookname">{props.bookdata.bookName}</div>
        <div>Author:{props.bookdata.author}</div>
        <div>Total pages: {props.bookdata.pages}</div>
        <div>
          <Rating
            name="read-only"
            value={props.bookdata.rating}
            precision={0.2}
            readOnly
          />
        </div>
        <div className="genres-cont">
          {props.bookdata.genres.map((genre) => {
            return <GenreBadge genre={genre} />;
          })}
        </div>
      </div>
    </div>
  );
};

const GenreBadge = (props) => {
  return (
    <div className="genre-badge">
      <div></div>
      {props.genre}
    </div>
  );
};

const BookMarkCont = (props) => {
  const gotoBookMark = useCallback((bk) => {
    window.document.getElementById(bk).scrollIntoView();
  });
  return (
    <div
      className="bookmark-cont elevated"
      style={{ display: props.showBookMCont ? 'flex' : 'none' }}
    >
      {props.bookMarks.map((bk) => {
        return (
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div
              className="bkmrk-item"
              onClick={() => gotoBookMark(bk.bookmark)}
            >
              Page: {bk.name}
            </div>
            <div
              className="content-item delete-btn"
              onClick={() => props.deleteBookMark(bk.bookmark)}
            >
              <DeleteRoundedIcon />
            </div>
          </div>
        );
      })}

      <div
        className="content-item add-btn"
        onClick={() => props.toggleBookMark()}
      >
        <AddRoundedIcon />
      </div>
    </div>
  );
};

const HighlightCont = (props) => {
  const selectedClass = 'selected-color elevated color-block';
  // const colors = [
  //     "#95e4f9",
  //     "#f99595",
  //     "#f9f995",
  //     "#b6f995"
  // ];
  const colors = ['#47b6ff', 'tomato', '#e6ff47', '#67ff47'];
  return (
    <div
      className="highlight-cont elevated"
      style={{ display: props.showHighlightCont ? 'flex' : 'none' }}
    >
      {colors.map((color) => {
        return (
          <div
            className={
              props.highlightColor === color ? selectedClass : 'color-block'
            }
            style={{ backgroundColor: color }}
            onClick={() => {
              props.setHighlightColor(color);
            }}
          ></div>
        );
      })}
    </div>
  );
};
export default ReadPage;
