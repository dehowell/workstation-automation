#!/bin/bash

function deployOmniFocus {
    OMNIFOCUS_PLUGIN_PATH="$HOME/Library/Mobile Documents/iCloud~com~omnigroup~OmniFocus/Documents/Plug-Ins"
    find omnifocus -name '*.omnifocusjs' -exec cp {} "$OMNIFOCUS_PLUGIN_PATH" \;
}

deployOmniFocus