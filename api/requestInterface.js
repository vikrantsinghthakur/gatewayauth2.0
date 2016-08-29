import axios from 'axios';

const requestInterface={

	fetchOauth(urlStore,oauthParams){
		var request=axios.create({
  			baseURL: urlStore.baseUrl,
		});
		return request.post(urlStore.oauthUrl,oauthParams);
	},

	login(urlStore,loginCreds,token)
	{
		debugger
		var request=axios.create({
  			baseURL: urlStore.baseUrl,
  			headers:{'Authorization':token}
		});
		return request.post(urlStore.loginProfileUrl,loginCreds)
	},

	fetchProfile(urlStore,oauthToken,csrfToken){
		debugger
		var request=axios.create({
  			baseURL: urlStore.baseUrl,
  			headers:{'Authorization':oauthToken, 'X-CSRF-Token':csrfToken}
		});
		return request.get(urlStore.getProfileUrl)
	},

	logout(urlStore,oauthToken,csrfToken){
		var request=axios.create({
  			baseURL: urlStore.baseUrl,
  			headers:{'Authorization':oauthToken, 'X-CSRF-Token':csrfToken}
		});
		return request.post(urlStore.logoutUrl,{})
	}
}

export default requestInterface;