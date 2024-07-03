const { ModuleEnum } = require("../constants/enums");
require('dotenv').config();

const COMMON_APP_EXPOSED_PORT = process.env.COMMON_APP_EXPOSED_PORT;
const USER_SERVICE_APP_EXPOSED_PORT = process.env.USER_SERVICE_APP_EXPOSED_PORT;

const MODULE_PORT_MAPPER = {
    [ModuleEnum.COMMON]: COMMON_APP_EXPOSED_PORT,
    [ModuleEnum.USER_SERVICE]: USER_SERVICE_APP_EXPOSED_PORT
};

module.exports = MODULE_PORT_MAPPER;
