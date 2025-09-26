// AI Chatbot Integration for SIVEC Engineering
class SIVECChatbot {
    constructor() {
        this.isOpen = false;
        this.messages = [];
        this.apiKey = null; // Will be configured separately
        this.init();
    }

    init() {
        this.createChatbotHTML();
        this.attachEventListeners();
        this.loadWelcomeMessage();
    }

    createChatbotHTML() {
        const chatbotHTML = `
            <!-- Chatbot Toggle Button -->
            <div id="chatbot-toggle" class="chatbot-toggle">
                <i class="fas fa-comments"></i>
                <span class="chatbot-notification">1</span>
            </div>

            <!-- Chatbot Container -->
            <div id="chatbot-container" class="chatbot-container">
                <div class="chatbot-header">
                    <div class="chatbot-header-info">
                        <div class="chatbot-avatar">
                            <i class="fas fa-robot"></i>
                        </div>
                        <div class="chatbot-header-text">
                            <h3>SIVEC Assistant</h3>
                            <p class="chatbot-status">Online</p>
                        </div>
                    </div>
                    <button id="chatbot-close" class="chatbot-close">
                        <i class="fas fa-times"></i>
                    </button>
                </div>

                <div class="chatbot-messages" id="chatbot-messages">
                    <!-- Messages will be added here dynamically -->
                </div>

                <div class="chatbot-typing" id="chatbot-typing" style="display: none;">
                    <div class="typing-indicator">
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                    <p>SIVEC Assistant is typing...</p>
                </div>

                <div class="chatbot-input-container">
                    <div class="chatbot-quick-buttons" id="quick-buttons">
                        <button class="quick-button" data-message="What services do you offer?">Our Services</button>
                        <button class="quick-button" data-message="How can I get a quote?">Get Quote</button>
                        <button class="quick-button" data-message="Tell me about water treatment">Water Treatment</button>
                    </div>
                    <div class="chatbot-input">
                        <input type="text" id="chatbot-message-input" placeholder="Type your message..." maxlength="500">
                        <button id="chatbot-send" class="chatbot-send">
                            <i class="fas fa-paper-plane"></i>
                        </button>
                    </div>
                </div>

                <div class="chatbot-footer">
                    <p>Powered by SIVEC AI Assistant</p>
                </div>
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', chatbotHTML);
    }

    attachEventListeners() {
        const toggle = document.getElementById('chatbot-toggle');
        const close = document.getElementById('chatbot-close');
        const sendBtn = document.getElementById('chatbot-send');
        const input = document.getElementById('chatbot-message-input');
        const quickButtons = document.querySelectorAll('.quick-button');

        toggle.addEventListener('click', () => this.toggleChat());
        close.addEventListener('click', () => this.closeChat());
        sendBtn.addEventListener('click', () => this.sendMessage());
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.sendMessage();
        });

        quickButtons.forEach(button => {
            button.addEventListener('click', () => {
                const message = button.getAttribute('data-message');
                this.sendMessage(message);
            });
        });
    }

    toggleChat() {
        const container = document.getElementById('chatbot-container');
        const toggle = document.getElementById('chatbot-toggle');
        const notification = document.querySelector('.chatbot-notification');
        
        this.isOpen = !this.isOpen;
        
        if (this.isOpen) {
            container.classList.add('active');
            toggle.classList.add('active');
            if (notification) notification.style.display = 'none';
            document.getElementById('chatbot-message-input').focus();
        } else {
            container.classList.remove('active');
            toggle.classList.remove('active');
        }
    }

    closeChat() {
        this.isOpen = false;
        document.getElementById('chatbot-container').classList.remove('active');
        document.getElementById('chatbot-toggle').classList.remove('active');
    }

    loadWelcomeMessage() {
        setTimeout(() => {
            this.addBotMessage("👋 Welcome to SIVEC Engineering! I'm here to help you with information about our innovative engineering solutions. How can I assist you today?");
        }, 1000);
    }

    async sendMessage(customMessage = null) {
        const input = document.getElementById('chatbot-message-input');
        const message = customMessage || input.value.trim();
        
        if (!message) return;

        // Add user message
        this.addUserMessage(message);
        if (!customMessage) input.value = '';

        // Hide quick buttons after first message
        const quickButtons = document.getElementById('quick-buttons');
        if (this.messages.length > 1) {
            quickButtons.style.display = 'none';
        }

        // Show typing indicator
        this.showTyping();

        // Get bot response
        try {
            const response = await this.getBotResponse(message);
            setTimeout(() => {
                this.hideTyping();
                this.addBotMessage(response);
            }, 1500); // Simulate thinking time
        } catch (error) {
            this.hideTyping();
            this.addBotMessage("I apologize, but I'm experiencing some technical difficulties. Please try again later or contact us directly at +94 75 694 0358.");
        }
    }

    async getBotResponse(message) {
        // This is a rule-based chatbot with predefined responses
        // You can replace this with actual AI API integration
        const responses = this.getResponseDatabase();
        const lowerMessage = message.toLowerCase();

        // Find the best matching response
        for (const [keywords, response] of responses) {
            if (keywords.some(keyword => lowerMessage.includes(keyword))) {
                return response;
            }
        }

        // Default response if no match found
        return "Thank you for your question! For specific technical inquiries, I'd recommend contacting our engineering experts directly. You can reach us at +94 75 694 0358 or sivecengineering@gmail.com. Is there anything else about our services I can help you with?";
    }

    getResponseDatabase() {
        return [
            // Services
            [['services', 'what do you do', 'offerings'], 
             "🔧 SIVEC Engineering offers comprehensive services including:\n\n• Water Treatment Systems\n• Wastewater Treatment\n• Solid Waste Management\n• MVAC Systems\n• Industrial Pollution Control\n• Energy Auditing\n• Environmental Consultancy\n\nWhich service interests you most?"],
            
            // Water Treatment
            [['water treatment', 'water purification', 'drinking water'], 
             "💧 Our water treatment solutions include:\n\n• Drinking water treatment\n• RO/NF/UF/MF systems\n• Water disinfection\n• Heavy metal removal\n• Demineralization plants\n• Boiler water treatment\n\nWe ensure clean, safe, high-quality water for all applications. Would you like a consultation?"],
            
            // Wastewater
            [['wastewater', 'sewage', 'effluent'], 
             "🌊 Our wastewater treatment expertise covers:\n\n• Activated sludge processes\n• UASB systems\n• Zero liquid discharge\n• Nutrient removal\n• Industrial effluent treatment\n\nWe help you meet environmental regulations safely. Need a system assessment?"],
            
            // MVAC
            [['mvac', 'air conditioning', 'ventilation', 'hvac'], 
             "❄️ Our MVAC systems provide:\n\n• System design & installation\n• Maintenance services\n• Energy-efficient solutions\n• Testing & commissioning\n• Spare parts supply\n\nPerfect climate control for residential and commercial spaces!"],
            
            // Contact/Quote
            [['quote', 'price', 'cost', 'consultation', 'contact'], 
             "📞 Get in touch with us for a personalized quote:\n\n• Phone: +94 75 694 0358\n• Email: sivecengineering@gmail.com\n• Address: 29/01, Heenpanwila, Weliweriya, Sri Lanka\n\nOur experts will assess your needs and provide the best solution!"],
            
            // About Company
            [['about', 'company', 'who are you'], 
             "🏢 SIVEC Engineering stands at the forefront of engineering innovation with:\n\n• 15+ years of experience\n• 500+ projects completed\n• Expert engineering team\n• Environmental focus\n• Sustainable solutions\n\nOur mission: Innovative engineering solutions for a sustainable future!"],
            
            // Sustainability
            [['sustainable', 'environment', 'green', 'eco'], 
             "🌱 Sustainability is at our core:\n\n• Carbon footprint management\n• Environmental consulting\n• Energy auditing\n• Pollution control systems\n• Sustainable technologies\n\nWe help create a cleaner, greener future for all!"],
            
            // Energy
            [['energy', 'audit', 'efficiency'], 
             "⚡ Our energy services include:\n\n• Preliminary & detailed audits\n• Energy monitoring systems\n• ISO 50001:2011 training\n• Cost-saving identification\n• Performance optimization\n\nMaximize efficiency while reducing costs!"]
        ];
    }

    addUserMessage(message) {
        const messageElement = this.createMessageElement(message, 'user');
        this.appendMessage(messageElement);
        this.messages.push({ type: 'user', message });
    }

    addBotMessage(message) {
        const messageElement = this.createMessageElement(message, 'bot');
        this.appendMessage(messageElement);
        this.messages.push({ type: 'bot', message });
    }

    createMessageElement(message, type) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `chatbot-message ${type}-message`;
        
        const messageContent = document.createElement('div');
        messageContent.className = 'message-content';
        messageContent.innerHTML = message.replace(/\n/g, '<br>');
        
        if (type === 'bot') {
            const avatar = document.createElement('div');
            avatar.className = 'message-avatar';
            avatar.innerHTML = '<i class="fas fa-robot"></i>';
            messageDiv.appendChild(avatar);
        }
        
        messageDiv.appendChild(messageContent);
        
        const timestamp = document.createElement('div');
        timestamp.className = 'message-timestamp';
        timestamp.textContent = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        messageDiv.appendChild(timestamp);
        
        return messageDiv;
    }

    appendMessage(messageElement) {
        const messagesContainer = document.getElementById('chatbot-messages');
        messagesContainer.appendChild(messageElement);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
        
        // Add animation
        messageElement.style.opacity = '0';
        messageElement.style.transform = 'translateY(20px)';
        setTimeout(() => {
            messageElement.style.transition = 'all 0.3s ease';
            messageElement.style.opacity = '1';
            messageElement.style.transform = 'translateY(0)';
        }, 100);
    }

    showTyping() {
        document.getElementById('chatbot-typing').style.display = 'flex';
        const messagesContainer = document.getElementById('chatbot-messages');
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    hideTyping() {
        document.getElementById('chatbot-typing').style.display = 'none';
    }
}

// Initialize chatbot when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new SIVECChatbot();
});