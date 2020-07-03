//Model
const { Subject, getEnumCredit } = require("../models/subject.model");

const { User } = require("../models/user.model");
const renderTest = (req, res) => {
  res.send("<h1 style='color:blue'>Test</h1>");
};

const renderCreateOne = async (req, res) => {
  /*
      Body form:
          title
          description
      */
  try {
    let { title, description, credit } = req.body;

    const subject = new Subject({ title, description, credit });
    await subject.save();
    if (!subject) {
      throw new Error("Subject has NOT been saved");
    }
    res.send(subject);
  } catch (err) {
    res.send({ id: null, info: err.message });
    console.error(err);
  }
};

const renderReadOne = async (req, res) => {
  /*
    /subject/<ID>

    ID is a long id autogenerate by mongo
    */
  try {
    const { id } = req.params;
    const subject = await Subject.findById(id);
    if (!subject) {
      throw new Error("Subject not found");
    }
    res.send(subject);
  } catch (err) {
    res.send({ id: req.params.id, info: err.message });
    console.error(err);
  }
};
const renderReadMany = async (req, res) => {
  /* 
      /subject/all?limit=0&where[]=1&where[]=2&sort=-_id
      
      Limit reduces the number of objects returned, 0 returns all.
      Where conditions objects based on credit.
      Sort sorts the ascending (+) or descending (-) objects indicating the field by which to sort.

      Note: &where=0&where=1 is valid
  */

  try {
    //Query from req
    let { limit, where, sort } = req.query;
    //Default values
    if (!limit) {
      limit = 0;
    }
    if (!where || where.length < 1) {
      where = await getEnumCredit();
    }
    if (!sort) {
      sort = "+_id"; //Default sort
    }
    //Find by query
    const subject = await Subject.find()
      .limit(parseInt(limit))
      .where("credit", where)
      .sort(sort)
      .populate("student");
    //Return a object
    res.send(subject);
  } catch (err) {
    console.error(err);
  }
};

//Special
const addSubjectToStudent = async (req, res) => {};

const addStudentToSubject = async (req, res) => {
  try {
    //ID subject & ID Student
    const { id_user, id_subject } = req.query;
    const subject = await Subject.findByIdAndUpdate(
      id_subject,
      { $push: { student: id_user } },
      { new: true, runValidators: true }
    );

    if (!subject) {
      throw new Error("Subject not found");
    }
    res.send(subject);
  } catch (err) {
    console.error(err);
  }
};

module.exports = {
  renderTest,
  renderCreateOne,
  renderReadOne,
  renderReadMany,
  addStudentToSubject,
};
