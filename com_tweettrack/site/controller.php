<?php
/**
 * @copyright  Copyright (C) 2015 KnowledgeArc Ltd. All rights reserved.
 * @license    GNU General Public License version 2 or later; see LICENSE.txt.
 */

defined('_JEXEC') or die;

/**
 * Routing class.
 *
 * @package     TweetTrack.Component
 */

class TweettrackController extends JControllerLegacy
{
	
	function display($tpl = null)
	{

	// set default view if not set
		$input = JFactory::getApplication()->input;
		echo $input->set('view', $input->getCmd('view', 'search'));
		
		// Display the view
		parent::display($tpl);
	}
}
