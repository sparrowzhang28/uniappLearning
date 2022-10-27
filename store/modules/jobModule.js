export default {
	state:{
		jobList:[]
	},
	getters:{},
	mutations:{
		saveJobs(state,payload){
			state.jobList=[...state.jobList,payload]
		}
	},
	actions:{}
}
