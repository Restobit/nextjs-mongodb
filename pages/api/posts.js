const { connectToDatabase } = require("../../lib/mongodb");
const ObjectId = require("mongodb").ObjectId;

export default async function handler(req, res) {
  // switch the methods
  switch (req.method) {
    case "GET": {
      async function getPosts(req, res) {
        try {
          // connect to the database
          let { db } = await connectToDatabase();
          let { client } = await connectToDatabase();

          console.log("client", client);

          // fetch the posts
          let posts = await db
            .collection("posts")
            .find({})
            .sort({ published: -1 })
            .toArray();

          console.log("posts", posts);

          // return the posts
          return res.json({
            message: JSON.parse(JSON.stringify(posts)),
            success: true,
          });
        } catch (error) {
          // return the error
          return res.json({
            message: new Error(error).message,
            success: false,
          });
        }
      }
      return getPosts(req, res);
    }

    case "POST": {
      async function addPost(req, res) {
        try {
          // connect to the database
          let { db } = await connectToDatabase();
          // add the post
          await db.collection("posts").insertOne(JSON.parse(req.body));
          // return a message
          return res.json({
            message: "Post added successfully",
            success: true,
          });
        } catch (error) {
          // return an error
          return res.json({
            message: new Error(error).message,
            success: false,
          });
        }
      }

      return addPost(req, res);
    }

    case "PUT": {
      async function updatePost(req, res) {
        try {
          // connect to the database
          let { db } = await connectToDatabase();

          // update the published status of the post
          await db.collection("posts").updateOne(
            {
              _id: new ObjectId(req.body),
            },
            { $set: { published: true } }
          );

          // return a message
          return res.json({
            message: "Post updated successfully",
            success: true,
          });
        } catch (error) {
          // return an error
          return res.json({
            message: new Error(error).message,
            success: false,
          });
        }
      }

      return updatePost(req, res);
    }

    case "DELETE": {
      async function deletePost(req, res) {
        try {
          // Connecting to the database
          let { db } = await connectToDatabase();

          // Deleting the post
          await db.collection("posts").deleteOne({
            _id: new ObjectId(req.body),
          });

          // returning a message
          return res.json({
            message: "Post deleted successfully",
            success: true,
          });
        } catch (error) {
          // returning an error
          return res.json({
            message: new Error(error).message,
            success: false,
          });
        }
      }

      return deletePost(req, res);
    }
  }
}
