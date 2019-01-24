![PicStream | Built using MongoDB Stitch and AWS S3](../picstream_logo.png)

## Exercise 3: Upload Images to AWS S3

Now that you can connect to your Stitch App and properly authentication, let's start to build out the functions that make up the `handleUpload()` function used by the `UploadModal` component. In this exercise, we'll store the image file in an S3 Bucket and return an object with details about the file and S3.

### Add AWS Service in Stitch

Stitch provides a generic [AWS services](https://docs.mongodb.com/stitch/services/aws/) that enables you to connect to many of the AWS cloud-based services. Let's create a services instance that will allow you to put objects into S3.

- [Create an S3 Bucket](https://docs.aws.amazon.com/AmazonS3/latest/gsg/CreatingABucket.html). The name of your bucket must be a unique DNS-compliant name. Perhaps try `picstream-xxx` where `xxx` are your initials.
- In your [AWS Management Console](https://console.aws.amazon.com), [Create an IAM user](https://docs.aws.amazon.com/IAM/latest/UserGuide/best-practices.html#create-iam-users) with Read/Write S3 Permissions and save its Access Key and Secret. We'll need these for the AWS Service.
- In your Stitch Admin Console, click Services in the left-hand side menu.
- Click Add a Service, enter the following, and click Save.
  - Service Name: `aws` (all lower case)
  - Access Key ID: Your access key from above
  - Secret Access Key: Your secret access key from above
- Next we will add Rules to restrict how this service can be used since we'll be accessing it from front-end code.
  - Create a New Rule and name it `S3`.
  - Add an Action for API: `s3` and Action: `PutObject`
  - Add the following When to restrict the service to using your S3 bucket with the following content type and click Save.

```javascript
{
  "%%args.Bucket": "your-bucket-name",
  "%%args.ContentType": {
    "%in": [
      "image/gif",
      "image/jpeg",
      "image/png"
    ]
  }
}
```

### Add the Service to the React Application

Now that you have the AWS Service setup in your Stitch App, let's use it. First we need to get a reference to the service. Normally you would need to install an additional npm package by running the following in the terminal, but that has been done for you.

```
> npm install mongodb-stitch-browser-services-aws
```

In the `componentDidMount()` lifecycle function of the [`App`][1] component, add the following line.

```javascript
this.aws = this.client.getServiceClient(AwsServiceClient.factory, 'AWS')
```

Now let's use this in the `saveFile()` function to upload the `file` argument to S3. An example is available [here](https://docs.mongodb.com/stitch/services/aws/#calling-an-aws-service-from-the-sdks).

- Many of the Args have been provide for you.
- Update the `bucket` variable to the name of your S3 bucket.
- Build the S3 request and execute it.

Try uploading something and see if it appears in your S3 Bucket. If you run into trouble, you can find the solution [here](https://github.com/aydrian/workshop-picstream/blob/solution/src/App.js#L122).

## Next Exercise

You should now be able to upload a file and see it in your S3 bucket. In the [next exercise](./exercise_04.md), you'll save that information into your MongoDB Atlas collection.

[1]: ../../src/App.js
