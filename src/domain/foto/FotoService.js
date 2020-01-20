export default class FotoService {

  constructor(resource) {
     this._resource = resource;
     this.base_url = `v1/fotos`;
  }

  lista() {
    return this._resource.get(this.base_url)
               .then(response => response.data)
               .catch(error => {
                  console.log(error);
                    throw new Error('Não foi possível obter as fotos. Tente mais tarde.');
                });
  }

  apaga(id) {
    return this._resource
      .delete(`${this.base_url}/${id}`)
      .catch( err => {
        console.log(err);
        throw new Error('Não foi possível remover a foto');
      });
  }

  cadastra(foto){

    if(foto._id) {
      return this._resource.put(`${this.base_url}/${foto._id}`,foto);
    }

    return this._resource.post(this.base_url,foto);

  }

  busca(id) {
    return this._resource
               .get(`${this.base_url}/${id}`)
               .then(response => response.data);
  }

}
