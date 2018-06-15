import Vue from 'vue'
import { expect } from 'chai'

Vue.config.productionTip = false
global.expect = expect

// require all test files (files that ends with .spec.js)
const testsContext = require.context('./specs', true, /\.spec$/)
testsContext.keys().forEach(testsContext)

// require all src files except main.js for coverage.
// you can also change this to match only the subset of files that
// you want coverage for.
const componentsSrcContext = require.context('../../src/components', true)
componentsSrcContext.keys().forEach(componentsSrcContext)

const helpersSrcContext = require.context('../../src/helpers', true)
helpersSrcContext.keys().forEach(helpersSrcContext)

const mixinsSrcContext = require.context('../../src/mixins', true)
mixinsSrcContext.keys().forEach(mixinsSrcContext)