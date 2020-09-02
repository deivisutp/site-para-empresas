import React, { Component, useRef } from 'react'
import config, { storage } from './../firebase-config'

class AdminPortfolio extends Component {
    constructor(props) {
        super(props)
        
        this.state = {
            estaGravando: false
        }

        this.gravarPortfolio = this.gravarPortfolio.bind(this)
    }

    gravarPortfolio(e) {
            const itemPortfolio = {
                titulo: this.titulo.value,
                descricao: this.descricao.value,
                imagem: this.imagem
            }
            this.setState({estaGravando: true})

            const arquivo = itemPortfolio.imagem.files[0]
            const {name} = arquivo
            const ref = storage.ref(name)

            ref.put(arquivo).then(
                img => {
                    img.ref.getDownloadURL()
                    .then(downloadURL => {
                        const novoPortfolio = {
                            titulo: itemPortfolio.titulo,
                            descricao: itemPortfolio.descricao,
                            imagem: downloadURL
                        }
                        config.push('portfolio', {
                            data: novoPortfolio
                        })
                        this.setState({estaGravando: false})
                    })
                }        
            )
            e.preventDefault()
    }

    render() {
        if (this.state.estaGravando){
            return (
                <div className="container">
                    <p><span className="glyphicon glyphicon-refresh" />Aguarde...</p>
                </div>)
        }
        return (
            <div style={{padding: "120px"}}>
                <h2>Portfolio Area Administrativa</h2>
                <form onSubmit={this.gravarPortfolio}>
                    <div className="form-group">
                        <label htmlfor="titulo">Título</label>
                        <input type="text" className="form-control" id="titulo" placeholder="Título" ref={(ref) => this.titulo = ref}/>
                    </div>
                    <div className="form-group">
                        <label htmlfor="descricao">Descrição</label>
                        <textarea class="form-control" id="descricao" rows="3" ref={(ref) => this.descricao = ref}></textarea>
                    </div>
                    <div className="form-group">
                        <label htmlfor="imagem">Imagem</label>
                        <input type="file" class="form-control-file" id="imagem" ref={(ref) => this.imagem = ref}/>
                    </div>
                    <button type="submit" className="btn btn-primary">Salvar</button>
                </form>
            </div>
        )
    }
}

export default AdminPortfolio