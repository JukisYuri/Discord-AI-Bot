# Mục lục
1. [Thông tin](#thông-tin)
2. [Cấu hình Discord-Bot](#cấu-hình-discord-bot)
3. [Cách sử dụng](#cách-sử-dụng)

## Thông tin
  Bot được làm bởi JukisYuri, Project thứ 2 và
  được viết bởi sinh viên năm 2 vẫn đang học trong trường, nên sẽ còn nhiều sai sót
  
## Cấu hình Discord-Bot
1. Tải (hoặc clone) repo này về
2. Trong file src/config/myconfig, hãy setup toàn bộ config bao gồm bot token, gemini token,... (uhm thì đôi lúc đứa chủ repo lần đầu dùng github lỡ xoá luôn myconfig thì thông cảm...
   ```sh
    "bot_token": "<DISCORD-TOKEN-BOT>",
    "clientId": "<BOT-ID>",
    "guildId": "<GUILD-ID>",
    "destinate_channel_Id": "<ID-KÊNH-ĐÍCH>",
    "source_destinate_channel_Id": "<ID-KÊNH-LOG>",
    "gemini_api_token": "<GEMINI-API-TOKEN>",
    "authorId": "607183227911667746"
   ```
4. Cài đặt các Dependencies từ file package
  ```sh
  npm install 
  ``` 

## Cách sử dụng
1. Tệp index.js là tệp chính để khởi động con bot trong Discord
   ```sh
   node index.js
   ```
3. Tệp deploy-commands dùng để update thêm các commands-slash bạn muốn thêm vào những lệnh mới (vì Discord không tự update commands-slash cho bạn)
   ```sh
   node deploy-commands.js
   ```
4. Bạn có thể tự mình tiếp tục phát triển thêm dự án của chủ sở hữu hoặc contribute
5. Sử dụng /help để biết thêm thông tin chi tiết, hoặc mò trong tutorial.js file (ở events package)
