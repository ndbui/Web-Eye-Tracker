var AppController = React.createClass({
  render: function(){
    var message = "";
    message = (
      <div>
        Hello World!
      </div>
    )

    return (
      <div>
        {message}
      </div>
    )
  }
});

ReactDOM.render(<AppController />, document.getElementById('mainthing'));
