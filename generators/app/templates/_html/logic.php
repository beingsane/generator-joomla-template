<?php
	defined('_JEXEC') or die;
	
	// variables
	$app		= JFactory::getApplication();
	$doc		= JFactory::getDocument();
	$lang		= JFactory::getLanguage();
	$menu		= $app->getMenu();
	$active 	= $app->getMenu()->getActive();
	$params 	= $app->getParams();
	$pageclass	= $params->get('pageclass_sfx');
	$tpath		= $this->baseurl.'/templates/'.$this->template;
	$params		= $app->getTemplate(true)->params;

	$option   = $app->input->getCmd('option', '');
	$view     = $app->input->getCmd('view', '');
	$layout   = $app->input->getCmd('layout', '');
	$task     = $app->input->getCmd('task', '');
	$itemid   = $app->input->getCmd('Itemid', '');
	$sitename = $app->get('sitename');

	$bodyClass = '';

	$isFrontpage = $menu->getActive() == $menu->getDefault($lang->getTag());
	
	// remove http-equiv
	unset($doc->_metaTags['http-equiv']);
	
	// Unset generator metatag
	$this->setGenerator(false);
	
	// force latest IE & chrome frame
	$doc->setMetadata('X-UA-Compatible', 'IE=edge', true);
	
	// set viewport metatag
	$doc->setMetadata('viewport', 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no');
	
	// set global title (without page title) only if frontpage
	if( $isFrontpage ) {
		$doc->setTitle( $sitename );
		$bodyClass = 'frontpage';
	}
	
	// Remove all unused scripts
	//unset($this->_scripts[JURI::root(true).'/media/jui/js/jquery.min.js']);
	//unset($this->_scripts[JURI::root(true).'/media/jui/js/jquery-noconflict.js']);
	//unset($this->_scripts[JURI::root(true).'/media/jui/js/jquery-migrate.min.js']);
	//unset($this->_scripts[JURI::root(true).'/media/system/js/caption.js']);
	unset($this->_scripts[JURI::root(true).'/media/jui/js/bootstrap.min.js']);
	//unset($this->_script['text/javascript']);
	
	// add Stylesheet
	$doc->addStyleSheet($tpath . '/css/main.min.css');
	
	// add Script
	$doc->addScript($tpath . '/js/main.min.js');

	$bodyClass .= ' ' . $option . ' view-' . $view;
	$bodyClass .= ($layout ? ' layout-' . $layout : ' no-layout');
	$bodyClass .= ($task ? ' task-' . $task : ' no-task');
	$bodyClass .= ($itemid ? ' itemid-' . $itemid : '');
	$bodyClass .= ($params->get('fluidContainer') ? ' fluid' : '');

	if(!empty($bodyClass)) {
		$bodyClass = ' class="'.$bodyClass.'"';
	}

	if( $this->countModules('left') XOR $this->countModules('right') ) {
		$contentColumn	= 'col-sm-9';
		$leftColumn		= 'col-sm-3';
		$rightColumn	= 'col-sm-3';
	} else
	if( $this->countModules('left') AND $this->countModules('right') ) {
		$contentColumn = 'col-sm-8';
		$leftColumn		= 'col-sm-2';
		$rightColumn	= 'col-sm-2';
	} else {
		$contentColumn = 'col-xs-12';
		$leftColumn		= '';
		$rightColumn	= '';
	}
?>