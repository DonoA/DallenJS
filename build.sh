#!/bin/bash

( cd server ; npm install )

( cd client ; npm install )
( cd client ; npm run build )
