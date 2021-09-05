const Comment = require ('../../models/Comment');
const Like = require ('../../models/Like');
const Post = require ('../../models/Post');
const postController = require ('../../controllers/PostController');
exports.addComment = async function (req, res) {
  const data = req.body;
  const comment = new Comment (data);
  try {
    const payload = await comment
      .save ()
      .then (() => Post.findById (req.params.id))
      .then (post => {
        post.comment.unshift (comment);
        return post.save ();
      });
    res.status (200).json ({payload});
  } catch (error) {
    console.log ('ERR', error);
  }
};

exports.deleteComment = async function (req, res) {
  const payload = await Comment.findById (req.params.id);

  if (!payload) {
    res.status (404).json ({
      error: 'Resource not found!!',
    });
  }

  try {
    await payload.delete ();
    res.status (200).json ({
      payload,
    });
  } catch (error) {
    res.status (500).json ({
      error: error.message,
    });
  }
};



exports.like = async function (req, res) {
  try {
    const userId = req.user.id;
    const {id} = req.params;

    Like.find ({userId, postId: id}).then (liked => {
      if (liked.length > 0) {
        Post.findById (id)
          .then (postdata => {
            const postnew = postdata;
            postnew.like.splice (postnew.like.indexOf (liked[0]._id), 1);
            return postnew.save ();
          })
          .then (() => Like.findByIdAndRemove ({_id: liked[0]._id}));

        res.json ({message: 'Unlike'});
      } else {
        const likeCheck = new Like ({userId, postId: id});
        const payload = likeCheck
          .save ()
          .then (() => Post.findById (id))
          .then (post => {
            post.like.unshift (likeCheck);
            return post.save ();
          });
        res.json ({message: 'like'});
      }
    });
  } catch (error) {
    res.json ({message: 'that bai'});
  }
};

exports.getAllPost = async function (req, res) {
  const payload = await Post.find ()
    .populate ([
      {
        path: 'comment',
        model: 'Comment',
        select: 'content',
        populate: {
          path: 'userId',
          model: 'User',
          select: 'name image',
        },
      },
    ])
    .populate ([
      {
        path: 'like',
        model: 'Like',
        select: 'like postId',
        populate: {
          path: 'userId',
          model: 'User',
          select: 'name image',
        },
      },
    ])
    .populate ('userId', 'name image')
    .populate ('typeClassId', 'name studentId');
  res.status (200).json ({
    payload,
  });
};
exports.deletePost = async function (req, res) {
  const payload = await Post.findById (req.params.id);

  if (!payload) {
    res.status (404).json ({
      message: 'fail',
    });
  }

  try {
    await payload.delete ();
    res.status (200).json ({
      message:"success"
    });
  } catch (error) {
    res.status (500).json ({
      error: "fail",
    });
  }
};

exports.createPost = postController.create;

exports.updatePost= async function(req, res, next) {
  const userId = req.user.id;
  const data = req.body
  // data.image = `https://img.youtube.com/vi/${req.body.videoId}/sddefault.jpg`

  Post.updateOne({ _id: req.params.id ,userId}, data)
    .then(() => res.json({message:'success'}))
    .catch(() => res.json({message:'fail'}))
}

exports.getById = async function (req, res) {
  try {
    const payload = await Post.findById (req.params.id)
      .populate ([
        {
          path: 'comment',
          model: 'Comment',
          select: 'content',
          populate: {
            path: 'userId',
            model: 'User',
            select: 'name image',
          },
        },
      ])
      .populate ('userId', 'name image');

    if (!payload) {
      res.status (404).json ({
        error: 'Resource not found!!',
      });
    }
    res.status (200).json ({
      payload,
    });
  } catch (error) {
    res.status (500).json ({
      error: error.message,
    });
  }
};
