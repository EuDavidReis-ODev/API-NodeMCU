const firebase = require('./firebase_confg')

  const obj = {
      "local":{"clat": 33.00,
                "clon": 59.00},
      "io1": false,
      "io2": false,
      "io3": false,
      "io4": false,
      "safe_state": true,
      "id":"3h2svuWzIUXKafYeQBIECj9rUnn1"
  }

  /*Device id test 3h2svuWzIUXKa*/

  /*GETS*/
 /*Return full data of user*/ 
async function getDataDevice(deviceId,res){
    let dbUserDataRef = firebase.database().ref("devices/"+deviceId + '/data');
    dbUserDataRef.on('value', (snapshot) => {
      const data = snapshot.val();
        console.log(data)
        res.send(data)
    });
 }
 /*Return CLAT and CLON of board*/ 
async function getDeviceLocal(deviceId,res){
    firebase.database().ref('devices/'+deviceId+"/data/local")
    .get().then(function(snapshot) {
        if (snapshot.exists()) {
          console.log(snapshot.val());
          res.send(snapshot.val())
        }
        else {
            res.send("Dado inexistente.")
          console.log("No data available");
        }
      }).catch(function(error) {
        console.error(error);
        res.send(error)
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
                res.send(iosArr)
        }
        else {
            res.send("Dado inexistente.")
          console.log("No data available");
        }
      }).catch(function(error) {
        console.error(error);
        res.send(error)
      });


 }
 /*Return single io user value*/
async function getSingleIosData(deviceId,index,res){
    firebase.database().ref('devices/'+deviceId+"/data/io"+index)
    .get().then(function(snapshot) {
        if (snapshot.exists()) {
          console.log(snapshot.val());
          res.send(snapshot.val())
        }
        else {
            res.send("Dado inexistente.")
          console.log("No data available");
        }
      }).catch(function(error) {
        console.error(error);
        res.send(error)
      });
      

 }
 /*Return user safe_state*/
async function getUserSafeState(deviceId,res){
    
    firebase.database().ref('devices/'+deviceId+"/data/safe_state")
    .get().then(function(snapshot) {
        if (snapshot.exists()) {
          console.log(snapshot.val());
          res.send(snapshot.val())
        }
        else {
            res.send("Dado inexistente.")
          console.log("No data available");
        }
      }).catch(function(error) {
        console.error(error);
        res.send(error)
      });
      
 }
 


 /*SETs*/
 /*Set full user data*/ 
async function setDeviceData(deviceId,data,res) {
    firebase.database().ref("devices/" + deviceId).set({
      data
    });
  }
 /*Set user lat and lon*/
async function setDeviceLocal(deviceId,local,res){

      console.log("SET LOCAL")
      firebase.database().ref("devices/"+ deviceId+"/data/local").set(
        local,(error)=>{
          if(error){
              res.send(error)
          }else{
              res.send("OK")
          }
  })
}  
  
 /*Change user safe_state*/
async function setSafeState(deviceId,state,res){
      firebase.database().ref("devices/"+deviceId+'/data/').update(
          {"safe_state":state},(error)=>{
            if(error){
                res.send(error)
            }else{
                res.send("OK")
            }
    
        })
  }
 /*Set single io user value*/
function setSingleDeviceIosData(deviceId,index,value,res){
    firebase.database().ref("devices/"+deviceId + '/data/io'+index).set(value,(error)=>{
        if(error){
            res.send(error)
        }else{
            res.send("OK")
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
                res.send(error)
            }else{
                res.send("OK")
            }
    
        }
     )
 }


//setDeviceData("3h2svuWzIUXKa", obj)

  module.exports = {
    getDataDevice,
    getIosData,
    getDeviceLocal,
    getSingleIosData,
    getUserSafeState,
    setDeviceData,
    setDeviceLocal,
    setSafeState,
    setSingleDeviceIosData,
    setAllDeviceIosData
}