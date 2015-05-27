<?php
	defined('_JEXEC') or die;
	require_once(JPATH_THEMES.'/'.$this->template.'/html/logic.php');
?>
<!DOCTYPE html>
<html lang="<?php echo $this->language; ?>" dir="<?php echo $this->direction; ?>">
	<head>
		<meta charset="utf-8">
		<jdoc:include type="head" />
	</head>
	<body<?php echo $bodyClass; ?>>
	
		<div id="wrapper">
		
			<nav class="navbar navbar-default">
				<div class="container">
					<div class="navbar-header">
						<button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#<%= tpl_name %>-navbar-collapse">
							<span class="sr-only"><?php echo JText::_('TPL_<%= tpl_name_upper %>_TOGGLE_NAVIGATION'); ?></span>
							<span class="icon-bar"></span>
							<span class="icon-bar"></span>
							<span class="icon-bar"></span>
						</button>
						<a class="navbar-brand" href="<?php echo $this->baseurl; ?>" title="<?php echo $app->get('sitename'); ?>"><?php echo $app->get('sitename'); ?></a>
					</div>

					<div class="collapse navbar-collapse" id="<%= tpl_name %>-navbar-collapse">
						<jdoc:include type="modules" name="top" />
					</div>
				</div>
			</nav>
			
			<div id="content" class="container">
				<div class="row">
					<?php if($this->countModules('left')) : ?>
					<aside id="sidebar-left" class="<?php echo $leftColumn; ?>">
						<jdoc:include type="modules" name="left" />
					</aside>
					<?php endif; ?>
					<main id="content-inner" class="<?php echo $contentColumn; ?>">
						<jdoc:include type="component" />
						<jdoc:include type="modules" name="debug" style="none" />
					</main>
					<?php if($this->countModules('right')) : ?>
					<aside id="sidebar-right" class="<?php echo $rightColumn; ?>">
						<jdoc:include type="modules" name="right" />
					</aside>
					<?php endif; ?>
				</div>
			</div>
			
		</div>
	</body>
</html>