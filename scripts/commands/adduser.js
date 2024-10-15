module.exports.config = {
    name: "adduser",
    version: "1.0.0",
    permssion: 0,
    credits: "D-Jukie",
    description: "Thêm người dùng vào nhóm bằng link hoặc UID",
  prefix: true,
    category: "Box chat",
    usages: "< link/UID >",
    cooldowns: 5
};
module.exports.run = async function ({ api, event, args, Threads, Users }) {
const { threadID, messageID } = event;
const axios = require('axios')
const link = args.join(" ")
if(!args[0]) return api.sendMessage('ᴘʟᴇᴀꜱᴇ ᴇɴᴛᴇʀ ᴛʜᴇ ʟɪɴᴋ ᴏʀ ᴜꜱᴇʀ ɪᴅ ʏᴏᴜ ᴡᴀɴᴛ ᴛᴏ ᴀᴅᴅ ᴛᴏ ᴛʜᴇ ɢʀᴏᴜᴘ ☑️', threadID, messageID);
var { participantIDs, approvalMode, adminIDs } = await api.getThreadInfo(threadID);
if(link.indexOf(".com/")!==-1) {
    const res = await axios.get(`https://golike.com.vn/func-api.php?user=${link}`);
    var uidUser = res.data.data.uid
    api.addUserToGroup(uidUser, threadID, (err) => {
    if (participantIDs.includes(uidUser)) return api.sendMessage(`ᴛʜᴇ ᴍᴇᴍʙᴇʀ ʜᴀꜱ ᴛᴏ ʙᴇ ɪɴ ᴛʜᴇ ɢʀᴏᴜᴘ ✅`, threadID, messageID);
    if (err) return api.sendMessage(`ᴄᴀɴɴᴏᴛ ᴀᴅᴅ ᴍᴇᴍʙᴇʀꜱ ᴛᴏ ᴛʜᴇ ɢʀᴏᴜᴘ
`, threadID, messageID);
    else if (approvalMode && !adminIDs.some(item => item.id == api.getCurrentUserID())) return api.sendMessage(`ᴀᴅᴅ ꜱᴜᴄᴄᴇꜱꜱꜰᴜʟ ᴜꜱᴇʀꜱ ᴛᴏ ᴛʜᴇ ʙʀᴏᴡꜱᴇʀ ʟɪꜱᴛ`, threadID, messageID);
    else return api.sendMessage(`🄰🄳🄳 🄼🄴🄼🄱🄴🅁🅂 🅃🄾 🅃🄷🄴 🄱🄰🅁 🄶🅁🄾🅄🄿 😒`, threadID, messageID);
    });
    }
  else { 
    var uidUser = args[0] 
    api.addUserToGroup(uidUser, threadID, (err) => {
    if (participantIDs.includes(uidUser)) return api.sendMessage(`🌸 ᴛʜᴇ ᴍᴇᴍʙᴇʀ ʜᴀꜱ ᴛᴏ ʙᴇ ɪɴ ᴛʜᴇ ɢʀᴏᴜᴘ 🌸`, threadID, messageID);
    if (err) return api.sendMessage(`ᴄᴀɴɴᴏᴛ ᴀᴅᴅ ᴍᴇᴍʙᴇʀꜱ ᴛᴏ ᴛʜᴇ ɢʀᴏᴜᴘ
`, threadID, messageID);
    else if (approvalMode && !adminIDs.some(item => item.id == api.getCurrentUserID())) return api.sendMessage(`ᴀᴅᴅ ꜱᴜᴄᴄᴇꜱꜱꜰᴜʟ ᴜꜱᴇʀꜱ ᴛᴏ ᴛʜᴇ ʙʀᴏᴡꜱᴇʀ ʟɪꜱᴛ`, threadID, messageID);
    else return api.sendMessage(`🄰🄳🄳 🄼🄴🄼🄱🄴🅁🅂 🅃🄾 🅃🄷🄴 🄱🄰🅁 🄶🅁🄾🅄🄿 😒`, threadID, messageID);
    });
  }
}
