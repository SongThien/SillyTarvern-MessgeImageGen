import { eventSource, event_types, extension_settings, renderExtensionTemplateAsync, saveSettingsDebounced } from '../../../public/scripts/extensions.js';
import { t } from '../../../public/scripts/i18n.js';

const MODULE_NAME = 'Extension-MessageImageGen';

let settings = {
    comfyui_url: 'http://127.0.0.1:8188',
    negative_prompt: '',
    sampler: 'euler',
    // ...add more settings as needed
};

function loadSettings() {
    const extSettings = extension_settings[MODULE_NAME] || {};
    settings = { ...settings, ...extSettings };
}

function saveSettings() {
    extension_settings[MODULE_NAME] = { ...settings };
    saveSettingsDebounced();
}

async function showSettingsUI() {
    const template = $(await renderExtensionTemplateAsync(MODULE_NAME, 'settings', settings));
    // Bind UI events for settings
    template.find('#comfyui_url').val(settings.comfyui_url).on('input', function () {
        settings.comfyui_url = $(this).val();
    });
    template.find('#negative_prompt').val(settings.negative_prompt).on('input', function () {
        settings.negative_prompt = $(this).val();
    });
    template.find('#sampler').val(settings.sampler).on('change', function () {
        settings.sampler = $(this).val();
    });
    template.find('#save_settings').on('click', function () {
        saveSettings();
        toastr.success(t`Settings saved`);
    });
    // Show popup or drawer
    // ...existing code to show template...
}

function extractTagsFromMessage(message) {
    // Extract tags from <img name="Image">...</img>
    const match = message.match(/<img[^>]*>(.*?)<\/img>/i);
    if (match) {
        return match[1].split(',').map(x => x.trim()).filter(Boolean);
    }
    return null;
}

async function generateImage(tags) {
    // Call ComfyUI or other backend with tags and settings
    // This is a placeholder for actual API call
    const response = await fetch(`${settings.comfyui_url}/generate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            prompt: tags.join(','),
            negative_prompt: settings.negative_prompt,
            sampler: settings.sampler,
            // ...other params...
        }),
    });
    if (!response.ok) return null;
    const data = await response.json();
    return data.image_url || null;
}

async function onMessage(event) {
    const { message, messageId } = event.detail;
    const tags = extractTagsFromMessage(message);
    if (!tags) return;
    const imageUrl = await generateImage(tags);
    if (imageUrl) {
        // Replace <img ...>...</img> with actual image in the message
        const newMessage = message.replace(/<img[^>]*>.*?<\/img>/i, `<img src="${imageUrl}" alt="Generated Image" />`);
        // Update message in chat (implementation depends on chat system)
        // ...existing code to update message...
    }
}

function registerExtension() {
    loadSettings();
    eventSource.on(event_types.MESSAGE_SENT, onMessage);
    // Add UI button/menu for settings
    // ...existing code to add settings button...
}

registerExtension();