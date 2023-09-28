const Sequelize = require('sequelize');
const sequelize= require('../connection/database');

const User = sequelize.define('User', {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      unique: true,
      primaryKey: true,
      
    },
    name: Sequelize.STRING,
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true
      
    },
    phonenumber: {
      type: Sequelize.BIGINT,
      allowNull: false
    }
  });


exports.addUser =  async(req,res,next)=>
{
//    console.log(req.body.Name);
try{
const name = req.body.Name;
const email = req.body.Email;
const phonenumber = req.body.Phonenumber;
const data= await User.create({
  name: name,
  email: email,
  phonenumber: phonenumber
})
    // console.log("data",data) ;
    res.status(200).json({Success: "Inserted Successfully"});   
    }
catch(err)
{
    console.log(err);
    res.status(400).json({failed: "Error Occurred"});
}
};

exports.getUser = async(req,res,next)=>
{
try{
    const data= await User.findAll();
    // console.log("mewwoow",data);
    res.status(200).json({data:data})
}
catch(err)
{
    console.log(err);
    res.status(400).json({failed: "Error Occurred"});
}
}

exports.deleteUser= async(req,res,next)=>
{
  try{
    const userId= req.params.id;
    // console.log(id);
    const data= await User.findByPk(userId);
    if(!data){
      res.status(400).json({Error: "Record Not Found"});
      return;
    }
    let destroy= await data.destroy();
    res.status(200).json({Data: destroy});
}
  catch(err)
  {
    console.log(err);
    res.status(400).json({failed: "Error Occurred"});
  }
}