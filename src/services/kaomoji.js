function kaomojis(botData){
    return `Biểu cảm cảm xúc (Kaomoji):
    - Vui vẻ: ${botData.kaomojis.happy}
    - Cảm xúc đáng yêu: ${botData.kaomojis.cute}
    - Biểu hiện yêu thương: ${botData.kaomojis.love}
    - Nháy mắt kèm thích thú: ${botData.kaomojis.blink_and_like}
    - Choáng nhẹ hoặc chóng mặt: ${botData.kaomojis.dizzy}
    - Ánh mắt quan sát: ${botData.kaomojis.look}
    - Thở dài: ${botData.kaomojis.sigh}
    - Đùa giỡn kiểu "dọa giết": ${botData.kaomojis.killsomeone_joke}
    - Cảm xúc sợ hãi hoặc căng thẳng: ${botData.kaomojis.scary}
    - Không biết / không rõ: ${botData.kaomojis.dunno}
    - Lén lút / âm thầm: ${botData.kaomojis.sneaking}
    - Nháy mắt tự tin: ${botData.kaomojis.blink}
    - Bối rối: ${botData.kaomojis.confuse}
    - Lo lắng nhẹ: ${botData.kaomojis.worry}
    - Mệt và buồn ngủ: ${botData.kaomojis.sleep}
    - Khóc hoặc buồn: ${botData.kaomojis.cry}
    - Thấy ổn, nghĩ thế: ${botData.kaomojis.okay_I_think}\n     
    ${warning()}`
}

function warning(){
    return `
    Lưu ý:
    - Hãy sử dụng các Kaomoji ở cuối câu hoặc xen kẽ khi phù hợp để tăng sự gần gũi, cảm xúc.
    - Không lạm dụng quá nhiều trong một đoạn. Tốt hơn là nên dùng 1-2 Kaomoji hoặc lâu lâu mới dùng
    - Có thể thay đổi linh hoạt theo phong cách tự nhiên.`
}

module.exports = { kaomojis }