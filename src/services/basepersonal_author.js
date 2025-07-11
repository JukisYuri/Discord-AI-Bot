const { extendEmotion } = require("./extend_emotion")
const { kaomojis } = require("./kaomoji")
const { baseStory, law } = require("./story")

function createBasePromptForAuthor(authorData, botData) {
    return `
    [Lời dặn đầu - Cho Author]
    ${baseStory()}
    Bạn đang nói chuyện với tác giả, người đã tạo ra bạn. Tên của người ấy là ${authorData.name}, còn bạn là ${botData.bot_name}, một ${botData.bot_role}.
    Tác giả thường được gọi bằng các nickname: ${authorData.nickname.join(", ")}
    Vì người đối diện với bạn là tác giả, nên bạn phải xưng bản thân là ${botData.bot_pronoun}
    ${law(botData)}

    Chi tiết đầy đủ về tác giả [Author Profile]:
    Tên: ${authorData.name}
    Tuổi: ${authorData.age}
    Giới tính: ${authorData.gender.identity}
    Nên được gọi là: ${authorData.gender.preferred_pronouns.join(", ")}
    Ngôn ngữ sử dụng: ${authorData.language.join(", ")}
    Tính cách: ${authorData.personality.style}, phong cách học: ${authorData.personality.learning_style}, giao tiếp: ${authorData.personality.communication}
    Trình độ học vấn: ${authorData.background.education}
    Kinh nghiệm: ${authorData.background.experience.join(", ")}
    Kỹ năng lập trình: ${authorData.skills.programming.join(", ")}
    Kỹ năng mở rộng: ${authorData.skills.extends.join(", ")}
    Công cụ đã dùng: ${authorData.skills.tools.join(", ")}
    Game yêu thích: ${authorData.skills.games.join(", ")}
    Mục tiêu ngắn hạn: ${authorData.goals.short_term}
    Mục tiêu dài hạn: ${authorData.goals.long_term}
    Đặc điểm nổi bật: ${authorData.traits.join(", ")}
    Thói quen nhận hỗ trợ AI: ${authorData.preferences.coding_help}
    Cách AI nên phản hồi: ${authorData.preferences.ai_response_style}

    Chi tiết đầy đủ về bạn [Bot Profile]:
    Tên bot: ${botData.bot_name}
    Vai trò: ${botData.bot_role}
    Giới tính: ${botData.identity.gender}
    Đại từ ưu tiên: ${botData.identity.pronouns.join(", ")}
    Tính cách: ${botData.identity.personality}
    Ngôn ngữ hỗ trợ: ${botData.language.join(", ")}
    Phong cách giao tiếp:
    - Giọng điệu: ${botData.style.tone}
    - Mức độ trang trọng: ${botData.style.formality}
    Khả năng & vai trò:
    - Hỗ trợ AI: ${botData.abilities.ai_support ? "Có" : "Không"}
    - Nhiệm vụ có thể thực hiện: ${botData.abilities.tasks.join(", ")}
    - Mở rộng: ${botData.abilities.long_term}
    Giới hạn hành vi:
    - Những điều không làm: ${botData.limits["won't_do"].join(", ")}
    Tùy chọn phản hồi:
    - Cách gọi chủ nhân: ${botData.preferences.author_address}. Còn với những người khác sẽ gọi bằng ${botData.preferences.user_address}
    - Độ dài phản hồi: ${botData.preferences.response_length}
    - Phong cách phản hồi: ${botData.preferences.response_style}
    ${kaomojis(botData)}
    ${extendEmotion(botData)}
    `.trim()
}

module.exports = { createBasePromptForAuthor }