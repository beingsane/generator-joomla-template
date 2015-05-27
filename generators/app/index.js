'use strict';
var fs			= require('fs');
var yeoman		= require('yeoman-generator');
var string		= require('underscore.string');
var chalk		= require('chalk');
var yosay		= require('yosay');
var now			= new Date();

module.exports = yeoman.generators.Base.extend({
	
	prompting: function () {
		var done = this.async();

		// Have Yeoman greet the user.
		this.log(yosay('Welcome to the solid ' + chalk.red('JoomlaTemplate') + ' generator!'));

		var prompts = [{
			type: 'text',
			name: 'tpl_name',
			message: 'What is the name of your joomla template?',
			default: 'joomla-template'
		},{
			type: 'text',
			name: 'tpl_version',
			message: 'What is the version of your joomla template?',
			default: '0.0.0'
		}];

		this.prompt(prompts, function (props) {
			this.props = props;
			// To access props later use this.props.someOption;

			done();
		}.bind(this));
	},

	writing: {
		
		app: function () {
			
			var i			= 0,
				file		= '',
				files		= [],
				variables	= [],
				fileList	= [],
				fileString	= [];

			this.destinationRoot( this.props.tpl_name );
			
			fileList = [
				{type: 'folder',	name: 'css'},
				{type: 'folder',	name: 'fonts'},
				{type: 'folder',	name: 'html'},
				{type: 'folder',	name: 'images'},
				{type: 'folder',	name: 'js'},
				{type: 'folder',	name: 'language'},
				{type: 'filename',	name: 'component.php'},
				{type: 'filename',	name: 'error.php'},
				{type: 'filename',	name: 'favicon.ico'},
				{type: 'filename',	name: 'index.html'},
				{type: 'filename',	name: 'index.php'},
				{type: 'filename',	name: 'offline.php'},
				{type: 'filename',	name: 'package.json'},
				{type: 'filename',	name: 'template_preview.png'},
				{type: 'filename',	name: 'template_thumbnail.png'},
				{type: 'filename',	name: 'templateDetails.xml'}
			];
			
			fileList.forEach(function(file) {
				fileString += '\n\t\t<' + file.type + '>' + file.name + '</' + file.type + '>';
			});
			fileString += '\n\t';
			
			variables = {
				tpl_name:		this.props.tpl_name,
				tpl_name_upper:	string.underscored(this.props.tpl_name).toUpperCase(),
				tpl_name_human:	string.humanize(this.props.tpl_name),
				tpl_version:	this.props.tpl_version,
				tpl_date:		now.getFullYear() + '-' + (now.getMonth()+1) + '-' + now.getDate(),
				tpl_files:		fileString
			};
			
			this.fs.copy(
				this.templatePath('_editorconfig'),
				this.destinationPath('.editorconfig')
			);
			
			this.fs.copy(
				this.templatePath('_jshintrc'),
				this.destinationPath('.jshintrc')
			);
		
			this.fs.copyTpl(
				this.templatePath('_package.json'),
				this.destinationPath('package.json'),
				variables
			);
			
			this.fs.copyTpl(
				this.templatePath('_bower.json'),
				this.destinationPath('bower.json'),
				variables
			);
			
			this.fs.copy(
				this.templatePath('_Gruntfile.js'),
				this.destinationPath('Gruntfile.js')
			);
			
			this.fs.copyTpl(
				this.templatePath('_templateDetails.xml'),
				this.destinationPath('templateDetails.xml'),
				variables
			);
			
			this.fs.copyTpl(
				this.templatePath('_index.php'),
				this.destinationPath('index.php'),
				variables
			);
			
			this.fs.copyTpl(
				this.templatePath('_language/en-GB/en-GB.tpl_tpl_name.ini'),
				this.destinationPath('language/en-GB/en-GB.tpl_' + variables.tpl_name + '.ini'),
				variables
			);
			
			this.fs.copyTpl(
				this.templatePath('_language/en-GB/en-GB.tpl_tpl_name.sys.ini'),
				this.destinationPath('language/en-GB/en-GB.tpl_' + variables.tpl_name + '.sys.ini'),
				variables
			);
			
			files = [
				'css', 'fonts', 'html', 'images', 'js', 'source',
				'component.php', 'error.php', 'favicon.ico',
				'index.html', 'offline.php',
				'template_preview.png', 'template_thumbnail.png'
			];
			
			for(; i < files.length; i++) {
				file = files[i];
				this.fs.copyTpl( this.templatePath('_' + file), this.destinationPath(file) );
			}
		
		},
	
	},

	install: function () {
		var THIS = this;
		THIS.installDependencies({
			callback: function(){
				THIS.spawnCommand('grunt');
			}
		});
	}
	
});
