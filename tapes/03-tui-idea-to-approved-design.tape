Source tapes/_settings.tape
Output out/03-tui-idea-to-approved-design.mp4

Hide
Type "export PATH=$HOME/Documents/Repositories/chunk-cli/dist:$PATH && cd $HOME/Documents/Repositories/chunk-demos && clear"
Enter
Show

Sleep 500ms
Type "chunk watch"
Sleep 200ms
Enter
Sleep 2s

# n = new plan
Type "n"
Sleep 1s
Type "create a vanilla html with hello world in it"
Sleep 1s
Enter

# wait until chunk finishes creating the plan
Wait+Screen@60s /Now: Review plan|Next: you approve/
Sleep 2s

# tab = switch to the plan (right pane)
Tab
Sleep 1s

# c = comment
Type "c"
Sleep 1s
Type "hello world in red"
Enter
Sleep 1s

# s = save/send the comment
Type "s"

# wait for chunk to address the comment
Wait+Screen@60s /(updated|changed) the plan/
Sleep 4s

# wait for the plan review to pass, so the design can be approved
Wait+Screen@3m /Next: you approve the design/
Sleep 2s

# ctrl+s = approve the design, then y to confirm
Ctrl+S
Sleep 2s
Type "y"
Sleep 2s
