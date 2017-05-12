import React from 'react';

class LongPage extends React.Component {
  static propTypes = {
    history: React.PropTypes.object.isRequired,
  };

  constructor() {
    super();
  }

  render() {
    return (
      <div style={{minHeight: "200vh", backgroundColor: "#69b"}}>
        <h1>Long content page</h1>
        When navigating back from this page, scroll restoration <span
        style={{ backgroundColor: "green" }}>works properly in all browsers</span>.
      </div>
    );
  }
}

export { LongPage };
