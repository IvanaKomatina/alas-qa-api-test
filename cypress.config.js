const {
  defineConfig
} = require("cypress");

const fs = require('fs-extra')
const path = require('path')

function getConfigurationByFile(file) {
  const pathToConfigFile = path.resolve('cypress/config', `${file}.json`)
  console.log(pathToConfigFile)

  return fs.readJson(pathToConfigFile)
}

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
      const file = config.env.configFile || 'qa'

      return getConfigurationByFile(file)
    },
  },

});