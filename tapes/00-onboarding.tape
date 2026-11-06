Source tapes/_settings.tape
Output out/00-onboarding.mp4

Hide
Type "export PATH=$HOME/Documents/Repositories/chunk-cli/dist:$PATH && cd $HOME/Documents/Repositories/chunk-demos && rm -rf .chunk.bak && mv .chunk .chunk.bak && clear"
Enter
Show

# chunk factory bootstrap
Sleep 100ms
Type "chunk factory bootstrap"
Sleep 1s
Enter

# select the org (first in the list), then bootstrap runs (~3 min max)
Wait+Screen@30s /Select an organization/
Sleep 2s
Enter
Wait+Screen@3m /Next: chunk factory plan/
Sleep 5s

# restore the repo's own .chunk config that bootstrap replaced
Hide
Type "rm -rf .chunk && mv .chunk.bak .chunk"
Enter
Show
