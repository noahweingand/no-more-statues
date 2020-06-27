const axios = require('axios');
const url = "http://localhost:8080/api/statues"
class StatueService {
    async getAllStatues() {
        axios.get(url + '/all')
        .then(res => {
            const statueData = res.data["Items"];
            console.log(statueData)
            return Promise.resolve(statueData);
        })
    }
}

export default StatueService;