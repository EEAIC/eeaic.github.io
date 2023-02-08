---
title: "Symbolic link in Linux"
date: 2022-09-28 13:20
category: [Linux]
tags: [linux, command, symbolic link]
math: false
published: true
---

AI를 연구하기 위해 다양한 실험을 진행하다보면, 동일한 dataset에 대해서 다양한 프로젝트에서 학습하고 테스트하는 경우가 많습니다. 여러 프로젝트는 각자 독립적인 디렉토리 구조를 가지고 있습니다. 하지만, 매번 모든 폴더에 대해 데이터를 옮기거나 복사할 수는 없습니다. 이를 편리하게 진행하기 위해 다른 위치의 폴더를 원하는 위치로 연결하는 방법인 symbolic link에 대해 설명하겠습니다.

Linux의 명령어를 사용하여 symbolic link를 생성 및 제거할 수 있습니다. Linux에서 사용할 수 있는 symbolic link에는 두 가지 유형이 있습니다.

Hard link
: 기존 파일에 대한 별칭으로 이해하면 됩니다. 즉, 원본 파일의 inode[^inode] 위치를 가리킵니다. 이 때문에 사실상 원본 파일과 hard link 파일을 구별할 수 없습니다. 하나의 파일에 대해 하나 이상의 hard link를 만들 수 있습니다. 하지만, 다른 파일 시스템 또는 파티션에 저장된 디렉토리 또는 파일에 대해서는 hard link를 만들 수 없습니다.

Soft link
: Windows의 바로 가기와 동일합니다. 다른 위치에 있는 파일이나 디렉토리를 가리키는 데 사용됩니다.

일반적으로 AI 개발을 위한 서버는 연산을 담당하는 서버와 데이터를 저장하는 파일 서버로 나뉘어져 있습니다. Hard link는 다른 파일 시스템의 데이터와 디렉토리에 대해서 생성이 불가능하기 때문에 soft link를 사용하는 것을 추천합니다.

# Creating a symbolic link to file

```shell
ln -s source_file symbolic_link
```

위의 명령에서 `source file`은 연결할 Linux 시스템의 파일 이름입니다. `symbolic_link`는 생성할 symbolic link의 이름입니다. Hard link를 생성할 때에는 `-s` 옵션을 빼고 사용하면 됩니다. 

# Removing symbolic link

```shell
unlink symbolic_link
```

```shell
rm symbolic_link
```

생성된 symbolic link를 제거하기 위해서는 `unlink` 혹은 `rm` 명령을 사용하면 됩니다.

# Overwriting symbolic link

```shell
ln -sf source_file symbolic_link
```

동일한 이름의 symbolic link가 있는 경우에는 `-f` 옵션을 사용하면  덮어쓰기하여 생성할 수 있습니다.

# Reference

1. [Symbolic Link in Linux](https://linuxhint.com/symbolic-link-linux/)

# Footnote

[^inode]: Wikipedia contributors. (2022, June 14). Inode. [https://en.wikipedia.org/wiki/Inode](https://en.wikipedia.org/wiki/Inode)