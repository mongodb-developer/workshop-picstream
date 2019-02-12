![PicStream | Built using MongoDB Stitch and AWS S3](./resources/picstream_logo.png)

Learn the basics of [MongoDB Stitch](https://www.mongodb.com/cloud/stitch), the serverless platform from MongoDB. You'll add MongoDB Stitch to an Instagram-like React.js application using [MongoDB Atlas][1] and [AWS S3](https://aws.amazon.com/s3/).

This workshop will cover the following topics:

- QueryAnywhere
- Database Rules
- Email/Password Authentication
- Storing Images in AWS S3

## Things You'll Need Before You Start

### Node.js

You will need to have Node.js installed on your machine.

Check if you have Node installed by typing `node --version` in your terminal. If you get an error, download it from If you get an error, download it here: https://nodejs.org/en/download/ or install it via a package manager. If you're on a Mac and have [Homebrew](https://brew.sh/) installed. You can run `brew install node` from your terminal.

### Git

You will need to have Git installed as well. One quick way to do this is to install GitHub Desktop.

Check if you have Git installed by typing `git --version` in your terminal. If you get an error, download it here: https://desktop.github.com/

### GitHub Account

https://github.com/join

Sign up for a GitHub account. If you want to clone the code locally and push changes, you'll
need to [generate](https://help.github.com/articles/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent/) an SSH key
and [upload](https://help.github.com/articles/adding-a-new-ssh-key-to-your-github-account/) it to GitHub.

### MongoDB Atlas

You'll be storing and accessing data from a [MongoDB Atlas][1] M0 Cluster. This is also how you will configure your Stitch server-side app. If you already have a MongoDB Cloud account, you can use it. Otherwise, you'll walk through creating one in the first exercise.

### AWS Account

You'll be using AWS S3 to store uploaded files. If you don't already have an AWS Account, you can create one at https://aws.amazon.com/.

## Set Up The Project

You may choose to complete this in a pair or team. One person on the team should fork the repo (see below). Everyone else on the team can clone that copy to their machines and follow the setup steps below.

### Fork this repo

You won't be able to make changes to this repo, so you will need to fork it (make a copy of it). Click the "Fork" button in the upper right hand corner of this repo. This will give you your own copy of this repo to work with in your GitHub account.

If you are working in a pair or team, only one person needs to fork it. Add everyone on your team as a "collaborator". You can do that at `https://github.com/<GHUsername>/workshop-picstream/settings/collaboration`.

### Clone Your Forked Version

Make a local copy of your version using the `git clone` command. Use the "Clone or Download" button to get the URL to your copy of the project.

Type `cd workshop-picstream` to change your working directory into your copy of the repo.

### Install Depedencies

Use `npm install` in the root of your project to install all the project dependencies.

### Start the App

This project uses [Create React App](./CRA-README.md) to run a development server and build a production app.

Type `npm start` in a terminal window to start the local server and launch a browser window to http://localhost:3000. The application functionality has been mocked, so you can log in using any email/password combination and click around. You'll be slowly replacing the mocks with MongoDB Stitch.

## First Exercise

Once you have the application running and have clicked around a bit, let's get started with the [First Exercise](./resources/workshop/exercise_01.md).

[1]: https://www.mongodb.com/cloud/atlas
