### 1. install nodejs
>curl -sL https://deb.nodesource.com/setup_6.x | sudo -E bash -
>sudo apt-get install -y nodejs

### 2. install git
>sudo apt-get install git-all

### 3. generate a  ssh
>ssh-keygen -t rsa -b 4096 -C "jinshiyi588@163.com"
>passphrase:　xxxxxx

### 4. copy it from ubuntu and add in github
>cat ~/.ssh/id_rsa.pub

_The cat (short for “concatenate“) command is one of the most frequently usedcommand in Linux/Unix like operating systems. cat command allows us to create single or multiple files, view contain of file, concatenate files and redirect output in terminal or files._

### 5. clone from github
>git clone git@github.com:jinshiyi588/nodejsweixin.git

