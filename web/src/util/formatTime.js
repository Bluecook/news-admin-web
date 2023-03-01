import dayjs from 'dayjs'


const formatTime = {
    getTime: (date) => {
        return dayjs(date).format('YYYY年MM月DD日 HH:mm:ss')
    }
}

export default formatTime