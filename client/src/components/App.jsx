import React from 'react';
import axios from 'axios';
import CommentBox from './CommentBox.jsx';
// import pandaImg from '../../../assets/pandaEight.png';
import Carousel, { consts } from 'react-elastic-carousel';
import Animal from "react-animals";


class App extends React.Component {
  constructor() {
    super();

    this.state = {
      coinsData: [],
      trending: []
    };

    this.loadData = this.loadData.bind(this);
    this.loadTrending = this.loadTrending.bind(this);
    this.myArrow = this.myArrow.bind(this);
  }

  myArrow({ type, onClick, isEdge }) {
    const pointer = type === consts.PREV ? '💎🙌' : '💎🙌'
    return (
      <button onClick={onClick} disabled={isEdge}>
        {pointer}
      </button>
    )
  }

  loadData() {
    axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd')
      .then(res => {
        this.setState({ coinsData: res.data })
        console.log('loaded', this.state.coinsData[0].current_price)
      })
      .catch(err => console.log(err))
  }

  loadTrending() {
    axios.get('https://api.coingecko.com/api/v3/search/trending')
      .then(res => {
        this.setState({ trending: res.data.coins })
        console.log(this.state.trending[0].item.large)
      })
      .catch(err => console.log(err))
  }

  componentDidMount() {
    this.loadTrending();
    this.loadData();
    setInterval(this.loadData, 60000);
  }

  render() {
    return (
      <>
        <div className="heading-container">
          <h1 className="title">CryptoPanda</h1>
          <Animal name="panda" color="yellow" size="60px" dance />
        </div>
        {/* <img src={pandaImg} className="panda-img" alt="panda"/> */}
        <div className="final-container">
          <div className="trending-title">
            <h3>Daily Trending</h3>
          </div>
          <div className="trending-box">
            {this.state.trending.length &&
              <Carousel itemsToShow={4} renderArrow={this.myArrow}>
                {this.state.trending.map(card =>
                  <div className="card">
                    <div className="card-container">
                      <img src={card.item.large} alt="Avatar" />
                      <p><b>{card.item.name}</b> ({card.item.symbol})</p>
                      <p>#{card.item.market_cap_rank}</p>
                    </div>
                  </div>
                )}
              </Carousel>
            }
          </div>
            <p style={{fontStyle: 'italic',  width: '800px'}}>Updates every 60 seconds</p>
          <div className="table-container">

            <table className="price-table">
              <thead>
                <tr>
                  <th id="table-head">#</th>
                  <th id="table-head">Coin</th>
                  <th id="table-head">Price</th>
                  <th id="table-head">Mkt Cap</th>
                </tr>
              </thead>
              <tbody>
                {this.state.coinsData.map((coin, i) =>
                  <tr key={`${i}-${coin}`}>
                    <td>{i + 1}</td>
                    <td>
                      <img src={coin.image} className="coin-image"></img>
                      &nbsp; {coin.name}
                    </td>
                    <td>${coin.current_price.toLocaleString("en-US")}</td>
                    <td>${coin.market_cap.toLocaleString("en-US")}</td>
                  </tr>

                )}
              </tbody>
            </table>
          </div>
          <CommentBox />
        </div>
      </>
    )
  }
}

export default App;