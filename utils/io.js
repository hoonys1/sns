const chatController = require("../Controllers/chat.controller");
const userController = require("../Controllers/user.controller");

module.exports = function(io) {
    // io~~~
    // io.emit() 말하는 함수
    // io.on() 듣는 함수
    io.on("connection",async(socket) => {
        console.log("client is connected", socket.id);

        socket.on("login",async(userName,cb) => {
            // 유저정보를 저장
            try {
                const user = await userController.saveUser(userName, socket.id);
                
                const welcomMessage = {
                    chat: `${user.name} is joined to this room`,
                    user: {id: null, name: "system"},
                };
                io.emit("message",welcomMessage);

                cb({ok: true,data: user})
            } catch(error) {
                cb({ok: false, error: error.message});
            }
        });

        socket.on("sendMessage", async(message,cb)=>{
            try {
                // 유저찾기 socket.id 로
                const user = await userController.checkUser(socket.id);
                // 메세지 저장(유저)
                const newMessage = await chatController.saveChat(message,user);
                io.emit("message", newMessage)
                cb({ok:true})
            } catch(error) {
                cb({ok: false, error: error.message});
            }
        });

        socket.on("disconnect", () => {
            console.log("user is disconnected");
        });
    })
}