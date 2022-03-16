import React from 'react';
import axios from 'axios';
import CommentBox from './CommentBox.jsx';

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      coinsData: []
    };

    this.loadData = this.loadData.bind(this);
  }

  loadData() {
    axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd')
      .then(res => {
        this.setState({ coinsData: res.data })
        console.log('loaded', this.state.coinsData[0].current_price)
      })
      .catch(err => console.log(err))
  }

  componentDidMount() {
    this.loadData();
    setInterval(this.loadData, 60000);
  }

  render() {
    return (
      <>
        <h1 className="title">Crypto Price Tracker</h1>
        <div className="final-container">
          <div className="table-container">
            <h2 className="favorites">Favorites</h2>

            <table>
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