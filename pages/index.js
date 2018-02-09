import React from 'react';
import withRedux from 'next-redux-wrapper';
import {toggleLoginMode} from '../src/actions/users';
import configureStore from '../src/store/configureStore';

class Counter extends React.Component {

 static getInitialProps({ store, isServer })

{
    store.dispatch(toggleLoginMode()); return { isServer };
}

 render() {
  return (
    <div className="hello"><p>Hello World</p>
      <style jsx>{` .hello { font: 60px Helvetica, Arial, sans-serif; background: #eee; padding: 100px; text-align: center; transition: 100ms ease-in background; } .hello:hover { background: #ccc; } `}</style> </div>
   );
 }
}

function mapStateToProps() { return { }; }

export default withRedux(configureStore, null, mapStateToProps)(Counter);
