var express = require('express');
var router = express.Router();
const db = require("../public/javascripts/db_manager")

const STATUS_NOTFOUND = 404
const STATUS_OK  = 200
const STATUS_BAD = 400

/*GETs*/
router.get('/getfulldevicedata',(req,res)=>{
  let deviceId = req.query.deviceId
  console.log("DeviceId::"+deviceId) 
  db.getDataDevice(deviceId,res)
})

router.get('/io1',(req,res)=>{
  let deviceId = req.query.deviceId
  console.log("DeviceId::"+deviceId) 
  db.getSingleIosData(deviceId,1,res)
})
router.get('/io2',(req,res)=>{
  let deviceId = req.query.deviceId
  console.log("Params"+req.params)
  console.log("DeviceId::"+deviceId) 
  db.getSingleIosData(deviceId,2,res)
})
router.get('/io3',(req,res)=>{
  let deviceId = req.query.deviceId
  console.log("DeviceId::"+deviceId) 
  db.getSingleIosData(deviceId,3,res)
})
router.get('/io4',(req,res)=>{
  let deviceId = req.query.deviceId
  console.log("DeviceId::"+deviceId) 
  db.getSingleIosData(deviceId,4,res)
})
router.get('/allios',(req,res)=>{
  let deviceId = req.query.deviceId
  console.log("DeviceId::"+deviceId) 
  db.getIosData(deviceId,res)
})
router.get('/gsafe_state',(req,res)=>{
  let deviceId = req.query.deviceId
  db.getUserSafeState(deviceId,res)
})
router.get('/getlocal',(req,res)=>{
  let deviceId = req.query.deviceId
  db.getDeviceLocal(deviceId,res)
})



/*SETs*/
router.post('/setIo1',(req,res)=>{
  let deviceId = req.query.deviceId
  let value = req.query.value

  if(value == 1){
    db.setSingleDeviceIosData(deviceId,1,true,res)
  }else if(value == 0){
    db.setSingleDeviceIosData(deviceId,1,false,res)
  }else{
    res.status(STATUS_BAD).send("Invalid or null value, the value must be 0 to false, or 1 to true.")
  }
})
router.post('/setIo2',(req,res)=>{
  let deviceId = req.query.deviceId
  let value = req.query.value

  if(value == 1){
    db.setSingleDeviceIosData(deviceId,2,true,res)
  }else if(value == 0){
    db.setSingleDeviceIosData(deviceId,2,false,res)
  }else{
    res.status(STATUS_BAD).send("Invalid or null value, the value must be 0 to false, or 1 to true.")
  }
})
router.post('/setIo3',(req,res)=>{
  let deviceId = req.query.deviceId
  let value = req.query.value

  if(value == 1){
    db.setSingleDeviceIosData(deviceId,3,true,res)
  }else if(value == 0){
    db.setSingleDeviceIosData(deviceId,3,false,res)
  }else{
    res.status(STATUS_BAD).send("Invalid or null value, the value must be 0 to false, or 1 to true.")
  }
  
})
router.post('/setIo4',(req,res)=>{
  let deviceId = req.query.deviceId
  let value = req.query.value

  if(value == 1){
    db.setSingleDeviceIosData(deviceId,4,true,res)
  }else if(value == 0){
    db.setSingleDeviceIosData(deviceId,4,false,res)
  }else{
    res.status(STATUS_BAD).send("Invalid or null value, the value must be 0 to false, or 1 to true.")
  }

})
router.post('/setallios',(req,res)=>{
  let deviceId = req.query.deviceId
  let values = []
  let io1,io2,io3,io4
  
  if (req.query.io1==0) io1=false
  else if (req.query.io1==1)io1=true
  else res.status(STATUS_BAD).send("Invalid or null value, the value of io1 must be 0 to false, or 1 to true.")

  if (req.query.io2==0) io2=false
  else if (req.query.io2==1)io2=true
  else res.status(STATUS_BAD).send("Invalid or null value, the value of io2 must be 0 to false, or 1 to true.")

  if (req.query.io3==0) io3=false
  else if (req.query.io3==1)io3=true
  else res.status(STATUS_BAD).send("Invalid or null value, the value of io3 must be 0 to false, or 1 to true.")


  if (req.query.io4==0) io4=false
  else if (req.query.io4==1)io4=true
  else res.status(STATUS_BAD).send("Invalid or null value, the value of io4 must be 0 to false, or 1 to true.")

  values.push(io1)
  values.push(io2)
  values.push(io3)
  values.push(io4)
  
  db.setAllDeviceIosData(deviceId,values,res)

})
router.post('/ssafe_state',(req,res)=>{
  let deviceId = req.query.deviceId
  let value = req.query.value
  console.log(value)
  if(value == 1){
    db.setSafeState(deviceId,true,res)
  }else if(value == 0){
    db.setSafeState(deviceId,false,res)
  }else{
    res.send("Valor inválido")
  }

})
router.post('/setlocal',(req,res)=>{
  let deviceId = req.query.deviceId
  let clon,clat 
  clon = req.query.clon
  clat = req.query.clat

  if (clon ==null || clon == undefined || clat==null || clat== undefined) {
    res.status(STATUS_BAD).send("Invalid or null values, need 2 number values.")
  }else{
    db.setDeviceLocal(deviceId,{'clat':clat,'clon':clon},res)
  }
})

/*** 
router.post('/setfulldevicedata',(req,res)=>{
  let deviceId = req.body.deviceId

  if (clon ==null || clon == undefined || clat==null || clat== undefined) {
    res.send("Invalid or null values")
  }else{
    db.setDeviceLocal(deviceId,{'clat':clat,'clon':clon},res)
  }
})*/

module.exports = router;
