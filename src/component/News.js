import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";
import Spinner from './Spinner';
import NewsItem from './NewsItem';

const News = (props) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");

  const capitalize = (str) => {
    return str && typeof str === 'string' ? str.charAt(0).toUpperCase() + str.slice(1) : str;
  };

  const updateNews = async () => {
    const { country, category, pageSize, apikey, setProgress } = props;
    setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=${apikey}&page=${page}&pageSize=${pageSize}&q=${searchTerm}`;
    setProgress(20);
    try {
      const response = await fetch(url);
      const parseData = await response.json();
      setProgress(30);
      setArticles((prevArticles) => (page === 1 ? parseData.articles : [...prevArticles, ...parseData.articles]));
      setTotalResults(parseData.totalResults);
      setLoading(false);
      setProgress(70);
    } catch (error) {
      console.error('Error fetching news:', error);
      setLoading(false);
    }
    setProgress(100);
  };

  useEffect(() => {
    document.title = `${capitalize(props.category)} - Daily News`;
    updateNews();
    //eslint-disable-next-line
  }, [page]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    setPage(1);
    updateNews();
  };

  const fetchMoreData = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const { category } = props;

  return (
    <InfiniteScroll
      dataLength={articles.length}
      next={fetchMoreData}
      hasMore={articles.length !== totalResults}
      loader={<Spinner className="my-3" />}
      style={{marginTop:'50px'}}
    >
      <div className="container my-3" >
        <form className="d-flex my-2" style={{ float: 'right', width: '300px' }} onSubmit={handleSearchSubmit}>
          <input id="search"
            className="form-control me-2"
            type="search"
            placeholder="Search News..."
            aria-label="Search"
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <button className="btn btn-outline-dark" type="submit">
            Search
          </button>
        </form>
        <h1 className="my-3">DailyNews - Top {capitalize(category)} Headlines</h1>
        {articles.length === 0 && !loading && (
          <div className="alert alert-warning" role="alert">
            No news articles found for the search term {searchTerm} in the category {capitalize(category)}.
          </div>
        )}
        <div className="row">
          {articles.map((element) => (
            <div className="col-md-4 my-3" key={element.url}>
              <NewsItem
                title={element.title}
                description={element.description}
                imageUrl={element.urlToImage || 'https://c8.alamy.com/comp/CN6EWM/daily-news-newspaper-roll-with-white-background-CN6EWM.jpg'}
                url={element.url}
                date={element.publishedAt}
                author={element.author}
                source={element.source.name}
              />
            </div>
          ))}
        </div>
      </div>
    </InfiniteScroll>
  );
};

News.defaultProps = {
  country: 'in',
  pageSize: 8,
  category: 'general',
};

News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
  apikey: PropTypes.string,
  setProgress: PropTypes.func,
};

export default News;
