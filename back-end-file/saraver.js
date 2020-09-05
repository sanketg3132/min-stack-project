const express=require('express');
const sql=require('./msql');
const cors=require('cors');
const Promise=require("bluebird")

Promise.promisifyAll(require("mysql/lib/Connection").prototype);
Promise.promisifyAll(require("mysql/lib/Pool").prototype);

const app=express();
app.use(express.json());
app.use(cors())


app.post("/getdata",async(req,res)=>
{
    try
    {
        let logindata=req.body
        let data=await sql.getdata(logindata);
        //console.log(data)
        res.json(data);
    }
    catch(err)
    {
        let jsonb={massage:"fail"}
        res.json(jsonb);
    }
})
app.post("/forgotpassword",async(req,res)=>
{
    try
    {
        let logindata=req.body
        let data=await sql.forgotpassword(logindata);
        let jsonb={massage:"Success"}
        res.json(jsonb);
    }
    catch(err)
    {
        let jsonb={massage:"fail"}
        res.json(jsonb);
    }
})
app.post("/update",async(req,res)=>
{
    try
    {
        let input=req.body
        await sql.update(input);
        let jsonb={massage:"Success"}
        res.json(jsonb);
    }
    catch(err)
    {
        console.log(err)
        let jsonb={massage:"fail"}
        res.json(jsonb);
    }
})
app.post("/adduser",async(req,res)=>
{
    try
    {
                console.log("in add")
            let data=req.body
            let result=await sql.AddUser(data);
            let jsonb={massage:"Success"}
            res.json(jsonb);
    }
    catch(err)
    {
        let jsonb={massage:"fail"}
        res.json(jsonb);
    }
})

app.post("/login",async(req,res)=>
{
    try
    {
        let logindata=req.body
        let data=await sql.login(logindata);
        if(data[0].C>0)
        {
            let jsonb={massage:"Success"}
            res.json(jsonb);
        }
        else{
            let jsonb={massage:"fail"}
            res.json(jsonb);
        }
        
    }
    catch(err)
    {
        let jsonb={massage:"fail"}
        res.json(jsonb);
    }
})
app.post("/name",async(req,res)=>
{
    try
    {
        let logindata=req.body
        let data=await sql.loadname(logindata);
            let jsonb={
                FristName:data[0].FristName, 
                LastName: data[0].LastName,
                Email:data[0].Email,
                SchoolName:data[0].SchoolName,
                CollageName:data[0].CollageName,
                FevoriteFood:data[0].FevoriteFood,
                Relationship:data[0].Relationship,
                FevoritePlaces:data[0].FevoritePlaces,
                Address:data[0].Address,
                CloseFriends:data[0].CloseFriends,
                City:data[0].City,
                state:data[0].state,
                Mobileno:data[0].Mobileno,
                Birthdate:data[0].Birthdate
            }
            res.json(jsonb);
    }
    catch(err)
    {
        let jsonb={massage:"fail"}
        res.json(jsonb);
    }
})
app.listen(8000)