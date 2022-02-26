const express = require('express');
const cors = require('cors');
const UserInfo = require('./src/model/UserDB');
const ProductInfo =require('./src/model/ProductDB');
// const path = require('path');

const app= express();
app.use(cors());
app.use(express.urlencoded({extended:true}));
app.use(express.json());

// app.use(express.static('./build'));

app.post('/api/login',(req,res)=>{
    const {email,password} = req.body;
    UserInfo.findOne({email:email},(err,user)=>{
        if(user){
            if(user.password===password){
                res.send({message:"Login successful",user});
            }
            else{ 
                res.send({message:"Incorrect Password"});
            } 
        }
        else{
            res.send({message:"User not registered."});
        }
    })
});

app.post('/api/register',(req,res)=>{
    const {name,email,password,place} = req.body;
    UserInfo.findOne({email:email},(err,user)=>{
        if(user){
            res.send({message:"User already exists"})
        }
        else{
            const user = new UserInfo({
                name,
                email,
                password,
                place
            });
            user.save(err=>{
                if(err) res.send(err);
                else res.send({message:'Successfully Registered. Please Log In'})
            })
        }
    })
});

app.get('/api/product-list', (req, res) => {
    try {
        ProductInfo.find({ })
            .then(function (product) {
                res.status(200).json(product);
            })
                
    }
    catch (error) {
        res.status(500).json({ message: 'Error', error });
    }
});

app.post('/api/add-product', (req, res) => {
    const {name,price,quantity,category} =req.body;
    ProductInfo.findOne({name:name},(err,product)=>{
        if(product){
            res.send({message:"Item already exists."})
        }
        else{
            const product = new ProductInfo({
                name,
                price,
                quantity,
                category
            });
            product.save(err=>{
                if(err) res.send(err);
                else res.send({message:'Added successfully'})
            })    
        }
    })
})


// app.get('*', function(req, res) {
//     res.sendFile(path.join(__dirname + '/build/index.html'));
// });

app.listen((process.env.PORT || 6000), function(){
    console.log('listening on :6000');
});