const { encryptPassword } = require("../helpers/bpassword");

//Model
const { User, getEnumTypeUser } = require("../models/user.model");

const renderTest = (req, res) => {
  res.send("<h1 style='color:red'>Test</h1>");
};

const renderCreateOne = async (req, res) => {
  /*
    Body form:
        username
        password
    t   type_user
    */
  try {
    let { username, password, type_user } = req.body;
    if (!type_user) {
      type_user = "student";
    }
    const user = new User({ username, type_user });
    user.password = await encryptPassword(password);
    await user.save();
    if (!user) {
      throw new Error("User has NOT been saved");
    }
    res.send(user);
  } catch (err) {
    res.send({ id: null, info: err.message });
    console.error(err);
  }
};
const renderCreateMany = async (req, res) => {};

const renderReadOne = async (req, res) => {
  /*
    /user/<ID>

    ID is a long id autogenerate by mongo
    */
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) {
      throw new Error("User not found");
    }
    res.send(user);
  } catch (err) {
    res.send({ id: req.params.id, info: err.message });
    console.error(err);
  }
};
const renderReadMany = async (req, res) => {
  /* 
      /user/all?limit=0&where[]=student&where[]=root&sort=-_id
      
      Limit reduces the number of objects returned, 0 returns all.
      Where conditions objects based on type_user.
      Sort sorts the ascending (+) or descending (-) objects indicating the field by which to sort.

      Note: &where=student&where=root is valid
    */

  try {
    //Query from req
    let { limit, where, sort } = req.query;
    //Default values
    if (!limit) {
      limit = 0;
    }
    if (!where || where.length < 1) {
      where = await getEnumTypeUser; //Get default enum from model
    }
    if (!sort) {
      sort = "+_id"; //Default sort
    }
    //Find by query
    const user = await User.find()
      .limit(parseInt(limit))
      .where("type_user", where)
      .sort(sort);
    //Return a object
    res.send(user);
  } catch (err) {
    console.error(err);
  }
};

const renderUpdateOne = async (req, res) => {
  try {
    const { id } = req.params;
    const { username, password, type_user } = req.body;
    if (!type_user) {
      type_user = "student";
    }
    if (!id) {
      throw new Error("Provide an ID");
    }
    const user = await User.findByIdAndUpdate(
      id,
      { username, password: await encryptPassword(password), type_user },
      {
        new: true,
      }
    );
    res.send(user);
  } catch (err) {
    console.error(err);
  }
};
const renderUpdateMany = async (req, res) => {};

const renderDeleteOne = async (req, res) => {
  /*
    /user/delete/id/<ID>
    
    ID is a long id autogenerate by mongo
    */
  try {
    const { id } = req.params;
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      throw new Error("User has NOT been deleted");
    }
    res.send(user);
  } catch (err) {
    res.send({ id: req.params.id, info: err.message });
    console.error(err);
  }
};
const renderDeleteMany = async (req, res) => {
  /*
    /user/delete/id?who[]=id1&who[]=id2 ...
    
    idn is a long id autogenerate by mongo

    Note: &who=<ID>&who=<ID> is valid
    */
  try {
    let { who } = req.query;
    if (!who || who.length < 1) {
      throw new Error("Provide at least one ID");
    }
    const user = await User.deleteMany({ _id: who });
    if (!user) {
      throw new Error("Users has NOT been deleted");
    }
    res.send(user);
  } catch (err) {
    res.send({ who: req.query.who, info: err.message });
    console.error(err);
  }
};
const renderDeleteManyType = async (req, res) => {
  /*
    /user/delete/id?where[]=student&where[]=root ...
    
    where are the type user

    Note: &where=<TYPE>&where=<TYPE> is valid
    */
  try {
    let { where } = req.query;
    if (!where || where.length < 1) {
      throw new Error("Provide at least one User Type");
    }
    const user = await User.deleteMany({ type_user: where });
    if (!user) {
      throw new Error("Users has NOT been deleted");
    }
    res.send(user);
  } catch (err) {
    res.send({ type_user: req.query.where, info: err.message });
    console.error(err);
  }
};

module.exports = {
  renderTest,
  renderCreateOne,
  renderCreateMany,
  renderReadOne,
  renderReadMany,
  renderUpdateOne,
  renderUpdateMany,
  renderDeleteOne,
  renderDeleteMany,
  renderDeleteManyType,
};
