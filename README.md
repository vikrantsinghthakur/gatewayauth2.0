# gatewayauth2.0 - Oauth2.0 login interface

An interface for facilitating Oauth2.0 login flow on servers.

Oauth2.0 steps in package:
  - Initialise the app with base url, oauth token and csrf token url.
  - Request oauth token and set it in header for subsequent resources.
  - Request protected resource with credentials(ideally username and password). Please check if the encoding meets your requirements and make relevant changes.
  - CSRF token is optional, and can be set if required.
  - Request the resource again if needed.
  - End the session.

The repo includes an example. Instructions to run example:
  - Clone the repo
  - npm install
  - npm start
  - navigate to localhost:8080 on your browser.