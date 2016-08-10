port module DrivebyTest exposing (requests)


import Driveby exposing (..)
import Driveby.Runner exposing (..)


port requests : Request -> Cmd msg
port responses : (Response -> msg) -> Sub msg


main =
   run allTests requests responses


--TODO: stubs ..
--content:
--{
--  "name":"Reservations System",
--  "alias":"res",
--  "version":"10001",
--  "checks":[{
--    "url":"reservations/check/reservation/confirmed/@pnr"
--  }],
--  "actions":[]
--}

--TODO: these tests should live in shoreditch-chrome-ui project

allTests : Suite
allTests =
  suite "All" [test1, test2, test3]
--  suite "All" [test1, test2, test3, test4]


test1 : Script
test1 =
  script "Auto loads metadata on visiting"
    [ serve "../shoreditch-ui-chrome/chrome"
    , stub "/reservations/metadata" "meh"
    , gotoLocal "/elm.html"
    , assert <| textEquals "messageList" "Auto Loading Metadata ..."
    --TODO: I should work when messaging fixed
--    , textContains "messageList" "LoadAllMetaDataResponse ([{ url = "
    --TODO: probably want to assert the number of checks and actions here ...
    ]


test2 : Script
test2 =
  script "Loads metadata on manual refresh"
    [ serve "../shoreditch-ui-chrome/chrome"
    , stub "/reservations/metadata" "meh"
    , gotoLocal "/elm.html"
    , assert <| textEquals "messageList" "Auto Loading Metadata ..."
    --TODO: I should work when messaging fixed
--    , textContains "messageList" "LoadAllMetaDataResponse ([{ url = "
    , click "refreshButton"
    , assert <| textContains "messageList" "Manual Loading Metadata"
    --TODO: I should work when messaging fixed
--    , textContains "messageList" "ManualMetaDataRefresh"
    ]


test3 : Script
test3 =
  script "Detects configuration changes"
    [ serve "../shoreditch-ui-chrome/chrome"
    , stub "/reservations/metadata" "meh"
    , gotoLocal "/elm.html"
    , assert <| textEquals "messageList" "Auto Loading Metadata ..."
    --TODO: I should work when messaging fixed
--    , textContains "messageList" "LoadAllMetaDataResponse ([{ url = "
    , enter "configuration" "1"
    --TODO: I should work when messaging fixed
--    , textContains "messageList" "ConfigurationChanged \"1"
    , assert <| textContains "messageList" "Config changed"
    , enter "configuration" "2"
    --TODO: I should work when messaging fixed
--    , textContains "messageList" "ConfigurationChanged \"12"
    , assert <| textContains "messageList" "Config changed"
    ]


--TODO: the duff path causes the whole thing to freeze .. why?
test4 : Script
test4 =
  script "Fails causing build to hang"
    [ serve "../shoreditch-ui-chrome/chrome"
    , stub "/reservations/metadata" "meh"
    , gotoLocal "/elm2.html"
    , assert <| textEquals "messageList" "Auto Loading Metadata ..."
    ]


--TODO: add missing test for a stubbed Check in metadata
--TODO: add missing test for a stubbed Action in metadata
--TODO: add missing test for a stubbed Check with args in metadata
--TODO: add missing test for a stubbed Action with args in metadata