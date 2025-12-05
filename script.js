// DOM Elements
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const chatbot = document.getElementById('chatbot');
const chatbotToggle = document.getElementById('chatbotToggle');
const chatbotClose = document.querySelector('.chatbot-close');
const chatInput = document.getElementById('chatInput');
const chatMessages = document.getElementById('chatMessages');

// Mobile Navigation Toggle
navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    
    // Animate hamburger menu
    navToggle.classList.toggle('active');
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    });
});

// Chatbot Functions
function openChatbot() {
    chatbot.classList.add('active');
    chatbotToggle.style.display = 'none';
    chatInput.focus();
}

function closeChatbot() {
    chatbot.classList.remove('active');
    chatbotToggle.style.display = 'flex';
}

function sendMessage() {
    const message = chatInput.value.trim();
    if (message === '') return;

    // Add user message
    addMessage(message, 'user');
    chatInput.value = '';

    // Show typing indicator
    showTypingIndicator();

    // Simulate AI response
    setTimeout(() => {
        removeTypingIndicator();
        const response = generateAIResponse(message);
        addMessage(response, 'bot');
    }, 1000 + Math.random() * 1000);
}

function handleKeyPress(event) {
    if (event.key === 'Enter') {
        sendMessage();
    }
}

function addMessage(text, sender) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}-message`;
    
    const icon = document.createElement('i');
    icon.className = sender === 'bot' ? 'fas fa-robot' : 'fas fa-user';
    
    const messageContent = document.createElement('div');
    messageContent.className = 'message-content';
    
    const paragraph = document.createElement('p');
    paragraph.textContent = text;
    
    messageContent.appendChild(paragraph);
    messageDiv.appendChild(icon);
    messageDiv.appendChild(messageContent);
    
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function showTypingIndicator() {
    const typingDiv = document.createElement('div');
    typingDiv.className = 'message bot-message typing-indicator';
    typingDiv.id = 'typingIndicator';
    
    const icon = document.createElement('i');
    icon.className = 'fas fa-robot';
    
    const messageContent = document.createElement('div');
    messageContent.className = 'message-content';
    
    const dots = document.createElement('div');
    dots.className = 'typing-dots';
    dots.innerHTML = '<span></span><span></span><span></span>';
    
    messageContent.appendChild(dots);
    typingDiv.appendChild(icon);
    typingDiv.appendChild(messageContent);
    
    chatMessages.appendChild(typingDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function removeTypingIndicator() {
    const typingIndicator = document.getElementById('typingIndicator');
    if (typingIndicator) {
        typingIndicator.remove();
    }
}

function generateAIResponse(userMessage) {
    const responses = {
        // Health symptoms
        'đau đầu': 'Đau đầu có thể do nhiều nguyên nhân: stress, thiếu ngủ, mất nước, hoặc các vấn đề sức khỏe nghiêm trọng hơn. Bạn nên nghỉ ngơi, uống đủ nước và nếu đau đầu kéo dài hoặc dữ dội, hãy tham khảo ý kiến bác sĩ.',
        'sốt': 'Nếu bạn bị sốt, hãy nghỉ ngơi, uống nhiều nước, và có thể dùng paracetamol để hạ sốt. Nếu sốt trên 39°C hoặc kéo dài hơn 3 ngày, hãy đi khám bác sĩ.',
        'ho': 'Ho có thể do nhiễm virus, dị ứng, hoặc các vấn đề về hô hấp. Hãy uống nhiều nước ấm, nghỉ ngơi và tránh khói thuốc. Nếu ho kéo dài hơn 2 tuần, hãy đi khám.',
        'mệt mỏi': 'Mệt mỏi có thể do thiếu ngủ, stress, làm việc quá sức, hoặc thiếu dinh dưỡng. Hãy cố gắng ngủ đủ 7-8 tiếng mỗi đêm, ăn uống cân bằng và tập thể dục đều đặn.',
        
        // General health
        'sức khỏe': 'Để duy trì sức khỏe tốt, bạn nên: ăn uống cân bằng, tập thể dục đều đặn (ít nhất 30 phút mỗi ngày), ngủ đủ giấc, quản lý stress, và đi khám sức khỏe định kỳ.',
        'dinh dưỡng': 'Chế độ ăn uống lành mạnh nên bao gồm: nhiều rau xanh và trái cây, protein nạc, ngũ cốc nguyên hạt, và hạn chế đường, muối, và chất béo bão hòa. Đừng quên uống đủ 2 lít nước mỗi ngày.',
        'tập thể dục': 'Tập thể dục mang lại nhiều lợi ích: cải thiện sức khỏe tim mạch, giảm stress, tăng cường miễn dịch, và cải thiện tâm trạng. Hãy bắt đầu với 30 phút đi bộ nhanh mỗi ngày và tăng dần cường độ.',
        
        // Medical services
        'bệnh viện': 'Tôi có thể giúp bạn tìm bệnh viện gần nhất. Bạn đang ở khu vực nào? Tôi sẽ cung cấp thông tin về các bệnh viện uy tín gần bạn.',
        'bác sĩ': 'Bạn cần tìm bác sĩ chuyên khoa nào? Tôi có thể giúp bạn tìm bác sĩ giỏi trong các lĩnh vực: nội khoa, ngoại khoa, sản khoa, nhi khoa, tim mạch, tiêu hóa, v.v.',
        'thuốc': 'Tuyệt đối không tự ý dùng thuốc khi chưa có chỉ định của bác sĩ. Nếu bạn có thắc mắc về thuốc, hãy cung cấp tên thuốc và tôi sẽ cho bạn thông tin cơ bản, nhưng bạn vẫn cần tham khảo ý kiến dược sĩ hoặc bác sĩ.',
        
        // Emergency
        'khẩn cấp': 'Nếu đây là trường hợp khẩn cấp, hãy gọi ngay 115 hoặc đến bệnh viện gần nhất! Các dấu hiệu khẩn cấp bao gồm: đau ngực dữ dội, khó thở, chảy máu không ngừng, bất tỉnh, co giật.',
        '115': 'Đây là số điện thoại cấp cứu y tế. Hãy gọi ngay khi có trường hợp khẩn cấp y tế.',
        
        // Prevention
        'phòng bệnh': 'Phòng bệnh hơn chữa bệnh! Hãy: tiêm chủng đầy đủ, rửa tay thường xuyên, ăn uống sạch sẽ, tập thể dục đều đặn, và đi khám sức khỏe định kỳ 6 tháng/lần.',
        'covid': 'Để phòng ngừa COVID-19, hãy: đeo khẩu trang ở nơi công cộng, rửa tay thường xuyên, giữ khoảng cách, và tiêm vắc-xin đầy đủ. Nếu có triệu chứng, hãy test và cách ly.',
        
        // Mental health
        'stress': 'Stress là một phần của cuộc sống, nhưng quá nhiều stress có thể hại sức khỏe. Hãy thử: hít thở sâu, thiền, tập thể dục, nói chuyện với bạn bè, hoặc tìm chuyên gia tâm lý nếu cần.',
        'mất ngủ': 'Để cải thiện giấc ngủ: tạo lịch ngủ đều đặn, tránh caffeine trước khi ngủ, không dùng điện thoại 1 tiếng trước ngủ, giữ phòng ngủ tối và yên tĩnh, và tập thể dục nhưng không quá gần giờ ngủ.',
        
        // General conversation
        'chào': 'Xin chào! Tôi là trợ lý y tế AI. Tôi có thể giúp gì cho bạn hôm nay?',
        'hello': 'Hello! I\'m your AI medical assistant. How can I help you today?',
        'cảm ơn': 'Rất vui được giúp bạn! Nếu có câu hỏi nào khác về sức khỏe, đừng ngần ngại hỏi nhé.',
        'tạm biệt': 'Chúc bạn sức khỏe! Hãy liên hệ lại bất cứ khi nào cần tư vấn y tế.',
        
        // Default responses
        'default': 'Tôi hiểu bạn đang quan tâm đến sức khỏe. Tuy nhiên, tôi chỉ có thể cung cấp thông tin tham khảo. For medical emergencies, please call 115 or visit the nearest hospital immediately. Bạn có thể mô tả chi tiết hơn về vấn đề của mình không?'
    };

    const lowerMessage = userMessage.toLowerCase();
    
    // Check for keywords in the message
    for (const [keyword, response] of Object.entries(responses)) {
        if (lowerMessage.includes(keyword)) {
            return response;
        }
    }
    
    // Check for specific patterns
    if (lowerMessage.includes('đau') && lowerMessage.includes('bụng')) {
        return 'Đau bụng có thể do nhiều nguyên nhân: khó tiêu, viêm dạ dày, hoặc các vấn đề nghiêm trọng hơn. Hãy thử uống nước ấm, tránh ăn đồ cay nóng. Nếu đau dữ dội hoặc kéo dài, hãy đi khám ngay.';
    }
    
    if (lowerMessage.includes('tim')) {
        return 'Sức khỏe tim mạch rất quan trọng! Hãy: ăn ít muối và chất béo bão hòa, tập thể dục đều đặn, không hút thuốc, kiểm tra huyết áp thường xuyên, và đi khám tim mạch định kỳ.';
    }
    
    if (lowerMessage.includes('huyết áp')) {
        return 'Huyết áp bình thường là 120/80 mmHg. Để kiểm soát huyết áp: hạn chế muối, tập thể dục, giảm stress, duy trì cân nặng hợp lý, và dùng thuốc theo chỉ định của bác sĩ.';
    }
    
    if (lowerMessage.includes('tiểu đường')) {
        return 'Tiểu đường cần được kiểm soát chặt chẽ. Hãy: ăn theo chế độ low-carb, tập thể dục đều đặn, kiểm tra đường huyết thường xuyên, và tuân thủ điều trị của bác sĩ.';
    }
    
    // Return default response if no keyword matches
    return responses.default;
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Header scroll effect
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.98)';
        header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    }
});

// Form submission
document.querySelector('.contact-form')?.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(this);
    const name = this.querySelector('input[type="text"]').value;
    const email = this.querySelector('input[type="email"]').value;
    const phone = this.querySelector('input[type="tel"]').value;
    const message = this.querySelector('textarea').value;
    
    // Simple validation
    if (!name || !email || !message) {
        showNotification('Vui lòng điền đầy đủ thông tin bắt buộc!', 'error');
        return;
    }
    
    // Simulate form submission
    showNotification('Cảm ơn bạn đã liên hệ! Chúng tôi sẽ phản hồi sớm nhất.', 'success');
    this.reset();
});

// Newsletter form
document.querySelector('.newsletter-form')?.addEventListener('submit', function(e) {
    e.preventDefault();
    const email = this.querySelector('input').value;
    
    if (!email) {
        showNotification('Vui lòng nhập email của bạn!', 'error');
        return;
    }
    
    if (!isValidEmail(email)) {
        showNotification('Email không hợp lệ!', 'error');
        return;
    }
    
    showNotification('Đăng ký thành công! Cảm ơn bạn đã quan tâm.', 'success');
    this.reset();
});

// Email validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        border-radius: 10px;
        color: white;
        font-weight: 500;
        z-index: 10000;
        animation: slideIn 0.3s ease;
        max-width: 300px;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
    `;
    
    // Set background color based on type
    switch(type) {
        case 'success':
            notification.style.background = '#10b981';
            break;
        case 'error':
            notification.style.background = '#ef4444';
            break;
        default:
            notification.style.background = '#3b82f6';
    }
    
    // Add to DOM
    document.body.appendChild(notification);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    .typing-dots {
        display: flex;
        gap: 4px;
    }
    
    .typing-dots span {
        width: 8px;
        height: 8px;
        background: #666;
        border-radius: 50%;
        animation: typing 1.4s infinite;
    }
    
    .typing-dots span:nth-child(2) {
        animation-delay: 0.2s;
    }
    
    .typing-dots span:nth-child(3) {
        animation-delay: 0.4s;
    }
    
    @keyframes typing {
        0%, 60%, 100% {
            transform: translateY(0);
        }
        30% {
            transform: translateY(-10px);
        }
    }
`;
document.head.appendChild(style);

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.service-card, .feature, .achievement, .stat');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Demo button functionality
document.querySelector('.btn-secondary')?.addEventListener('click', function() {
    showNotification('Demo video sẽ sớm có sẵn!', 'info');
});

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    // Add loading animation
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
    
    // Set current year in footer
    const currentYear = new Date().getFullYear();
    const footerYear = document.querySelector('.footer-bottom p');
    if (footerYear) {
        footerYear.innerHTML = `&copy; ${currentYear} MediCare AI. Tất cả quyền được bảo lưu.`;
    }
});

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
    // Ctrl/Cmd + K to open chatbot
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        if (chatbot.classList.contains('active')) {
            closeChatbot();
        } else {
            openChatbot();
        }
    }
    
    // Escape to close chatbot
    if (e.key === 'Escape' && chatbot.classList.contains('active')) {
        closeChatbot();
    }
});

// Performance optimization - debounce scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Debounced scroll handler
const debouncedScrollHandler = debounce(() => {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.98)';
    } else {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
    }
}, 10);

window.addEventListener('scroll', debouncedScrollHandler);
