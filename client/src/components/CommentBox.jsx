import React from 'react';
import axios from 'axios';

class App extends React.Component {
  constructor() {
    super();

    this.state = {

    };

  }

  render() {
    return (
      <>
        <div className="comment-component">
          <div className="comment-box">
            <h4>Comments</h4>
            <div className="comment">
              <p>nickname</p>
              <p>comment</p>
            </div>
            <div className="comment">
              <p>nickname</p>
              <p>comment</p>
            </div>
          </div>

          <form className="clearfix" onSubmit={this.handleSubmit}>
            <input className="form-control" ref="author" type="text" placeholder="Nickname" />
            <br />
            <textarea className="form-control" ref="text" rows="3" placeholder="Your comment"></textarea>
            <br />
            <button className="btn btn-primary pull-right">Send</button>
          </form>
        </div>
      </>
    )
  }
}

export default App;