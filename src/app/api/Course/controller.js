var Courses = require("../../models/Courses")

exports.getAll = async function (req, res) {
  await Courses.find({})
    .lean()
    .exec((err, data) => {
      res.send(data)
    })
}

exports.store = async function (req, res) {
  const data = req.body
  // Update later
  data.image = `https://img.youtube.com/vi/${req.body.videoId}/sddefault.jpg`
  data.userId = "60bb295b1830b1b8db478bb3"
  data.typeClassId = "60bb295b1830b1b8db478bb3"
  const course = new Courses(data)
  try {
    const payload = await course.save()

    res.status(200).json({ payload })
  } catch (error) {
    console.log("ERR", err)
  }
}

// exports.insert = courseController.store();
