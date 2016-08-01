--TODO: tighten this up ...
module Driveby exposing (..)
--main


import Html.App as App
import Html exposing (..)
import Task


driveby tests update subscriptions checker =
  App.program
    { init = (Model tests, asFx Start )
    , view = view
    , update = update
    , subscriptions = subscriptions
    }

type alias Step =
  { id: String
  , request: Request
  , executed: Bool
  }


--TODO: make command: Command
type alias Request =
  { command: String
  , args: List String
  }


--TODO: consider Id as a type and give it the bits it needs ...
type alias Response =
  { id: String
  , failures: List String
  }


--TODO: fix all this naming too
type Msg
  = Start
  | Suggest Response
  | Exit String
--TODO: add a Finish (and do the reporting bit here ...)


--TODO: make script: List Command
type alias Model =
  { commands : List Step
  }


view : Model -> Html Msg
view model =
  div [ ] [ ]


asFx : msg -> Cmd msg
asFx msg =
  Task.perform (\_ -> Debug.crash "This failure cannot happen.") identity (Task.succeed msg)
