<?php
/**
 * @copyright  Copyright (C) 2015 KnowledgeArc Ltd. All rights reserved.
 * @license    GNU General Public License version 2 or later; see LICENSE.txt.
 */

defined('_JEXEC') or die;

/**
 * Displays search and results.
 *
 * @package     TweetTrack.Component
 * @subpackage  View
 */
class TweetTrackViewSearch extends JViewLegacy
{
    /**
     * Display the view
     *
     * @param  string  $tpl
     */
    public function display($tpl = null)
    {
		// Display the view
		parent::display($tpl);
		
		// Set the document
		$this->loadScripts();
    }
	
	
	/**	
	* Method to set up the document properties	
	*
	* @return void	
	*/
	protected function loadScripts()
	{
		$document = JFactory::getDocument();
		
		$document->addStyleSheet(JUri::root().'media/com_tweettrack/bootstrap/css/bootstrap.min.css');		
		$document->addStyleSheet(JUri::root().'media/com_tweettrack/css/custom.css');
		$document->addStyleSheet(JUri::root().'media/com_tweettrack/css/chapLL/timeline.css');

		$document->addScript(JUri::root().'media/com_tweettrack/bootstrap/js/bootstrap.min.js');
		$document->addScript(JUri::root().'media/com_tweettrack/js/custom.js');
		$document->addScript(JUri::root().'media/com_tweettrack/js/chapLL/timeline-min.js');
		
	}
	
}
