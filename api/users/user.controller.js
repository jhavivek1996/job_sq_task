const { create, show, updates, deletes, storeinPdf, adminLogin,candidateLogin,recruiterLogin } = require('./user.service');   
const { genSaltSync, hashSync, compareSync} = require("bcrypt");
const fs = require('fs');
const { sign } = require('jsonwebtoken');

var now = new Date();

module.exports = {

    createUser: async (req,res)=>{
       
        const body = req.body;
        const salt = genSaltSync(10);
        body.password = (body.password, salt);
        try{
          
            create(body,(err,results)=>{
                if(err){
                    console.log(err);
                    return res.status(500).json({
                        success:0,
                        message: "Database Connection error"
                    });
                }
                return res.status(200).json({
                    success:1,
                    message:"User Created Successfully",
                    data:req.body
                })
            })
        }catch(error){
            console.log(" Error while create user "+error)
        }
    },

    showUser: async(req,res)=>{
        const showQuery = req.query;
      
        try{
            show(showQuery,(err,results)=>{
                if(err){
                    console.log(err);
                    return res.status(500).json({
                        success:0,
                        message: "Data Not Getting"
                    });
                }
                return res.json({success:1,results})
            })
        }catch(error){
            console.log(" Error in show user "+error)
        }
        
    },

    updateUser: async(req,res)=>{
        const updateData = req.body;      
        console.log(updateData)
        const salt = genSaltSync(10);
        updateData.password = hashSync(updateData.password, salt);
       try{
        updates(updateData,(err,results)=>{
            if(err){
                console.log(err);
                return res.status(500).json({
                    success:0,
                    message: "Data Not Updated"
                });
            }
            return res.status(200).json({
                success:1,
                data:results
            })

        })

       }catch(error){
           console.log(" Error in update user "+error)
       }
    },

   deleteUser: async(req,res)=>{
        const deleteQuery = req.params.id;
        

       try{
        deletes(deleteQuery,(err,results)=>{
            if(err){
                console.log(err);
                return res.status(500).json({
                    success:0,
                    message: "Data Not Deleted"
                });
            }
            return res.json({
                success:1,
                message: "User Deleted Successfully",
                id: " I am id no "+req.params.id
            });
        });

       }catch(error){
           console.log(" Error in delete user "+error)
       }
        
    },
    
    Adminlogin: async(req,res)=>{
      
        const body = req.body;
        console.log(body)

       
        try{
            adminLogin(body.email,(err,results)=>{
                if(err){
                    console.log(err);
                }
                if(!results){
                    return res.json({
                        success:0,
                        data: "Invalid email or password"
                    });
                }
                
                const result = compareSync(body.password,results.password);
                if(result){
                    results.password = undefined;
                    const jsontoken = sign({result:results},process.env.SECRET_KEY,{ expiresIn: "1h" });
                    return res.json({
                        success:1,
                        message:"Logged in successfully",
                        token: jsontoken
                        // data:results
                    });
                }else{
                   return res.json({
                    success:0,
                    message: "Token is invalid"
                   })
                }
            });

        }catch(error){
            console.log(" Error in login "+error)
        }

        
    
    },
    Candidatelogin: async(req,res)=>{
       
        const body = req.body;
        console.log(body)

       
        try{
            CandidateLogin(body.email,(err,results)=>{
                if(err){
                    console.log(err);
                }
                if(!results){
                    return res.json({
                        success:0,
                        data: "Invalid email or password"
                    });
                }
                
                const result = compareSync(body.password,results.password);
                if(result){
                    results.password = undefined;
                    const jsontoken = sign({result:results},process.env.SECRET_KEY,{ expiresIn: "1h" });
                    return res.json({
                        success:1,
                        message:"Logged in successfully",
                        token: jsontoken
                        // data:results
                    });
                }else{
                   return res.json({
                    success:0,
                    message: "Token is invalid"
                   })
                }
            });

        }catch(error){
            console.log(" Error in login "+error)
        }

        
    
    },
    Recruiterlogin: async(req,res)=>{
       
        const body = req.body;
        console.log(body)

       
        try{
            RecruiterLogin(body.email,(err,results)=>{
                if(err){
                    console.log(err);
                }
                if(!results){
                    return res.json({
                        success:0,
                        data: "Invalid email or password"
                    });
                }
                
                const result = compareSync(body.password,results.password);
                if(result){
                    results.password = undefined;
                    const jsontoken = sign({result:results},process.env.SECRET_KEY,{ expiresIn: "1h" });
                    return res.json({
                        success:1,
                        message:"Logged in successfully",
                        token: jsontoken
                        // data:results
                    });
                }else{
                   return res.json({
                    success:0,
                    message: "Token is invalid"
                   })
                }
            });

        }catch(error){
            console.log(" Error in login "+error)
        }

        
    
    },
   
    
}
