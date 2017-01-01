import React from 'react'
import { connect } from 'react-redux'
import { ReactReduxAction } from '../actions'


let Bar = ({ dispatch }) => {
  let input
  // 测试函数 返回的是一个 Promises 
  // function fetchSecretSauce() {
	//   return fetch('http://112.74.92.97:8080/Dvt-web/system/carousel/findByElement.do');
	// }
	let fetchSecretSauce = () => (fetch('http://112.74.92.97:8080/Dvt-web/system/carousel/findByElement.do'))
	// 反向控制！
	// function dispatckReturn() {
	//   // 返回一个 接收`dispatch'的函数   这里是一定需要这样做，因为 这里返回的匿名函数 -> 将会 延迟执行
	//   return function () {
	//     // 这里是延迟执行 无论你返回无数个 Promises (Promises链)，或不返回 Promises 都可以，但是要确保，最后返回个 dispatch。
	//     return fetchSecretSauce().then(
	//     	function (response) {
	//     		return response.json().then(
	//     			function (json) {
	//     				return dispatch(ReactReduxAction(json))
	//     			}
	//     		)
	//     	}
	//     )
	//   }
	// }
	let dispatckReturn = () => (
		() => (fetchSecretSauce().then(
	    	success => (
					success.json().then(
						json => (
							dispatch(ReactReduxAction(json))
						)
					)
	    	),
      	error => dispatch(input.value)
	    )
		)
	)
  return (
	  <div>
		<form onSubmit={e => {
			/* 测试 Redux-thunk */
			dispatch(
	      dispatckReturn()
	    );
			/* 阻止默认事件 */
			e.preventDefault()
			/* 输入为空时候不触发 */
			if (!input.value.trim()) {
			  // return
			}
			/* 获取到input.value 触发ReactReduxAction的Action生成函数 再利用生成的Aciton dispatch到数据库 */
			// dispatch(ReactReduxAction(input.value))
			/* 清空input.value */
			input.value = "请查看浏览器Redux里面State"
			}}>
			<input ref={fucke => {
				/* fucke是可以随便改的，这里其实就是JS的词法作用域 */
			  input = fucke
			}}
		/>
			<button type="submit">
			  开始异步加载
			</button>
		</form>
  </div>
  )
}

Bar = connect()(Bar)
export default Bar
