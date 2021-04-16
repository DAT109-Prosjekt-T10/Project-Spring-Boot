import axios from 'axios'

const API = axios.create({
	baseURL: 'http://data1.hib.no:9090/gruppe10-backend',
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

export default API
