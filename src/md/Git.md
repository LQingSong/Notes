## 有时候拉取不下来的时候

git config --global http.sslVerify "false"

如果上面的还是不行，再试试下面的

git config --global --unset http.proxy

git config --global --unset https.proxy
