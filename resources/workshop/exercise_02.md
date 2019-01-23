![PicStream | Built using MongoDB Stitch and AWS S3](../picstream_logo.png)

## Exercise 2: Connect to your Stitch Application

In this exercise, you will connect to your Stitch App using the Stitch JavaScript Browser SDK and implement authentication.

### Initialize the Stitch App Client

Normally, you would have to install the [Stitch JavaScript Browser SDK](https://docs.mongodb.com/stitch-sdks/js/4/index.html) using npm in a terminal like the following:

```
> npm install mongodb-stitch-browser-sdk
```

but we have done that for you.

First, we'll grab the Stitch App ID

- Go back to the Stitch Admin Console and copy your App ID from the left hand side menu. It should look something like `picstream-asdfg`.
- In the constructor of [`App.js`][1], paste your App ID. It should look like the following

```
this.appId = 'picstream-asdfg'
```

Next, we'll use that to initialize a Stitch App Client and save it as an instance variable. We do this in the `componentDidMount()` life cycle function of the App component. Add the following to the top of this function:

```javascript
this.client = Stitch.initializeAppClient(this.appId)
```

### Implement Authentication

Now that we have an App Client, we can take care of authentication. We need to handle logging in and out, and check to see if a auth session already exists. All this can be done using `this.client.auth`.

Let's start with login, find the `login()` function in the [`App`][1] component. To log in using Email and Password, add the following to the the function:

```javascript
const credential = new UserPasswordCredential(email, password)
const user = await this.client.auth.loginWithCredential(credential)
```

To log out, find the `logout()` function and add the following line to the top:

```javascript
this.client.auth.logout()
```

Now we need to check when the component mounts whether or not the client is logged in. In the `componentDidMount()` life cycle function of the [`App`][1] component, change the value of `isAuthed` to the result of `this.client.auth.isLoggedIn`. It should look like the following:

```javascript
const isAuthed = this.client.auth.isLoggedIn
```

## Next Exercise

You should now be able to log in with any of the 3 users you created in the previous exercise. Give it a try. See what happens when you use an incorrect login. In the [next exercise](./exercise_03.md), we'll connect AWS to your Stitch application so you can store uploaded images in S3.

[1]: ../../src/App.js
