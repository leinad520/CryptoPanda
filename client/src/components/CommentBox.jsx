import React from 'react';
import axios from 'axios';

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      comments: [],
      nickname: '',
      comment: ''
    };

    this.getComments = this.getComments.bind(this);
    this.postComments = this.postComments.bind(this);
    this.handleNicknameChange = this.handleNicknameChange.bind(this);
    this.handleCommentChange = this.handleCommentChange.bind(this);
  }

  getComments() {
    axios.get('/comments')
      .then(res => {
        this.setState({ comments: res.data })
      })
  }

  postComments() {
    axios.post('/comments', {
      nickname: this.state.nickname,
      comment: this.state.comment
    })
      .then(res => {
        console.log(res)
      })
      .then(() => {
        this.setState({ nickname: '', comment: '' })
      })
      .catch(e => console.log(e));
  }

  handleNicknameChange(event) {
    this.setState({ nickname: event.target.value });
  }

  handleCommentChange(event) {
    this.setState({ comment: event.target.value });
  }

  componentDidMount() {
    this.getComments();
  }


  render() {
    return (
      <>
        <div className="comment-component">
          <div className="comment-box">
            <h4>Comments</h4>
            {this.state.comments.map((comment, i) =>
              <div className="comment" key={`${i}-${comment}`}>
                <p>{comment.nickname}</p>
                <p>{comment.comment}</p>
              </div>
            )}
          </div>

          <form className="clearfix" onSubmit={this.handleSubmit}>
            <input className="form-control" ref="author" type="text" placeholder="Nickname" value={this.state.nickname} onChange={this.handleNicknameChange} />
            <br />
            <textarea className="form-control" ref="text" rows="3" placeholder="Your comment" value={this.state.comment} onChange={this.handleCommentChange}></textarea>
            <br />
            <button className="btn btn-primary pull-right" onClick={this.postComments}>Send</button>
          </form>
        </div>
      </>
    )
  }
}

export default App;