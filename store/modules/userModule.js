export default {
	state:{
		userName:'123'
	},
	getters:{},
	mutations:{
		saveUser(state,payload){
			console.log('24-store',payload)
			state.userName=payload
		}
	},
	actions:{}
}
