import axios from 'axios';

export class API {
    
    getCars() {
        return axios.get('demo/data/Cars.json')
                .then(res => res.data.data);
    }

    
}