# GitHub 저장소 미러링(백업) 설정 매뉴얼

이 문서는 하나의 로컬 Git 프로젝트를 사용하여 두 개의 다른 GitHub 원격 저장소에 코드를 동시에 푸시(Push)하는 방법을 안내합니다. 주 저장소와 백업 저장소를 동기화하여 코드를 안전하게 보관할 수 있습니다.

---

### 사전 준비

1.  **로컬 프로젝트 폴더**: Git으로 버전 관리가 되고 있는 프로젝트 폴더.
2.  **주(Primary) GitHub 저장소**: 이미 `git push`를 통해 코드를 올리고 있는 메인 저장소. (이 매뉴얼에서는 이 저장소의 리모트 이름을 `origin`으로 가정합니다.)

---

### 1단계: 백업용 GitHub 저장소 생성

먼저 코드를 백업할 새로운 GitHub 저장소를 생성해야 합니다.

1.  [GitHub](https://github.com/new)에 접속하여 새로운 저장소를 생성합니다.
2.  **저장소 이름(Repository name)** 을 입력합니다. (예: `my-project-backup`)
3.  **중요**: 저장소를 **비공개(Private)** 로 설정하는 것을 권장합니다.
4.  **중요**: `README` 파일, `.gitignore`, 라이선스를 **추가하지 않고** 완전히 빈 저장소로 만듭니다. (첫 푸시 시 충돌을 방지하기 위함입니다.)
5.  `Create repository` 버튼을 클릭하여 저장소를 생성합니다.
6.  생성된 저장소 페이지에서 HTTPS 또는 SSH 주소(URL)를 복사합니다. (예: `https://github.com/내계정/my-project-backup.git`)

### 2단계: 로컬 프로젝트에 백업 저장소 연결

이제 로컬 프로젝트 폴더에서 터미널을 열고, 방금 생성한 백업 저장소를 새로운 '리모트(remote)'로 추가합니다.

1.  터미널에서 다음 명령어를 입력하여 새로운 리모트를 추가합니다. 리모트 이름은 `backup` 등 직관적인 이름으로 지정하는 것이 좋습니다.

    ```bash
    git remote add backup <1단계에서_복사한_백업_저장소_URL>
    ```

    **예시:**
    ```bash
    git remote add backup https://github.com/내계정/my-project-backup.git
    ```

2.  아래 명령어로 리모트가 잘 추가되었는지 확인합니다.

    ```bash
    git remote -v
    ```

3.  결과는 아래와 같이 `origin`과 `backup` 두 개의 리모트를 보여줘야 합니다.

    ```
    origin    https://github.com/내계정/my-project.git (fetch)
    origin    https://github.com/내계정/my-project.git (push)
    backup    https://github.com/내계정/my-project-backup.git (fetch)
    backup    https://github.com/내계정/my-project-backup.git (push)
    ```

### 3단계: 두 저장소에 코드 푸시하기

이제 코드를 두 저장소에 모두 푸시할 수 있습니다. 두 가지 방법이 있습니다.

#### 방법 1: 개별적으로 푸시하기 (수동 방식)

가장 간단하고 명확한 방법입니다. 주 저장소와 백업 저장소에 각각 푸시 명령을 실행합니다.

```bash
# 1. 주 저장소(origin)에 푸시
git push origin main

# 2. 백업 저장소(backup)에 푸시
git push backup main
```

이 방법은 푸시할 때마다 두 번의 명령을 입력해야 하지만, 어떤 저장소에 푸시하는지 명확하게 제어할 수 있습니다.

#### 방법 2: 한 번에 푸시하기 (자동 방식)

`git push` 명령 한 번으로 두 저장소에 동시에 푸시하도록 설정할 수 있습니다. 주 저장소(`origin`)의 푸시 URL을 수정하는 방식입니다.

1.  먼저, `origin` 리모트에 백업 저장소의 푸시 URL을 추가합니다.

    ```bash
    git remote set-url --add --push origin <1단계에서_복사한_백업_저장소_URL>
    ```

    **예시:**
    ```bash
    git remote set-url --add --push origin https://github.com/내계정/my-project-backup.git
    ```

2.  `git remote -v` 명령으로 설정을 다시 확인합니다. `origin`의 `push` URL이 두 개가 된 것을 볼 수 있습니다.

    ```
    origin    https://github.com/내계정/my-project.git (fetch)
    origin    https://github.com/내계정/my-project.git (push)  <- 기존 푸시 URL
    origin    https://github.com/내계정/my-project-backup.git (push)  <- 새로 추가된 푸시 URL
    backup    https://github.com/내계정/my-project-backup.git (fetch)
    backup    https://github.com/내계정/my-project-backup.git (push)
    ```

3.  이제부터는 아래의 명령 한 번만 실행하면 `origin`으로 설정된 두 개의 저장소에 **동시에** 코드가 푸시됩니다.

    ```bash
    git push origin main
    ```

### 4단계: 코드 가져오기 (Pull / Fetch)

- 코드를 가져올 때는 혼동을 피하기 위해 항상 **주 저장소(`origin`)** 에서만 `pull` 또는 `fetch`를 실행하는 것을 원칙으로 합니다.

  ```bash
  git pull origin main
  ```

- 백업 저장소는 쓰기 전용(push-only)으로 간주하고, 그곳에서 코드를 가져오지 않는 것이 좋습니다. 이렇게 해야 코드의 "단일 진실 공급원(Single Source of Truth)"이 주 저장소로 유지됩니다.

---

이제 위 설정에 따라 코드를 푸시할 때마다 주 저장소와 백업 저장소에 동일한 내용이 반영되어 안전하게 코드를 관리할 수 있습니다.