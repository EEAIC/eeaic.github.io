---
title: "[Troubleshooting] A file name cannot contain any of the following characters"
date: 2023-01-25 16:45
category: [Windows]
tags: [windows, troubleshooting, unicode]
math: false
published: false
img_path: "/assets/img/posts/2023-01-25-Windows_filename"
---

Windows에서 파일을 일부 문자를 포함해서 저장하려고 시도하면 아래와 같은 이유로 저장할 수 없습니다.

![Figure x: 파일 이름에는 다음 문자를 사용할 수 없습니다.](파일_이름에는_다음_문자를_사용할_수_없습니다.png){: .w-50}
*Figure 1: 파일 이름 입력시 사용할 수 없는 문자를 입력하면 뜨는 경고창*

# Troubleshooting

`\ / : * ? " < > |`를 사용하는 것은 불가능하므로 이와 유사한 문자를 찾아 사용해야 합니다. 여기서는 두가지 방법을 소개합니다.

1. [Unicode Character Table](https://unicode-table.com) 혹은 다른 여러 유니코드 사이트에서 사용불가 문자와 비슷한 문자를 찾을 수 있습니다.

    |사용불가 문자|유사한 문자|유니코드
    |:-----------:|:----------:|:-------:
    |/ |∕|U+2215
    |: |꞉|U+A789
    |*|＊<br> ∗|U+FF0A <br> U+2217
    |? |？|U+FF1F
    |" "|“ ”|U+201C U+201D
    |< |＜|U+FF1C
    |\>|＞|U+FF1E
    |\||⏐|U+23D0

2. 한글 ㄱ을 누른 뒤 한자키를 눌러 뜨는 창에서 사용불가 문자와 비슷한 문자를 찾을 수 있습니다.

![Figure x: ㄱ+한자키](ㄱ+한자키.png){: .w-50}
*Figure 2: ㄱ과 한자키를 누르면 뜨는 창*

# Reference

1. [unix - How to get a file in Windows with a colon in the filename? - Stack Overflow](https://stackoverflow.com/questions/10386344/how-to-get-a-file-in-windows-with-a-colon-in-the-filename)