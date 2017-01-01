import React, {Component} from 'react'
import Header from './Header'



// const App = () => (
//   <div>
//     "Hello world"
//     {this.props.children}
//   </div>
// )

class App extends Component {
  render() {
    	return (
    		<div>
    			<Header/>
			    <div>↓下面是this.props.children的内容</div>
			    <div>↓</div>
			    {this.props.children}
		    </div>
    	);
    }
}


export default App
