steamid=76561198840084678

login_url_params = [
'openid.ns' => 'http://specs.openid.net/auth/2.0',
'openid.mode' => 'checkid_setup',
'openid.return_to' => 'http://localhost/login-with-steam-yt/process-openId.php',
'openid.realm' => (!empty($_SERVER['HTTPS']) ? 'https' : 'http').'://'.$\_SERVER['HTTP_HOST'],
'openid.identity' => 'http://specs.openid.net/auth/2.0/identifier_select',
'openid.claimed_id' => 'http://specs.openid.net/auth/2.0/identifier_select',
];

https://steamcommunity.com/openid/login?openid.ns=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0&openid.mode=checkid_setup&openid.return_to=http%3A%2F%2Flocalhost%3A3000&openid.realm=http%3A%2F%2Flocalhost&openid.identity=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0%2Fidentifier_select&openid.claimed_id=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0%2Fidentifier_select

$accessToken = 'EU7E7tOO7iyEHAAEFFNvpRcbZIeiw7bqsk'

https://json-generator.com/

$headers = @{
Authorization = "Bearer $accessToken"
}

Invoke-WebRequest -Uri 'https://us.battle.net/oauth/userinfo' -Headers $headers

curl -X POST https://oauth.battle.net/token
-u <380ae6410bb942e1963f542472a2b29f>:<n1Bn4DbP226nl0ko7smYrJ82ZoUPGMES>
-d redirect_uri=http://localhost:3001/home
-d scope=wow.profile
-d grant_type=authorization_code
-d code=EUL4SLW0F7BFBCO58VXVY3UWXVSAWHWXOI

$clientId = "380ae6410bb942e1963f542472a2b29f"
$clientSecret = "n1Bn4DbP226nl0ko7smYrJ82ZoUPGMES"
$redirectUri = "http://localhost:3001/home"
$authorizationCode = "EUL4SLW0F7BFBCO58VXVY3UWXVSAWHWXOI"
$scope = "openid"

$headers = @{
    Authorization = "Basic " + [Convert]::ToBase64String([Text.Encoding]::ASCII.GetBytes("$clientId:$clientSecret"))
}

$body = @{
redirect_uri = $redirectUri
grant_type = "authorization_code"
code = $authorizationCode
scope = $scope
}

$response = Invoke-RestMethod -Uri "https://us.battle.net/oauth/token" -Method POST -Headers $headers -Body $body
$response

https://oauth.battle.net/oauth/authorize?client_id=380ae6410bb942e1963f542472a2b29f&redirect_uri=http://localhost:3001/home&response_type=code&scope=wow.profile&state=asd

https://eu.battle.net/oauth/authorize?client_id=380ae6410bb942e1963f542472a2b29f&redirect_uri=http://localhost:3001/home&scope=wow.profile%20sc2.profile&state=login&response_type=code

https://www.epicgames.com/id/authorize?client_id=xyza7891Xar0YMfocbJPxUiRiQaUJatU&redirect_uri=http://localhost:3001/home&response_type=code&scope=basic_profile%20friends_list%20presence%20country

$headers = @{
"Authorization" = "Bearer EUVGHQI40cWgGwuqyITH3iRoKo15JW8hn7"
}

Invoke-RestMethod -Uri "https://oauth.battle.net/userinfo" -Headers $headers

const client_id = 'xyza7891Xar0YMfocbJPxUiRiQaUJatU';
const client_secret = 'rMnBMNcWQLG0Plt4TLq5aSnWFHpnRqsKkOsxJTdMDsY';

const credentials = `${client_id}:${client_secret}`;
const encoded_credentials = btoa(credentials);

console.log(encoded_credentials);
