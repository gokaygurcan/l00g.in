#!/usr/bin/env node
var async = require('async');
var globalModulesDir = require('global-modules');
var E = require('3x3c');

E(`${globalModulesDir}/l00g.in/run.sh`)
  .then(() => {

    var inquirer = require('inquirer');
    var colors = require('colors');
    var fs = require('fs');
    var configDir = process.env['HOME'] + '/.ssh/config';
    var config = fs.readFileSync(configDir, 'utf8');

    if (config.trim().length === 0 ) {
      var add = require('./lib/first');
      console.log(colors.green('Your config is empty, let set your\'s first!'));
      add()
        .then((output) => {
          console.log(output);
        })
        .catch((err) => {
          console.log(err);
        })
    } else {

      var parser = require('./lib/parser');
      var add = require('./lib/add');
      var remove = require('./lib/remove');
      var sync = require('./lib/sync');

      var questions = [
        {
        	type: 'list',
        	name: 'option',
        	message: 'How can I help you,',
        	choices: ['List', 'Add', 'Remove', 'Github sync'],
        }
      ];

      inquirer.prompt(questions).then(function (answers) {

           // Maybe switch ?
           if (answers.option === 'List') {
             parser.stringify()
              .then((configFile) => {
                console.log(colors.gray(configFile));
              })
           } else if (answers.option === 'Add') {
             add()
               .then((output) => {
                 console.log(output);
               })
               .catch((err) => {
                 console.log(err);
               })
           } else if (answers.option === 'Remove') {
             remove()
              .then((value) => {
                console.log(value);
              })
           } else if (answers.option === 'Github sync') {
             sync()
              .then((value) => {
                console.log(value);
              })
           }

      });

    }

  })
  .catch((err) => {console.log(err);})
