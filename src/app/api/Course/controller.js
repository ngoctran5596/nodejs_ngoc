var Courses = require ('../../models/Courses');
var Courses_learning = require ('../../models/CourseLearning/Courses');

exports.getAll = async function (req, res) {
  const payload = await Courses.find ();
  res.status (200).json ({
    payload,
  });
};

//[GET] , /courses/type/:id
exports.getAllCourseType = async function (req, res) {
  console.log ('req.params.id', req.params.id);
  const payload = await Courses.find ({
    courseType: req.params.id,
  }).populate ('userId', 'name image')
  .populate ('studentId', 'name image');
  res.status (200).json ({
    payload,
  });
};

exports.getCourseByUserId = async function (req, res) {
  console.log ('req.params.id', req.params.id);
  const payload = await Courses.find ({
    userId: req.params.id,
  }).populate ('userId', 'name image')
  .populate ('studentId', 'name image');
  res.status (200).json ({
    payload,
  });
};
exports.getById = async function (req, res) {
  try {
    const payload = await Courses.find ({userId:req.params.id});

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

exports.store = async function (req, res) {
  const data = req.body;
  // Update later
  data.image = `https://img.youtube.com/vi/${req.body.videoId}/sddefault.jpg`;
  data.userId = '60bb295b1830b1b8db478bb3';
  data.typeClassId = '60bb295b1830b1b8db478bb3';
  const course = new Courses (data);
  try {
    const payload = await course.save ();

    res.status (200).json ({payload});
  } catch (error) {
    console.log ('ERR', err);
  }
};




exports.update = async function (req, res) {
  try {
    const payload = await Courses.findByIdAndUpdate (req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

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

exports.addStudent = async function (req, res) {

    try {
      const data = req.body.userId;
      console.log(req.body.userId)
      Courses.updateOne(
        { _id: req.params.id },
        { $push: { studentId: [data] } },
        function(err, result) {
          if (err) {
            res.json({message:'thất bại'})
          } else {
            res.json({message:'thanh công'});
            
          }
        }
      );
   
    } catch (error) {
      res.json({message:'thất bại'})
    }
   
 
};
exports.addCourse = async function (req, res) {
  const data = req.body;
  console.log ('data', data);
  const course = new Courses (data);
  await course
    .save ()
    .then (() => res.json ({success: true, message: 'Tạo thành công'}))
    .catch (err => {
      res.json ({success: false, message: 'Tạo thất bại'});
    });
};

exports.delete = async function (req, res) {
  const payload = await Courses.findById (req.params.id);

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







// Courses_learning

exports.course_learning = async function (req, res) {
  const data = req.body;
  data.thumbnail = `https://img.youtube.com/vi/${req.body.videoId}/sddefault.jpg`;
  data.instructor = '620cb5a8e73d4728ac5a6c25';

  const course = new Courses_learning (data);
  try {
    const payload = await course.save ();
    res.status (200).json ({payload});
  } catch (error) {
    console.log ('ERR', error);
  }
};

exports.getAllCourseLearning = async function (req, res) {
  const payload = await Courses_learning.find ().populate ({ path: 'instructor', select: 'name image' });
  res.status (200).json ({
    payload,
  });
};