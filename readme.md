这是学习前端时做的案例与心得分析体会。

- 如果遇到10054错误：

  ```go
  fatal: unable to access 'https://github.com/duyidao/practise.git/': OpenSSL SSL_read: Connection was reset, errno 10054
  ```

  解决方法：

  ```SAS
  git config --global http.sslVerify "false"
  ```

- 如果遇到10053错误：

  解决方法：

  ```go
  //取消http代理
  git config --global --unset http.proxy
  //取消https代理 
  git config --global --unset https.proxy
  ```

