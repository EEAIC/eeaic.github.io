---
title: "Install MATLAB on Linux"
date: 2022-06-13 23:38
categories: [Computer Language, MATLAB]
tags: [matlab, troubleshooting, programming language, installation]     # TAG names should always be lowercase
published: true
---

# Installing Process
1. Linux용 MATLAB 설치 압축파일을 [MathWorks](https://kr.mathworks.com/downloads/web_downloads/)에서 다운로드하세요.
2. Matlab 폴더를 생성 후 해당 폴더 안에서 다운로드 받은 파일의 압축을 푸세요.
3. `sudo ./install`를 입력하세요.
4. System password를 입력하세요.
5. 실행되는 프로그램의 지시에 따라 설치를 계속합니다. \
❗프로그램이 실행되 않을 경우 `export DISPLAY=':0.0'`을 입력 후 3번부터 다시 시도해보세요.

# Creating a shortcut for MATLAB on the launcher
1. 패키지를 설치합니다.
    ```bash
    sudo apt-get install matlab-support
    ```

# Troubleshooting
## No Matlab install GUI is displayed
1. `xhost +SI:localuser:root` 를 입력하세요.

## Failed to load module “canberra-gtk-module”
1. 패키지를 설치합니다.
    ```bash
    apt-get install libcanberra-gtk-module
    ```

2. GTK_PATH를 설정합니다.
    ```bash
    export GTK_PATH=/usr/lib/x86_64-linux-gnu/gtk-2.0
    ```

## Can’t install any toolboxes because can’t write to the path
1. Matlab Command Window에서 Matlab이 설치된 위치를 찾습니다.
    ```matlab
    matlabroot
    ```
2. 소유자를 변경합니다.
    ```bash
    chown -R {username}:{/path/to/matlab/root/path}
    ```

## Broken Korean fonts(한글 깨짐)
1. 나눔 폰트를 설치합니다.
    ```bash
    apt install fonts-nanum fonts-nanum-coding fonts-nanum-extra
    ```

# Reference
1. [How do I launch MATLAB on Linux?](https://kr.mathworks.com/matlabcentral/answers/93739-how-do-i-launch-matlab-on-linux)
2. [Installer hang when installing Matlab R2021b as root on Ubuntu 20.04](https://kr.mathworks.com/matlabcentral/answers/1459909-installer-hang-when-installing-matlab-r2021b-as-root-on-ubuntu-20-04#comment_1759029)
3. [canberra-gtk-module 및 pk-gtk-module 메시지 제거하기 - MATLAB & Simulink - MathWorks 한국](https://kr.mathworks.com/help/matlab/matlab_env/remove-canberra-gtk-module-and-pk-gtk-module-messages.html)
4. [Can't install any toolboxes because can't write to /usr/local/MATLAB/R2017](https://ww2.mathworks.cn/matlabcentral/answers/334889-can-t-install-any-toolboxes-because-can-t-write-to-usr-local-matlab-r2017#answer_288226)
5. [리눅스 민트 한글 깨짐 현상을 해결하려면 어떻게 해야 하나요.](https://kr.mathworks.com/matlabcentral/answers/501408-)