const express = require('express');

const { protectRoutes } = require('../Controllers/AuthController');
const { updateSetting, getSettings } = require('../Controllers/SettingsController');

const settingsRoutes = express.Router();

settingsRoutes.use(protectRoutes);

settingsRoutes.route("/").get(getSettings).patch(updateSetting)

module.exports = settingsRoutes;