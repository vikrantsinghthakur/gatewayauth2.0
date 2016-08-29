import requestInterface from '../api/requestInterface'
import regEx from './static/regExpression'
import * as profileUrlObject from '../config/staticUrls'

const auth={

urlStore:   {
              baseUrl:"",
              oauthUrl:"",
              csrfUrl:"",
              loginProfileUrl:profileUrlObject.loginProfileUrl,
              getProfileUrl:profileUrlObject.getProfileUrl,
              logoutUrl:profileUrlObject.logoutUrl
            },

oauthCreds: {
              client_id:"",
              client_secret:"",
              grant_type:""
            },

initialise(initParams){
  this.urlStore.baseUrl=initParams.base_url;
  this.urlStore.oauthUrl=initParams.oauth_request_url;
  this.urlStore.csrfUrl=initParams.csrf_request_url;
},

getOauth(oauthParams){
  this.oauthCreds.client_id=oauthParams.client_id;
  this.oauthCreds.client_secret=oauthParams.client_secret;
  this.oauthCreds.grant_type=oauthParams.grant_type;

  return requestInterface.fetchOauth(this.urlStore,this.oauthCreds)
  .then(function(response){
      localStorage.setItem("oauthToken",response.data.access_token)
    })

},

  login(login_creds){
    //base64 email:pass
    var innerLoginObject={}
    if(regEx.expression.test(login_creds.id))
    {
      //logging with email
      innerLoginObject['email']=login_creds.id
    }
    else
    {
      innerLoginObject['phone']=login_creds.id
    }

    let encodedPassword=btoa(login_creds.id+':'+login_creds.password)
    innerLoginObject['password']=encodedPassword

    innerLoginObject['remember_me']=0
    innerLoginObject['is_new']=0
    //innerLoginObject['redirect_path']=window.location.href

    let loginObject={account:innerLoginObject}

    let urlCache=this.urlStore
    let token=localStorage.getItem('oauthToken')

    if(!urlCache.baseUrl)
      throw "Base URL is not defined, please initialise the package first."
    if(!token)
      throw "OAuth2 token is not defined. Please fetch OAuth2 token first."  

    token='Bearer '+token

    return requestInterface.login(this.urlStore,loginObject,token).then(
      function(response){
        debugger
        let csrf=response.data.account.data.token
        localStorage.setItem('csrfToken',csrf)
        return response
      })


  },

  getProfile(){

    let oauthToken=localStorage.getItem('oauthToken')
    let csrfToken=localStorage.getItem('csrfToken')
    let urlCache=this.urlStore
    
    if(!urlCache.baseUrl)
      throw "Base URL is not defined, please initialise the package first."
    if(!oauthToken)
      throw "OAuth2 token is not defined. Please login first." 

    oauthToken='Bearer '+oauthToken

    return requestInterface.fetchProfile(this.urlStore,oauthToken,csrfToken).then(
      function(response){
        debugger
        let csrf=response.data.account.data.token
        localStorage.setItem('csrfToken',csrf)
        return response
      })
  },

  logout(){

    let oauthToken=localStorage.getItem('oauthToken')
    let csrfToken=localStorage.getItem('csrfToken')
    let urlCache=this.urlStore
    
    if(!urlCache.baseUrl)
      throw "Base URL is not defined, please initialise the package first."
    if(!oauthToken)
      throw "OAuth2 token is not defined. Please login first." 

    oauthToken='Bearer '+oauthToken
    return requestInterface.logout(this.urlStore,oauthToken,csrfToken).then(
      function(response){
        debugger
        return response
      })
  }

 }

export default auth