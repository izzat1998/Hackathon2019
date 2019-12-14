const TelegramBot = require('node-telegram-bot-api');
const request = require('request');
const https = require('https');

const token = '1010037217:AAGKVM_4daQjBvfTUbJyIILRhSw48fGOZxM';
 
// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, {polling: true});

var userAuthorized = {};
var temporaryUser = {};
var complaint = {};

bot.onText(/\/start/, (msg, match) => {
    bot.sendMessage(msg.chat.id, 
        "Welcome to the Telegram bot version of <b>Clean City</b>!", 
        {parse_mode: "HTML"});
    
    bot.sendMessage(msg.chat.id, "Let me authorize you first: ");
    
    bot.sendMessage(msg.chat.id, 
        "Your Username: ", 
        {reply_markup: {
            force_reply: true
        }}).then((item) => {
            bot.onReplyToMessage(msg.chat.id, item.message_id, (msg)=> {
                temporaryUser.username = msg.text;
                bot.sendMessage(msg.chat.id, 
                    "Your Password:",
                    {reply_markup: {
                        force_reply: true
                    }}).then((item) => {
                        bot.onReplyToMessage(msg.chat.id, item.message_id, (msg)=> {
                            temporaryUser.password = msg.text;
                            console.log(`Your username: ${temporaryUser.username}`);
                            console.log(`Your password: ${temporaryUser.password}`);
                            request.post('http://makhmudjon.me/api/auth/login', {
                                json: {
                                    username: "billgates",
                                    password: "billgates",
                                }
                              }, (error, res, body) => {
                                if (error) {
                                  console.error(error);
                                  return;
                                }
                                console.log(`statusCode: ${res.statusCode}`)
                                userAuthorized.username = temporaryUser.username;
                                userAuthorized.password = temporaryUser.password;
                                userAuthorized.token = body.token;
                                console.log(userAuthorized);
                                
                                
                                bot.sendMessage(msg.chat.id, 
                                    'Success! Now you can send me photo of your complaint: 📷',
                                    {reply_markup: {
                                        force_reply: true
                                }}).then((item) => {
                                    bot.onReplyToMessage(msg.chat.id, item.message_id, (msg)=>{
                                        if(msg.photo) {
                                            bot.getFile(msg.photo[2].file_id).then((file)=>{
                                                complaint.image = `https://api.telegram.org/file/bot${token}/${file.file_path}`
                                                console.log(complaint.image);
                                                bot.sendMessage(msg.chat.id, 
                                                    'Choose category: ',
                                                    {reply_markup: {
                                                        inline_keyboard: [
                                                            [{
                                                                
                                                            }]
                                                        ]
                                                    }})
                                            });
                                        }
                                        
                                    })
                                });
                                
                                // request.get('http://makhmudjon.me/api/categories', {
                                //     'auth': {
                                //       'bearer': userAuthorized.token
                                //     }
                                //   }, (err, res, body)=> {
                                //       console.log(body);
                                //       bot.sendMessage(msg.chat.id, JSON.stringify(body));
                                // });    
                                
                              })
                        });
                    });            
            });
        });    
});
