export default () => {
	return [
					[{
						title: '账户安全',
						rightIcon:'iconfont icon-jinru',
						page:'/pages/user-safe/user-safe'
					},
					{
						title: '清除应用缓存',
						event: 'clearStorage', 
						text: uni.getStorageInfoSync().currentSize < 1024
							? uni.getStorageInfoSync().currentSize+'KB'
							: (uni.getStorageInfoSync().currentSize/1024.00).toFixed(2)+'MB'
					},
					{
						title:'检查更新',
						rightIcon:'iconfont icon-jinru'
					},
					{
						title:'当前版本',
						text:'1.0.0'
					}]
				]
}