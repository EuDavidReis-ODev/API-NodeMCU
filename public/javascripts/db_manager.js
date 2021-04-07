const firebase = require('./firebase_confg')

const STATUS_NOTFOUND = 404
const STATUS_OK  = 200
const STATUS_BAD = 400
const STATUS_CREATED = 201
const MSG_CREATED = "Data updated sucessfully."
const MSG_NOMATCHING = "No matching data."

const obj = {
      "local":{"clat": 33.00,
                "clon": 59.00},
      "io1": false,
      "io2": false,
      "io3": false,
      "io4": false,
      "safe_state": true,
      "userId":"3h2svuWzIUXKafYeQBIECj9rUnn1"
  }

  /*Device id test 3h2svuWzIUXKa*/

  /*GETS*/
 /*Return full data of user*/ 
async function getDataDevice(deviceId,res){
    firebase.database().ref('devices/'+deviceId+"/data")
    .get().then(function(snapshot) {
        if (snapshot.exists()) {
          console.log(snapshot.val());
          res.status(STATUS_OK).send(snapshot.val())
        }
        else {
          res.status(STATUS_NOTFOUND).send(MSG_NOMATCHING)
        }
      }).catch(function(error) {
        res.status(STATUS_BAD).send(error)
      });
 }
 /*Return CLAT and CLON of board*/ 
async function getDeviceLocal(deviceId,res){
    firebase.database().ref('devices/'+deviceId+"/data/local")
    .get().then(function(snapshot) {
        if (snapshot.exists()) {
          console.log(snapshot.val());
          res.status(STATUS_OK).send(snapshot.val())
        }
        else {
          res.status(STATUS_NOTFOUND).send(MSG_NOMATCHING)
        }
      }).catch(function(error) {
        console.error(error);
        res.status(STATUS_BAD).send(error)
      });

 }
 /*Return all ios user values*/
async function getIosData(deviceId,res){
    
    firebase.database().ref('devices/'+deviceId+"/data")
    .get().then(function(snapshot) {
        if (snapshot.exists()) {
            const data = snapshot.val();
        
            let iosArr = {
                "io1": data.io1,
                "io2": data.io2,
                "io3": data.io3,
                "io4": data.io4}
                
                console.log(iosArr)
                res.status(STATUS_OK).send(snapshot.val())
              }
        else {
          res.status(STATUS_NOTFOUND).send(MSG_NOMATCHING)
        }
      }).catch(function(error) {
        console.error(error);
        res.status(STATUS_BAD).send(error)
      });


 }
 /*Return single io user value*/
async function getSingleIosData(deviceId,index,res){
    firebase.database().ref('devices/'+deviceId+"/data/io"+index)
    .get().then(function(snapshot) {
        if (snapshot.exists()) {
          console.log(snapshot.val());
          res.status(STATUS_OK).send(snapshot.val())
        }
        else {
          res.status(STATUS_NOTFOUND).send(MSG_NOMATCHING)
        }
      }).catch(function(error) {
        console.error(error);
        res.status(STATUS_BAD).send(error)
      });
      

 }
 /*Return user safe_state*/
async function getUserSafeState(deviceId,res){
    
    firebase.database().ref('devices/'+deviceId+"/data/safe_state")
    .get().then(function(snapshot) {
        if (snapshot.exists()) {
          console.log(snapshot.val());
          res.status(STATUS_OK).send(snapshot.val())
        }
        else {
            res.status(STATUS_NOTFOUND).send(MSG_NOMATCHING)
        }
      }).catch(function(error) {
        console.error(error);
        res.status(STATUS_BAD).send(error)
      });
      
 }
 


 /*SETs*/
 /*Set full user data*/
/* Retirado momentaneamente.****
 
async function setDeviceData(deviceId,data,res) {
    firebase.database().ref("devices/" + deviceId).set({
      data,
    },(error)=>{
      if(error){
        res.status(STATUS_BAD).send(error)
      }else{
          res.send("Data updated sucessfully.")
      }
    })
  }*/
 /*Set user lat and lon*/
async function setDeviceLocal(deviceId,local,res){

      console.log("SET LOCAL")
      firebase.database().ref("devices/"+ deviceId+"/data/local").set(
        local,(error)=>{
          if(error){
            res.status(STATUS_BAD).send(error)
          }else{
              res.status(STATUS_CREATED).send(MSG_CREATED)
          }
  })
}  
  
 /*Change user safe_state*/
async function setSafeState(deviceId,state,res){
      firebase.database().ref("devices/"+deviceId+'/data/').update(
          {"safe_state":state},(error)=>{
            if(error){
              res.status(STATUS_BAD).send(error)
            }else{
              res.status(STATUS_CREATED).send(MSG_CREATED)
            }
    
        })
  }
 /*Set single io user value*/
function setSingleDeviceIosData(deviceId,index,value,res){
    firebase.database().ref("devices/"+deviceId + '/data/io'+index).set(value,(error)=>{
        if(error){
          res.status(STATUS_BAD).send(error)
        }else{
          res.status(STATUS_CREATED).send(MSG_CREATED)
        }

    });

 }
 /*Set all ios user values.
 Need an 4 positions array*/
function setAllDeviceIosData(deviceId,values,res){
     firebase.database().ref("devices/"+deviceId+"/data").update(
         {
             "io1": values[0],
             "io2": values[1],
             "io3": values[2],
             "io4": values[3]
         },(error)=>{
            if(error){
                res.status(STATUS_BAD).send(error)
            }else{
              res.status(STATUS_CREATED).send(MSG_CREATED)
            }
    
        }
     )
 }

  module.exports = {
    getDataDevice,
    getIosData,
    getDeviceLocal,
    getSingleIosData,
    getUserSafeState,
    setDeviceLocal,
    setSafeState,
    setSingleDeviceIosData,
    setAllDeviceIosData
}