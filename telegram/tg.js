const TelegramBot = require('node-telegram-bot-api')
const fs = require('fs');
const TOKEN = '1022726737:AAFpRUSCy1j8s50f5zCidQoz9Ik-bw8RiCc';
const User = require('../models/User');
const base64Img = require('base64-img');
const https = require('https')
const bot = new TelegramBot(TOKEN, {
    polling: true  
}); 
module.exports = () => {


    bot.onText(/\/start/, (msg) => {
        const user = new User({
            chat_id: msg.chat.id,
            step_id: 0,
        });
        const promise = user.save();
        promise.then((user) => {
            bot.sendMessage(msg.chat.id, 'Ismingizni kiriting');
        }).catch((err) => {
            console.log(err);
        });
    })
  
    bot.on('message', async (msg) => {

        if (msg.text != '/start') {
            const user = await User.findOne({
                chat_id: msg.chat.id
            });
            switch (user.step_id) {
                case 0:
                    const updateName = User.updateOne({
                        chat_id: user.chat_id
                    }, {
                        $set: {
                            name: msg.text,
                            step_id: 1
                        }
                    });
                    updateName.then(() => {
                        bot.sendMessage(msg.chat.id, `${msg.text} maqsadingizni kiriting:`);
                    }).catch((err) => {
                        console.log(err);
                    })
                    break;
                case 1:
                    updatePurpose = User.updateOne({
                        chat_id: user.chat_id
                    }, {
                        $set: {
                            purpose: msg.text,
                            step_id: 2
                        }
                    });
                    updatePurpose.then(() => {
                        bot.sendMessage(msg.chat.id, `${user.name} muddatni yuboring(07.07.2020):`);
                    }).catch((err) => {
                        console.log(err);
                    })
                    break;
                case 2:
                    updateDate = User.updateOne({
                        chat_id: user.chat_id
                    }, {
                        $set: {
                            purpose_time: msg.text,
                            step_id: 3
                        }
                    });   
                    updateDate.then(() => {
                        bot.sendMessage(msg.chat.id, `${user.name} rasmgizni jo'nating:`);
                    }).catch((err) => {
                        console.log(err);
                    })
                    break;
                case 3:

                    const file_id = (msg.photo[msg.photo.length - 1].file_id);
                    const downloadDir = 'public/images';
                    let something = ''
                    bot.getFileLink(file_id).then(async (fileUri) => {
                        let time = process.hrtime();
                        let extension = fileUri.split('.').pop();
                        let newName = `${time[0]}${time[1]}.${extension}`;
                        let file = fs.createWriteStream(`${downloadDir}/${newName}`);
                        let request = await https.get(fileUri, (response) => {
                            response.pipe(file);

                        });
                        file.on('finish', () => {
                            updatePic = User.updateOne({
                                chat_id: user.chat_id
                            }, {
                                $set: {
                                    pic_dic: `images/${newName}`,
                                    step_id: 5
                                }
                            });
                            updatePic.then(() => {
                                bot.sendMessage(msg.chat.id, `${user.name} ma'lumotlaringiz yuklandi biz bilan bolganinggizdan xursandmiz:`);
                            }).catch((err) => {
                                console.log(err);
                            })
                        })
                        //
                    });

                    break;

            }
        }


    });

    bot.on('polling_error', (err) => {
        console.log(err);
    })
}