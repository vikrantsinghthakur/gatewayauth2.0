import React from 'react';
import ReactDOM from 'react-dom';
import auth from '../src/cd-authentication.js'
import InputField from './elements/input.jsx'
class Hello extends React.Component {
    
    initialise(e){
        e.preventDefault()
        var request_url={}
        request_url["base_url"]=e.currentTarget[0].value
        request_url["oauth_request_url"]=e.currentTarget[1].value
        request_url["csrf_request_url"]=e.currentTarget[2].value
        
        auth.initialise(request_url)
    }

    fetchOauth(e){
        e.preventDefault()
        var request_params={}
        request_params["client_id"]=e.currentTarget[0].value
        request_params["client_secret"]=e.currentTarget[1].value
        request_params["grant_type"]=e.currentTarget[2].value

        auth.getOauth(request_params)
        .then(function(response){console.log(JSON.stringify(response))})
        .catch(function(error){console.log(error)})
    }

    login(e){
        e.preventDefault()
        var login_params={}
        login_params["id"]=e.currentTarget[0].value
        login_params["password"]=e.currentTarget[1].value
        login_params["redirect_url"]=e.currentTarget[2].value

        auth.login(login_params)
        .then(function(response){console.log((JSON.stringify(response)))})
        .catch(function(error){console.log(error)})
    }

    getProfile(e){
        e.preventDefault();
        auth.getProfile()
        .then(function(response){console.log(JSON.stringify(response))})
        .catch(function(error){console.log(error)})
    }

    logout(e){
        e.preventDefault();
        auth.logout()
        .then(function(response){console.log(response)})
        .catch(function(error){console.log(error)})
    }
    
    render() {
        
        return 	<div>
                        <form className="query-block"  onSubmit={this.initialise.bind(this)}>
                            <h2>Campusdiaries authentication</h2>
                            <InputField id="baseUrl" type="text" defaultValue="<Base url here>" label="Base Url "/>
                            <InputField id="oauthUrl" type="text" defaultValue="oauth2 token extension here" label="Oauth URL "/>
                            <InputField id="csrfUrl" type="text" defaultValue="session token extension here" label="CSRF URL "/>
                            <input type="submit" value="Initialize"></input>
                        </form>
        			    <form className="query-block"  onSubmit={this.fetchOauth.bind(this)}> 
                            <InputField id="clientId" type="text" defaultValue="client ID" label="Client ID "/>
                            <InputField id="clientSecret" type="text" defaultValue="client secret" label="Client Secret "/>
                            <InputField id="grantType" type="text" defaultValue="client credentials" label="Grant type "/>
                            <input type="submit" value="Fetch Oauth"></input>
                        </form>
                        <form className="query-block"  onSubmit={this.login.bind(this)}> 
                            <InputField id="username" type="text" defaultValue="" label="Email "/>
                            <InputField id="password" type="password" defaultValue="" label="Password "/>
                            <InputField id="redirect_url" type="text" defaultValue="" label="Redirect URL(if any) "/>
                            <input type="submit" value="Login"></input>
                        </form>
                        <form className="query-block"  onSubmit={this.getProfile.bind(this)}> 
                            <input type="submit" value="Get Profile (if logged in)"></input>
                        </form>
                        <form className="query-block"  onSubmit={this.logout.bind(this)}> 
                            <input type="submit" value="Logout"></input>
                        </form>
				</div>
    }
}
ReactDOM.render( < Hello / > , document.getElementById('hello'));