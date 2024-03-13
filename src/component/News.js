import React, { Component } from 'react';
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";
import Spinner from './Spinner';
import NewsItem from './NewsItem';

export default class News extends Component {
  static defaultProps = {
    country: 'in',
    pageSize: 8,
    category: 'general',
  };

  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  };

  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: true,
      page: 1,
      totalResults: 0,
      searchTerm: '',
    };
    document.title = `${this.capitalize(this.props.category)}-Daily News`;
  }

  capitalize = (str) => {
    return str && typeof str === 'string' ? str.charAt(0).toUpperCase() + str.slice(1) : str;
  };
  
  async updateNews(props) {
    const { country, category, pageSize,apikey } = this.props;
    const { page, searchTerm } = this.state;

    this.props.setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=${apikey}&page=${page}&pageSize=${pageSize}&q=${searchTerm}`;
    this.props.setProgress(20);
    try {
      const response = await fetch(url);
      const parseData = await response.json();
      this.props.setProgress(30);

      this.setState((prevState) => ({
        articles: page === 1 ? parseData.articles : [...prevState.articles, ...parseData.articles],
        totalResults: parseData.totalResults,
       
        loading: false,
      }));
      this.props.setProgress(70);
    } catch (error) {
      console.error('Error fetching news:', error);
      this.setState({ loading: false });
    }
    this.props.setProgress(100);
  };

  componentDidMount() {
    this.updateNews();
  }

  handleSearchChange = (event) => {
    this.setState({ searchTerm: event.target.value });
  };

  handleSearchSubmit = (event) => {
    event.preventDefault();
    this.setState({ page: 1 }, this.updateNews);
  };

  fetchMoreData = () => {
    this.setState((prevState) => ({ page: prevState.page + 1 }), this.updateNews);
  };

  render() {
    const { articles, totalResults, loading, searchTerm } = this.state;
    const { category } = this.props;

    return (
      <InfiniteScroll
        dataLength={articles.length}
        next={this.fetchMoreData}
        hasMore={articles.length !== totalResults}
        loader={<Spinner className="my-3" />}
      >
        <div className="container">
          <form className="d-flex my-2" style={{ float: 'right', width: '300px' }} onSubmit={this.handleSearchSubmit}>
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search News..."
              aria-label="Search"
              value={searchTerm}
              onChange={this.handleSearchChange}
            />
            <button className="btn btn-outline-dark" type="submit">
              Search
            </button>
          </form>
          <h1 className="my-3">DailyNews - Top {this.capitalize(category)} Headlines</h1>
          {articles.length === 0 && !loading && (
            <div className="alert alert-warning" role="alert">
              No news articles found for the search term {searchTerm} in the category {this.capitalize(category)}.
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
  }

}
