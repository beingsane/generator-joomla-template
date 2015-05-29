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
	
		<div class="scaffold">

			<div><?php echo JText::_('TPL_<%= tpl_name_upper %>_BACKGROUND_COLOR_LABEL'); ?>: <?php echo $params->get('background_color'); ?></div>
			
			<div>
				<a href="<?php echo $this->baseurl; ?>" title="<?php echo $app->get('sitename'); ?>">
					<?php echo $app->get('sitename'); ?>
				</a>
			</div>
			
			<div class="floor">
				<?php if($this->countModules('top')) : ?>
				<div id="modules-top" class="room-12">
					<jdoc:include type="modules" name="top" style="none" />
				</div>
				<?php endif; ?>
			</div>
				
			<div class="floor">
				<?php if($this->countModules('left')) : ?>
				<div id="modules-left" class="room-12">
					<jdoc:include type="modules" name="left" style="html5" />
				</div>
				<?php endif; ?>
				
				<div id="modules-left" class="room-12">
					<jdoc:include type="component" />
				</div>
				
				<?php if($this->countModules('right')) : ?>
				<div id="modules-right" class="room-12">
					<jdoc:include type="modules" name="right" style="html5" />
				</div>
				<?php endif; ?>
			</div>
				
			<div class="floor">
				<?php if($this->countModules('bottom')) : ?>
				<div id="modules-bottom" class="room-12">
					<jdoc:include type="modules" name="bottom" style="html5" />
				</div>
				<?php endif; ?>
			</div>

		</div>
		
		<jdoc:include type="modules" name="debug" />
		
	</body>
</html>