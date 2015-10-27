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
class TweetTrackRouter extends JComponentRouterBase
{
    /**
     * Build the route for the Tweet Track component
     *
     * @param   array  &$query  An array of URL arguments
     *
     * @return  array  The URL arguments to use to assemble the subsequent URL.
     */
    public function build(&$query)
    {

    }

    /**
     * Parse the segments of a URL.
     *
     * @param   array  &$segments  The segments of the URL to parse.
     *
     * @return  array  The URL attributes to be used by the application.
     */
    public function parse(&$segments)
    {

    }
}

/**
 * Tweet Track router functions
 *
 * These functions are proxys for the new router interface
 * for old SEF extensions.
 *
 * @deprecated  4.0  Use Class based routers instead
 */
function TweetTrackBuildRoute(&$query)
{
    $router = new TweetTrackRouter;

    return $router->build($query);
}

function TweetTrackParseRoute($segments)
{
    $router = new TweetTrackRouter;

    return $router->parse($segments);
}
