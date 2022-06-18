const baseUrl = 'http://localhost:8080/'

const TractorFactorService = {
    getAllManufacturers() {
        return fetch(baseUrl+"tractors")
        .then(res => res.json());
    },

    getAllInspectors() {
            return fetch(baseUrl+"inspectors")
            .then(res => res.json());
        },

    updateInspector(inspectorToUpdate) {
        return fetch(`http://localhost:8080/inspectors/${inspectorToUpdate.id}`,{
            method:'PUT',
            body: JSON.stringify(inspectorToUpdate),
            headers:{
                'Content-Type': 'application/json'
            }
        })
        .then(res=> {
            if (res.ok) {
                console.log(inspectorToUpdate)
            } 
            throw new Error('shiiiit')
        })
        .catch((error) => {
            console.log(error)
            });
        }

    }
    

    


export default TractorFactorService;