#!/usr/bin/env node

const chalk = require('chalk');
const clear = require('clear');
const CLI = require('clui');
const figlet = require('figlet');
const inquirer = require('inquirer');
const Preferences = require('preferences');
const Spinner = CLI.Spinner;
const GitHubApi = require('github');
const _ = require('lodash');
const git = require('simple-git')();
const touch = require('touch');
const fs = require('fs');
const files = require('./files');
const argv = require('minimist')(process.argv.slice(2));
var complete = false;


clear()


if (argv.g) {
    if (typeof argv.c == 'string') {
        while (!complete) {
            files.generateComponent(argv);
            complete = true;
        }

    }
}