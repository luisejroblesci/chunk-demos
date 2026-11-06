Source tapes/_settings.tape
Output out/03-tui-new-plan.mp4

Hide
Type "export PATH=$HOME/Documents/Repositories/chunk-cli/dist:$PATH && cd $HOME/Documents/Repositories/chunk-demos && clear"
Enter
Show

Sleep 500ms
Type "chunk watch"
Sleep 400ms
Enter
Sleep 3s

# n = new plan
Type "n"
Sleep 2s
Type "add a dark/white theme for the calculator"
Sleep 1000ms
Enter
Sleep 132s

# Plan is ready: open it
Enter
Sleep 2s

# tab = make the plan the active view
Tab
Sleep 2s

# 2 rows down, then c to add a comment
Down@300ms 2
Sleep 1s
Type "c"
Sleep 1s
Type "make dark theme default"
Sleep 1s
Enter
Sleep 2s

# s = send the comment to the factory
Type "s"

# wait for chunk to answer: "I updated the plan for your comment: ..."
Wait+Screen@5m /I updated the plan for your comment/
Sleep 4s
