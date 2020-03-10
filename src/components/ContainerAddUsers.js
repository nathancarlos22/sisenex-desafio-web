import React, {Component} from 'react';
import api from '../services/api'

export default class ContainerAddUsers extends Component {
    constructor(props) {
        super(props);

        this.state = {
            id: '',
            name: '',
            avatarUrl: '',
            email: '',
            cell: ''
        }
    }
    
    handleChange(e){
        this.setState({ [e.target.name]: e.target.value });
    }
    
    AddUser() {
        var id = '';
        var name = document.querySelector('#Nome').value;
        var avatarUrl = document.querySelector('#urlAvatar').value;
        var email = document.querySelector('#Email').value;
        var cell = document.querySelector('#Cell').value;

        api.post('/users', { id, name , avatarUrl, email, cell })
        .then(() => {
            alert("sucesso ao cadastrar");
        }).catch((err) => {
            alert("error: " + err.toString());
        });
    }

    

    render() {
        return (
        
        <div className="rounded" style={styles.container}>
            <h5 >Adicionar user</h5>
            <div className="row">
                
                <form className="col-xs-2">
                    <div className="col-xs-2">
                        <label>Nome</label>
                        <input className="form-control" id="Nome" placeholder="nome"/>
                    </div>                           

                    <div className="form-group">
                        <label htmlFor="Email">Email</label>
                        <input className="form-control"type="Email" id="Email" placeholder="email@exemplo.com"/>
                    </div>

                    <div className="form-group">
                        <label htmlFor="urlAvatar">Url Avatar</label>
                        <input className="form-control"type="text" id="urlAvatar" placeholder="https://example.jpg"/>
                    </div>

                    <div className="form-group">
                        <label htmlFor="cell">Celular</label>
                        <input className="form-control" id = "Cell" placeholder="telefone"/>
                    </div>  
                    
                    <button type="submit" onClick={this.AddUser} className="btn btn-primary">Adicionar</button>
                </form>
            </div>
            
        </div>
          
        );
    }
}

var styles = {
    container : {
        margin: 10,
        background: 'white',
        padding: 50
    }
}