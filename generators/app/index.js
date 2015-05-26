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
			
			var i, file, files, variables;

			this.destinationRoot( this.props.tpl_name );
			
			files = [
				'css', 'fonts', 'html', 'images', 'js',
				'component.php', 'error.php', 'favicon.ico',
				'index.html', 'index.php', 'offline.php',
				'template_preview.png', 'template_thumbnail.png'
			];
			
			variables = {
				tpl_name:		this.props.tpl_name,
				tpl_name_upper:	string.underscored(this.props.tpl_name).toUpperCase(),
				tpl_version:	this.props.tpl_version,
				tpl_date:		now.getFullYear() + '-' + (now.getMonth()+1) + '-' + now.getDate()
			};
		
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
			
			this.fs.copyTpl(
				this.templatePath('_templateDetails.xml'),
				this.destinationPath('templateDetails.xml'),
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
			
			for(i = 0; i < files.length; i++) {
				file = files[i];
				this.fs.copyTpl( this.templatePath('_' + file), this.destinationPath(file) );
			}
			
			this.fs.copyTpl(
				this.templatePath('_templateDetails.xml'),
				this.destinationPath('templateDetails.xml'),
				{file_list: '<file></file>'}
			);
		
		},

		projectfiles: function () {
			this.fs.copy(
				this.templatePath('_editorconfig'),
				this.destinationPath('.editorconfig')
			);
			this.fs.copy(
				this.templatePath('_jshintrc'),
				this.destinationPath('.jshintrc')
			);
		}
	
	},

	/*install: function () {
		this.installDependencies();
	}*/
	
});
