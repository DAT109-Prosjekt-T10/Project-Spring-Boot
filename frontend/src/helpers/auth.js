import jwt_decode from 'jwt-decode'

const getUserByToken = (token) => (token ? jwt_decode(token) : null)

const isValidToken = (token) => {
	const obj = jwt_decode(token)
	return obj ? Date.now() < obj.exp * 1000 : false
}

export { getUserByToken, isValidToken }
