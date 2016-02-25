#!/bin/bash
#
# Run with: sudo bash <(curl -L https://alekskamko.com/dotfiles.sh)
#

if [ $(/usr/bin/id -u) -ne 0 ]; then
    echo "Please run as root"
    exit 1
fi

os=$(uname)
if echo "$os" | grep -iq "linux"; then
    if ! hash apt-get 2>/dev/null && hash yum 2>/dev/null; then
        sudo ln -s $(which yum) /usr/bin/apt-get
    fi
    sudo apt-get update
    sudo apt-get install git
elif "$os" | grep -iq "darwin"; then
    # TODO
fi

git clone https://github.com/aykamko/dotfiles ~/ayk-dotfiles
pushd ~/ayk-dotfiles
./install
popd

if echo "$os" | grep -iq "linux"; then
    if ! hash apt-get 2>/dev/null && hash yum 2>/dev/null; then
        sudo rm -f /usr/bin/apt-get
    fi
fi
