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

// Register the extension with SillyTavern
function registerExtension() {
    // Placeholder: Add extension registration logic here
    // For example, register commands, UI, or hooks
    console.log(`[${MODULE_NAME}] Extension registered.`);
}

// Auto-register if SillyTavern supports it
if (typeof window !== 'undefined' && window.registerExtension) {
    window.registerExtension(MODULE_NAME, registerExtension);
}

export default {
    MODULE_NAME,
    registerExtension,
};
