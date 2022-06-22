


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

    getInspectorById(id){
        return fetch(baseUrl+`inspectors/${id}`)
        .then(res => res.json())
    },

    getByName(name) {
        return fetch(`http://localhost:8080/inspectors?name=${name}`)
        .then(res => res.json())
    },

    updateInspector(inspectorToUpdate) {
        return fetch(`${baseUrl}inspectors/${inspectorToUpdate.id}`,{
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
        },

    deleteInspector(id) {
        return fetch(`${baseUrl}inspectors/${id}`,{
        method:'DELETE'})
        .then(res=> {
            if (res.ok) {
                console.log("ok")
            } 
            throw new Error('shiiiit')
        })
        .catch((error) => { 
            console.log(error)
            });
    }
}

  

    


export default TractorFactorService;