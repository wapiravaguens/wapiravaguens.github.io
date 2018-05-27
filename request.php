<?php
require_once('TwitterAPIExchange.php');
/** Set access tokens here - see: https://dev.twitter.com/apps/ **/
$settings = array(
    'oauth_access_token' => "618581353-yvkEyifknoUQN5QVWBU1DLaqNXmLK4apv03T6Q34",
    'oauth_access_token_secret' => "diooN9KIj37ZliZ01OscrfXrAr1NDgIUSvG9TXzdSdMfT",
    'consumer_key' => "DvHST8qILCkHTqtM6QBUaoQjB",
    'consumer_secret' => "xn7VGkKkgOp0h6UvozLnsnBi0PgJO2CuwlcA3U2XIHz6FzbtsX"
);
$url = 'https://api.twitter.com/1.1/statuses/user_timeline.json';
$getfield = '?screen_name='.$_GET['username'].'&count=200&trim_user=1&exclude_replies=1&include_rts=0&tweet_mode=extended';
//$getfield = '?screen_name=EnriquePenalosa&count=200&trim_user=1&exclude_replies=1&include_rts=0&tweet_mode=extended';
$requestMethod = 'GET';
$twitter = new TwitterAPIExchange($settings);
echo json_encode($twitter->setGetfield($getfield)
             ->buildOauth($url, $requestMethod)
             ->performRequest());
?>