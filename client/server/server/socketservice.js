var obj = {};

module.exports = {
    getUser: function (id) {
        if (obj.hasOwnProperty(id)) {
            return obj[id];
        }
        else {
            return []
        }
    },

    setUser: function (uid, socket_id) {
        if (obj.hasOwnProperty(uid)) {

            obj[uid]=obj[uid].filter(function(dataaa){
                return dataaa!=socket_id
            })
            obj[uid].push(socket_id);
        } else {
            obj[uid] = [socket_id];
        }
    },

    remove: function (uid, socket_id) {
        if (obj.hasOwnProperty(uid)) {
            obj[uid] = obj[uid].filter(function (d) {
                return d != socket_id
            })
        }
    }
}