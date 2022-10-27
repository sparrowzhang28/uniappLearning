import Vue from "vue"
import Vuex from "vuex"
import userModule from "./modules/userModule.js"
import jobModule from "./modules/jobModule.js"

Vue.use(Vuex)

export default new Vuex.Store({
		modules:{
			userModule,
			jobModule
		}
})
