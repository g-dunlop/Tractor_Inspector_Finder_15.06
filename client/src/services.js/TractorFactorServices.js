const baseUrl = 'http://localhost:8080/'

const TractorFactorService = {
    getAllManufacturers() {
        return fetch(baseUrl+"tractors")
        .then(res => res.json());
    },

    getAllInspectors() {
            return fetch(baseUrl+"inspectors")
            .then(res => res.json());
        }
    }

    


export default TractorFactorService;