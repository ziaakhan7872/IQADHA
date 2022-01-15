"use strict";
import I18n from "react-native-i18n";

I18n.fallbacks = true;
I18n.translations = {
  en: require("./locales/en.json"),
  ar: require("./locales/arabic.json"),
};

export default I18n;
