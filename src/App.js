import React, {Component} from 'react';
import api from './services/api'
import ContainerAddUsers from './components/ContainerAddUsers'  

export default class App extends Component {  

  state = {
    users: [],
    id: '',
    email: '',
    avatarUrl: '',
    cell: ''
    
  }

  //buscar usuario
  HandleSearch = (e) => {
    api.get('/users?q='+ e.target.value)
    .then(res => {
        const users = res.data;
        this.setState( { users } );
        console.log(users.length)
        if (users.length == 0) {
          return <h5>Nada encontrado</h5>
        }
    
    }).catch((err) => {
        console.log(err)
    });
}
 //delete users
  DeleteUser = (e) => {
    const id = e.target.value;
    console.log(id)

    api.delete('/users/'+ id)
    .then(() => {
        alert("sucesso ao deletar");
    }).catch((err) => {
        alert("error: " + err.toString());
    });
  }

  //Editar usuarios
  EditUsers (e) {
    const id = e.target.value;
    console.log(id)

    api.get('/users/'+ id)
    .then((res) => {
      var name = res.data.name;
      var email = res.data.email;
      var avatarUrl = res.data.avatarUrl;
      var cell = res.data.cell;
      
      name = prompt('name', name);
      email = prompt('email', email);
      avatarUrl = prompt('avatarUrl', avatarUrl);
      cell = prompt('cell', cell);

      api.put('/users/' + id, {
        name: name,
        email: email,
        avatarUrl: avatarUrl,
        cell: cell
      })
    }) .catch((err) => {
      console.log(err)
    })
  }

  render() {
    return (
      <div> {/* pesquisa */}
        <div>
            <div className="d-flex justify-content-center" style={styles.containerSearch}>
              <label style={styles.search} htmlFor="search">Pesquisar </label>
              <input id="search" onChange= { this.HandleSearch }style={styles.search} type="text"></input>
            </div>
          </div>
        <div className="container">
          <div className="row">
            
            {/* Cadastro */}
            <ContainerAddUsers/>
            
            {/* cards */}
            { 
              this.state.users.map (users => (
                <div key={users.id} className = "border col-sm-3" style={ styles.container }>
                  
                  <img className ="rounded-circle" style={styles.imagem} src={users.avatarUrl} alt="Avatar"></img>
                  <div>
                    <h5>{users.name}</h5>
                    <p>{users.email}</p>
                    <p>{users.cell}</p>
                    <button id="id" type="submit" value={ users.id } className="btn btn-primary" style={styles.margem} onClick={this.EditUsers}>Editar</button>
                    <button id="id" type="submit" value={ users.id } className="btn btn-primary" style={styles.margem} onClick={this.DeleteUser}>Excluir</button>
                  </div>
                </div>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  
                ))}
          </div>
        </div>
      </div>
      
    );
  }
}

var styles = {
  container: {
    margin: 10,
    height: 300,
    background: 'white'
  },
  margem : {
    margin: 10
  },
  containerSearch : {
    marginTop: 10 ,
    background: 'white',
  },
  search: {
    margin: 10,
    fontWeight: 'bold'
  },
  imagem : {
    margin: 10,
    maxWidth: 100,
    maxHeight: 100,
    objectFit: 'contain',
  }
}
