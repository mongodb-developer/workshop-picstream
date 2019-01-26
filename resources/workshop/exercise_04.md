![PicStream | Built using MongoDB Stitch and AWS S3](../picstream_logo.png)

## Exercise 4: Saving and Retrieving Data from MongoDB Atlas

Let's take the response from the `saveFile()` function and save it to our MongoDB Atlas Database along with some other information. We can easily access collections using the [Remote MongoDB Service for Atlas](https://docs.mongodb.com/stitch/mongodb/).

### Document Schema

The PicStream application expects documents to be stored like the following. This will help you when completing the following tasks.

```javascript
{
  "_id": "BSON.ObjectId",  // Unique ID
  "owner_email": "String", // Email of the Document Owner
  "owner_id": "String",    // Unique ID of the Document Owner
  "caption": "String",     // User entered Caption
  "url": "String",         // S3 URL for the Image
  "file": {
    "name": "String",      // Original File Name
    "type": "String"       // File ContentType
  },
  "s3": {
    "bucket": "String",    // S3 Bucket Name
    "key": "String",       // S3 Key
    "ETag": "String"       // Result of S3 Request
  },
  "ts": "DateTime"         // Insert Timestamp
}
```

### Configure Rules

Before we can access our data using Stitch, we need to setup some rules. This works hand in hand with the authentication we setup earlier.

- Go to your Stitch Admin Console
- On the left-hand side menu, click Rules
- Add a new collection with the following options and click Add Collection
  - Database Name: `data`
  - Collection Name: `stream`
  - Select the Template: "Users can only read and write their own data"
  - Field Name For User ID: `owner_id`

We just created a Rule that will make sure that only the user whose ID matches the `owner_id` field can see and modify that document. When you log into the PicStream App, you should only see your own pictures.

### Add the Service to the React Application

Now we can add a reference to the Remote MongoDB Service to our application.

In the `componentDidMount()` lifecycle function of the [`App`][1] component, add the following.

```javascript
this.mongodb = this.client.getServiceClient(
  RemoteMongoClient.factory,
  'mongodb-atlas'
)
```

### Get Entries

Use the reference in the `getEntries()` function to query the `stream` collection in the `data` database for all documents sorted descending by timestamp. The function should return a Promise. The [Browser SDK Docs](https://docs.mongodb.com/stitch-sdks/js/4/interfaces/remotemongocollection.html) will be helpful.

Remember, we haven't added any pictures yet, so don't be concerned if all those lovely dogs disappear.

If you get stuck, you can find a solution [here](https://github.com/aydrian/workshop-picstream/blob/solution/src/App.js#L99).

### Insert Entry

Let's get our dogs back. Use the same reference in the `saveEntry()` function to insert a document that fits (the schema)[# Document Schema] above. Most of it is passed in as the parameter `s3Data`. You just need to add `caption`, `owner_id` (remember, that one is important for our rules), `owner_email`, and `ts`. This function should also return a Promise.

You can use `new Date()` to get the current date.
You can access information about the current users from `this.client.auth.user`. Check out the [Browser SDK Docs](https://docs.mongodb.com/stitch-sdks/js/4/interfaces/stitchauth.html#user) to see what is available.

Again, if you're stuck, you can find a solution [here](https://github.com/aydrian/workshop-picstream/blob/solution/src/App.js#L161).

## Next Exercise

You did it! Your application can now upload a file to AWS S3 and display it on the page. But you can only see your own entries. We'll change that in the [next exercise](./exercise_05.md) without making any front-end code changes.

[1]: ../../src/App.js
