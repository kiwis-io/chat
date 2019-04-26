'use strict';
var loopback = require('loopback');
var app = require('../../server/server');
var boot = require('loopback-boot');
var sockets = require('../../server/socketservice.js');

module.exports = function (Message) {

  function socketFunction(ids, instance) {
    //   console.log(ids, instance);
    // var socketIds = [];
    // ids.map(id => {
    //   socketIds.push(sockets.getUser(id));
    // })
    // socketIds.map(function (d) {
    // app.io.to(d).emit('kiwi-message', instance);
    app.io.emit('kiwi-message', instance);
    console.log('message emit', instance);
    // })
  }

  // socket.on('kiwi-message', function(msg){
  //     console.log('kiwi-message: ' + msg);
  //     app.io.emit('kiwi-message', msg);
  //   });

  // Message.remoteMethod('socketFunction', {
  //     accepts: { arg: 'msg', type: 'string' },
  //     returns: { arg: 'res', type: 'object' },
  // });

  Message.sendMessage = function (messageData, cb) {
    console.log('messagedata_____', messageData);
    var ids = [messageData.sender_id, messageData.receiver_id];

    socketFunction(ids, messageData);

    Message.create(messageData,
      (err, res) => {
        if (err) {
          return (cb(err));
        } else {

          return (cb(null, res));
          //socket io message

        }
      });
  }

  Message.remoteMethod('sendMessage', {
    accepts: {
      arg: 'messageData',
      type: 'object'
    },
    returns: {
      arg: 'res',
      type: 'object'
    },
  });

  // Leavetype.createLeave = function(leaveData, cb) {
  //     Leavetype.create(leaveData,
  //         (err, res)=> {
  //             if(err) {
  //                 return (cb(err));
  //             }else{
  //                 return (cb(null,res));
  //             }
  //         })
  // }
  // Leavetype.remoteMethod('createLeave', {
  //       accepts: {arg: 'leaveData', type: 'object'},
  //       returns: {arg: 'res', type: 'object'}
  // });


};
