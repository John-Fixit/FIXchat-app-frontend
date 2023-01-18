// export const host = "https://fixchat.vercel.app"
export const host = "http://localhost:4000"

export const registerRoute = `${host}/auth/register`
export const loginRoute = `${host}/auth/login`
export const chatRoute = `${host}/auth/chatHome`
export const allUserRoute = `${host}/auth/allUsers` 
export const sendMessageRoute = `${host}/message/addMsg` 
export const getMessageRoute = `${host}/message/getMsg` 
export const uploadProfileAvatar = `${host}/auth/uploadPhoto`
export const forgotPassword = `${host}/auth/forgot-password`
export const resetPassword = `${host}/auth/reset-password`