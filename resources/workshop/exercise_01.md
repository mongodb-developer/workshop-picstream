![PicStream | Built using MongoDB Stitch and AWS S3](../picstream_logo.png)

## Exercise 1: Set up your Stitch server-side Application

In this exercise, we'll walk through seeing up a free M0 Cluster in MongoDB Atlas and create a Stitch server-side application. We'll also enable Email/Password authentication and create some test users.

### Create a new M0 Cluster

MongoDB Atlas provides are free service tier. An M0 Cluster is a 3-node replica set running on your choice of cloud providers (AWS, Google Cloud, or Azure) with shared RAM and 512 MB of storage. If you already have a M0 Cluster, you can skip this step.

Follow sections A & B in the [MongoDB Atlas Getting Started](https://docs.atlas.mongodb.com/getting-started/) to create an Atlas user account and a free tier cluster. For this workshop, we recommend choosing AWS and N. Virginia (us-east-1).

Your cluster may take a few minutes to spin up. Once it is finished, proceed to the next step.

### Create a Stitch App

Follow section C in the [Create a Stitch App](https://docs.mongodb.com/stitch/procedures/create-stitch-app/) guide to create a Stitch App. Name your application `PicStream`. This could take a few minutes. Once you are in the Stitch Admin Console, proceed to the next step.

### Enable the Email/Password User Provider

Now that we have your Stitch App created, lets enable [Email/Password Authentication](https://docs.mongodb.com/stitch/authentication/userpass/).

- In the Stitch Admin Console, click on Users in the left hand side menu.
- Click the Providers tab
- In the Email/Password row, click the EDIT button
- Set the Provider Status to Enabled.
- Enter the following into the remaining fields and click the Save button.
  - Email Confirmation URL: `http://localhost:3000/confirmEmail`
  - Password Reset URL: `http://localhost:3000/resetPassword`
  - Reset Password Email Subject: `Reset Password`
  - Email Confirmation Subject: `Email Confirmation`

For this application, we won't be setting up new users or resetting passwords. You can learn more about that in the [Email/Password Authentication Usage](https://docs.mongodb.com/stitch/authentication/userpass/#usage) documentation.

### Create 3 Users

Now that the Email/Password Provider is enabled, you can great some users. Create 3 users, the emails do not need to be real for this example. You may use the following user information or create your own.

| Email           | Password  |
| --------------- | --------- |
| person1@mdb.com | password1 |
| person2@mdb.com | password2 |
| person3@mdb.com | password3 |

## Next Exercise

Stop, take a breath. That was a lot. But now you have your own Atlas Cluster and a Stitch App and it cost you \$0. When you're ready, process to the [next exercise](./exercise_02.md) and we'll start connecting it to the React.js application.
