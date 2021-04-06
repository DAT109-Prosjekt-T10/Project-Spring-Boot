import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:3001'

axios.interceptors.request.use(
	(config) => {
		const token = localStorage.getItem('user')

		if (token != null) {
			config.headers.Authorization = token
		}

		console.log(config.headers)

		return config
	},
	(err) => {
		return Promise.reject(err)
	}
)

export default axios
