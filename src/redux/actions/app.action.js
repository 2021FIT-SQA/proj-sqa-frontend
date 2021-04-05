import * as types from "../constants/constants.action";
export const toggleSiderBar = () => {
  return {
    type: types.APP_TOGGLE_SIDEBAR
  };
};

export const toggleSettingPanel = () => {
  return {
    type: types.APP_TOGGLE_SETTINGPANEL
  };
};