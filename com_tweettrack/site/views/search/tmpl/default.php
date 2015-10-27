<?php
/**
 * @copyright  Copyright (C) 2015 KnowledgeArc Ltd. All rights reserved.
 * @license    GNU General Public License version 2 or later; see LICENSE.txt.
 */

defined('_JEXEC') or die;

/**
 * Results default view.
 */
?>
<div class="container-fluid">
	<div class="row">
		<div class="col-md-2"></div>
			<div class="col-md-8 main">
			
				<?php 
			      	//if ( isset($plzSignin) ) {
			      ?>
			      <div class="col-md-12" style="margin-top:50px;">
			        <a href="/joomla_oauth/index.php/component/slogin/provider/twitter/auth" class="btn btn-primary btn-block"><i class="glyphicon glyphicon-twitter"></i> Sign In With Twitter</a>
			      </div>
			      <?php 
			      	//}
			      ?>
		
			</div>
		<div class="col-md-2"></div>
	</div><!-- End main row -->
</div><!-- End main container -->
	