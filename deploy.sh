#!/bin/bash

read -r -p "Environment: " input

cd _deployment/$input
./deploy.sh
