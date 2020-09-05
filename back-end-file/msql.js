
const Promise=require("bluebird")
const mysql=require("mysql")

Promise.promisifyAll(require("mysql/lib/Connection").prototype);
Promise.promisifyAll(require("mysql/lib/Pool").prototype);


let conn=
{
    host:"localhost",
    user:"root",
    password:"",
    database:"student"
}


let AddUser=async(user)=>
{
    try
    {
        let conection=mysql.createConnection(conn);
        
        await conection.connectAsync();

        let sql2="insert into profile(username,password,FristName,LastName) values(?,?,?,?)";

        let result=await conection.queryAsync(sql2,[user.username,user.Password,user.FristName,user.LastName]);
        
        
        await conection.endAsync();
        return result;
    }
    catch(err)
    {
        console.log(err);

    }
}
let update=async(user)=>
{
    console.log(user)
    try
    {
        let conection=mysql.createConnection(conn);
        await conection.connectAsync();

        let sql2="update profile set Email=?,Birthdate=?,SchoolName=?,CollageName=?,FevoriteFood=?,FevoritePlaces=?,CloseFriends=?,Relationship=?,Address=?,city=?,state=?,Mobileno=? where username=?";

        let result=await conection.queryAsync(sql2,[user.Email,user.Birthdate,user.SchoolName,
            user.CollageName,user.FevoriteFood,user.FevoritePlaces,user.CloseFriends,user.Relationship,
            user.Address,user.City,user.state,user.Mobileno,user.username]);
    
        
        await conection.endAsync();
        return result
    }
    catch(err)
    {
        console.log(err);
    }
}
let login=async(user)=>
{
    try
    {
        let conection=mysql.createConnection(conn);
        await conection.connectAsync();
    
        let sql="select count(*) as C from profile where username=? and password=?";
    
        let result=await conection.queryAsync(sql,[user.username,user.Password]);
    
        
        await conection.endAsync();
        return result

    }
    catch(err)
    {
        console.log(err);
    }
}
let loadname=async(user)=>
{
    try
    {
        let conection=mysql.createConnection(conn);

        await conection.connectAsync();
    
        let sql="select * from profile where username=?";
    
        let result=await conection.queryAsync(sql,[user.user]);
    
      
        await conection.endAsync();
        return result

    }
    catch(err)
    {
        console.log(err);
    }
}
let getdata=async(data)=>
{
    try
    {
        let conection=mysql.createConnection(conn);

        await conection.connectAsync();
    
        let sql="select * from profile where username!=?";
    
        let result=await conection.queryAsync(sql,[data.user]);
    
        
        await conection.endAsync();
        return result

    }
    catch(err)
    {
        console.log(err);
    }
}
let forgotpassword=async(user)=>
{
    try
    {
        let conection=mysql.createConnection(conn);
        
        await conection.connectAsync();
    
        let sql="update profile set password=? where username=?";
    
        let result=await conection.queryAsync(sql,[user.username,user.ConfromNewPassword]);
    
        
        await conection.endAsync();
        return result

    }
    catch(err)
    {
        console.log(err);
    }
}
module.exports={AddUser,login,update,loadname,forgotpassword,getdata}
