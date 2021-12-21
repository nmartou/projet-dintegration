import React, { Component } from 'react'
import axios from 'axios';
import './ContactAdmin.css';
import Modal from './Form'; 

class ContactAdmin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            openItems: [],
            closedItems: [],
            isLoaded: false,
            show: false
        };
        this.handleSend = this.handleSend.bind(this);
    }

    //Modifier l'état du formulaire (visible ou invisible)
    handleShow = () => {
        this.setState((state) => {
            return {show: this.state.show ? false : true}
        });
        gid("warning").innerHTML = "";
        gid("response-form").value = "";
    }

    //Au chargement de la page, récupération des reqêtes ouvertes et fermées
    componentDidMount() {
        axios.get("http://localhost:5000/api/contact/open")
            .then((result) => {
                this.setState({
                    openItems: result.data,
                    isLoaded: true
                })
            })

        axios.get("http://localhost:5000/api/contact/closed")
        .then((result) => {
            this.setState({
                closedItems: result.data,
                isLoaded: true
            })
        })
    }

    //Récupération des informations pour le formulaire
    handleOpenForm = event => {
        let id = event.target.id;
        axios.get("http://localhost:5000/api/contact/request/" + id)
            .then((result) => {
                gid("id-form").innerText = id;
                gid("subject-form").innerHTML = result.data.subject;
                gid("message-form").innerHTML = result.data.message;
                gid("response-form-text").innerHTML = result.data.response;
                this.handleShow();
            })
            .catch((error) => {
                console.log(error);
                gid("warning").innerHTML = "Erreur !";
            })
    }

    //Change le status de la requête
    handleChangeStatus = event => {
        let stat;
        if(event.target.value === "open") stat = true;
        else stat = false;
        let data = {status: stat};
        axios.put("http://localhost:5000/api/contact/status/" + event.target.id,
        data)
            .then(function(response) {
                console.log(response);
                window.location.reload(false);
            })
            .catch(function(err) {
                console.log(err.message);
            })
    }

    verifyResponse() {
        gid('warning').innerHTML = "";
        let data = gid("response-form").value;
        if(!data || (data.length <= 1)) {
            gid('warning').innerHTML = "La réponse est trop courte ou manquante !";
            return false;
        }
    }

    //Récupère le mail, le sujet et le message de la requête et puis appelle la fct sendMail si réussi
    getRequest(id, response, data) {
        let mail, message, subject;
        axios.get("http://localhost:5000/api/contact/request/" + id)
            .then((result) => {
                mail = result.data.mail;
                subject = result.data.subject;
                message = result.data.message;
                let res = this.sendMail(mail, message, subject, response, data, id);
                return res;
            })
            .catch((error) => {
                console.log(error);
                gid("warning").innerHTML = "Erreur !";
                return false;
            })
    }

    //Envoie le mail avec les infos reçues et appelle la fct putRequest si réussi
    sendMail(mail, message, subject, response, data, id) {
        axios.post("http://localhost:5000/api/contact/send/", {
            mail: mail,
            subject: subject,
            message: message,
            response: response
        })
            .then((result) => {
                this.putRequest(id, data);
                return true;
            })
            .catch((error) => {
                console.log(error);
                this.handleShow();
                return false;
            })
    }

    //Modifie les données dans la db
    putRequest(id, data) {
        axios.put("http://localhost:5000/api/contact/" + id,
        data)
            .then(function(response) {
                window.location.reload(false);
            })
            .catch(function(err) {
                console.log(err.message);
            })
    }

    //Récupère les infos utiles et appelle la fct getRequest
    handleSend = event => {
        if(this.verifyResponse() == false) return false;
        let response = gid("response-form").value;
        let id = gid("id-form").innerText;
        let data = {response: response};
        let mail, message, subject = this.getRequest(id, response, data);
        
        if(mail === "" || mail === undefined) {console.log('Get Failed !'); return false;}
    }

    render() {
        const { openItems } = this.state;
        const { closedItems } = this.state;
        if (!this.state.isLoaded) {
            return <div>Chargement ... </div>;
        } else {
            return (
                <div>
                    <Modal show={this.state.show} handleShow={this.handleShow} send={this.handleSend}>
                    </Modal>
                    <div id="openTable">
                        <h3>Requêtes ouvertes</h3>
                        <table className="table 5p">
                            <thead>
                                <tr>
                                    <th scope="col">Objet</th>
                                    <th scope="col">Statut</th>
                                </tr>
                            </thead>
                            <tbody>
                                {openItems.map((request) => (
                                <tr>
                                    <td>
                                        <span className="float-start" id="textObjet">{request.subject}</span>
                                        <div >
                                            <button id={request._id} className="btnShow float-end btn btn-dark text-right" onClick={this.handleOpenForm}>Plus..</button>
                                        </div>
                                    </td>
                                    <td id="statut">
                                        <select id={request._id} onChange={this.handleChangeStatus} className="form-select" aria-label="Default select example">
                                            <option className="open-select" selected id="openSelect" value="open">Ouvert</option>
                                            <option className="close-select" id="closeSelect" value="close">Fermé</option>
                                        </select>
                                    </td>
                                </tr>))}
                            </tbody>
                        </table>
                    </div>
                    <div id="closeTable">
                    <h3>Requêtes fermées</h3>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col">Objet</th>
                                    <th scope="col">Statut</th>
                                </tr>
                            </thead>
                            <tbody>
                            {closedItems.map((request) => (
                                <tr>
                                    <td>
                                        <span className="float-start" id="textObjet">{request.subject}</span>
                                        <div >
                                            <button id={request._id} className="btnShow float-end btn btn-dark text-right" onClick={this.handleOpenForm}>Plus..</button>
                                        </div>
                                    </td>
                                    <td id="statut">
                                        <select id={request._id} onChange={this.handleChangeStatus} className="form-select" aria-label="Default select example">
                                            <option className="open-select" id="openSelect" value="open">Ouvert</option>
                                            <option selected className="close-select" id="closeSelect" value="close">Fermé</option>
                                        </select>
                                    </td>
                                </tr>))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )
        }
    }
}

//Permet de récupérer l'élément ayant comme identifiant id
function gid(id) {return document.getElementById(id);}

export default ContactAdmin;