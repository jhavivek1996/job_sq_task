const pool = require("../../config/database");
const fs = require('fs')
module.exports={
    create: async (data, callBack)=>{
      try{
       
        await pool.query(`insert into registration(firstName, lastName, gender, email, password, number,type) values(?,?,?,?,?,?,?)`, [
            data.firstName,
            data.lastName,
            data.gender,
            data.email,  
            data.password,
            data.number,
            data.type
        ],
        
        (error,results,fields)=>{
            if(error){
                return callBack(error);
            }
            return callBack(null,results)

        })

      }catch(error){
          console.log(" Error while creating user "+error)
      }
    },

    show: async (data,callBack)=>{
        try{
            await pool.query("select id,firstName,gender,email,number from registration",
        (error,results,fields)=>{
            if(error){
                return callBack(error);
            }
            return callBack(null,results)

        })

        }catch(error){
            console.log(" Error while showing error " +error)
        }
    },

    updates: async (data, callBack)=>{
       
        try{
            await pool.query(`UPDATE registration SET firstName=?, lastName=?, gender=?, number=? WHERE id = ?`, 
        [
            data.first_name,
            data.last_name,
            data.gender,
            data.number,
            data.id
        ],
        
        (error,results,fields)=>{
            if(error){
                return callBack(error);
            }
            return callBack(null,results)

        })
        }catch(error){
            console.log(" Error while updating data "+error)
        }
    },

    deletes: async (data,callBack,req)=>{
        try{
            
        await pool.query("DELETE FROM registration WHERE id =?", data,
        (error,results,fields)=>{
            if(error){
                return callBack(error);
            }
            return callBack(null,results)

        })
        }catch(error){
            console.log(" Error while deleting entry "+error)
        }

    },

    adminLogin: async (email, callBack)=> {
        try{
            await pool.query(`select * from registration where email = ? where type='admin'` ,[email],
        (error,results,fields)=>{
            if(error){
                callBack("Error occured");
            }
            return callBack(null,results[0]);
        }
        );
        }catch(error){
            console.log(" Error whie getting user by email "+error)
        }
    },
    CandidateLogin: async (email, callBack)=> {
        try{
            await pool.query(`select * from registration where email = ? where type='candidate'` ,[email],
        (error,results,fields)=>{
            if(error){
                callBack("Error occured");
            }
            return callBack(null,results[0]);
        }
        );
        }catch(error){
            console.log(" Error whie getting user by email "+error)
        }
    },
    RecruiterLogin: async (email, callBack)=> {
        try{
            await pool.query(`select * from registration where email = ? where type='recruiter'` ,[email],
        (error,results,fields)=>{
            if(error){
                callBack("Error occured");
            }
            return callBack(null,results[0]);
        }
        );
        }catch(error){
            console.log(" Error whie getting user by email "+error)
        }
    },

  
}
