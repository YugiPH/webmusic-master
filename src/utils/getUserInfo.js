
export default function getUserInfo() {
    return JSON.parse(localStorage.getItem('userInfo'))
}
