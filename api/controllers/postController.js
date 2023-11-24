const userModel = require("../models/userModel");
const postModel = require("../models/postModel")

// Create Post
exports.createPostController = async (req, res) => {
    try {
        const { title, desc, photo, username, category } = req.body;
        if (!title || !desc) {
            return res.status(404).json("Title, description and username is required");
        }

        const post = await new postModel({ title, desc, photo, username, category }).save();
        res.status(201).json({
            success: true,
            message: "Post created",
            post
        })

    } catch (error) {
        res.status(500).json(error);
    }
}



// Update post
exports.updatePostController = async (req, res) => {
    try {
        const { id } = req.params;
        const post = await postModel.findById(id);
        if (post.username === req.body.username) {
            try {
                const updatedPost = await postModel.findByIdAndUpdate(id, {
                    $set: req.body
                }, { new: true });

                res.status(201).json({
                    success: true,
                    message: "Post updated",
                    updatedPost
                })

            } catch (error) {
                res.status(500).json(error)
            }
        } else {
            res.status(401).json("You can update only your posts")
        }


    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error while creating the post",
            error
        })
    }
}


// Delate post

exports.deletePostController = async (req, res) => {
    try {
        const { id } = req.params;
        const post = await postModel.findById(id);
        if (post.username === req.body.username) {
            try {
                const deletedPost = await postModel.findByIdAndDelete(id);
                res.status(201).json({
                    success: true,
                    message: "Post deleted successfully",
                    deletedPost
                })
            } catch (error) {
                res.status(401).json(error)
            }
        } else {
            res.status(401).json("You can delete only your posts");
        }

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error while deleting the post",
            error
        })
    }
}


// Get Single post

exports.getPostController = async (req, res) => {
    try {
        const { id } = req.params;
        const post = await postModel.findById(id);
        if (!post) {
            return res.status(404).json({
                success: false,
                message: "Post not found"
            })
        }
        res.status(201).json({
            postCount: post.length,
            success: true,
            message: "Post is getting",
            post
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error while getting the post",
            error
        })
    }
}


// Get all posts
exports.getAllPostsController = async (req, res) => {
    const username = req.query.user;
    const catName = req.query.cat;
    try {
        let posts;
        if (username) {
            posts = await postModel.find({ username });
        } else if (catName) {
            posts = await postModel.find({
                categories: {
                    $in: [catName]
                }
            });
        } else {
            posts = await postModel.find({});
        }
        res.status(201).json({
            success: true,
            postCount: posts.length,
            message: "All post are getting",
            posts
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error while getting post",
            error
        })
    }
}