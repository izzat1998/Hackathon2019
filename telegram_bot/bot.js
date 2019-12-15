const TelegramBot = require('node-telegram-bot-api');
const request = require('request');
const _ = require('lodash');
const fs =  require('fs');

const token = '1010037217:AAGKVM_4daQjBvfTUbJyIILRhSw48fGOZxM';
 
// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, {polling: true});

var userAuthorized = {};
var temporaryUser = {};

var postComplaint = {};


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
                                                postComplaint.image = `https://api.telegram.org/file/bot${token}/${file.file_path}`
                                                console.log(postComplaint.image);
                                                bot.sendMessage(msg.chat.id, 
                                                    'Choose category: ',
                                                    {reply_markup: {
                                                        inline_keyboard: [
                                                            [{
                                                                text: 'Roads',
                                                                callback_data: 'Roads'
                                                            }, {
                                                                text: 'Pollution',
                                                                callback_data: 'Polution'
                                                            }, {
                                                                text: 'Communal Service',
                                                                callback_data: 'ComunalService'
                                                            }, {
                                                                text: 'Gas',
                                                                callback_data: 'Gass'
                                                            }]
                                                        ]
                                                }}).then((item)=>{
                                                    bot.once('callback_query', (query)=>{
                                                        request.get('http://makhmudjon.me/api/categories', {
                                                            'auth': {
                                                              'bearer': userAuthorized.token
                                                            }
                                                          }, (err, res, body)=> {
                                                                const complaints = _.toArray(JSON.parse(body));
                                                                const category = complaints.filter(c => c.name===query.data)[0];
                                                                console.log(category);
                                                                postComplaint.categoryId = category.id;
                                                                
                                                                const subCategories = _.toArray(category.subCategories);
                                                                bot.deleteMessage(msg.chat.id, item.message_id);
                                                                const subCategoryButtons = [];
                                                                subCategories.forEach((element)=>{
                                                                    subCategoryButtons.push({
                                                                        text: element.name,
                                                                        callback_data: element.name
                                                                    });
                                                                });

                                                                bot.sendMessage(msg.chat.id, 
                                                                    'Choose sub-category: ',
                                                                    {reply_markup: {
                                                                        inline_keyboard: [
                                                                            subCategoryButtons
                                                                        ]
                                                                    }
                                                                }).then((item)=>{
                                                                    bot.once('callback_query', (query)=>{
                                                                        console.log('subcategory query');
                                                                        const subCategory = subCategories.filter(sc => sc.name===query.data)[0];
                                                                        console.log(subCategory);
                                                                        postComplaint.subCategoryId = subCategory.id;
                                                                        
                                                                        bot.deleteMessage(msg.chat.id, item.message_id);

                                                                        bot.sendMessage(msg.chat.id, 
                                                                            'Now send me your location: ', 
                                                                            {reply_markup: {
                                                                                force_reply: true
                                                                            }
                                                                        }).then((item)=>{
                                                                            bot.onReplyToMessage(msg.chat.id, item.message_id, (msg)=>{
                                                                                if(msg.location) {
                                                                                    console.log(`Lat: ${msg.location.latitude}`);
                                                                                    console.log(`Lon: ${msg.location.longitude}`);
                                                                                    postComplaint.lat = msg.location.latitude;
                                                                                    postComplaint.long = msg.location.longitude;

                                                                                    console.log(postComplaint);
                                                                                    bot.sendMessage(msg.chat.id, 
                                                                                        'Complaint successfully delivered! ✅');
                                                                                    var formData = {
                                                                                        categoryId: postComplaint.categoryId,
                                                                                        subCategoryId: postComplaint.subCategoryId,
                                                                                        lat: postComplaint.lat,
                                                                                        long: postComplaint.long,
                                                                                        image: {
                                                                                            value:  postComplaint.image,
                                                                                            options: {
                                                                                              filename: 'image.jpg',
                                                                                              contentType: 'image/jpeg'
                                                                                            }
                                                                                          }
                                                                                    }
                                                                                    request.post({url:'http://makhmudjon.me/api/complains', formData: formData, 'auth': {
                                                                                        'bearer': userAuthorized.token
                                                                                      }}, 
                                                                                                function optionalCallback(err, httpResponse, body) {
                                                                                        if (err) {
                                                                                          return console.error('upload failed:', err);
                                                                                        }
                                                                                        console.log('Upload successful!  Server responded with:', body);
                                                                                      });
                                                                                }
                                                                            });
                                                                        });
                                                                    });
                                                                });
                                                        });        
                                                    });

                                                });
                                                
                                                
                                            });
                                        }
                                        
                                    })
                                });
                              })
                        });
                    });            
            });
        });    
});
