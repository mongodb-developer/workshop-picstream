![PicStream | Built using MongoDB Stitch and AWS S3](../picstream_logo.png)

## Exercise 5: Changing the Rules

Congratulations! You should now have a fully functioning PicStream application. But, you're only able to see your own photos. Where's the fun in that? In this exercise, we will make a simple rule change that will allow you to see all the photos shared in the application.

### Add Photos

Log in to each of the users you created and upload at least one photo. Feel free to use the dog pics provided in the resource folder. Notice that each user can only see the photos they have uploaded.

### Change the Rule

Let's delete the rule you created in the last exercise and create another using a different template.

- Go to your Stitch Admin Console
- On the left-hand side menu, click Rules
- Delete the Rule for the `stream` collection. You'll need to check all the boxes in the popup and click Remove Collection.
- Add a new collection with the following options and click Add Collection
  - Database Name: `data`
  - Collection Name: `stream`
  - Select the Template: "Users can read all data, but only write their own data"
  - Field Name For User ID: `owner_id`

Got back to your PicStream application and refresh the page. You should see pictures uploaded by everyone appear. No code change needed.

You can learn more about Rules in the [Stitch](https://docs.mongodb.com/stitch/mongodb/#rules) documentation.

## Next Exercise

You've finished the workshop. But you might be wondering, "Where do I go from here?" Proceed to the [next exercise](./exercise_06.md) to see some next steps.
