var Document = require ('../../models/Document');

exports.getAll = async function (req, res) {
  const payload = await Document.find ();
  res.status (200).json (payload);
};

//[GET] , /courses/type/:id
exports.getAllCourseType = async function (req, res) {

  const payload = await Courses.find ({
    courseType: req.params.id,
  })
    .populate ('userId', 'name image')
    .populate ('studentId', 'name image');
  res.status (200).json ({
    payload,
  });
};

exports.getDocumentByCoureId = async function (req, res) {

  await Document.find ({
    courseId: req.params.id,
  }).populate ('userId', 'name image')
    .then (data => res.json (data))
    .catch (err => res.json ({message: 'that bai'}));
};
exports.getById = async function (req, res) {
  try {
    const payload = await Courses.findById (req.params.id);

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

    Courses.updateOne (
      {_id: req.params.id},
      {$push: {studentId: [data]}},
      function (err, result) {
        if (err) {
          res.json ({message: 'thất bại'});
        } else {
          res.json ({message: 'thanh công'});
        }
      }
    );
  } catch (error) {
    res.json ({message: 'thất bại'});
  }
};
exports.addDocument = async function (req, res) {
  const { description, userId, courseId} = req.body;
  if(req.file){
    const file =process.env.NEWFEED_URL+ req.file.filename;
    const document =  new Document({
      description,
      userId,
      courseId,
      file
    });
    document.save()
    .then((data) => res.json ({success: true, message: 'Tạo thành công'}))
    .catch((err) => {
      res.json ({success: false, message: 'Tạo thất bại'});
    })
  }else{
    const document =  new Document({
      description,
      userId,
      courseId,
    });
    document.save()
    .then((data) => res.json ({success: true, message: 'Tạo thành công'}))
    .catch((err) => {
      res.json ({success: false, message: 'Tạo thất bại'});
    })                                                                                                             
  }
  
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
