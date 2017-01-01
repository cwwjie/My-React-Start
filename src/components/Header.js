import React, {Component} from 'react'
import { Link } from 'react-router'


class Header extends Component {

  render() {
    return (
	  <header>
	    <a href="./../index.html"><i></i></a>
	    <div className="Center">
			<i className="left"></i><span id="login">React-Redux-技术践</span><i className="right"></i>
			<div className="dropdown">
				<ul>
					<Link to="/foo"><li><i></i>"#/foo" 测试 React-Redux-router</li></Link>
					<Link to="/bar"><li><i></i>"#/bar" 测试 React-Redux-thunk</li></Link>
				</ul>
			</div>
	    </div>
	  </header>
    );
  }
}

export default Header;