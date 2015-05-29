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
	$doc->setMetadata('X-UA-Compatible', 'IE=edge,chrome=1', true);
	
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
	//unset($this->_scripts[JURI::root(true).'/media/jui/js/bootstrap.min.js']);
	//unset($this->_script['text/javascript']);
	
	
	// add Stylesheet
	$doc->addStyleSheet($tpath . '/css/main.min.css');
	$doc->addStyleDeclaration('body{background-color:' . $params->get('background_color') . '}');
	
	// add Script
	JHtml::_('jquery.framework');
	$doc->addScript($tpath . '/js/main.min.js');

	$bodyClass .= ' ' . $option . ' view-' . $view;
	$bodyClass .= ($layout ? ' layout-' . $layout : ' no-layout');
	$bodyClass .= ($task ? ' task-' . $task : ' no-task');
	$bodyClass .= ($itemid ? ' itemid-' . $itemid : '');

	if(!empty($bodyClass)) {
		$bodyClass = ' class="'.$bodyClass.'"';
	}
?>