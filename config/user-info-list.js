import store from '@/store'
export default () => {
	
	const userInfo = store.state.userInfo
	return [ 
		[{
				title: '头像',
				event: 'chooseImg', // 点击触发的事件名
				src: userInfo.avatar || '/static/logo.png', // 右侧图片
				prop:'avatar',
				
			},
			{
				title: '昵称',
				event: 'editName',
				value: userInfo.nickname,
				placeholder:'未填写',
				prop:"nickname",
				type:'text'
				
			},
			{
				title: '性别',
				event: 'chooseSex',
				sex:userInfo.sex ,
				prop:"sex"
			},
			{
				title: '手机',
				text:userInfo.phone,
				page:"/pages/mobile-bind/mobile-bind"
			}
		],

	]
}
