# 2021 WebProject

Git 간략 설명 - 자세한 건 카톡으로 보내준 유튜브 영상 참조 
(작업하는 폴더 ex) WebP에 git이라는 디렉터리가 있다는 가정, 터미널 이용)

크게 3가지 영역으로 나뉨
1) working directory - untracked / tracked
2) staging area
3) .git directory

제일 처음 git 디렉터리에 a. txt, b.txt, c.txt 파일을 만들게 되면, (1)에 untracked 상태
git add a.txt => a.txt는 staging area 상태
==> git이 a.txt 파일이 존재한다는 사실을 알게됨! BUT, b.txt, c.txt 파일은 add를 해주지 않았기 때문에 존재하는지 모르는 상태!
git add *.txt => git 디렉터리 안에서 만들어진 모든 파일이 add => b.txt, c.txt도 staging 상태가 됨
이때, a.txt 파일을 수정함 => a.txt는 working directory의 tracked로 감.

정리를 해보자면, (모든 파일은 git 디렉터리 안에서 만들어졌다는 가정 하에)
git add를 해주지 않은 파일들 
: working directory의 untracked
git add를 한 번이라도 해준 파일
- add 해주고 수정이 없었던 파일들 : staging area => commit 할 준비 완료!!
- add 해주고 수정됐지만, 수정된 걸 update하지 않은 파일 : working directory의 tracked 
  만약, a.txt를 수정하고, 수정된 상태를 업로드하고 싶으면 다시 git add a.txt 하면 staging area로 감! 즉, 수정된 파일을 커밋할 수 있다는 뜻

보통 git 명령어 쓰는 순서
(git 디렉터리에 a.txt 파일을 새로 만들었다고 가정)
1. git add a.txt
2. git commit -m "a에서 ㅇㅇ내용 추가함"

==========================================================

Git 명령어  
git add : working directory에 있는 파일을 staging area로 옮길 때
git status : git과 관련된 파일들의 상태를 알 수 있음 (어디에 위치하는지)
git status -s : A 파일명 : (staging area) / ?? 파일명 : (working directory) / AM 파일명 (staging area에 존재하지만, 파일이 수정된 상태 => 이땐 다시 add 해야겠쥬?)
git rm --cached 파일명 : staging area -> working directory의 untracked 상태로 돌아감
git diff : 수정된 내용을 구분해서 볼 수 있는 명령어
git commit : staging area -> git 리포지토리로 이동시켜줌!! (github에서 파일 commit하는 것과 동일한 개념!)
git commit -m "내용용용용" : commit과 함께 메세지 업로드 (메세지 내용은 " " 안에)
git commit -al : a(all)m(message) 즉, working directory, staging area에 있는 것을 다 commit 할 때 (add하기 귀찮을 때 => 되도록 안 쓰는 게 나을듯..)
git checkout <브랜치이름> : 브랜치이름으로 브랜치 이동
git push : 커밋을 원격 서버에 업로드 (자신이 수정한 파일들을 github에 업로드 될 것)
git pull : 원격 저장소의 변경 내용이 현재 디렉터리에 가져와 병합됨 (push와 반대 개념)
(NOT 명령어, 파일명) gitignore : git, github에 올리고 싶지 않은 파일명을 저장해놓는 파일

++ 브랜치개념도 공부하자! main으로 모두 commit 한다면, 코드가 꼬였을 때 문제 찾기도 힘듬.. 각자 브랜치 만들고 해야할 듯 (저도 아직 잘 몰라서 공부해야합니다ㅏ)
