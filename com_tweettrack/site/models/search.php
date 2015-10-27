<?php
/**
 * @copyright  Copyright (C) 2015 KnowledgeArc Ltd. All rights reserved.
 * @license    GNU General Public License version 2 or later; see LICENSE.txt.
 */

defined('_JEXEC') or die;

/**
 * Models the search and results.
 *
 * @package     TweetTrack.Component
 * @subpackage  Model
 */
class TweetTrackModelSearch extends JModelLegacy
{
    public function __construct($config = array())
    {
        parent::__construct($config);

        $this->typeAlias = $this->get('option').'.'.$this->getName();
    }
}
