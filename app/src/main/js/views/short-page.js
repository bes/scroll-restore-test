import React from 'react';

class ShortPage extends React.Component {
  static propTypes = {
    history: React.PropTypes.object.isRequired,
  };

  constructor() {
    super();
  }

  render() {
    return (
      <div style={{backgroundColor: "#6b9"}}>
        <h1>Short content page</h1>
        When navigating back from this page, scroll restoration <span
        style={{ backgroundColor: "red" }}>does not work properly in some browsers</span>.
      </div>
    );
  }
}

export { ShortPage };
