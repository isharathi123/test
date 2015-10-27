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
		
		// Assign data to the view
		$this->msg = 'TweetTrack administrator';
 
		// Display the view
		parent::display($tpl);

    }
}
