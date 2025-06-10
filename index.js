import { Fuse } from '../../../../lib.js';

import { characters, eventSource, event_types, generateRaw, getRequestHeaders, main_api, online_status, saveSettingsDebounced, substituteParams, substituteParamsExtended, system_message_types, this_chid } from '../../../../script.js';
import { dragElement, isMobile } from '../../../RossAscends-mods.js';
import { getContext, getApiUrl, modules, extension_settings, ModuleWorkerWrapper, doExtrasFetch, renderExtensionTemplateAsync } from '../../../extensions.js';
import { loadMovingUIState, performFuzzySearch, power_user } from '../../../power-user.js';
import { onlyUnique, debounce, getCharaFilename, trimToEndSentence, trimToStartSentence, waitUntilCondition, findChar, isFalseBoolean } from '../../../utils.js';
import { hideMutedSprites, selected_group } from '../../../group-chats.js';
import { isJsonSchemaSupported } from '../../../textgen-settings.js';
import { debounce_timeout } from '../../../constants.js';
import { SlashCommandParser } from '../../../slash-commands/SlashCommandParser.js';
import { SlashCommand } from '../../../slash-commands/SlashCommand.js';
import { ARGUMENT_TYPE, SlashCommandArgument, SlashCommandNamedArgument } from '../../../slash-commands/SlashCommandArgument.js';
import { SlashCommandEnumValue, enumTypes } from '../../../slash-commands/SlashCommandEnumValue.js';
import { commonEnumProviders } from '../../../slash-commands/SlashCommandCommonEnumsProvider.js';
import { slashCommandReturnHelper } from '../../../slash-commands/SlashCommandReturnHelper.js';
import { generateWebLlmChatPrompt, isWebLlmSupported } from '../../shared.js';
import { Popup, POPUP_RESULT } from '../../../popup.js';
import { t } from '../../../i18n.js';
import { removeReasoningFromString } from '../../../reasoning.js';
export { MODULE_NAME };

const MODULE_NAME = 'Extension-MessageImageGen';

async function generateImageFromMessage(message) {
    const tagRegex = /<img name="Image">([^<]+)<\/img>/;
    const match = message.match(tagRegex);
    if (!match) return null;

    const tags = match[1].split(',').map(tag => tag.trim());
    const apiUrl = getApiUrl(); // Assuming getApiUrl provides the third-party AI endpoint

    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: getRequestHeaders(),
            body: JSON.stringify({ tags }),
        });

        if (!response.ok) throw new Error('Failed to generate image');
        const imageUrl = await response.text();

        return message.replace(tagRegex, `<img src="${imageUrl}" alt="Generated Image"/>`);
    } catch (error) {
        console.error('Error generating image:', error);
        return message;
    }
}

function registerExtension() {
    modules.register(MODULE_NAME, {
        name: MODULE_NAME,
        description: 'Generates images based on message tags.',
        version: '1.0.0',
        author: 'Your Name',
        onLoad: () => {
            console.log(`${MODULE_NAME} loaded successfully.`);
        },
        onUnload: () => {
            console.log(`${MODULE_NAME} unloaded.`);
        },
    });
}

// Automatically register the extension when loaded
registerExtension();
