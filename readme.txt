=== Nicescrollr ===
Tags: nicescroll, scroll, scrollbar, back to top, scroll to top, frontend, backend
Requires at least: 5.5
Tested up to: 6.2
Requires PHP: 5.6+
Version: 0.9.4
Stable tag: 0.9.4
License: GPLv2 or later
License URI: http://www.gnu.org/licenses/gpl-2.0.html
Author: Demis Patti
Author URI: https://demispatti.dev
Donate link: https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=XLMMS7C62S76Q

== Description ==
Get Nicescroll and a ScrollTop button! I really like InuYaksa's Nicescroll JS plugin. I'm a fan. And I thought there may be others like me who would enjoy using his famous
library with a simple interface. So I came up with this plugin. It is a wrapper for that popular library, which is developed and maintained by <a
href="https://wordpress.org/support/users/inuyaksa/" target="_blank">InuYaksa</a>. You can visit his official Nicescroll homepage <a href="https://www.areaaperta
.com/nicescroll/" target="_blank">here</a>. An overview of the default parameters can be found on <a href="https://github.com/inuyaksa/jquery.nicescroll"
target="_blank">Github</a> at the bottom of the page. This plugin enables you to use the Nicescroll scrollbar on both the frontend and the backend. It is fully customizable, you can tweak and tune every single parameter Nicescroll has to offer! You can style it totally different for both views. It's all up to you!

== Features ==
+ Nicescroll
+ ScrollTop Button
+ Frontend and Backend

== Requirements ==
- PHP 5.6+

== Installation ==
1. Upload the `nicescrollr` folder to your `/wp-content/plugins/` directory.
2. Activate the "Nicescrollr" plugin through the "Plugins" menu in WordPress.
3. You will find its settings page listed in the "settings" section.
3. Go to the plugin settings page and fit it to your needs :-) Have fun!

== Known issues ==
- There may be issues with scrolling, if you are trying to scroll with a pen or the middle mouse button.

== Limitations ==
- Not yet compatible with PHP version 8 and above

== Frequently Asked Questions ==
= Why doesn't it work with my theme? =
Most likely, this is because your theme (or another plugin?) already has the Nicescroll library on board. If that's the case, I advise you to uninstall this plugin again to prevent compatibility issues. Of course, you can always ask your theme developer to implement a function to disable the built-in solution if you like to use this plugin and its Options.

The capability required for being able to customize settings is the following:
* `nicescrollr_edit` - The user can change settings regarding this plugin.

= Can you help me? =
Well, I provide some basic support on this plugin's support page. I check that place once or twice a month, so you may have to be a bit patient.

== Screenshots ==
1. Basic settings
2. Extended settings
3. ScrollTop settings
