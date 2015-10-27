<?php
/**
 * A script for intercepting calls to this component and handling them appropriately.
 *
 * @copyright  Copyright (C) 2015 KnowledgeArc Ltd. All rights reserved.
 * @license    GNU General Public License version 2 or later; see LICENSE.txt.
 */

defined('_JEXEC') or die();

JLoader::registerNamespace('TweetTrack', JPATH_PLATFORM);

$controller = JControllerLegacy::getInstance('TweetTrack');
$controller->execute(JFactory::getApplication()->input->get('task'));
$controller->redirect();
