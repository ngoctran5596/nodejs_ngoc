const Video = require('../models/CourseLearning/Video');
const Course = require('../models/CourseLearning/Courses');
const { json } = require('express');

class VideoController {
    //[POST],/addVideo/
    async create(req, res, next) {
        const data = req.body;
        const course_id = req.query.id;

        if (req.file) {
            const source = process.env.VIDEO_URL + req.file.filename;
            const size = Math.floor(req.file.size / 1048576)

            const videoNew = new Video({
                ...data,
                source,
                course_id,
                size
            });
            videoNew.save()
                .then((data) => {
                    Course.findOneAndUpdate(
                        { _id: course_id },
                        { $push: { videos: data._id } }
                    ).then((dataCourse) => res.json(dataCourse))
                })
                .catch((err) => {
                    res.json({ message: "Error Save" });
                })
        } else {
            // const videoNew = new Video(data);
            // videoNew.save()
            //     .then((data) => res.json(data))
            //     .catch((err) => {
            //         res.json(err);
            //     })
        }

    }
    //[GET],/post/

    async test(req, res, next) {
        res.json(req.file)
    }


    async is_complete_ById(req, res, next) {
        try {
            const videoId = req.query.id;
            const userId = req?.user?.id;
            await Video.findOneAndUpdate(
                { _id: videoId },
                { $push: { is_complete: userId } })
                .then(() => res.json({ message: 'thanh cong' }));


        } catch (error) {
            res.json({ error: error });
        }
    }

    //[GET],/post/

    async getAll(req, res, next) {
        try {
            const post = await Post.find();
            res.json({ success: true, post });
        } catch (error) {
            res.json({ error: error });
        }
    }
    //[PUT],/:id

    async update(req, res, next) {
        const { title, description, image } = req.body;


        if (!title)
            return res
                .status(400)
                .json({ success: false, message: 'title để trống' });

        try {
            const newPost = {
                title,
                description,
                image,
            };
            const postUpdateCondition = { _id: req.params.id, userId: req.userId };
            const updateNew = await Post.findOneAndUpdate(
                postUpdateCondition,
                newPost,
                { new: true }
            );
            if (!updateNew)
                return res.json({ success: false, message: 'Update fail' });
            res.json({ success: true, updateNew });
        } catch (error) {
            res.json({ error: error });
        }
    }

    //[DELETE],/:id
    async delete(req, res) {
        try {
            const postDeleteCondition = { _id: req.params.id, userId: req.userId };
            const deleteOne = await Post.findOneAndDelete(postDeleteCondition);
            if (!deleteOne)
                return res.json({ success: false, message: 'delete Fail' });
            res.json({ success: true, message: 'delete thanh cong' });
        } catch (error) {
            res.json({ message: error });
        }
    }
    async adminCreate(req, res) {
        try {
            res.render('posts/create');
        } catch (error) {
            res.json({ message: error });
        }
    }
}

module.exports = new VideoController();

//export thu gi thi nhan duoc thu do
// const newController = require('./NewsController')
