import axios from 'axios'

const API = axios.create({
	baseURL: 'http://localhost:3001',
})

API.interceptors.request.use(
	(req) => {
		if (
			!localStorage.getItem('user') ||
			localStorage.getItem('user') === undefined
		) {
			return req
		} else {
			const token = localStorage.getItem('user')
			req.headers.Authorization = token
		}

		return req
	},
	(err) => {
		return Promise.reject(err)
	}
)

/*
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
)*/

export default API
