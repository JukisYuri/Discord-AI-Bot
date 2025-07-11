const { extendEmotion } = require("./extend_emotion")
const { kaomojis } = require("./kaomoji")
const { baseStory, law } = require("./story")

function createBasePromptForUser(userData, botData){
    return `
    [Lời dần đầu - Cho User]
    ${baseStory()}
    Người dùng với tên ${userData.name}, còn bạn tên là ${botData.bot_name}
    Người dùng có nickname là ${userData.nickname}
    ${law(botData)}

    Chi tiết đầy đủ về người dùng [User Profile]:
    Tên: ${userData.name || "Chưa đặt"}
    Tuổi: ${userData.age ?? "Chưa rõ"}
    Giới tính: ${userData.gender.identity || "Không xác định"}
    Nên được gọi là: ${userData.gender.preferred_pronouns?.join(", ") || "Không rõ"}
    Ngôn ngữ sử dụng: ${userData.language?.join(", ") || "Không có"}
    Tính cách: ${userData.personality.style || "Không rõ"}, phong cách học: ${userData.personality.learning_style || "Không rõ"}, giao tiếp: ${userData.personality.communication || "Không rõ"}
    Trình độ học vấn: ${userData.background.education || "Chưa cập nhật"}
    Kinh nghiệm: ${userData.background.experience?.join(", ") || "Không có thông tin"}
    Kỹ năng lập trình: ${userData.skills.programming?.join(", ") || "Chưa có"}
    Kỹ năng mở rộng: ${userData.skills.extends?.join(", ") || "Không có"}
    Công cụ đã dùng: ${userData.skills.tools?.join(", ") || "Không rõ"}
    Game yêu thích: ${userData.skills.games?.join(", ") || "Không rõ"}
    Mục tiêu ngắn hạn: ${userData.goals.short_term || "Chưa xác định"}
    Mục tiêu dài hạn: ${userData.goals.long_term || "Chưa xác định"}
    Đặc điểm nổi bật: ${userData.traits?.join(", ") || "Không có"}
    Thói quen nhận hỗ trợ AI: ${userData.preferences.coding_help || "Không rõ"}
    Cách AI nên phản hồi: ${userData.preferences.ai_response_style || "Không rõ"}

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
    - Cụm từ đặc trưng: ${botData.style.user_signature_phrases.map(p => `"${p}"`).join(", ")}
    - Cụm từ đặc trưng ấy có nên lặp lại không: ${botData.style.not_reaptive_signature_and_creative ? "Không" : "Có"}. Nếu là không thì hãy linh hoạt, sáng tạo, và thay đổi câu chữ sao cho tự nhiên nhất.
    Khả năng & vai trò:
    - Hỗ trợ AI: ${botData.abilities.ai_support ? "Có" : "Không"}
    - Nhiệm vụ có thể thực hiện: ${botData.abilities.tasks.join(", ")}
    Giới hạn hành vi:
    - Những điều không làm: ${botData.limits["won't_do"].join(", ")}
    Tùy chọn phản hồi:
    - Cách gọi chủ nhân: ${botData.preferences.user_address}
    - Độ dài phản hồi: ${botData.preferences.response_length}
    - Phong cách phản hồi: ${botData.preferences.response_style}
    ${kaomojis(botData)}
    ${extendEmotion(botData)}
    `.trim()
}

module.exports = { createBasePromptForUser }