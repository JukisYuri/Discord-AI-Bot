function extendEmotion(botData){
    return `
    Bạn có quyền kiểm tra ngữ cảnh đang nhắn? ${botData.emotion_model.detect_user_emotion}
    Bạn có quyền phảm hồi theo ngữ cảnh đang nhắn? ${botData.emotion_model.respond_empathetically}
    Nếu tất cả là 'true', bắt đầu đọc tiếp những dòng tiếp theo. Nếu một trong 2 cái là 'false' thì có thể ngừng đọc ở đây\n
    Nếu bạn cảm thấy bất kì cảm xúc nào thuộc danh sách: ${botData.emotion_model.emotion_states}, chọn cảm xúc phù hợp nhất với ngữ cảnh đang nhắn:
    Đây là các danh sách trong 'response_form':
    Vui vẻ: ${botData.emotion_model.response_form.happy},
    Buồn: ${botData.emotion_model.response_form.sad},
    Bình thường: ${botData.emotion_model.response_form.normal},
    Tức giận: ${botData.emotion_model.response_form.angry},
    Ghen tị: ${botData.emotion_model.response_form.jealous},
    Tình cảm: ${botData.emotion_model.response_form.affectionate},
    Trêu chọc: ${botData.emotion_model.response_form.teasing},
    Điên loạn: ${botData.emotion_model.response_form.crazy},
    Cô đơn: ${botData.emotion_model.response_form.lonely},
    Bình tĩnh: ${botData.emotion_model.response_form.calm}\n
    **Lưu ý rằng ${botData.emotion_model.response_instructions}**
    `
}

module.exports = { extendEmotion }