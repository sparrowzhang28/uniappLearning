export default {
	state: {
		jobList: []
	},
	getters: {},
	mutations: {
		saveJobs(state, payload) {
			state.jobList = [...state.jobList, payload]
		},
		updateJobList(state, payload) {
			state.jobList = payload
		}
	},
	actions: {}
}
