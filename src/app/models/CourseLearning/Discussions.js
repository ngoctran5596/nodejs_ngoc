const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const Discussion = new Schema(
    {
        profile: require("../assets/images/profile.png"),
        name: "ByProgrammers",
        no_of_comments: "11 comments",
        no_of_likes: "72 likes",
        posted_on: "5 days ago",
        comment: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        replies:[{type: mongoose.Schema.Types.ObjectId,ref:"User"}]
    },
    {
        timestamps: true,
    }
);
module.exports = mongoose.model("Discussion", Discussion);
