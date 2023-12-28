import React from "react";
import "./quotebox.css";
import "../../App.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuoteLeft } from "@fortawesome/free-solid-svg-icons";
import { faXTwitter } from "@fortawesome/free-brands-svg-icons";
import { faTumblr } from "@fortawesome/free-brands-svg-icons";

class QuoteBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      quoteText: "",
      quoteAuthor: "",
      contentLoaded: false,
    };

    this.handleNext = this.handleNext.bind(this);
    this.fetchAndUpdate = this.fetchAndUpdate.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
  }
  handleNext() {
    const colors = [
      "purple",
      "pink",
      "orange",
      "cyan",
      "brown",
      "green",
      "yellowgreen",
      "burlywood",
      "magenta",
    ];
    const hovercolors = [
      "#951a95",
      "#fca4b3",
      "#f3b84b",
      "#6fecec",
      "#974242",
      "#015a01",
      "#015701",
      "#c3904d",
      "#ff57ff",
    ];
    const idx = Math.floor(Math.random() * colors.length);
    document.documentElement.style.setProperty("--main-color", colors[idx]);
    document.documentElement.style.setProperty(
      "--hover-color",
      hovercolors[idx]
    );

    this.setState({
      contentLoaded: false,
    });
    this.fetchAndUpdate();
  }
  fetchAndUpdate() {
    fetch("https://type.fit/api/quotes")
      .then((response) => response.json())
      .then((data) => {
        const dataidx = Math.floor(Math.random() * data.length);
        const authorString = data[dataidx].author;
        const authorArray = authorString.split(", ");
        const authorName =
          authorArray.length > 1
            ? authorArray[0]
            : authorArray[0] === "type.fit"
            ? "Anonymous"
            : authorString;
        console.log(authorName);
        this.setState({
          quoteText: data[dataidx].text,
          quoteAuthor: authorName,
          contentLoaded: true,
        });
      });
  }
  componentDidMount() {
    this.fetchAndUpdate();
  }
  render() {
    const { quoteText, quoteAuthor, contentLoaded } = this.state;

    return (
      <div className="child__OfApp">
        <div className="quotebox" id="quote-box">
          <div className="quote__container">
            <h2 class={`quote ${contentLoaded ? "loaded" : ""}`} id="text">
              <FontAwesomeIcon className="quotation" icon={faQuoteLeft} />
              {quoteText}
            </h2>
            <div className="author-name">
              <p
                className={`author ${contentLoaded ? "loaded" : ""}`}
                id="author"
              >
                - {quoteAuthor}
              </p>
            </div>
          </div>
          <div className="buttons">
            <div className="share-icons">
              <a
                href={`https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text="${quoteText}" ${quoteAuthor}`}
                target="_blank"
                className="twitter share-button"
                id="tweet-quote"
              >
                <FontAwesomeIcon className="icons" icon={faXTwitter} />
              </a>
              <a
                href={`https://www.tumblr.com/widgets/share/tool?posttype=quote&tags=quotes&caption=${quoteAuthor}&content=${quoteText}&canonicalUrl=https%3A%2F%2Fwww.tumblr.com%2Fbuttons&shareSource=tumblr_share_button`}
                target="_blank"
                className="tumbler share-button"
                id="tumbler-quote"
              >
                <FontAwesomeIcon className="icons" icon={faTumblr} />
              </a>
            </div>
            <div class="hidden-div"></div>
            <div className="next-quote">
              <button
                className="next-quote-button"
                id="new-quote"
                onClick={this.handleNext}
              >
                New Quote
              </button>
            </div>
          </div>
        </div>
        <a href="https://github.com/rvif" target="_blank" className="footer">
          created by rvif
        </a>
      </div>
    );
  }
}
export default QuoteBox;
