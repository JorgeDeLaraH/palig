const express=require('express');
const cors=require('cors');
const jwt=require('jsonwebtoken');
const app=express();

const db=require('./db');
var database=db.connectionDB;

app.use(express.json());
app.use(cors());

app.get('/',(req,res)=>{
    res.send("Servidor corriendo");
});

app.post('/login', (req, res) => {
    respuesta = {};
    var id=req.body.id;
    var pass=req.body.pass;
    database.query('select * from agent where Id=? and password=?;',[id,pass], (error, rows, fields) => {
        if (error) {
            respuesta.status = false;
            respuesta.message = error;
            res.json(respuesta);
        } else {
            if(rows.length==1 && rows[0].Id==id && rows[0].password==pass){
                console.log("Si coincide");
                res.json(rows);
            }
            else{
                console.log("No coincide");
                res.json(rows);
            }
            
        }
    });
});


app.get('/dash/:id',(req,res)=>{
    var id=req.params.id;
    database.query("SELECT * FROM clients where IdClient=?",[id],(error, rows, fields)=>{
        if(error){
            console.log(error);
        }
        else{
            res.json(rows);
        }
    });
});

app.post('/updateClient',(req,res)=>{
    var id=req.body.id;
    var name=req.body.name;
    var phone=req.body.phone;
    database.query("update clients set name=?, phone=? where Id=?;",[name,phone,id],(error,rows,fields)=>{
        if(error){
            console.log(error);
        }
        else{
            res.send("Base Actualizada");
        }
    });
});

app.delete('/delete/:id',(req,res)=>{
    var id=req.params.id;
    database.query("delete from clients where Id=?",[id],(error, rows, fields)=>{
        if(error){
            console.log(error);
        }
        else{
            res.json(rows);
        }
    });
});
 app.post('/newClient',(req,res)=>{
    var idagent=req.body.idAg;
    var name=req.body.name;
    var phone=req.body.phone;
    var tipo=req.body.tipo;
    var total=req.body.total;
    console.log(total);
    database.query("insert into clients(IdClient, name, typeSeg, phone, total) values(?,?,?,?,?);",[idagent,name,tipo, phone, total],(error,rows)=>{
        if(error){
            res.json(rows);
            console.log(error);
        }
        else{
            res.json(rows);
            console.log(rows);
        }
    })
 })

 app.get('/mortalidad/:edad',(req,res)=>{
    var edad=req.params.edad;
    database.query("select * from mortalidad where edad=?;",[edad],(error, rows)=>{
        if(error){
            console.log(error);
        }
        else{
            console.log("Consulta Ok");
            res.json(rows);
        }
    })
 })
app.listen(8080);
console.log("port: 8080");
