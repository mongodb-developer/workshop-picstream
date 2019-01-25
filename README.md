![PicStream | Built using MongoDB Stitch and AWS S3](./resources/picstream_logo.png)

Learn the basics of [MongoDB Stitch](https://www.mongodb.com/cloud/stitch), the serverless platform from MongoDB. You'll add MongoDB Stitch an Instagram-like React.js application using [MongoDB Atlas][1] and [AWS S3](https://aws.amazon.com/s3/).

This workshop will cover the following topics:

- QueryAnywhere
- Database Rules
- Email/Password Authentication
- Storing Images in AWS S3

## Solution

This is the `solution` branch for the workshop. To start the workshop, check out the `master` branch.

## stitch-app

Exported (as template) [Stitch app](https://docs.mongodb.com/stitch/import-export/export-stitch-app/).

## Scripts

The following scripts will assist in the initial setup of your Stitch Application.

## Requirements:

- Install the [stitch-cli](https://docs.mongodb.com/stitch/import-export/stitch-cli-reference/)
- Generate an [API Key](https://docs.atlas.mongodb.com/configure-api-access/#generate-api-keys)
- Create a `.env` file like the following

```
export STITCH_API_KEY=<API_KEY>
export STITCH_USERNAME=<CLOUD_USERNAME>
export STITCH_APPID=<APPID>
```

- Create a `secrets.json` file in the `stitch-app` directory like the following

```
{
  "auth_providers": {
    "oauth2-google": {
      "clientSecret": "<client-secret>"
    }
  },
  "services": {
    "AWS": {
      "secretAccessKey": "<secret-access-key>",
      "accessKeyId": "<access-id>"
    }
  }
}
```

**NOTE:** Do not commit this file.

### deploy.sh

Deploy current code using `./deploy.sh` in the root of the project

```
> ./deploy.sh
```

### export.sh

Export the project code template using `./export.sh` in the root of the project.

```
> ./export.sh
```

**Note:** This exports the application configuration without any service ID values, including the App ID.
